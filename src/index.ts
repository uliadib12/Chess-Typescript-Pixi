import PIXI, { app } from "./util/PIXI"
import GameManager from "./util/GameManager";

let gameManager = GameManager.Instance
gameManager.buildGame()

document.body.appendChild(app.view)