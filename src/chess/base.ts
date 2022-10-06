import { Pos } from "../util/interface"

export abstract class Base {
   abstract position: Pos
   abstract getMove(): Pos[]
}