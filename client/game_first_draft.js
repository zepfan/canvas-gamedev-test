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

 var Keyboard = {};

 Keyboard.LEFT = 37;
 Keyboard.RIGHT = 39;
 Keyboard.UP = 38;
 Keyboard.DOWN = 40;

 Keyboard._keys = {};

 Keyboard.listenForEvents = function (keys) {
     window.addEventListener('keydown', this._onKeyDown.bind(this));
     window.addEventListener('keyup', this._onKeyUp.bind(this));

     keys.forEach(function (key) {
         this._keys[key] = false;
     }.bind(this));
 }

 Keyboard._onKeyDown = function (event) {
     var keyCode = event.keyCode;
     if (keyCode in this._keys) {
         event.preventDefault();
         this._keys[keyCode] = true;
     }
 };

 Keyboard._onKeyUp = function (event) {
     var keyCode = event.keyCode;
     if (keyCode in this._keys) {
         event.preventDefault();
         this._keys[keyCode] = false;
     }
 };

 Keyboard.isDown = function (keyCode) {
     if (!keyCode in this._keys) {
         throw new Error('Keycode ' + keyCode + ' is not being listened to');
     }
     return this._keys[keyCode];
 }

Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);

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
		characterImg.src = './img/character.png'

		ctx.drawImage(characterImg, this.xPos, this.yPos, this.width, this.height);
	},
	updatePosition: function() {
		// if(inputKeys[consts.keyboard.LEFT_ARROW] && Player.xPos > 0) Player.xPos -= Player.speed;
		// if(inputKeys[consts.keyboard.UP_ARROW] && Player.yPos > 0) Player.yPos -= Player.speed;
		// if(inputKeys[consts.keyboard.RIGHT_ARROW] && Player.xPos < CANVAS_WIDTH - Player.width) Player.xPos += Player.speed;
		// if(inputKeys[consts.keyboard.DOWN_ARROW] && Player.yPos < CANVAS_HEIGHT - Player.height) Player.yPos += Player.speed;
	}
};


/**
 * --------------------------------------------------
 * Define the Map object
 * --------------------------------------------------
 */

let Level = {
	tileSize: 50,
	columns: 32,
	rows: 20,
	map: [[
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2
	], [
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,3,5,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	]],
	draw: function(layer) {
		var startCol = Math.floor(mainCamera.x / this.tileSize);
		var endCol = startCol + (mainCamera.width / this.tileSize);
		var startRow = Math.floor(mainCamera.y / this.tileSize);
		var endRow = startRow + (mainCamera.height / this.tileSize);
		var offsetX = -mainCamera.x + startCol * this.tileSize;
		var offsetY = -mainCamera.y + startRow * this.tileSize;

		for (var column = startCol; column <= endCol; column++) {
			for (var row = startRow; row <= endRow; row++) {
				let tile = this.getTile(layer, column, row);
				var x = (column - startCol) * this.tileSize + offsetX;
				var y = (row - startRow) * this.tileSize + offsetY;

				if(tile !== 0) {
					this.renderTile(tile, x, y);
				}
			}
		}
	},
	getTile: function(layer, col, row) {
		return this.map[layer][row * this.columns + col]
	},
	isSolidTileAtXY: function (x, y) {
        var col = Math.floor(x / this.tileSize);
        var row = Math.floor(y / this.tileSize);

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.map.reduce(function (res, layer, index) {
            var tile = this.getTile(index, col, row);
            var isSolid = tile === 3 || tile === 5;
            return res || isSolid;
        }.bind(this), false);
    },
    getCol: function (x) {
        return Math.floor(x / this.tileSize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tileSize);
    },
    getX: function (col) {
        return col * this.tileSize;
    },
    getY: function (row) {
        return row * this.tileSize;
    },
	renderTile: function(tile, x, y) {
		let tileSheet = new Image();
		tileSheet.src = './img/tiles.png';

		ctx.drawImage(
			tileSheet, // image
			(tile - 1) * this.tileSize, // sprite x
			0, // sprite y
			this.tileSize, // sprite width
			this.tileSize, // sprite height
			Math.round(x), // destination x
			Math.round(y), // destination y
			this.tileSize, // destination width
			this.tileSize // destination height
		);
	}
}


/**
 * --------------------------------------------------
 * Define the Camera object
 * --------------------------------------------------
 */

function Camera(map, width, height) {
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.maxX = map.columns * map.tileSize - width;
	this.maxY = map.rows * map.tileSize - height;
}

Camera.SPEED = 0.2; // pixels per second

Camera.prototype.move = function (delta, dirx, diry) {
	// move camera
	this.x += dirx * Camera.SPEED * delta;
	this.y += diry * Camera.SPEED * delta;

	// clamp values
	this.x = Math.max(0, Math.min(this.x, this.maxX));
	this.y = Math.max(0, Math.min(this.y, this.maxY));
};

let mainCamera = new Camera(Level, 800, 500);

function updateCamera(delta) {
	var dirx = 0;
	var diry = 0;

	if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
	if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
	if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
	if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

	mainCamera.move(delta, dirx, diry);
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
function update(delta) {
	// Player.updatePosition();
	updateCamera(delta);
}

/* Render any changes ------------- */
function draw() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	Level.draw(0); // background layer
	// Player.draw(); // character layer
	Level.draw(1); // other layer ??
}