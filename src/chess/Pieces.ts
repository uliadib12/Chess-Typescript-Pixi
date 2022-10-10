import GameManager from "../util/GameManager";
import { Drawble, Pos } from "../util/interface"
import PIXI, { app } from "../util/PIXI";
import Player from "../util/Player";

const TILE_XY_COUNT = 8

export default abstract class Pieces implements Drawble {
   public id : number
   public playerNumber: 1 | 2
   public position: Pos
   public sprite : PIXI.Sprite
   protected readonly spriteScale = 0.55

   constructor(id: number, positon: Pos, playerNumber: 1 | 2 , textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png')){
      this.position = positon
      this.id = id
      this.playerNumber = playerNumber
      this.sprite = textureSprite
      this.eventInteraction()
  }

  private getPlayerClass() : Player{
      let player: Player

      if(this.playerNumber == 1){
         player = GameManager.Instance.playerOne
      }
      else if(this.playerNumber == 2){
         player = GameManager.Instance.playerTwo
      }
      
      return player
  }

//   abstract seperatePieceMoves(position: Pos[]): Pos[][]

  protected getAllPiecesPosition(): {playerOne: Pos[], playerTwo: Pos[]}{
      let position: {playerOne: Pos[], playerTwo: Pos[]} = {playerOne: [], playerTwo: []}
      const playerOne = GameManager.Instance.playerOne
      const playerTwo = GameManager.Instance.playerTwo
      const piecesPlayerOne = playerOne.getAllPieces()
      const piecesPlayerTwo = playerTwo.getAllPieces()

      piecesPlayerOne.pawns.forEach((pawn)=>{
         position.playerOne.push(pawn.position)
      })
      piecesPlayerOne.rooks.forEach((rook)=>{
         position.playerOne.push(rook.position)
      })
      piecesPlayerOne.knight.forEach((knight)=>{
         position.playerOne.push(knight.position)
      })
      piecesPlayerOne.bishop.forEach((bishop)=>{
         position.playerOne.push(bishop.position)
      })
      piecesPlayerOne.queen.forEach((queen)=>{
         position.playerOne.push(queen.position)
      })
      if(piecesPlayerOne.king != undefined) position.playerOne.push(piecesPlayerOne.king.position)

      piecesPlayerTwo.pawns.forEach((pawn)=>{
         position.playerTwo.push(pawn.position)
      })
      piecesPlayerTwo.rooks.forEach((rook)=>{
         position.playerTwo.push(rook.position)
      })
      piecesPlayerTwo.knight.forEach((knight)=>{
         position.playerTwo.push(knight.position)
      })
      piecesPlayerTwo.bishop.forEach((bishop)=>{
         position.playerTwo.push(bishop.position)
      })
      piecesPlayerTwo.queen.forEach((queen)=>{
         position.playerTwo.push(queen.position)
      })
      if(piecesPlayerTwo.king != undefined) position.playerTwo.push(piecesPlayerTwo.king.position)

      return position
  }

   setPositon(newPositon: Pos): void {
      this.position = newPositon
      this.moveSprite(newPositon)
  }
  
  abstract getMove(): Pos[]

  protected solveBoundary(position: Pos[]) : Pos[]{
   let result = position.filter((val)=>{
      if((val.x >= 1 && val.x <= TILE_XY_COUNT) && (val.y >= 1 && val.y <= TILE_XY_COUNT)){
        return true
      }
   })

      return result
   } 

   // protected abstract solveBlocked(position: Pos[]): Pos[]

  eventInteraction(){
      this.sprite.buttonMode = true

      let player: Player = this.getPlayerClass()

      this.sprite.on('pointerdown', (event) => {
          player.selectPieces(this)
       })
  }
  
  moveSprite(pos: Pos){
      this.sprite.x = (pos.x - 1) * this.spriteScale * 136 + 6
      this.sprite.y = app.view.height - (pos.y - 1) * this.spriteScale * 135.5 - 72
  }

  draw(): void {
      this.sprite.scale = new PIXI.Point(this.spriteScale, this.spriteScale)
      this.moveSprite(this.position)
      app.stage.addChild(this.sprite)
  }
}