import c from '../util/constants';

/**
 * ===============================================================
 * Handles all of the game's state changes, fired off from the
 * main update() function in the mainLoop
 * ===============================================================
 */

class Updater {

	/**
	 * ------------------------------------------------------------
	 * Update the active player's current position
	 * 
	 * @param obj player [The main Player gameobject]
	 * @param obj keys   [Array of active user keyboard input]
	 * ------------------------------------------------------------
	 */

	updatePlayerPosition(player, keys) {
		if(checkDirection('left')) {
			player.x -= player.speed;
		}

		if(checkDirection('right')) {
			player.x += player.speed
		}

		if(checkDirection('up')) {
			player.y -= player.speed
		}

		if(checkDirection('down')) {
			player.y += player.speed;
		}

		// just doing this outside of the conditionals for cleanliness
		function checkDirection(direction) {
			switch(direction) {
				case 'left':
					return keys[c.inputs.keyboard.LEFT] 
						&& player.x > 0;
					break;
				case 'right':
					return keys[c.inputs.keyboard.RIGHT] 
						&& player.x < (c.canvas.WIDTH - player.width)
					break;
				case 'up':
					return keys[c.inputs.keyboard.UP] 
						&& player.y > 0;
					break;
				case 'down':
					return keys[c.inputs.keyboard.DOWN] 
						&& player.y < (c.canvas.HEIGHT - player.height);
					break;
				default:
					break;
			}
		}
	}

	/**
	 * ------------------------------------------------------------
	 * Update a camera's position
	 * 
	 * @param obj camera [An instance of a Camera object]
	 * @param num delta  [Time difference between frames]
	 * @param obj keys   [Array of active user keyboard input]
	 * ------------------------------------------------------------
	 */

	updateCamera(camera, delta, keys) {
		let dirX = 0,
			dirY = 0;

		if(keys[c.inputs.keyboard.LEFT]) dirX = -1;
		if(keys[c.inputs.keyboard.RIGHT]) dirX = 1;
		if(keys[c.inputs.keyboard.UP]) dirY = -1;
		if(keys[c.inputs.keyboard.DOWN]) dirY = 1;

		camera.move(delta, dirX, dirY);
	}


	updatePlayerPosition2(player, delta, keys) {
		let dirX = 0,
			dirY = 0;

		if(keys[c.inputs.keyboard.LEFT] && player.screenX > 0) {
			dirX = -1;
		}

		if(keys[c.inputs.keyboard.RIGHT] && player.screenX < (c.canvas.WIDTH - player.width)) {
			dirX = 1;
		}

		if(keys[c.inputs.keyboard.UP] && player.screenY > 0) {
			dirY = -1;
		}

		if(keys[c.inputs.keyboard.DOWN] && player.screenY < (c.canvas.HEIGHT - player.height)) {
			dirY = 1;
		}

		player.move(delta, dirX, dirY);
	}

	updateCamera2(camera) {
		camera.update();
	}
}

export default Updater;