/**
 * ===============================================================
 * Class for managing the user's input via the keyboard
 * ===============================================================
 */

class Keyboard {
	constructor() {
		this.keys = {};

		// bind methods to the class
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	/**
	 * ------------------------------------------------------------
	 * Adds the event listeners for user's keyboard input
	 * 
	 * @param arr keys [An array of numbers representing key codes]
	 * ------------------------------------------------------------
	 */

	listenForEvents(keys) {
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);

		// build the `this.keys` object
		keys.forEach(key => {
			this.keys[key] = false;
		});
	}

	/**
	 * ------------------------------------------------------------
	 * handleKeyDown & handleKeyUp sets whether a key is currently
	 * being pressed or not (by toggling it in `this.keys`)
	 * 
	 * @param obj e [The event object from an event listener]
	 * ------------------------------------------------------------
	 */

	handleKeyDown(e) {
		let keyCode = e.keyCode;

		if(keyCode in this.keys) {
			e.preventDefault();
			this.keys[keyCode] = true;
		}
	}

	handleKeyUp(e) {
		let keyCode = e.keyCode;

		if(keyCode in this.keys) {
			e.preventDefault();
			this.keys[keyCode] = false;
		}
	}
}

const keyboard = new Keyboard;

export default keyboard;