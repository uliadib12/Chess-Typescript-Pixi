import { Drawble, Pos } from "../util/interface";
import PIXI, { app } from "../util/PIXI";
import Base from "./base";

export default class Pawn extends Base implements Drawble{
    public id: number
    public isFirstMove: boolean = true
    private readonly pawnSprite = PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png');
    
    constructor(id: number, positon: Pos){
        super();
        this.position = positon
        this.id = id
    }
    
    setPositon(newPositon: Pos): void {
        if(this.isFirstMove) this.isFirstMove = false
        this.position = newPositon
    }

    getMove(): Pos[] {
        let newPos : Pos[] = []
        for (let i = 1; i <= (this.isFirstMove ? 2 : 1); i++) {
            newPos.push({x: this.position.x , y: this.position.y + i})
        }

        newPos = super.solveBoundary(newPos)
        return newPos
    }

    draw(): void {
        this.pawnSprite.x =  (this.position.x - 1) * (this.pawnSprite.width * 75) + 5
        this.pawnSprite.y = app.view.height - (this.position.y - 1) * (this.pawnSprite.height * 75) - 70
        const scale = 0.55
        this.pawnSprite.scale = new PIXI.Point(scale, scale)
        app.stage.addChild(this.pawnSprite)
    }
}