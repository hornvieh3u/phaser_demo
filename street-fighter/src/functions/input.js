import Phaser from 'phaser';

var Input = new Phaser.Class({
    initialize: function Input(scene, player) {
        this.player = player;
        this.scene = scene;
        this.setupKeys();
        
    },
    lock: function (state) {
        state === true ? this.scene.input.keyboard.enabled = false : this.scene.input.keyboard.enabled = true;
    },
    setupKeys: function () {
        if (this.player.id === 'p1') {
            // Configuración de teclas para el jugador p1
            this.u = this.scene.input.keyboard.addKey('W');
            this.d = this.scene.input.keyboard.addKey('S');
            this.l = this.scene.input.keyboard.addKey('A');
            this.r = this.scene.input.keyboard.addKey('D');
            this.lp = this.scene.input.keyboard.addKey('E');
            this.mp = this.scene.input.keyboard.addKey('R');
            this.hp = this.scene.input.keyboard.addKey('T');
            this.lk = this.scene.input.keyboard.addKey('F');
            this.mk = this.scene.input.keyboard.addKey('G');
            this.hk = this.scene.input.keyboard.addKey('Y');

            this.dashf = this.scene.input.keyboard.createCombo('DD', { resetOnMatch: true });
            this.dashb = this.scene.input.keyboard.createCombo('AA', { resetOnMatch: true });
            this.dshof = this.scene.input.keyboard.createCombo('DDSD', { resetOnMatch: true });
            this.dshob = this.scene.input.keyboard.createCombo('AASA', { resetOnMatch: true });

            // Dragon Punch
            this.ldpf = this.scene.input.keyboard.createCombo('DSDE', { resetOnMatch: true });
            this.mdpf = this.scene.input.keyboard.createCombo('DSDR', { resetOnMatch: true });
            this.hdpf = this.scene.input.keyboard.createCombo('DSDT', { resetOnMatch: true });
            this.ldpb = this.scene.input.keyboard.createCombo('ASAE', { resetOnMatch: true });
            this.mdpb = this.scene.input.keyboard.createCombo('ASAR', { resetOnMatch: true });
            this.hdpb = this.scene.input.keyboard.createCombo('ASAT', { resetOnMatch: true });

            // Fireball
            this.lfbf = this.scene.input.keyboard.createCombo('SDE', { resetOnMatch: true });
            this.mfbf = this.scene.input.keyboard.createCombo('SDR', { resetOnMatch: true });
            this.hfbf = this.scene.input.keyboard.createCombo('SDT', { resetOnMatch: true });
            this.lfbb = this.scene.input.keyboard.createCombo('SAE', { resetOnMatch: true });
            this.mfbb = this.scene.input.keyboard.createCombo('SAR', { resetOnMatch: true });
            this.hfbb = this.scene.input.keyboard.createCombo('SAT', { resetOnMatch: true });

            // Tatsus
            this.ltatf = this.scene.input.keyboard.createCombo('SAF', { resetOnMatch: true });
            this.mtatf = this.scene.input.keyboard.createCombo('SAG', { resetOnMatch: true });
            this.htatf = this.scene.input.keyboard.createCombo('SAY', { resetOnMatch: true });
            this.ltatb = this.scene.input.keyboard.createCombo('SDF', { resetOnMatch: true });
            this.mtatb = this.scene.input.keyboard.createCombo('SDG', { resetOnMatch: true });
            this.htatb = this.scene.input.keyboard.createCombo('SDY', { resetOnMatch: true });

            // Critical Arts
            this.caf = this.scene.input.keyboard.createCombo('QQ', { resetOnMatch: true });
            this.cab = this.scene.input.keyboard.createCombo('QQ', { resetOnMatch: true });
        } else if (this.player.id === 'p2') {
            // Configuración de teclas para el jugador p2
            this.u = this.scene.input.keyboard.addKey('I');
            this.d = this.scene.input.keyboard.addKey('K');
            this.l = this.scene.input.keyboard.addKey('J');
            this.r = this.scene.input.keyboard.addKey('L');
            this.lp = this.scene.input.keyboard.addKey('M');
            this.mp = this.scene.input.keyboard.addKey('N');
            this.hp = this.scene.input.keyboard.addKey('B');
            this.lk = this.scene.input.keyboard.addKey('V');
            this.mk = this.scene.input.keyboard.addKey('C');
            this.hk = this.scene.input.keyboard.addKey('Z');


            this.dashf = this.scene.input.keyboard.createCombo('LL', { resetOnMatch: true });
            this.dashb = this.scene.input.keyboard.createCombo('JJ', { resetOnMatch: true });
            this.dshof = this.scene.input.keyboard.createCombo('LLKL', { resetOnMatch: true });
            this.dshob = this.scene.input.keyboard.createCombo('JJKJ', { resetOnMatch: true });

            // Dragon Punch
            this.ldpf = this.scene.input.keyboard.createCombo('LKLM', { resetOnMatch: true });
            this.mdpf = this.scene.input.keyboard.createCombo('LKLN', { resetOnMatch: true });
            this.hdpf = this.scene.input.keyboard.createCombo('LKLB', { resetOnMatch: true });
            this.ldpb = this.scene.input.keyboard.createCombo('JKJM', { resetOnMatch: true });
            this.mdpb = this.scene.input.keyboard.createCombo('JKJN', { resetOnMatch: true });
            this.hdpb = this.scene.input.keyboard.createCombo('JKJB', { resetOnMatch: true });

            // Fireball
            this.lfbf = this.scene.input.keyboard.createCombo('KLM', { resetOnMatch: true });
            this.mfbf = this.scene.input.keyboard.createCombo('KLN', { resetOnMatch: true });
            this.hfbf = this.scene.input.keyboard.createCombo('KLB', { resetOnMatch: true });
            this.lfbb = this.scene.input.keyboard.createCombo('KJM', { resetOnMatch: true });
            this.mfbb = this.scene.input.keyboard.createCombo('KJN', { resetOnMatch: true });
            this.hfbb = this.scene.input.keyboard.createCombo('KJB', { resetOnMatch: true });

            // Tatsus
            this.ltatf = this.scene.input.keyboard.createCombo('KJV', { resetOnMatch: true });
            this.mtatf = this.scene.input.keyboard.createCombo('KJC', { resetOnMatch: true });
            this.htatf = this.scene.input.keyboard.createCombo('KJZ', { resetOnMatch: true });
            this.ltatb = this.scene.input.keyboard.createCombo('KLV', { resetOnMatch: true });
            this.mtatb = this.scene.input.keyboard.createCombo('KLC', { resetOnMatch: true });
            this.htatb = this.scene.input.keyboard.createCombo('KLZ', { resetOnMatch: true });

            // Critical Arts
            this.caf = this.scene.input.keyboard.createCombo('XX', { resetOnMatch: true });
            this.cab = this.scene.input.keyboard.createCombo('XX', { resetOnMatch: true });
        }

        // Configuración de combos para ambos jugadores
        // Dash

    },
    controlPlayer: function () {
        this.invertControls();
        this.controlDirection();
        this.controlAttack();
        this.controlInputs();
    },
    invertControls: function () {
        var object = this.player.container;
        var target = this.player.id === 'p1' ? this.scene.player2.container : this.scene.player1.container;
        var xdif = object.x - target.x;
        this.player.xInd = xdif > 0 ? -1 : 1;
    

    },

    controlDirection: function () {
        var state = this.player.state;
        var moves = ['attk', 'spattk', 'crattk', 'tjattk'];
    
        if (this.r.isDown && this.u.isDown) {
            if (!moves.includes(state)) {
                this.player.tjump(this.player.f);
            }
        } else if (this.l.isDown && this.u.isDown) {
            if (!moves.includes(state)) {
                this.player.tjump(this.player.b);
            }
        } else if (this.d.isDown) {
            if (!moves.includes(state)) {
                this.player.tcrouch(false);
            }
        } else if (this.r.isDown) {
            if (!moves.includes(state)) {
                this.player.twalk(this.player.f);
            }
        } else if (this.l.isDown) {
            if (!moves.includes(state)) {
                this.player.twalk(this.player.b);
            }
        } else if (this.u.isDown) {
            if (!moves.includes(state)) {
                this.player.tjump('');
            }
        } else if (this.player.container.body.onFloor()) {
            if (!moves.includes(state)) {
                this.player.tstance();
            }
        }
    },
    controlAttack: function () {

        
         if (this.player.state === 'crouch') {
            // Manejamos ataques agachados específicos (si hay algún estado especial)
            if (this.lp.isDown) {
                this.player.tcrattk('clp');
            } else if (this.lk.isDown) {
                this.player.tcrattk('clk');
            } else if (this.mp.isDown) {
                this.player.tcrattk('cmp');
            } else if (this.mk.isDown) {
                this.player.tcrattk('cmk');
            } else if (this.hp.isDown) {
                this.player.tcrattk('chp');
            } else if (this.hk.isDown) {
                this.player.tcrattk('chk');
            }
        } else if (this.player.container.body.onFloor()) {
            // Ataques de pie
            if (this.lp.isDown) {
                this.player.tattk('slp');
            } else if (this.lk.isDown) {
                this.player.tattk('slk');
            } else if (this.mp.isDown) {
                this.player.tattk('smp');
            } else if (this.mk.isDown) {
                this.player.tattk('smk');
            } else if (this.hp.isDown) {
                this.player.tattk('shp');
            } else if (this.hk.isDown) {
                this.player.tattk('shk');
            }
        } else {
            // Ataques saltando
            if (this.lp.isDown) {
                this.player.tjattk('jlp');
            } else if (this.lk.isDown) {
                this.player.tjattk('jlk');
            } else if (this.mp.isDown) {
                this.player.tjattk('jmp');
            } else if (this.mk.isDown) {
                this.player.tjattk('jmk');
            } else if (this.hp.isDown) {
                this.player.tjattk('jhp');
            } else if (this.hk.isDown) {
                this.player.tjattk('jhk');
            }
        }
    },
    controlInputs: function () {
        this.scene.input.keyboard.on('keycombomatch', function (event) {
            if (this['dash' + this.player.f].matched) {
                this.player.tdash('f');
            }
            if (this['dash' + this.player.b].matched) {
                this.player.tdash('b');
            }
            if (this['lfb' + this.player.f].matched) {
                this.player.tspattk('fbf', 'l');
            }
            if (this['mfb' + this.player.f].matched) {
                this.player.tspattk('fbf', 'm');
            }
            if (this['hfb' + this.player.f].matched) {
                this.player.tspattk('fbf', 'h');
            }
            if (this['ltat' + this.player.f].matched) {
                this.player.tspattk('tatf', 'l');
            }
            if (this['mtat' + this.player.f].matched) {
                this.player.tspattk('tatf', 'm');
            }
            if (this['htat' + this.player.f].matched) {
                this.player.tspattk('tatf', 'h');
            }
            if (this['ldp' + this.player.f].matched) {
                this.player.tspattk('dpf', 'l');
            }
            if (this['mdp' + this.player.f].matched) {
                this.player.tspattk('dpf', 'm');
            }
            if (this['hdp' + this.player.f].matched) {
                this.player.tspattk('dpf', 'h');
            }
            if (this['ca' + this.player.f].matched) {
                this.player.tfrattk('ca1');
            }
        }, this);
    }
});

export default Input;