import { HexConnection, NeighbourHex,  HexSide, GamePiece, PlayerTeam } from "../models/Enums"
import type { IGamePiece, ITwoDCoords } from "../models/Interfaces"
import type { GridPoint } from "./GridPoint"
import type { Hex } from "./Hex"

export class GridSide {
    coords: ITwoDCoords
    gamePiece: IGamePiece

    hexes!: Hex[]
    sidePoints!: GridPoint[]
    
    constructor(coords: ITwoDCoords) {
        this.coords = coords
        this.gamePiece = { 
                piece: GamePiece.None, 
                team: PlayerTeam.None 
        }
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

    setPoint(point: GridPoint) {
        if (this.sidePoints.length <= 2) {
            this.sidePoints.push(point)
        } else {
            console.error('Too many connecting points! ', point, this.sidePoints);
        }
    }

    getOtherPoint(point: GridPoint): GridPoint {
        return this.sidePoints.find(arrPoint => point != arrPoint)!
    }
}


