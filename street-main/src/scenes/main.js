import Player from "../models/player";
import Stage from "../models/stage";
import Collissions from "../functions/collision";
import Camera from "../functions/camera";

var mainscene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function mainScene() {
        Phaser.Scene.call(this, { key: 'mainscene', active: false });
    },

    preload: function () {
        // Obtiene las configuraciones de los personajes desde la escena de carga
        var loadscene = this.scene.get('loadscene');
        this.configs = loadscene ? loadscene.configs : null;

        // Verifica que las configuraciones existan antes de continuar
        if (!this.configs || this.configs.length < 2) {
            console.error('Error: Configuraciones de jugadores no encontradas.');
            return;
        }

        // Creación del entorno del juego
        this.ground = this.physics.add.staticGroup().create(400, 590, 'base').setScale(1).refreshBody();

        try {
            this.player1 = new Player('p1', this, this.configs[0]);
            this.player2 = new Player('p2', this, this.configs[1]);
        } catch (error) {
            console.error('Error al crear los jugadores:', error);
        }

        this.stage = new Stage(this, 0, 0, null, 0);
        this.collission = new Collissions(this);
        this.cam = new Camera(this);
    },

    create: function () {
        // Iniciar la escena del escenario y la cámara
        if (this.stage) {
            this.stage.start();
        } else {
            console.error('Error: No se pudo iniciar el escenario.');
        }

        if (this.cam) {
            this.cam.start();
        } else {
            console.error('Error: No se pudo iniciar la cámara.');
        }

        // Ejemplo de lógica de término de juego (adaptarla a tu lógica de fin de juego)
        this.events.on('gameOver', (result) => {
            this.scene.stop('mainscene');
            this.scene.stop('hudscene');
            this.scene.start('resultscene', { result });
        });
    },

    update: function () {
        // Control de los jugadores y la cámara en cada frame
        if (this.player1 && this.player2) {
            this.player1.control.controlPlayer();
            this.player2.control.controlPlayer();
            this.cam.scrollCamera();
        } else {
            console.error('Error: Los jugadores no están correctamente inicializados.');
        }
    }
});

export default mainscene;
