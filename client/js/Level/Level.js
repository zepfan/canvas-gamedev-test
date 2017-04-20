import LevelData from './LevelData';

/**
 * ===============================================================
 * The main 'Level' manager for the game. Represents the 2d
 * map that makes up the world.
 * ===============================================================
 */

class Level {
	constructor() {
		this.spritesheet = '../img/tiles.png';
		this.tileSize = 50;
		this.columns = 32;
		this.rows = 20;
		this.map = LevelData.level_1.map;
	}

	getTile(layer, col, row) {
		return this.map[layer][row * this.columns + col]
	}

	isSolidTile(x, y) {
		let col = Math.floor(x / this.tileSize);
		let row = Math.floor(y / this.tileSize);

		return this.map.reduce(function(res, layer, index) {
			let tile = this.getTile(index, col, row);
			let isSolid = tile === 3 || tile === 5;

			return res || isSolid;
		}.bind(this), false);
	}

	getCol(x) {
		return Math.floor(x / this.tileSize);
	}

	getRow(y) {
		return Math.floor(y / this.tileSize);
	}

	getX(col) {
		return col * this.tileSize;
	}

	getY(row) {
		return row * this.tileSize;
	}
}


export default Level;