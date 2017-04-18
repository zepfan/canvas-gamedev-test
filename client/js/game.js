import Renderer from './renderer';

let timestep = 1000 / 60,
	timestepDelta = 0,
	lastFrameTimeMs = 0,
	renderer;

class Game {
	constructor() {
		this.mainLoop = this.mainLoop.bind(this);
		this.update = this.update.bind(this);
		this.draw = this.draw.bind(this);
	}

	setUp(canvas) {
		renderer = new Renderer(canvas);
		this.mainLoop();
	}

	mainLoop(timestamp) {
		timestepDelta += timestamp - lastFrameTimeMs;
		lastFrameTimeMs = timestamp;

		while (timestepDelta >= timestep) {
			this.update(_timestep);
			timestepDelta -= timestep;
		}

		this.draw();

		requestAnimationFrame(this.mainLoop);
	}

	update() {
		// do something
	}

	draw() {
		renderer.renderLevel(0); // background layer
		renderer.renderLevel(1); // top layer
	}
}

const game = new Game();
export default game;