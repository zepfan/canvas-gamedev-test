/**
 * --------------------------------------------------
 * Setting up the canvas
 * --------------------------------------------------
 */

let canvas = document.querySelector('#game'),
	CANVAS_WIDTH = canvas.offsetWidth,
	CANVAS_HEIGHT = canvas.offsetHeight,
	ctx = canvas.getContext('2d');

canvas.style.backgroundColor = "#eee";
canvas.style.border = "1px solid #aaa";


/**
 * --------------------------------------------------
 * Constant values used everywhere
 * --------------------------------------------------
 */

const consts = {
	keyboard: {
		'LEFT_ARROW': 37,
		'UP_ARROW': 38,
		'RIGHT_ARROW': 39,
		'DOWN_ARROW': 40,
	}
}


/**
 * --------------------------------------------------
 * Handle all user input
 * --------------------------------------------------
 */

let inputKeys = [];

['keyup', 'keydown'].forEach(v => {
	document.body.addEventListener(v, (e) => {
		if(e.type == 'keydown') inputKeys[e.keyCode] = true;
		if(e.type == 'keyup') inputKeys[e.keyCode] = false;
	});
});


/**
 * --------------------------------------------------
 * Define the Player object
 * --------------------------------------------------
 */

let Player = {
	color: 'red',
	height: 45,
	width: 45,
	xPos: 10,
	yPos: 10,
	speed: 5,
	draw: function() {
		let characterImg = new Image();
		characterImg.src = 'character.png'

		ctx.drawImage(characterImg, this.xPos, this.yPos, this.width, this.height);
	},
	updatePosition: function() {
		if(inputKeys[consts.keyboard.LEFT_ARROW] && Player.xPos > 0) Player.xPos -= Player.speed;
		if(inputKeys[consts.keyboard.UP_ARROW] && Player.yPos > 0) Player.yPos -= Player.speed;
		if(inputKeys[consts.keyboard.RIGHT_ARROW] && Player.xPos < CANVAS_WIDTH - Player.width) Player.xPos += Player.speed;
		if(inputKeys[consts.keyboard.DOWN_ARROW] && Player.yPos < CANVAS_HEIGHT - Player.height) Player.yPos += Player.speed;
	}
};


/**
 * --------------------------------------------------
 * Define the Map object
 * --------------------------------------------------
 */

let Level = {
	tileSize: 50,
	columns: 16,
	rows: 10,
	map: [[
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2
	], [
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	]],
	draw: function(layer) {
		for (let column = 0; column < this.columns; column++) {
			for (let row = 0; row < this.rows; row++) {
				let tile = this.getTile(layer, column, row);
				this.renderTile(tile, column, row);
			}
		}
	},
	getTile: function(layer, col, row) {
		return this.map[layer][row * this.columns + col]
	},
	renderTile: function(tile, x, y) {
		let tileSheet = new Image();
		tileSheet.src = 'tiles.png';

		ctx.drawImage(
			tileSheet, // image
			(tile - 1) * this.tileSize, // sprite x
			0, // sprite y
			this.tileSize, // sprite width
			this.tileSize, // sprite height
			x * this.tileSize, // destination x
			y * this.tileSize, // destination y
			this.tileSize, // destination width
			this.tileSize // destination height
		);
	}
}

/**
 * --------------------------------------------------
 * The main game loop
 * --------------------------------------------------
 */

let timestep = 1000 / 60,
	timestepDelta = 0,
	lastFrameTimeMs = 0;

function gameLoop(timestamp) {
	timestepDelta += timestamp - lastFrameTimeMs;
	lastFrameTimeMs = timestamp;

	while (timestepDelta >= timestep) {
		update(timestep);
		timestepDelta -= timestep;
	}

	draw();

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

/* Update the game's state ------------- */
function update() {
	Player.updatePosition();
}

/* Render any changes ------------- */
function draw() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	Level.draw(0); // background layer
	Player.draw(); // character layer
	Level.draw(1); // other layer ??
}