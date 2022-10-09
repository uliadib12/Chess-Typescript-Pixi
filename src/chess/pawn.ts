import GameManager from "../util/GameManager";
import { Pos } from "../util/interface";
import PIXI, { app } from "../util/PIXI";
import Player from "../util/Player";
import Pieces from "./Pieces";
import Base from "./Pieces";

export default class Pawn extends Pieces{
    private isFirstMove: boolean = true
    
    constructor(id: number, positon: Pos, playerNumber: 1 | 2 , textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite)
    }
    
    setPositon(newPositon: Pos): void {
        if(this.isFirstMove) this.isFirstMove = false
        this.position = newPositon
        this.moveSprite(newPositon)
    }
    
    getMove(): Pos[] {
        let newPos : Pos[] = []
        for (let i = 1; i <= (this.isFirstMove ? 2 : 1); i++) {
            if(this.playerNumber == 1){
                newPos.push({x: this.position.x , y: this.position.y + i})
            }
            else{
                newPos.push({x: this.position.x , y: this.position.y - i})
            }
        }

        newPos = super.solveBoundary(newPos)
        return newPos
    }
}