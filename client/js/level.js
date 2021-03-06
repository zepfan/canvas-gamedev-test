/**
 * ===============================================================
 * The main 'Level' object for the game. Represents the 2d
 * map that makes up the world.
 * ===============================================================
 */

const Level = {
	tileSize: 50,
	columns: 32,
	rows: 20,
	// map: [[
	// 	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
	// 	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2
	// ], [
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	// ]],
	// columns: 16,
	// rows: 10,
	// map: [[
	// 	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
	// 	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
	// ], [
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// 	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	// ]],
	getTile: function(layer, col, row) {
		return this.map[layer][row * this.columns + col]
	}
}

export default Level;