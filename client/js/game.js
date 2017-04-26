// gameobjects
import Updater from './Updater/Updater';
import Renderer from './Renderer/Renderer';
import Player from './Player/Player';
import Camera from './Camera/Camera';

// objects
import Level from './Level/Level';

// user input
import keyboard from './Keyboard/Keyboard';

// util
import c from './util/constants';

/**
 * ===============================================================
 * Primary manager for the entire game
 * ===============================================================
 */

let timestep = 1000 / 60,
	timestepDelta = 0,
	lastFrameTimeMs = 0,
	renderer,
	updater,
	mainCamera,
	player,
	level;

class Game {
	constructor() {
		// bind methods to the class
		this.mainLoop = this.mainLoop.bind(this);
		this.update = this.update.bind(this);
		this.draw = this.draw.bind(this);
	}

	/**
	 * ------------------------------------------------------------
	 * Set up all of the game objects and fire off the mainLoop
	 * 
	 * @param obj canvas [The canvas object to pass to the renderer]
	 * ------------------------------------------------------------
	 */

	setUp(backgroundCanvas, entitiesCanvas, foregroundCanvas) {
		// create instances of our gameobjects
		renderer = new Renderer(backgroundCanvas, entitiesCanvas, foregroundCanvas);
		updater = new Updater();
		level = new Level();
		mainCamera = new Camera(level, c.canvas.WIDTH, c.canvas.HEIGHT);
		player = new Player(level);

		// set the following on the main camera
		mainCamera.follow(player);

		// add event listeners for keyboard input
		keyboard.listenForEvents([
			c.inputs.keyboard.LEFT,
			c.inputs.keyboard.UP,
			c.inputs.keyboard.RIGHT,
			c.inputs.keyboard.DOWN,
		]);

		// fire off the main loop
		requestAnimationFrame(this.mainLoop);
	}

	/**
	 * ------------------------------------------------------------
	 * Recursively fires off the update() and render() functions
	 * at regular intervals 
	 * 
	 * @param num timestamp [Timestamp provided by requestAnimationFrame]
	 * ------------------------------------------------------------
	 */

	mainLoop(timestamp) {
		// do some timing math that I don't understand
		timestepDelta = timestepDelta + timestamp - lastFrameTimeMs;
		lastFrameTimeMs = timestamp;

		while(timestepDelta >= timestep) {
			this.update(timestep);
			timestepDelta = timestepDelta - timestep;
		}

		// always call draw()
		this.draw();

		// recursively call mainLoop()
		requestAnimationFrame(this.mainLoop);
	}

	/**
	 * ------------------------------------------------------------
	 * Update the game state during each frame
	 * 
	 * @param num delta [Time difference between frame calls]
	 * ------------------------------------------------------------
	 */

	update(delta) {
		updater.updatePlayerPosition(player, level, delta, keyboard.keys);
		updater.updateCamera(mainCamera);
	}

	/**
	 * ------------------------------------------------------------
	 * Render visual elements during each frame
	 * ------------------------------------------------------------
	 */

	draw() {
		renderer.renderLevel(level, 0, mainCamera); // background layer
		renderer.renderPlayer(player); // player's character
		renderer.renderLevel(level, 1, mainCamera); // top layer

		renderer.drawGrid(level, mainCamera); // grid for debugging
	}
}

const game = new Game();

export default game;