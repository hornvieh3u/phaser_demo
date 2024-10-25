import Match from "../functions/match";
//Hud, match
var hudscene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function hudScene() {
			Phaser.Scene.call(this, { key: 'hudscene', active: false });
	},
	preload: function () {

		this.player1 = this.scene.get('mainscene').player1;
this.player2 = this.scene.get('mainscene').player2;
	},
	create: function (result) {
		this.match = new Match(this, result)
	},
	update: function () {
		this.match.ended? this.match.end() : this.match.start()
	}
});

export default hudscene;