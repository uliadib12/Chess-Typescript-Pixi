import { Pos } from "../util/interface";
import PIXI from "../util/PIXI";
import Pawn from "./Pawn";
import Pieces from "./Pieces";
import { Queen } from "./Queen";

export class King extends Queen{
    constructor(id: number, positon: Pos, playerNumber: 1 | 2, textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_king_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite);
        this.type = "king"
    }

    getMove(): Pos[] {
        let newPos : Pos[] = []

        newPos.push({x: this.position.x + 1, y: this.position.y})
        newPos.push({x: this.position.x, y: this.position.y + 1})
        newPos.push({x: this.position.x - 1 , y: this.position.y})
        newPos.push({x: this.position.x, y: this.position.y - 1})
        
        newPos.push({x: this.position.x + 1, y: this.position.y + 1})
        newPos.push({x: this.position.x + 1, y: this.position.y - 1})
        newPos.push({x: this.position.x - 1 , y: this.position.y - 1})
        newPos.push({x: this.position.x - 1, y: this.position.y + 1})

        newPos = super.solveBoundary(newPos)
        newPos = this.solveBlocked(newPos)
        newPos = super.solveBoundary(newPos)

        return newPos
    }
}