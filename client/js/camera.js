/**
 * ===============================================================
 * Class for constructing and managing cameras
 * ===============================================================
 */

const cameraSpeed = 0.25;

class Camera {
	constructor(level, width, height) {
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.maxX = level.columns * level.tileSize - width;
		this.maxY = level.rows * level.tileSize - height;
		
		// bind methods to class
		this.move = this.move.bind(this);
	}

	move(delta, dirX, dirY) {
		// update the camera's cooridnates
		this.x += dirX * cameraSpeed * delta;
		this.y += dirY * cameraSpeed * delta;

		// clamp coorodinates
		this.x = Math.max(0, Math.min(this.x, this.maxX));
		this.y = Math.max(0, Math.min(this.y, this.maxY));
	}
}

export default Camera;