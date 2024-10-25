import Stage from "../models/stage";
import Staget from "../models/stage2";
import Camera from "../functions/camera";

var resultscene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function resultScene() {
        Phaser.Scene.call(this, { key: 'resultscene', active: false });
        console.log('resultScene');
    },

    preload: function () {
        // Cargar imágenes del fondo y personajes
        this.load.image('ryuBig', '../assets/char/ryu/ryu-big.png');
        this.load.image('kenBig', '../assets/char/ken/ken-big.png');
        this.load.image('akumaBig', '/assets/char/akuma/akuma-big.png');
        this.load.image('chunBig', '/assets/char/chun/chun-big.png');
        this.load.image('blankaBig', '/assets/char/blanka/blanka-big.png');
        this.load.image('ioriBig', '/assets/char/iori/iori-big.png');
        this.load.image('terryBig', '/assets/char/terry/terry-big.png');
        this.load.image('makoto-1', '/assets/stages/intro/bg7.png');

        // Cargar el fondo del escenario
        this.stage = new Stage(this, 0, 0, null, 0);
        this.stage.loadImages();

        this.staget = new Staget(this, 0, 0, null, 0);
        this.staget.loadImages();

        this.cam = this.cameras.main;
    },

    create: function (data) {
       
    const style = `
    body {
        background-color: #000000;
        margin: 0;
        overflow: hidden;
    }
    #gameContainer {
        position: relative;
        width: 100%;
        height: 100vh;
    }
    canvas {
        display: block;
        z-index: 1;
    }
    .text-win {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 64px;
        color: #ffffff;
        text-shadow: 2px 2px 4px #000000;
        z-index: 10;
    }
    .text-winner-name {
        position: absolute;
        top: calc(50% + 70px);
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        color: #ffffff;
        text-shadow: 2px 2px 4px #000000;
        z-index: 10;
    }
    .text-restart {
        position: absolute;
        top: calc(50% + 150px);
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #ffffff;
        text-shadow: 2px 2px 4px #000000;
        z-index: 10;
        cursor: pointer;
    }
    .text-restart:hover {
        color: #ffcc00;
    }
`;
const styleElement = document.createElement('style');
styleElement.textContent = style;
document.head.appendChild(styleElement);
        console.log('finalScene');
        console.log('data:', data);

        // Mostrar el fondo del escenario
        this.staget.start(data.result.winner);
        this.stage.setVisible(true);

        // Texto que muestra el ganador
        this.winText = this.add.text(400, 300, 'GANADOR', {
            font: '64px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5,5).setDepth(10).setVisible(true);

        // Nombre del ganador
        this.winnerNameText = this.add.text(400, 400, data.result.winner.config.name.toUpperCase() + ' WINS!', {
            font: '32px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setDepth(10).setVisible(true);

        // Texto para reiniciar la pelea
        this.restartText = this.add.text(400, 500, 'Reiniciar Pelea', {
            font: '24px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5,-5).setDepth(10).setVisible(true);

        // Evento para reiniciar el juego
        this.restartText.setInteractive();
        this.restartText.on('pointerdown', () => {
            // Detener todas las escenas activas
            this.scene.stop('resultscene');
            this.scene.stop('mainscene');
            this.scene.stop('hudscene');
            
            // Reiniciar el juego volviendo a la selección de personajes
            this.scene.stop('loadscene'); // Cambia a la escena de selección de personajes
            document.getElementById('characterSelect').style.display = 'block'; // Mostrar selección de personajes
            document.body.style.background = 'url("/assets/stages/intro/bg7.png")'; // Fondo de selección
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            this.game.canvas.focus();
            this.events.on('gameOver', (result) => {
                this.scene.stop('mainscene');
                this.scene.stop('hudscene');
                this.scene.stop('resultscene');
                this.scene.start('resultscene', 'loadscene', { result });
                

            })
            this.events.off('gameOver');
        })
    },

    update: function () {
        // Lógica de actualización continua si es necesario
    }
});

export default resultscene;
