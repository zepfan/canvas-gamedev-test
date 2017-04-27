import LevelData from './LevelData';

/**
 * ===============================================================
 * The main 'Level' manager for the game. Represents the 2d
 * map that makes up the world.
 * ===============================================================
 */

class Level {

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	constructor() {
		this.tileSize = LevelData.level_1.tileSize;
		this.columns = LevelData.level_1.columns;
		this.rows = LevelData.level_1.rows;
		this.map = LevelData.level_1.map;
		this.spritesheet = LevelData.level_1.spriteSheet;
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */

	getTile(layer, col, row) {
		return this.map[layer][row * this.columns + col]
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	isSolidTile(x, y) {
		let col = Math.floor(x / this.tileSize),
			row = Math.floor(y / this.tileSize);

		return this.map.reduce(function(res, layer, index) {
			let tile = this.getTile(index, col, row),
				isSolid = tile === 3 || tile === 5;

			return res || isSolid;
		}.bind(this), false);
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	getCol(x) {
		return Math.floor(x / this.tileSize);
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	getRow(y) {
		return Math.floor(y / this.tileSize);
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	getX(col) {
		return col * this.tileSize;
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	getY(row) {
		return row * this.tileSize;
	}
}


export default Level;