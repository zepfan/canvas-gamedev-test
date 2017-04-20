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
		this.speed = 5;
		this.xPos = 10;
		this.yPos = 10;
		this.spriteSrc = './img/character.png';
	}
};

export default Player;