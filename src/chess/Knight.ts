import { Pos } from "../util/interface";
import PIXI from "../util/PIXI";
import Pawn from "./Pawn";

export class Knight extends Pawn{
    constructor(id: number, positon: Pos, playerNumber: 1 | 2, textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_knight_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite);
    }

    getMove(): Pos[] {
        let newPos : Pos[] = []

        newPos.push({x: this.position.x + 1, y: this.position.y + 2})
        newPos.push({x: this.position.x + 1, y: this.position.y - 2})
        newPos.push({x: this.position.x - 1, y: this.position.y + 2})
        newPos.push({x: this.position.x - 1, y: this.position.y - 2})
        newPos.push({x: this.position.x + 2, y: this.position.y + 1})
        newPos.push({x: this.position.x + 2, y: this.position.y - 1})
        newPos.push({x: this.position.x - 2, y: this.position.y + 1})
        newPos.push({x: this.position.x - 2, y: this.position.y - 1})
        

        newPos = super.solveBoundary(newPos)
        return newPos
    }
}