import { Pos } from "../util/interface";
import PIXI from "../util/PIXI";
import Pawn from "./Pawn";

export class Queen extends Pawn {
    constructor(id: number, positon: Pos, playerNumber: 1 | 2, textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_queen_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite);
    }

    getMove(): Pos[] {
        let newPos : Pos[] = []

        for (let i = 1; i <= 8; i++) {
            newPos.push({x: this.position.x + i, y: this.position.y})
            newPos.push({x: this.position.x, y: this.position.y + i})
            newPos.push({x: this.position.x - i , y: this.position.y})
            newPos.push({x: this.position.x, y: this.position.y - i})
            
            newPos.push({x: this.position.x + i, y: this.position.y + i})
            newPos.push({x: this.position.x + i, y: this.position.y - i})
            newPos.push({x: this.position.x - i , y: this.position.y - i})
            newPos.push({x: this.position.x - i, y: this.position.y + i})
        }

        newPos = super.solveBoundary(newPos)
        return newPos
    }
}