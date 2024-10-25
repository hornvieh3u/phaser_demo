var loadscene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function loadscene() {
        Phaser.Scene.call(this, { key: 'loadscene', active: false });
    },
    configs: [],
    preload: function () {
        var charpath = "/assets/char/";
        this.load.multiatlas('ryu', charpath + 'ryu/ryu.json', charpath + 'ryu');
        this.load.multiatlas('ken', charpath + 'ken/ken.json', charpath + 'ken');
        this.load.multiatlas('akuma', charpath + 'akuma/akuma.json', charpath + 'akuma');
        this.load.multiatlas('chun', charpath + 'chun/chun.json', charpath + 'chun');
        this.load.multiatlas('blanka', charpath + 'blanka/blanka.json', charpath + 'blanka');
        this.load.multiatlas('iori', charpath + 'iori/iori.json', charpath + 'iori');
        this.load.multiatlas('terry', charpath + 'terry/terry.json', charpath + 'terry');

        this.load.script('p1-config', 'config/char/ryu.js');
        this.load.script('p2-config', 'config/char/ken.js');
        this.load.script('p3-config', 'config/char/akuma.js');
        this.load.script('p4-config', 'config/char/chun.js');
        this.load.script('p5-config', 'config/char/blanka.js');
        this.load.script('p6-config', 'config/char/iori.js');
        this.load.script('p7-config', 'config/char/terry.js');

        this.load.script('fx-config', 'config/effects/effect.js');
        this.load.image('base', '/assets/stages/ground.png');
        this.load.image('white_spark', '/assets/particles/white.png');
        this.load.image('ryuBig', '/assets/char/ryu/ryu-big.png');  // Asegúrate de que esta ruta es correcta
        this.load.image('kenBig', '/assets/char/ken/ken-big.png');  // Asegúrate de que esta ruta es correcta
        this.load.image('akumaBig', '/assets/char/akuma/akuma-big.png');
        this.load.image('chunBig', '/assets/char/chun/chun-big.png');
        this.load.image('blankaBig', '/assets/char/blanka/blanka-big.png');
        this.load.image('ioriBig', '/assets/char/iori/iori-big.png');
        this.load.image('terryBig', '/assets/char/terry/terry-big.png');
        this.load.image('ioriWin', '/assets/char/iori/iori-win.png');
        this.load.image('terryWin', '/assets/char/terry/terry-win.png');

        var fxpath = "/assets/effects/";
        var fx = ['dizzies', 'fire_ice_shock', 'fireballs', 'ground', 'hitsparks', 'misc', 'shadow', 'superart'];
        for (var i = 1; i < fx.length; i++) {
            this.load.multiatlas(fx[i], fxpath + fx[i] + '/' + fx[i] + '.json', fxpath + fx[i]);
        }
    },
    create: function() {
        this.configs = [];  // Limpiar los datos de configuración

        const selectedP1 = window.selectedCharacters.p1;
        const selectedP2 = window.selectedCharacters.p2;

        // Asignar las configuraciones de los personajes seleccionados
        this.configs.push(window[selectedP1]); 
        window[selectedP1].id = 'p1';

        this.configs.push(window[selectedP2]);
        window[selectedP2].id = 'p2';

        this.configs.push(effects);

        var data = { result: { round: 1, p1wins: 0, p2wins: 0 } };
        this.scene.start('mainscene');
        this.scene.start('hudscene', data);
    }
});

export default loadscene;