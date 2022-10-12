import GameManager from "../util/GameManager";
import { Pos } from "../util/interface";
import PIXI, { app } from "../util/PIXI";
import Player from "../util/Player";
import Pieces from "./Pieces";

export default class Pawn extends Pieces{
    private isFirstMove: boolean = true
    
    constructor(id: number, positon: Pos, playerNumber: 1 | 2 , textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite)
        this.type = "pawn"
    }
    
    setPositon(newPositon: Pos): void {
        if(this.isFirstMove) this.isFirstMove = false
        this.position = newPositon
        this.moveSprite(newPositon)
    }

    solveBlocked(positon: Pos[]): Pos[]{
        let newPos: Pos[] = []
        let allPieces: Pos[] = GameManager.Instance.getAllPiecesPosition().playerOne.concat(GameManager.Instance.getAllPiecesPosition().playerTwo)

        let blockPieces: Pos[] = []
        positon.forEach((pos)=>{
            allPieces.forEach((position)=>{
                if(pos.x == position.x && pos.y == position.y){
                    blockPieces.push(pos)
                }
            })
        })

        if(blockPieces.length){
            positon.forEach((pos)=>{
                if(this.playerNumber == 1){
                    if(pos.y < blockPieces[0].y){
                        newPos.push(pos)
                    }
                }
                else{
                    if(pos.y > blockPieces[0].y){
                        newPos.push(pos)
                    }
                }
            })
        }
        else{
            positon.forEach((pos)=>{
                newPos.push(pos)
            })
        }

        return newPos
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
        newPos = this.solveBlocked(newPos)

        if(this.playerNumber == 1){
            let pos = {x: this.position.x + 1, y: this.position.y + 1}
            let player= GameManager.Instance.getPiecePlayerWithPos(pos)

            if(player  == "playerTwo"){
                newPos.push(pos)
            }

            pos = {x: this.position.x - 1, y: this.position.y + 1}
            player = GameManager.Instance.getPiecePlayerWithPos(pos)

            if(player == "playerTwo"){
                newPos.push(pos)
            }
        }
        else{
            let pos = {x: this.position.x + 1, y: this.position.y - 1}
            let player= GameManager.Instance.getPiecePlayerWithPos(pos)

            if(player  == "playerOne"){
                newPos.push(pos)
            }

            pos = {x: this.position.x - 1, y: this.position.y - 1}
            player = GameManager.Instance.getPiecePlayerWithPos(pos)

            if(player == "playerOne"){
                newPos.push(pos)
            }
        }

        newPos = super.solveBoundary(newPos)

        return newPos
    }
}