import GameManager from "../util/GameManager";
import { Pos } from "../util/interface";
import PIXI from "../util/PIXI";
import Pawn from "./Pawn";
import Pieces from "./Pieces";

export class Bishop extends Pieces {
    constructor(id: number, positon: Pos, playerNumber: 1 | 2 , textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_bishop_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite);
    }

    private seperatePieceMoves(position: Pos[]): Pos[][] {
        let newPosition: Pos[][] = []

        let tempPositon = position

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.x > this.position.x && pos.y > this.position.y){
                return true
            }
        }))

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.x > this.position.x && pos.y < this.position.y){
                return true
            }
        }))

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.y < this.position.y && pos.x < this.position.x){
                return true
            }
        }))

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.y > this.position.y && pos.x < this.position.x){
                return true
            }
        }))
        
        return newPosition
    }

    protected solveBlocked(move: Pos[]): Pos[] {
        let newPos: Pos[] = []
        const allPos = GameManager.Instance.getAllPiecesPosition() 
        let allPiecesPosition = allPos.playerOne.concat(allPos.playerTwo)
        let seperatePieceMoves = this.seperatePieceMoves(move)

        for (let i = 0; i < 4; i++) {
            let moves = seperatePieceMoves[i]
            let blockPieces: Pos[] = []

            moves.forEach((move)=>{
                allPiecesPosition.forEach((pos)=>{
                    if(move.x == pos.x && move.y == pos.y){
                        blockPieces.push(move)
                    }
                })
            })

            if(blockPieces.length){
                moves.forEach((move)=>{
                    if(i == 0){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y < blockPieces[0].y){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y < blockPieces[0].y + 1){
                                    newPos.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y < blockPieces[0].y){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y < blockPieces[0].y + 1){
                                    newPos.push(move)
                                }
                            }
                        }
                    }
                    if(i == 1){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y - 1){
                                    newPos.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y - 1){
                                    newPos.push(move)
                                }
                            }
                        }
                    }
                    if(i == 2){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y - 1){
                                    newPos.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y - 1){
                                    newPos.push(move)
                                }
                            }
                        }
                    }
                    if(i == 3){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x > blockPieces[0].x){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x > blockPieces[0].x - 1){
                                    newPos.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x > blockPieces[0].x){
                                    newPos.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x > blockPieces[0].x - 1){
                                    newPos.push(move)
                                }
                            }
                        }
                    }
                })
            }
            else{
                moves.forEach(move=>{
                    newPos.push(move)
                })
            }
        }

        return newPos
    }

    getMove(): Pos[] {
        let newPos : Pos[] = []

        for (let i = 1; i <= 8; i++) {
            newPos.push({x: this.position.x + i, y: this.position.y + i})
            newPos.push({x: this.position.x + i, y: this.position.y - i})
            newPos.push({x: this.position.x - i , y: this.position.y - i})
            newPos.push({x: this.position.x - i, y: this.position.y + i})
        }

        newPos = super.solveBoundary(newPos)
        newPos = this.solveBlocked(newPos)
        newPos = super.solveBoundary(newPos)

        return newPos
    }
}