import { Bishop } from "../chess/Bishop"
import { SIZE_TILE } from "../chess/Board"
import { King } from "../chess/King"
import { Knight } from "../chess/Knight"
import Pawn from "../chess/Pawn"
import Pieces from "../chess/Pieces"
import { Queen } from "../chess/Queen"
import { Rook } from "../chess/Rook"
import GameManager from "./GameManager"
import { Pos } from "./interface"
import PIXI, { app } from "./PIXI"

export default class Player {
   public playerNumber: 1 | 2
   private color: "white" | "black"
   private countPieces = 0
   private pieces: {pawns: Pawn[], rooks: Rook[], knight: Knight[], bishop: Bishop[], queen: Queen[], king?: King} = {pawns: [], rooks: [], knight: [], bishop: [], queen: []}
   private piecesSelected: Pieces
   private dotsMoves: PIXI.Container[] = []
   private isPiecesSelected: boolean = false

   constructor(whichPlayer: 1 | 2){
      this.playerNumber = whichPlayer
      this.color = this.playerNumber == 1 ? "white" : "black"
   }

   public getAllPieces() : {pawns: Pawn[], rooks: Rook[], knight: Knight[], bishop: Bishop[], queen: Queen[], king?: King}{
      return this.pieces
   }

   private drawMove(piece: Pieces){
      let moves = piece.getMove()

      moves.forEach((move)=>{
         let dotContainer = new PIXI.Container()
         
         let dot = new PIXI.Graphics()
         dot.beginFill(0xA9A9A9, 0.6)
         dot.drawCircle((SIZE_TILE/2) + (SIZE_TILE * (move.x - 1)), (app.view.height - (SIZE_TILE/2)) - (SIZE_TILE * (move.y - 1)), 10)
         dot.endFill()

         if(GameManager.Instance.getPiecePlayerWithPos(move) == "playerOne" || GameManager.Instance.getPiecePlayerWithPos(move) == "playerTwo"){
            dot = new PIXI.Graphics()
            dot.beginFill(0xDC143C, 0.6)
            dot.drawCircle((SIZE_TILE/2) + (SIZE_TILE * (move.x - 1)), (app.view.height - (SIZE_TILE/2)) - (SIZE_TILE * (move.y - 1)), 10)
            dot.endFill()
         }

         let box = new PIXI.Graphics()
         box.beginFill(0xDE3249, 0.5)
         box.drawRect(0 + (SIZE_TILE * (move.x - 1)), (app.view.height - SIZE_TILE) - (SIZE_TILE * (move.y - 1)), SIZE_TILE, SIZE_TILE)
         box.endFill()

         box.alpha = 0
         box.interactive = true
         box.buttonMode = true

         box.on('pointerdown', (event) => {
            piece.setPositon(move)
            this.deleteDot()
            this.piecesSelected = undefined
            this.isPiecesSelected = false
         })

         dotContainer.addChild(dot)
         dotContainer.addChild(box)

         app.stage.addChild(dotContainer)

         this.dotsMoves.push(dotContainer)
      })
   }

   public selectPieces(piece: Pieces){
      GameManager.Instance.state = "Select"
      
      if(this.dotsMoves.length){
         this.deleteDot()
         this.isPiecesSelected = false
      }
      
      if(this.isPiecesSelected == false && piece != this.piecesSelected){
         this.drawMove(piece)
         this.isPiecesSelected = true
         this.piecesSelected = piece
      }
      else{
         this.deleteDot()
         this.isPiecesSelected = false
         this.piecesSelected = undefined
      }      
   }

   private deleteDot(){
      this.dotsMoves.forEach((dot)=>{
         dot.destroy()
      })
   }

   public setInteractive(active: boolean){
      this.pieces.pawns.forEach((pawn)=>{
         pawn.sprite.interactive = active
      })
      this.pieces.rooks.forEach((rook)=>{
         rook.sprite.interactive = active
      })
      this.pieces.knight.forEach((knight)=>{
         knight.sprite.interactive = active
      })
      this.pieces.bishop.forEach((bishop)=>{
         bishop.sprite.interactive = active
      })
      this.pieces.queen.forEach((queen)=>{
         queen.sprite.interactive = active
      })
      if(this.pieces.king != undefined) this.pieces.king.sprite.interactive = true
   }

   private createPawn(){
      for (let i = 1; i <= 8; i++) {
         let y = this.playerNumber == 1 ? 2 : 7
         let pawn: Pawn
         if(this.color == "white"){
            pawn = new Pawn(i , {x: i, y}, this.playerNumber, PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png'))
         }
         else{
            pawn = new Pawn(i , {x: i, y}, this.playerNumber, PIXI.Sprite.from('./sprite/b_pawn_png_shadow_128px.png'))
         }
         pawn.draw()
         this.pieces.pawns.push(pawn)
         this.countPieces += 1
      }
  }

  private createRook(){
      for (let i = 1; i <= 2; i++) {
         let y = this.playerNumber == 1 ? 1 : 8
         let rook: Rook
         if(this.color == "white"){
            rook = new Rook(i , {x: i == 1 ? 1 : 8, y}, this.playerNumber, PIXI.Sprite.from('./sprite/w_rook_png_shadow_128px.png'))
         }
         else{
            rook = new Rook(i , {x: i == 1 ? 1 : 8, y}, this.playerNumber, PIXI.Sprite.from('./sprite/b_rook_png_shadow_128px.png'))
         }
         rook.draw()
         this.pieces.rooks.push(rook)
         this.countPieces += 1
      }
  }

  private createKnight(){
      for (let i = 1; i <= 2; i++) {
         let y = this.playerNumber == 1 ? 1 : 8
         let knight: Knight
         if(this.color == "white"){
            knight = new Knight(i , {x: i == 1 ? 2 : 7, y}, this.playerNumber, PIXI.Sprite.from('./sprite/w_knight_png_shadow_128px.png'))
         }
         else{
            knight = new Knight(i , {x: i == 1 ? 2 : 7, y}, this.playerNumber, PIXI.Sprite.from('./sprite/b_knight_png_shadow_128px.png'))
         }
         knight.draw()
         this.pieces.knight.push(knight)
         this.countPieces += 1
      }
  }

  private createBishop(){
      for (let i = 1; i <= 2; i++) {
         let y = this.playerNumber == 1 ? 1 : 8
         let bishop: Bishop
         if(this.color == "white"){
            bishop = new Bishop(i , {x: i == 1 ? 3 : 6, y}, this.playerNumber, PIXI.Sprite.from('./sprite/w_bishop_png_shadow_128px.png'))
         }
         else{
            bishop = new Bishop(i , {x: i == 1 ? 3 : 6, y}, this.playerNumber, PIXI.Sprite.from('./sprite/b_bishop_png_shadow_128px.png'))
         }
         bishop.draw()
         this.pieces.bishop.push(bishop)
         this.countPieces += 1
      }
  }

  private createQueen(){
      let y = this.playerNumber == 1 ? 1 : 8
      let queen: Queen
      if(this.color == "white"){
         queen = new Queen(1 , {x: 4, y}, this.playerNumber, PIXI.Sprite.from('./sprite/w_queen_png_shadow_128px.png'))
      }
      else{
         queen = new Queen(1 , {x: 4, y}, this.playerNumber, PIXI.Sprite.from('./sprite/b_queen_png_shadow_128px.png'))
      }
      queen.draw()
      this.pieces.queen.push(queen)
      this.countPieces += 1
   }

   private createKing(){
      let y = this.playerNumber == 1 ? 1 : 8
      let king: King
      if(this.color == "white"){
         king = new King(1 , {x: 5, y}, this.playerNumber, PIXI.Sprite.from('./sprite/w_king_png_shadow_128px.png'))
      }
      else{
         king = new King(1 , {x: 5, y}, this.playerNumber, PIXI.Sprite.from('./sprite/b_king_png_shadow_128px.png'))
      }
      king.draw()
      this.pieces.king = king
      this.countPieces += 1
   }

   public createPieces(){
      this.createPawn()
      this.createRook()
      this.createKnight()
      this.createBishop()
      this.createQueen()
      this.createKing()
   }
}