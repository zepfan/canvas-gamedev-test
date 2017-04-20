/**
 * ===============================================================
 * The main `Player` manager for the game. Represents the 'hero' 
 * the active user is controlling.
 * ===============================================================
 */

class Player {
	constructor() {
		this.height = 45;
		this.width = 45;

		this.x = 50;
		this.y = 50;

		this.speed = 0.3;

		this.spriteSrc = './img/character.png';
	}

	move(delta, dirX, dirY) {
		this.x += dirX * this.speed * delta;
		this.y += dirY * this.speed * delta;

		// clamp coordinates
		let maxX = 32 * 50;
		let maxY = 20 * 50;
		this.x = Math.max(0, Math.min(this.x, maxX));
		this.y = Math.max(0, Math.min(this.y, maxY));
	}
};

export default Player;