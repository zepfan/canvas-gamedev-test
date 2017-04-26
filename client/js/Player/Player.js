/**
 * ===============================================================
 * The main `Player` manager for the game. Represents the 'hero' 
 * the active user is controlling.
 * ===============================================================
 */

class Player {
	constructor(level) {
		this.height = 45;
		this.width = 45;
		this.map = level;

		this.x = 50;
		this.y = 50;

		this.speed = 0.15;

		this.spriteSrc = './img/character.png';
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
		this.x += dirX * this.speed * delta;
		this.y += dirY * this.speed * delta;

		// check collision
		this._collide(dirX, dirY);

		// clamp coordinates
		let maxX = cols * tileSize - this.width;
		let maxY = rows * tileSize - this.height;
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
			left = this.x - this.width / 2,
			right = this.x + this.width / 2 - 1,
			top = this.y - this.height / 2,
			bottom = this.y + this.height / 2 - 1;

		let collision = this.map.isSolidTile(left, top) ||
			this.map.isSolidTile(right, top) ||
			this.map.isSolidTile(right, bottom) ||
			this.map.isSolidTile(left, bottom);

		if(!collision) { return false; }

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