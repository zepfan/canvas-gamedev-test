// classes
import Updater from './updater';
import Renderer from './renderer';
import Camera from './camera';

// objects
import Level from './level';
import Player from './player';

// user input
import keyboard from './keyboard';

// util
import c from './constants';

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
	mainCamera;

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

	setUp(canvas) {
		// create instances of our game objects
		renderer = new Renderer(canvas);
		updater = new Updater();
		mainCamera = new Camera(Level, c.canvas.WIDTH, c.canvas.HEIGHT);

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
		// updater.updateCamera(mainCamera, delta, keyboard.keys);
		// updater.updatePlayerPosition(Player, keyboard.keys);
	}

	/**
	 * ------------------------------------------------------------
	 * Render visual elements during each frame
	 * ------------------------------------------------------------
	 */

	draw() {
		// renderer.renderLevel(Level, 0); // background layer
		renderer.renderPlayer(Player); // player's character
		// renderer.renderLevel(Level, 1); // top layer
	}
}

const game = new Game();

export default game;