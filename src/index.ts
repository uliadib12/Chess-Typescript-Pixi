import { app } from "./util/PIXI"
import { Board } from "./chess/board";

document.body.appendChild(app.view);
new Board().draw()