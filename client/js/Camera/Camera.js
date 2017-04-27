/**
 * ===============================================================
 * Class for constructing and managing cameras
 * ===============================================================
 */

class Camera {

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	constructor(level, width, height) {
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.maxX = level.columns * level.tileSize - width;
		this.maxY = level.rows * level.tileSize - height;
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	follow(sprite) {
		this.following = sprite;
		sprite.screenX = 0;
		sprite.screenY = 0;
	}

	/**
	 * ------------------------------------------------------------
	 *
	 * ------------------------------------------------------------
	 */
	
	update() {
		// assume the sprite will be centered most of the time
		this.following.screenX = this.width / 2;
		this.following.screenY = this.height / 2;

		// make the camera follow the sprite
		this.x = this.following.x - this.width / 2;
		this.y = this.following.y - this.height / 2;

		// clamp coordinates
		this.x = Math.max(0, Math.min(this.x, this.maxX));
		this.y = Math.max(0, Math.min(this.y, this.maxY));

		// change behavior if sprite is in a corner of the level
		if(this.following.x < this.width / 2 || this.following.x > this.maxX + this.width / 2) {
			this.following.screenX = this.following.x - this.x;
		}
		
		if(this.following.y < this.height / 2 || this.following.y > this.maxY + this.height / 2) {
		    this.following.screenY = this.following.y - this.y;
		}
	}
}

// const cameraSpeed = 0.25;

// move(delta, dirX, dirY) {
// 	// update the camera's cooridnates
// 	this.x += dirX * cameraSpeed * delta;
// 	this.y += dirY * cameraSpeed * delta;

// 	// clamp coorodinates
// 	this.x = Math.max(0, Math.min(this.x, this.maxX));
// 	this.y = Math.max(0, Math.min(this.y, this.maxY));
// }

export default Camera;