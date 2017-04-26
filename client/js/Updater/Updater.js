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
	 * @param obj level  [The current level]
	 * @param num delta  [Time difference between frames]
	 * @param obj keys   [Array of active user keyboard input]
	 * ------------------------------------------------------------
	 */

	updatePlayerPosition(player, level, delta, keys) {
		let dirX = 0,
			dirY = 0,
			playerX = player.screenX || player.x,
			playerY = player.screenY || player.y;

		if(keys[c.inputs.keyboard.LEFT] && playerX > 0) { dirX = -1; }
		if(keys[c.inputs.keyboard.RIGHT] && playerX < (c.canvas.WIDTH - player.width)) { dirX = 1; }
		if(keys[c.inputs.keyboard.UP] && playerY > 0) { dirY = -1; }
		if(keys[c.inputs.keyboard.DOWN] && playerY < (c.canvas.HEIGHT - player.height)) { dirY = 1; }

		player.move(delta, dirX, dirY, level.columns, level.rows, level.tileSize);
	}

	/**
	 * ------------------------------------------------------------
	 * Update a camera's position
	 * 
	 * @param obj camera [An instance of a Camera object]
	 * ------------------------------------------------------------
	 */

	updateCamera(camera) {
		camera.update();
	}
}

export default Updater;