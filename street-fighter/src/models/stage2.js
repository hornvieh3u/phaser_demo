var Staget = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
        function Staget(scene, x, y, texture, frame) {
            Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
            this.name = 'staget';
            this.scene = scene;
            this.scene.add.existing(this);
    },
    loadImages: function () {
        this.scene.load.image('makoto-1', '../assets/stages/intro/bg7.png');
        // Cargar imágenes de Ryu y Ken
        this.scene.load.image('ryuBig', '../assets/char/ryu/ryu-big.png');
        this.scene.load.image('kenBig', '../assets/char/ken/ken-big.png');
        this.scene.load.image('akumaBig', '/assets/char/akuma/akuma-big.png');
        this.scene.load.image('chunBig', '/assets/char/chun/chun-big.png');
        this.scene.load.image('blankaBig', '/assets/char/blanka/blanka-big.png');
        this.scene.load.image('ioriWin', '/assets/char/iori/iori-win.png');
        this.scene.load.image('terry', '/assets/char/terry/terry-win.png');
        
    },
    start: function(winner) {
        this.layer1 = this.scene.add.tileSprite(400, 390, 800, 800, 'makoto-1'); 

        this.scene.tweens.add({
            targets: this.layer1,
            tilePositionX: { from: -0.5, to: 2.5 },
            ease: 'Linear',
            duration: 3000,
            yoyo: true,
            repeat: -1
        });

        // Agregar imagen del ganador detrás del texto de ganador
        let winnerImage = '';
        if (winner.config.name.toLowerCase() === 'ryu') {
            winnerImage = 'ryuBig';
        } else if (winner.config.name.toLowerCase() === 'ken') {
            winnerImage = 'kenBig';
        }else if (winner.config.name.toLowerCase() === 'akuma') {
            winnerImage = 'akumaBig';
        }else if (winner.config.name.toLowerCase() === 'chun') {
            winnerImage = 'chunBig';
        }else if (winner.config.name.toLowerCase() === 'blanka') {
            winnerImage = 'blankaBig';
        }else if (winner.config.name.toLowerCase() === 'iori') {
            winnerImage = 'ioriWin';
        }else if (winner.config.name.toLowerCase() === 'terry') {
            winnerImage = 'terryWin';
        }
        
        

        if (winnerImage) {
            this.winnerBackground = this.scene.add.image(400, 300, winnerImage)
                .setOrigin(0.5, 0.5)
                .setDepth(1); // Asegúrate de que el fondo del ganador esté detrás del texto
        }
    }
});

export default Staget;
