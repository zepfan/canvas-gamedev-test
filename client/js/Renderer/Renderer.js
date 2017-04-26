import c from '../util/constants';

/**
 * ===============================================================
 * Handles all of the game's rendering functions, fired off from
 * the main render() function in the mainLoop
 * ===============================================================
 */

const characterImg = new Image(),
	tileSheet = new Image();

let backgroundCanvas,
	backgroundCtx,
	entitiesCanvas,
	entitiesCtx,
	foregroundCanvas,
	foregroundCtx;

class Renderer {

	/**
	 * ------------------------------------------------------------
	 * Construct the canvases to for the game
	 * 
	 * @param obj backgroundCanvasRef [The main background canvas]
	 * @param obj entitiesCanvasRef   [The main entities canvas]
	 * @param obj foregroundCanvasRef [The main foreground canvas]
	 * ------------------------------------------------------------
	 */

	constructor(backgroundCanvasRef, entitiesCanvasRef, foregroundCanvasRef) {
		// define the background canvas
		backgroundCanvas = backgroundCanvasRef;
		backgroundCtx = backgroundCanvas.getContext('2d');

		// define the entities canvas
		entitiesCanvas = entitiesCanvasRef;
		entitiesCtx = entitiesCanvas.getContext('2d');

		// define the foreground canvas
		foregroundCanvas = foregroundCanvasRef;
		foregroundCtx = foregroundCanvas.getContext('2d');

		// set some base styles
		backgroundCanvas.width = entitiesCanvas.width = foregroundCanvas.width = c.canvas.WIDTH;
		backgroundCanvas.height = entitiesCanvas.height = foregroundCanvas.height = c.canvas.HEIGHT;
		backgroundCanvas.style.backgroundColor = "#eee";
		backgroundCanvas.style.border = "1px solid #aaa";
	}

	/**
	 * ------------------------------------------------------------
	 * Return the rendering contexts if needed elsewhere
	 * ------------------------------------------------------------
	 */

	getBackgroundContext() {
		return backgroundCtx;
	}

	getEntitiesContext() {
		return entitiesCtx;
	}

	getForegroundContext() {
		return foregroundCtx;
	}

	/**
	 * ------------------------------------------------------------
	 * Render the currently player
	 * 
	 * @param obj player [The main player object]
	 * ------------------------------------------------------------
	 */

	renderPlayer(player) {
		entitiesCtx.clearRect(0, 0, c.canvas.WIDTH, c.canvas.HEIGHT);
		characterImg.src = player.spriteSrc;

		entitiesCtx.drawImage(
			characterImg, 
			player.screenX || player.x,
			player.screenY || player.y, 
			player.width, 
			player.height
		);
	}

	/**
	 * ------------------------------------------------------------
	 * Render the current level
	 * 
	 * @param obj level  [The main level object]
	 * @param num layer  [The desired layer from the level.map array]
	 * @param obj camera [A camera following the player]
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
			// default to a straight forward render if no camera is present
			startCol = 0;
			endCol = c.canvas.WIDTH / level.columns;
			startRow = 0;
			endRow = c.canvas.HEIGHT / level.columns;
			offsetX = 0;
			offsetY = 0;
		}

		// get the tile number for each index of our map array
		for(let col = startCol; col <= endCol; col++) {
			for(let row = startRow; row <= endRow; row++) {
				let tile = level.getTile(layer, col, row),
					x = (col - startCol) * level.tileSize + offsetX,
					y = (row - startRow) * level.tileSize + offsetY;

				// `0` represents an empty tile
				if(tile !== 0) renderTile(tile, x, y);
			}
		}

		// draw the tiles on the canvas
		function renderTile(tile, x, y) {
			let ctx = layer === 0 ? backgroundCtx : foregroundCtx;
			tileSheet.src = level.spritesheet;

			foregroundCtx.clearRect(x, y, c.canvas.WIDTH, c.canvas.HEIGHT);

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
	 * Draw grid around each tile of the map (used for debugging)
	 *
	 * @param obj level  [The main level object]
	 * @param obj camera [A camera following the player]
	 * ------------------------------------------------------------
	 */
	
	drawGrid(level, camera) {
		let width = level.columns * level.tileSize,
			height = level.rows * level.tileSize,
			x,
			y;

		for(let r = 0; r < level.rows; r++) {
			x = - camera.x;
			y = r * level.tileSize - camera.y;
			foregroundCtx.beginPath();
			foregroundCtx.moveTo(x, y);
			foregroundCtx.lineTo(width, y);
			foregroundCtx.stroke();
		}

		for(let c = 0; c < level.columns; c++) {
			x = c * level.tileSize - camera.x;
			y = - camera.y;
			foregroundCtx.beginPath();
			foregroundCtx.moveTo(x, y);
			foregroundCtx.lineTo(x, height);
			foregroundCtx.stroke();
		}
	}
}

export default Renderer;