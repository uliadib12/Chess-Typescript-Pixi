import { Pos } from "../util/interface";
import Base from "./base";

export default class Pawn extends Base{
    id: { type: string; id: number; };
    public position: Pos
    public isFirstMove: boolean = true
    
    constructor(id: { type: string; id: number; }, positon: Pos){
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
}