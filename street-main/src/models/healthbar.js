var Healthbar = new Phaser.Class({
    initialize: function Healthbar(scene, config) {
        this.cont = new Phaser.GameObjects.Graphics(scene);
        this.bg = new Phaser.GameObjects.Graphics(scene);
        this.trail = new Phaser.GameObjects.Graphics(scene);
        this.id = config.id;
        this.width = config.width;
        this.height = config.height;
        this.x = config.x;
        this.y = config.y;
        this.value = 0;
        this.color = null;
        this.gradient = null;
        this.flipped = config.flipped;
        this.flipX = this.flipped ? -1 : 1;
        this.contentx = this.flipped ? this.width + this.x : this.x;
        this.scene = scene;
        this.scene.add.existing(this.bg);
        this.scene.add.existing(this.trail);
        this.scene.add.existing(this.cont);
        this.showDamage = config.showDamage !== false;
        this.timeout_cfg = { delay: 2000, repeat: 99, callback: this.clearTrail, callbackScope: this };
        this.timeout = this.scene.time.addEvent(this.timeout_cfg);
        this.stun_cfg = { delay: 30, loop: true, paused: true, callback: this.autoDecrease, callbackScope: this };
        this.stuntimer = config.autoDecrease ? this.scene.time.addEvent(this.stun_cfg) : null;
        this.setColor();
        this.drawBackground();
        this.setPercent();
    },

    drawBackground: function() {
        this.bg.fillStyle(0x3f3f3f); // Graydddd
        this.bg.lineStyle(4, 0xffffff, 1);
        this.bg.strokeRect(this.x, this.y, this.width, this.height);
        this.bg.fillRect(this.x, this.y, this.width, this.height);
    },

    draw: function(width) {
        this.cont.clear();
        this.cont.fillStyle(this.color); // Content color
        this.cont.fillRect(this.contentx, this.y, width * this.flipX, this.height);
        this.cont.fillStyle(this.gradient); // Gradient color
        this.cont.fillRect(this.contentx, this.y, width * this.flipX, this.height / 2);
    },

    setColor: function(color = 0xD9B931, gradient = 0xedd161) { // Default to gold and yellow
        this.color = color;
        this.gradient = gradient;
    },

    setPercent: function(percent = 1000) {
        if (percent < 0) percent = 0;
        if (percent > 1000) percent = 1000;
        
        this.value = percent;
        var width = (percent / 1000) * this.width;
        this.draw(width);

        if (this.showDamage) this.showTrail();
    },

    autoDecrease: function() {
        if (this.value > 0) {
            var player = this.id === 'p1' ? this.scene.player1 : this.scene.player2;
            this.value = this.value <= 0 ? 0 : this.value - 1;
            var width = (this.value / 1000) * this.width;
            this.draw(width);
            player.stun = player.config.stun * this.value / 1000;
        }
    },

    getPercent: function() {
        return this.value;
    },

    showTrail: function() {
        this.oldWidth = (this.value / 1000) * this.width;
        this.trail.fillStyle(0xfc8387); // Red
        this.trail.fillRect(this.contentx, this.y, this.oldWidth * this.flipX, this.height);
        this.timeout.reset(this.timeout_cfg);
    },

    clearTrail: function() {
        this.trail.clear();
    }
});

export default Healthbar;
