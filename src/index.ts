import PIXI, { app } from "./util/PIXI"
import GameManager from "./util/GameManager";

let gameManager = GameManager.Instance
gameManager.buildGame()
console.log(app.view.width)

document.body.appendChild(app.view)