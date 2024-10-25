import Container from './container';
import Input from '../functions/input';
import Fireball from './fireball';

var Player = new Phaser.Class({
    initialize:
        function Player(id, scene, config) {
            this.id = id;
            this.scene = scene;
            this.hud = this.scene.scene.get('hudscene');
            config.id = this.id;
            this.config = config;

            var x = this.id === 'p1' ? 300 : 500;
            this.xInd = this.id === 'p2' ? -1 : 1; // 1 = derecha, -1 = izquierda
            this.f = 'f';
            this.b = 'b';
            this.dir = 'n';
            this.blocking = false;
            this.health = config.health;
            this.stun = 0;
            this.power = 0;
            this.wins = 0;

            // Inicializar el contenedor del jugador
            this.container = new Container(scene, x, 500, this.config);
            this.bod = this.container.getByName('bod');
            this.effects = this.container.getByName('effects');
            this.hitbox = this.container.getByName('hitbox');
            this.hurtbox = this.container.getByName('hurtbox');
            this.shadow = this.container.getByName('shadow');
            this.fireball = new Fireball(this.scene, this.id);
            this.control = new Input(scene, this);
 
            // Configurar eventos de animación
            this.bod.on('animationcomplete', this.animComplete, this);
            this.bod.on('animationupdate', this.animUpdate, this);

            // Eventos de detección de hitbox
            this.hitbox.on(this.id + '-hitboxHit', this.showEffects, this);
            this.hitbox.on(this.id + '-hitboxBlock', this.showEffects, this);

            // Inicializar la máquina de estados finitos (FSM)
            this._fsm();
        },

        showEffects: function (id, config) {
            // Ajustar la posición del efecto en función de la dirección del personaje
            var effectX = this.bod.x;  // Base para la posición en x
            var effectY = this.bod.y;  // Base para la posición en y
        
            // Si el personaje está mirando hacia la izquierda, ajustar la posición del efecto
            if (this.xInd === -1) {
                // Ajustar la coordenada X para que el efecto esté correctamente alineado
                effectX -= config.fx.offsetX || 125;
                effectY -= config.fx.offsetY|| -75;  // Puedes usar un offset personalizado si lo necesitas
            } else {
                // Si está mirando a la derecha, ajustar la coordenada X de forma adecuada
                effectX += config.fx.offsetX || 0;
                effectY -= config.fx.offsetY|| -75; 
            }
        
            // Aplicar la configuración al efecto con la posición ajustada
            this.effects.setConfig(config.fx, this.xInd);
            this.effects.setPosition(effectX, effectY);  // Ajusta la posición del efecto
            this.effects.showFX(config.fx.name);
        },

    getConfig: function (type, name) {
        var config = this.config[type].filter(a => a.name === name);
        return config[0];
    },

    getMove: function (anim) {
        return anim.split('-')[1];
    },

    animComplete: function (animation) {
        this.bod.emit(animation.key + '-animComplete', this);
        var moves = [this.id + '-crouch', this.id + '-ca1'];
        if (!moves.includes(animation.key) && this.container.body.onFloor()) {
            this.tstance();
            this.shadow.setY(0);
            this.container.body.stop();
        }
    },

    animUpdate: function (animation) {
        // Emitir evento de actualización de animación
        this.bod.emit(animation.key + '-animUpdate', this);

        // Comprobar si la animación o el cuerpo están definidos para evitar el error
        if (!this.bod || !this.bod.anims || !this.bod.anims.currentFrame) return;

        // Ajuste del flipX basado en la dirección del personaje
        if (this.xInd === -1) {
            this.bod.setFlipX(false);  // Personaje mirando a la izquierda
            this.bod.scaleX = +Math.abs(this.bod.scaleX); // Asegurar que la escala en x sea negativa cuando está hacia la izquierda

        } else {
            this.bod.setFlipX(false);  // Personaje mirando a la derecha
            this.bod.scaleX = -Math.abs(this.bod.scaleX);  // Asegurar que la escala en x sea positiva cuando está hacia la derecha

        }
        if (this.xInd == 1) {
             this.f = 'f'; this.b = 'b'
        } else {
            this.f = 'b'; this.b = 'f'
        }
        // Verificar si se está moviendo y aterrizó en el suelo
        var moves = [this.id + '-jumpf', this.id + '-jumpb'];
        if (moves.includes(animation.key) && this.container.body.onFloor()) {
            this.tstance();
        }

        // Si está en estado de ataque, ajustar el hitbox
        if (this.state === 'attk' || this.state === 'jattk' || this.state === 'crattk') {
            var config = this.getConfig('atk', this.getMove(animation.key));
            this.hitbox.display(config, this.xInd, this.bod.anims.currentFrame.index);
        }

        // Si está en un ataque especial, ajustar el hitbox para movimientos especiales
        if (this.state === 'spattk') {
            var config = this.getConfig('spmoves', this.getMove(animation.key));
            if (config.hitbox) {
                this.hitbox.display(config, this.xInd, this.bod.anims.currentFrame.index);
            }
        }
    },
    setBlock: function (state) {
        // Ajuste de estado de bloqueo basado en el estado actual
        if (this.state == 'walk' && state == 'b') {
            this.blocking = 'h';
        } else {
            this.blocking = false; // O mantener el estado de bloqueo anterior
        }
    },
    
    setHealth: function (damage) {
        this.health < 0 ? this.health = 0 : this.health = this.health - damage
    },

    getHealth: function () {
        return this.health / this.config.health * 1000
    },
    setStun: function (value) {
        this.stun > this.config.stun ? this.stun = this.config.stun : this.stun += value
    },
    getStun: function () {
        var stun = this.stun > this.config.stun ? 1000 : this.stun / this.config.stun * 1000
        return stun
    },
    setPower: function (value) {
        value > this.config.power ? this.power = this.config.power : this.power += value
    },
    getPower: function () {
        return this.power / this.config.power * 1000
    }
})

var StateManager = require('javascript-state-machine');
StateManager.factory(Player, {
    init: 'stance',
    transitions: [
        { name: 'tstance', from: '*', to: 'stance' },
        { name: 'twalk', from: ['stance', 'walk'], to: 'walk' },
        { name: 'tdash', from: ['stance', 'walk'], to: 'dash' },
        { name: 'tjump', from: ['stance', 'walk', 'dash'], to: 'jump' },
        { name: 'thit', from: ['stance', 'walk'], to: 'hit' },
        { name: 'tattk', from: ['stance', 'walk', 'dash', 'attk'], to: 'attk' },
        { name: 'tjattk', from: ['jump'], to: 'jattk' },
        { name: 'tspattk', from: ['stance', 'walk', 'dash'], to: 'spattk' },
        { name: 'tcrattk', from: ['stance', 'walk', 'dash', 'attk', 'spattk', 'crouch'], to: 'crattk' },
        { name: 'tfrattk', from: ['stance', 'walk', 'dash', 'attk', 'spattk', 'crouch'], to: 'frattk' }, // Agregamos 'crouch' como estado permitido para atacar agachado
        { name: 'tcrouch', from: ['stance', 'walk', 'attk'], to: 'crouch' },
        { name: 'tblock', from: ['stance', 'walk'], to: 'block' },
        { name: 'tstate', from: '*', to: function (state) { return state } }],
    methods: {
        onEnterState: function (lc, type) {
            this.container.body.setDrag(200, 0)
            this.setBlock(type);
            this.hurtbox.display(this.config.hurtbox)
        },
        onStance: function () {
            this.dir = 'n';
            this.hurtbox.display(this.config.hurtbox)
            this.bod.play(this.id + '-' + this.state, true)
            this.container.body.stop()
        },
        onTwalk: function (lc, dir) {
            this.dir = dir;
            this.bod.play(this.id + '-' + this.state + dir, true);
            var config = this.getConfig('mov', this.state + dir);
            if (dir == 'f') {
                var speed = this.xInd === 1 ? config.speed : -config.speed;
                this.container.body.setVelocityX(speed);
            } else if (dir == 'b') {
                var speed = this.xInd === 1 ? -config.speed : config.speed;
                this.container.body.setVelocityX(speed);
            }
        },
    
        onTdash: function (lc, dir) {
            this.bod.play(this.id + '-' + this.state + dir, true)
            var config = this.getConfig('mov', this.state + dir)
            this.effects.setConfig(config.fx, this.xInd)
            this.effects.showFX(config.fx.name)
            switch (dir) {
                case 'f': this.container.body.setVelocityX(config.speed * this.xInd); break
                case 'b': this.container.body.setVelocityX(-config.speed * this.xInd); break
            }
        },
        onTjump: function (lc, dir) {
            this.container.body.setDrag(0, 0)
            this.effects.clear()
            this.bod.play(this.id + '-' + this.state + dir, true)
            var config = this.getConfig('mov', this.state + dir)
            this.shadow.setY(999)
            switch (dir) {
                case 'f': this.container.body.setVelocity(config.speedX * this.xInd, -config.speedY); break
                case 'b': this.container.body.setVelocity(-config.speedX * this.xInd, -config.speedY); break
                default: this.container.body.setVelocityY(-config.speedY);
            }
        },
        onTcrouch: function (lc) {
            this.bod.play(this.id + '-' + this.state, true);
            var config = this.getConfig('mov', this.state);
            this.container.body.stop();
            this.hurtbox.display(config.hurtbox);
            // Configurar el estado de bloqueo si es necesario
            this.setBlock('crouch');
        },
        onTblock: function (lc, config) {

            this.bod.play(this.id + '-' + this.state + config.atklvl, true);
            this.container.body.stop();
        },
        onLeaveBlock: function () {
            this.bod.anims.currentAnim.emit('resetFrame', this) //rest on block data
        },
        onThit: function (lc, config) {
            this.bod.setDepth(1)
            this.bod.play(this.id + '-' + this.state + config.atklvl, true)
            this.container.body.stop()
            this.container.depth = 1
        },
        onLeaveHit: function () {
            this.bod.anims.currentAnim.emit('resetFrame', this) //rest on hit data
        },
        onTattk: function (lc, type) {
            this.bod.play(this.id + '-' + type, true)
            var config = this.getConfig('atk', type)
            this.container.body.setVelocityX(config.speed);
            this.container.depth = 3
        },
        onTjattk: function (lc, type) {
            var speed = this.container.body.velocity.x;
            this.container.body.setVelocityX(speed);
            this.bod.play(this.id + '-' + type, true); // 'type' puede ser 'jlk', 'jmk', 'jhk' para patadas en el aire.
            this.container.depth = 6;
        },
        onTspattk: function (lc, type, lvl) {
            this.bod.play(this.id + '-' + lvl + type, true)
            var config = this.getConfig('spmoves', lvl + type)
            
            // Aplica velocidad o efectos especiales
            this.container.body.setVelocityX(config.speed * this.xInd);
            this.container.depth = 4;
            
            // Configurar efectos especiales y mostrarlos
            this.effects.setConfig(config.fx, this.xInd)
            this.effects.showFX(config.fx.name);
            
            // Diferentes tipos de ataques especiales
            switch (type) {
                case 'fbf': // Ejemplo: fireball (hadouken)
                    var fbcfg = config.output[0];
                    this.fireball.setConfig(fbcfg);
                    this.fireball.setCoord(this.container.x, this.container.y, this.xInd);
                    this.fireball.shoot();
                    break;
                case 'dpf': // Ejemplo: uppercut
                    this.container.body.setVelocityY(-config.height);
                    break;
            }
        }
        ,
        onTcrattk: function (lc, type) {
            this.container.body.setVelocityX(this.container.body.velocity.x);
            this.bod.play(this.id + '-' + type, true); // 'type' puede ser 'crlk', 'crmk', etc.
            
            var config = this.getConfig('atk', type);
            this.hitbox.display(config, this.xInd, this.bod.anims.currentFrame.index); // Mostrar hitbox
            
            this.container.depth = 2; // Ajustar la profundidad durante ataques agachados
        }
        ,
        onTfrattk: function (lc, type) {
            this.bod.play(this.id + '-' + type, true)
            var config = this.getConfig('cricarts', type)
            this.container.body.setVelocityX(config.speed * this.xInd);
            this.container.depth = 5
            this.effects.setConfig(config.fx, this.xInd)
            this.effects.showFX(config.fx.name)
            switch (type) {
                case 'ca1':
                    console.log('denji hadouuuuuuken'); break;
            }

        },

      
        onInvalidTransition: function (lc) { },
        onPendingTransition: function (lc) { }
    }
});

export default Player;
