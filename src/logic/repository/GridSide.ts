import { HexConnection, NeighbourHex,  HexSide, GamePiece, PlayerTeam } from "../models/Enums"
import type { IGamePiece, ITwoDCoords } from "../models/Interfaces"
import type { GridPoint } from "./GridPoint"
import type { Hex } from "./Hex"

export class GridSide {
    coords: ITwoDCoords
    gamePiece: IGamePiece

    hexes: Hex[]
    sidePoints: GridPoint[]
    
    constructor(coords: ITwoDCoords) {
        this.hexes = []
        this.sidePoints = []
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

    addHex(hex: Hex) {
        if (hex && !this.hexes.includes(hex)) {  
            this.hexes.push(hex)
        }
    }

    addPoint(point: GridPoint) {
        this.sidePoints.push(point)
    }

    getOtherPoint(point: GridPoint): GridPoint {
        return this.sidePoints.find(arrPoint => point != arrPoint)!
    }
}


