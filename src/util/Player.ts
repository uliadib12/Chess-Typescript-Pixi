import Base from "../chess/base"
import Pawn from "../chess/pawn"

export default class Player {
   public color: "white" | "black" = "white"
   public countPieces = 16
   public pieces : {pawn: Pawn[]}
}