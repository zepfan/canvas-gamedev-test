/**
 * ===============================================================
 * The main `Player` manager for the game. Represents the 'hero' 
 * the active user is controlling.
 * ===============================================================
 */

class Player {

	/**
	 * ------------------------------------------------------------
	 * Construct the main Player object
	 *
	 * @param obj level [The main level object]
	 * ------------------------------------------------------------
	 */

	constructor(level) {
		this.x = 50;
		this.y = 50;

		this.height = 45;
		this.width = 45;
		this.spriteSrc = './img/character.png';

		this.speed = 0.15;

		this.map = level;
	}

	/**
	 * ------------------------------------------------------------
	 * Move the player around the map
	 *
	 * @param num delta    [Time difference between frames]
	 * @param num dirX     [Direction the character is moving on X axis]
	 * @param num dirY     [Direction the character is moving on Y axis]
	 * @param num cols     [Number of columns of current level]
	 * @param num rows     [Number of rows of current level]
	 * @param num tileSize [Size of the level's tiles]
	 * ------------------------------------------------------------
	 */

	move(delta, dirX, dirY, cols, rows, tileSize) {
		let maxX = cols * tileSize - this.width,
			maxY = rows * tileSize - this.height;

		// update player's position
		this.x += dirX * this.speed * delta;
		this.y += dirY * this.speed * delta;

		// check collision
		this._collide(dirX, dirY);

		// stop coordinates from extending outside of the map
		this.x = Math.max(0, Math.min(this.x, maxX));
		this.y = Math.max(0, Math.min(this.y, maxY));
	}

	/**
	 * ------------------------------------------------------------
	 * Check if the tile the player is on is unpassable
	 *
	 * @param num dirX [Direction the character is moving on X axis]
	 * @param num dirY [Direction the character is moving on Y axis]
	 * ------------------------------------------------------------
	 */
	
	_collide(dirX, dirY) {
		let row,
			col,
			collision,
			left = this.x - this.width / 2,
			right = this.x + this.width / 2 - 1,
			top = this.y - this.height / 2,
			bottom = this.y + this.height / 2 - 1;

		// check if current tile is impassable
		collision = this.map.isSolidTile(left, top) ||
			this.map.isSolidTile(right, top) ||
			this.map.isSolidTile(right, bottom) ||
			this.map.isSolidTile(left, bottom);

		if(!collision) { return false; }

		// if it is impassable...
		if (dirY > 0) {
			row = this.map.getRow(bottom);
			this.y = -this.height / 2 + this.map.getY(row);
		} else if (dirY < 0) {
			row = this.map.getRow(top);
			this.y = this.height / 2 + this.map.getY(row + 1);
		} else if (dirX > 0) {
			col = this.map.getCol(right);
			this.x = -this.width / 2 + this.map.getX(col);
		} else if (dirX < 0) {
			col = this.map.getCol(left);
			this.x = this.width / 2 + this.map.getX(col + 1);
		}
	}
};

export default Player;