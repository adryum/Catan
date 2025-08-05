import { GamePiece, PlayerTeam } from "../models/Enums"
import type { ITwoDCoords, IGamePiece } from "../models/Interfaces"

export class PiecePositionOnHex {
    coords: ITwoDCoords
    gamePiece: IGamePiece

    constructor(coords: ITwoDCoords, gamePiece: IGamePiece) {
        this.coords = coords;
        this.gamePiece = gamePiece
    }
    
    hasPiece(): boolean {
        return this.gamePiece.piece != GamePiece.None
    }

    setGamePiece(piece: IGamePiece) {
        this.gamePiece = piece
    }

    getGamePiece() {
        return this.gamePiece
    }
}