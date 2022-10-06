import PIXI, { app } from "./util/PIXI"
import Board from "./chess/board";
import Pawn from "./chess/pawn";

const TILE_XY_COUNT = 8;

document.body.appendChild(app.view);
new Board().draw()
let pawns : Pawn[] = []
for (let i = 1; i <= TILE_XY_COUNT; i++) {
    let pawn = new Pawn({id: i, type: "pawn"} ,{x: i, y: 2})
    const pawnSprite = PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png');
    pawnSprite.x = (pawn.position.x - 1) * (pawnSprite.width * 75)
    pawnSprite.y = (pawn.position.y - 1) * (pawnSprite.height * 75)
    pawnSprite.anchor._x -= 0.15
    pawnSprite.anchor._y -= 0.05
    const scale = 0.55
    pawnSprite.scale = new PIXI.Point(scale, scale)
    app.stage.addChild(pawnSprite)
    pawns.push(pawn)
}