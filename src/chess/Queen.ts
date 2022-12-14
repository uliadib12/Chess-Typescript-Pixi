import GameManager from "../util/GameManager";
import { Pos } from "../util/interface";
import PIXI from "../util/PIXI";
import Pawn from "./Pawn";
import Pieces from "./Pieces";

export class Queen extends Pieces {
    constructor(id: number, positon: Pos, playerNumber: 1 | 2, textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_queen_png_shadow_128px.png')){
        super(id,positon,playerNumber,textureSprite);
        this.type = "queen"
    }

    seperatePieceMoves(position: Pos[]): Pos[][] {
        let newPosition: Pos[][] = []

        let tempPositon = position

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.x == this.position.x && pos.y > this.position.y){
                return true
            }
        }))

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.x == this.position.x && pos.y < this.position.y){
                return true
            }
        }))

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.y == this.position.y && pos.x > this.position.x){
                return true
            }
        }))

        newPosition.push(tempPositon.filter((pos) => {
            if(pos.y == this.position.y && pos.x < this.position.x){
                return true
            }
        }))

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

    protected solveBlocked(position: Pos[]): Pos[] {
        let newMove: Pos[] = []
        const allPos = GameManager.Instance.getAllPiecesPosition() 
        let allPiecesPosition = allPos.playerOne.concat(allPos.playerTwo)
        let seperatePieceMoves = this.seperatePieceMoves(position)

        for (let i = 0; i < 8; i++) {
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
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y < blockPieces[0].y + 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y < blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y < blockPieces[0].y + 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                    if(i == 1){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                    if(i == 2){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x < blockPieces[0].x){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x < blockPieces[0].x + 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x < blockPieces[0].x){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x < blockPieces[0].x + 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                    if(i == 3){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x > blockPieces[0].x){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x > blockPieces[0].x - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x > blockPieces[0].x){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x > blockPieces[0].x - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                    if(i == 4){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y < blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y < blockPieces[0].y + 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y < blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y < blockPieces[0].y + 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                    if(i == 5){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                    if(i == 6){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.y > blockPieces[0].y){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.y > blockPieces[0].y - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                    if(i == 7){
                        if(this.playerNumber == 1){
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x > blockPieces[0].x){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x > blockPieces[0].x - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                        else{
                            if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerTwo"){
                                if(move.x > blockPieces[0].x){
                                    newMove.push(move)
                                }
                            }
                            else if(GameManager.Instance.getPiecePlayerWithPos(blockPieces[0]) == "playerOne"){
                                if(move.x > blockPieces[0].x - 1){
                                    newMove.push(move)
                                }
                            }
                        }
                    }
                })
            }
            else{
                moves.forEach(move=>{
                    newMove.push(move)
                })
            }
        }

        return newMove
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
        newPos = this.solveBlocked(newPos)
        newPos = super.solveBoundary(newPos)

        return newPos
    }
}