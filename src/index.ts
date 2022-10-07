import PIXI, { app } from "./util/PIXI"
import GameManager from "./util/GameManager";

let gameManager = new GameManager();
gameManager.buildGame()

document.body.appendChild(app.view);