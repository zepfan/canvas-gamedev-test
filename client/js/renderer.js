import c from './constants';

/**
 * ===============================================================
 * Handles all of the game's rendering functions, fired off from
 * the main render() function in the mainLoop
 * ===============================================================
 */

let canvas,
	ctx;

class Renderer {

	/**
	 * ------------------------------------------------------------
	 * Construct the canvas to for the game
	 * 
	 * @param obj canvasRef [The main Level object]
	 * ------------------------------------------------------------
	 */

	constructor(canvasRef) {
		// define our primary game canvas
		canvas = canvasRef;
		ctx = canvas.getContext('2d')

		// set some base styles
		canvas.width = c.canvas.WIDTH;
		canvas.height = c.canvas.HEIGHT;
		canvas.style.backgroundColor = "#eee";
		canvas.style.border = "1px solid #aaa";
	}

	/**
	 * ------------------------------------------------------------
	 * Render the current level
	 * 
	 * @param obj level  [The main Level object]
	 * @param num layer  [The desired layer from the Level.map array]
	 * @param obj camera [A camera by which the level is rendered]
	 * ------------------------------------------------------------
	 */

	renderLevel(level, layer, camera) {
		let startCol, endCol, startRow, endRow, offsetX, offsetY;

		if(camera) {
			// establish what "slice" of the map to render based on camera location
			startCol = Math.floor(camera.x / level.tileSize);
			endCol = startCol + (camera.width / level.tileSize);
			startRow = Math.floor(camera.y / level.tileSize);
			endRow = startRow + (camera.height / level.tileSize);
			offsetX = -camera.x + startCol * level.tileSize;
			offsetY = -camera.y + startRow * level.tileSize;
		} else {
			// default to a basic rendering if no camera is present
			startCol = 0;
			endCol = level.columns;
			startRow = 0;
			endRow = level.rows;
			offsetX = 0;
			offsetY = 0;
		}

		// get the tile number for each index of our map array
		for(let col = startCol; col <= endCol; col++) {
			for(let row = startRow; row <= endRow; row++) {
				let tile = level.getTile(layer, col, row);
				let x = (col - startCol) * level.tileSize + offsetX;
				let y = (row - startRow) * level.tileSize + offsetY;

				// `0` represents an empty tile
				if(tile !== 0) renderTile(tile, x, y);
			}
		}

		// draw the tiles on the canvas
		function renderTile(tile, x, y) {
			let tileSheet = new Image();
			tileSheet.src = '../img/tiles.png';

			ctx.drawImage(
				tileSheet, // image
				(tile - 1) * level.tileSize, // sprite x
				0, // sprite y
				level.tileSize, // sprite width
				level.tileSize, // sprite height
				Math.round(x), // destination x
				Math.round(y), // destination y
				level.tileSize, // destination width
				level.tileSize // destination height
			);
		}
	}

	/**
	 * ------------------------------------------------------------
	 * Render the currently player
	 * 
	 * @param obj player [The main Player object]
	 * ------------------------------------------------------------
	 */

	renderPlayer(player) {
		let characterImg = new Image();
		characterImg.src = player.spriteSrc;

		ctx.drawImage(
			characterImg, 
			player.xPos, 
			player.yPos, 
			player.width, 
			player.height
		);
	}
}

export default Renderer;