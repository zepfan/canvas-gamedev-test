import game from './js/game';

/**
 * ===============================================================
 * Entry point for the game
 * ===============================================================
 */

const backgroundCanvas = document.querySelector('#background');
const entitiesCanvas = document.querySelector('#entities');
const foregroundCanvas = document.querySelector('#foreground');

game.setUp(backgroundCanvas, entitiesCanvas, foregroundCanvas);