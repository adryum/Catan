
import { PlayerTeam, type GamePiece } from "../models/Enums";
import { getPieceImage } from "./Hex";

export class HexGamePieceInfo {
    team: PlayerTeam
    image: string
    gamePiece: GamePiece

    constructor(piece: GamePiece, team: PlayerTeam = PlayerTeam.None) {
        this.team = team
        this.gamePiece = piece;
        this.image = getPieceImage(piece)!
    }
}