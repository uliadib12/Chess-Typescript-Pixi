import PIXI, { app } from "./util/PIXI"
import Pawn from "./chess/pawn"
import GameManager from "./util/GameManager";

document.body.appendChild(app.view);

let gameManager = new GameManager();

gameManager.buildGame()