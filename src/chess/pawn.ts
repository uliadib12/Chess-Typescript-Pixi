import GameManager from "../util/GameManager";
import { Pos } from "../util/interface";
import PIXI, { app } from "../util/PIXI";
import Player from "../util/Player";
import Base from "./Base";

export default class Pawn extends Base{
    private isFirstMove: boolean = true
    
    constructor(id: number, positon: Pos, playerNumber: number , textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png')){
        super();
        this.position = positon
        this.id = id
        this.playerNumber = playerNumber
        this.sprite = textureSprite
        this.eventInteraction()
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

    eventInteraction(){
        this.sprite.buttonMode = true

        let player: Player
        if(this.playerNumber == 1){
            player = GameManager.Instance.playerOne
        }
        else if(this.playerNumber == 2){
            player = GameManager.Instance.playerTwo
        }

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