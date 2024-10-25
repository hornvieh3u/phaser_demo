var Effects = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function Effects(scene, config) {
            Phaser.GameObjects.Sprite.call(this, scene, config.x, config.y, config.texture, config.frame);
            this.name = 'effects';
            this.config = config;
            this.xind = 1;  // Direccion del efecto (1 = derecha, -1 = izquierda)
            this.depth = 99; // Asegúrate de que el depth sea apropiado para tu juego
            this.loadFrames(scene);
            scene.add.existing(this);
            this.on('animationcomplete', this.clear, this);
        },
    loadFrames: function (scene) {
        for (var i = 0; i < this.config.items.length; i++) {
            var item = this.config.items[i];
            scene.anims.create({
                key: item.group + '-' + item.name,
                frames: scene.anims.generateFrameNames(item.group, {
                    start: item.frame.start,
                    end: item.frame.end,
                    zeroPad: 5,
                    suffix: '.png'
                }),
                frameRate: item.frame.frameRate,
                repeat: item.frame.repeat
            });
        }
    },
    // Configura la posicion y direccion (xind) del efecto basado en la posicion del 'bod'
    setConfig: function(config, xind = -1, bodX = 0, bodY = 0) {
        this.config = config;
        this.xind = xind;
        
        // Calcula la nueva posición del efecto basado en la posición del 'bod' que recibe el daño
        let offsetX = this.config.offsetX || 0;
        let offsetY = this.config.offsetY || 0;
        
        // Ajusta la posición según la dirección
        if (this.xind === -1) {
            this.setPosition(bodX - offsetX, bodY + offsetY);  // Invertido a la izquierda
            this.setFlipX(true);  // Invierte el efecto horizontalmente
        } else {
            this.setPosition(bodX + offsetX, bodY + offsetY);  // Normal, derecha
            this.resetFlip();  // No se invierte el efecto
        }
    },
    showFX: function(texture) {
        this.setVisible(true);
        this.play(texture, true);
    },
    clear: function() {
        this.setVisible(false);
    }
});

export default Effects;
