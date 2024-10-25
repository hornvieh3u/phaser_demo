var Bod = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function Bod(scene, config) {
        // Ajustar la posición en 'x' basado en el personaje
        var posX = -75; // Valor por defecto
        if (config.name === 'ryu' || config.name === 'ken') {
            posX = -12; // Si el personaje es Ryu o Ken, se ajusta a -12
        }

        // Inicializar el sprite con la posición ajustada
        Phaser.GameObjects.Sprite.call(this, scene, 0, posX, null, null);
            this.name = 'bod'
            this.config = config
            this.id = config.id;
            this.scene = scene
            this.id == 'p2' ? this.flipX = true: this.flipX = false
            this.loadFrames(scene);
            scene.add.existing(this);
    },
    loadFrames: function () {
        for (var i = 0; i < this.config.mov.length; i++) { // directional moves
            var moves = this.config.mov[i];
            this.scene.anims.create({ key: this.id + '-' +  moves.name, frames: this.scene.anims.generateFrameNames(this.config.name, { start: moves.frame.start, end: moves.frame.end, zeroPad: 5, suffix:'.png'}), frameRate: moves.frame.frameRate, repeat: moves.frame.repeat });
        }
        for (var i = 0; i < this.config.spmoves.length; i++) { //special moves
            var moves = this.config.spmoves[i];
            this.scene.anims.create({ key: this.id + '-' +  moves.name, frames: this.scene.anims.generateFrameNames(this.config.name, { start: moves.frame.start, end: moves.frame.end, zeroPad: 5, suffix:'.png'}), frameRate: moves.frame.frameRate, repeat: moves.frame.repeat });
        }
        for (var i = 0; i < this.config.atk.length; i++) { // attack moves
            var moves = this.config.atk[i];
            this.scene.anims.create({ key: this.id + '-' +  moves.name, frames: this.scene.anims.generateFrameNames(this.config.name, { start: moves.frame.start, end: moves.frame.end, zeroPad: 5, suffix:'.png'}), frameRate: moves.frame.frameRate, repeat: moves.frame.repeat });
        }
        for (var i = 0; i < this.config.cricarts.length; i++) { // critical arts
            var moves = this.config.cricarts[i];
            this.scene.anims.create({ key: this.id + '-' +  moves.name, frames: this.scene.anims.generateFrameNames(this.config.name, { start: moves.frame.start, end: moves.frame.end, zeroPad: 5, suffix:'.png'}), frameRate: moves.frame.frameRate, repeat: moves.frame.repeat });
        }

        
    }
})

export default Bod
