import Phaser from 'phaser';
import LoadScene from './scenes/load';
import MainScene from './scenes/main';
import HudScene from './scenes/hud';
import ResultScene from './scenes/result';

let app;

let game;
let openingAudio; 

let selectedCharacters = {
    player1: null,
    player2: null
};
const characters = document.querySelectorAll('.character');

characters.forEach(character => {
    character.addEventListener('click', () => {
        // Quitar la clase 'selected' de todos los personajes
        characters.forEach(c => c.classList.remove('selected'));
        
        // Agregar la clase 'selected' al personaje clicado
        character.classList.add('selected');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    openingAudio = new Audio('../assets/audio/Opening.mp3');
    openingAudio.loop = true; 
    openingAudio.volume = 0.0;
    openingAudio.play(); 

    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('startButton2').addEventListener('click', showCharacterSelect);
    document.getElementById('confirmButton').addEventListener('click', startGame2);
    document.querySelectorAll('.character').forEach(character => { character.addEventListener('click', selectCharacter);
    });
});

function showCharacterSelect() {
    
    // Restablecer la selección de personajes
    selectedCharacters.player1 = null;
    selectedCharacters.player2 = null;

    // Restablecer el UI de selección de personajes
    const characterElements = document.querySelectorAll('.character');
    if (characterElements) {
        characterElements.forEach(c => c.classList.remove('selected'));
    }

    const player1Character = document.getElementById('player1Character');
    const player2Character = document.getElementById('player2Character');
    const player1Name = document.getElementById('player1Name');
    const player2Name = document.getElementById('player2Name');

    // Limpiar imágenes y nombres seleccionados
    if (player1Character) player1Character.style.backgroundImage = '';
    if (player2Character) player2Character.style.backgroundImage = '';
    if (player1Name) player1Name.textContent = '';
    if (player2Name) player2Name.textContent = '';

    // Ocultar botones de inicio
    const startButton1 = document.getElementById('startButton');
    const startButton2 = document.getElementById('startButton2');
    if (startButton1) startButton1.style.display = 'none';
    if (startButton2) startButton2.style.display = 'none';

    // Aplicar fondo de selección de personajes
    document.body.style.backgroundImage = 'url("/assets/stages/intro/bg7.png")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Mostrar la sección de selección de personajes
    const characterSelect = document.getElementById('characterSelect');
    if (characterSelect) characterSelect.style.display = 'block';
}


function selectCharacter(event) {
    const player = event.currentTarget.getAttribute('data-player');
    const character = event.currentTarget.getAttribute('data-character');
    selectedCharacters[`player${player}`] = character;
    event.currentTarget.classList.add('selected');

    console.log(`Player ${player} selected ${character}`);

    const characterImgUrl = `/assets/char/${character}/${character}-big.png`;
    const characterName = character.charAt(0).toUpperCase() + character.slice(1);

    if (player === '1') {
        const player1Character = document.getElementById('player1Character');
        player1Character.style.backgroundImage = `url(${characterImgUrl})`;
        player1Character.style.transform = 'scaleX(-1)'; // Aplicar el giro horizontal
        document.getElementById('player1Name').textContent = `P1: ${characterName}`;
    } else if (player === '2') {
        const player2Character = document.getElementById('player2Character');
        player2Character.style.backgroundImage = `url(${characterImgUrl})`;
        player2Character.style.transform = 'scaleX(1)'; // Asegurarse de que Player 2 no esté girado
        document.getElementById('player2Name').textContent = `P2: ${characterName}`;
    }
}

function startGame() {
    if (openingAudio) {
        openingAudio.pause(); 
        openingAudio.currentTime = 0; 
    }

    if (!game) {
        game = new Phaser.Game({
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: 'sfvjs',
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 800,
                height: 600
            },
            input: { gamepad: true },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 650 },
                    debug: false 
                }
            },
            dom: { createContainer: true },
            scene: [LoadScene, MainScene, HudScene, ResultScene]
        });

        game.events.on('startNewFight', () => {
            game.scene.stop('resultscene');
            game.scene.stop('mainscene');
            game.scene.stop('hudscene');
            game.scene.stop('loadscene');

            game.scene.start('loadscene');  
        });
    }
    document.getElementById('startButton2').style.display = 'none';
    document.getElementById('characterSelect').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    document.body.style.background = '#000'; 
}

function startGame2() {
    // Verificar que ambos personajes hayan sido seleccionados
    if (!selectedCharacters.player1 || !selectedCharacters.player2) {
        alert('Por favor seleccione un personaje para ambos jugadores.');
        return;
    }

    // Guardar la selección de personajes globalmente
    window.selectedCharacters = {
        p1: selectedCharacters.player1,
        p2: selectedCharacters.player2
    };

    // Ocultar la UI de selección de personajes
    document.getElementById('characterSelect').style.display = 'none';
    
    // Limpiar cualquier instancia previa de Phaser antes de reiniciar
    if (game) {
        game.events.off('startNewFight'); // Desvincular cualquier evento previo
        game.destroy(true); // Destruir la instancia actual del juego
    }

    // Reiniciar el juego con una nueva instancia
    game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'sfvjs',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        dom: { createContainer: true },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 650 },
                debug: true 
            }
        },
        scene: [LoadScene, MainScene, HudScene, ResultScene],
        input: {
            gamepad: true
        }
    });

    // Reiniciar el juego desde la escena de carga
    game.scene.start('loadscene');
    document.body.style.background = '#000'; 

    // Pausar el audio de apertura si está sonando
    if (openingAudio) {
        openingAudio.pause();
        openingAudio.currentTime = 0;
    }
}

export default startGame2;
