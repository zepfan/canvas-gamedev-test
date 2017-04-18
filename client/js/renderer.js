import Level from './level';

let canvas,
	ctx;

class Renderer {
	constructor(canvasRef) {
		canvas = canvasRef;
		ctx = canvas.getContext('2d')

		// set some base styles
		canvas.style.backgroundColor = "#eee";
		canvas.style.border = "1px solid #aaa";
	}

	renderLevel(layer) {
		for (let column = 0; column < Level.columns; column++) {
			for (let row = 0; row < Level.rows; row++) {
				let tile = Level.getTile(layer, column, row);

				if(tile !== 0) renderTile(tile, column, row);
			}
		}

		function renderTile(tile, x, y) {
			let tileSheet = new Image();
			tileSheet.src = '../img/tiles.png';

			ctx.drawImage(
				tileSheet, // image
				(tile - 1) * Level.tileSize, // sprite x
				0, // sprite y
				Level.tileSize, // sprite width
				Level.tileSize, // sprite height
				x * Level.tileSize, // destination x
				y * Level.tileSize, // destination y
				Level.tileSize, // destination width
				Level.tileSize // destination height
			);
		}
	}
}

export default Renderer;