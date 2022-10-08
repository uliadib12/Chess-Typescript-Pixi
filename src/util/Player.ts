import Base from "../chess/Base"
import { SIZE_TILE } from "../chess/Board"
import { Knight } from "../chess/Knight"
import Pawn from "../chess/Pawn"
import { Rook } from "../chess/Rook"
import GameManager from "./GameManager"
import PIXI, { app } from "./PIXI"

export default class Player {
   private playerNumber: 1 | 2
   private color: "white" | "black"
   private countPieces = 0
   private pieces: {pawns: Pawn[], rooks: Rook[], knight: Knight[]} = {pawns: [], rooks: [], knight: []}
   private piecesSelected: Base 
   private dotsMoves: PIXI.Container[] = []
   private isPiecesSelected: boolean = false

   constructor(whichPlayer: 1 | 2){
      this.playerNumber = whichPlayer
      this.color = this.playerNumber == 1 ? "white" : "black"
   }

   private drawMove(piece: Base){
      let moves = piece.getMove()

      moves.forEach((move)=>{
         let dotContainer = new PIXI.Container()

         let dot = new PIXI.Graphics()
         dot.beginFill(0xA9A9A9, 0.6)
         dot.drawCircle((SIZE_TILE/2) + (SIZE_TILE * (move.x - 1)), (app.view.height - (SIZE_TILE/2)) - (SIZE_TILE * (move.y - 1)), 10)
         dot.endFill()

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

   public selectPieces(piece: Base){
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
      this.pieces.rooks.forEach((pawn)=>{
         pawn.sprite.interactive = active
      })
      this.pieces.knight.forEach((pawn)=>{
         pawn.sprite.interactive = active
      })
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

   public createPieces(){
      this.createPawn()
      this.createRook()
      this.createKnight()
   }
}