import GameManager from "../util/GameManager";
import { Pos } from "../util/interface";
import PIXI from "../util/PIXI";
import Pawn from "./Pawn";
import Pieces from "./Pieces";

export class Knight extends Pieces{
    constructor(id: number, positon: Pos, playerNumber: 1 | 2, textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_knight_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite);
    }

    protected solveBlocked(position: Pos[]): Pos[] {
        let newPos: Pos[] = []
        let allPieces: Pos[]

        if(this.playerNumber == 1){
            allPieces = GameManager.Instance.getAllPiecesPosition().playerOne 
        }
        else{
            allPieces = GameManager.Instance.getAllPiecesPosition().playerTwo
        }

        let blockPieces: Pos[] = []
        position.forEach((pos)=>{
            allPieces.forEach((pieces)=>{
                if(pos.x == pieces.x && pos.y == pieces.y){
                    blockPieces.push(pos)
                }
            })
        })

        console.log(blockPieces)
        console.log(position)

        if(blockPieces.length){
            position.forEach((pos)=>{
                let found = false
                blockPieces.forEach((block)=>{
                    if(pos.x == block.x && pos.y == block.y){
                        found = true
                    }
                })
                if(!found){
                    newPos.push(pos)
                }
            })
        }
        else{
            position.forEach((pos)=>{
                newPos.push(pos)
            })
        }

        return newPos
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
        newPos = this.solveBlocked(newPos)
        newPos = super.solveBoundary(newPos)

        return newPos
    }
}