import { GamePiece, PlayerTeam } from "../models/Enums"
import type { IGamePiece, ITwoDCoords } from "../models/Interfaces"
import type { GridPoint } from "./GridPoint"
import type { Hex } from "./Hex"
import { PiecePositionOnHex } from "./PiecePositionOnHex"

export class GridSide extends PiecePositionOnHex {
    hexes: Hex[]
    sidePoints: GridPoint[]
    
    constructor(coords: ITwoDCoords, gamePiece: IGamePiece = { piece: GamePiece.None, team: PlayerTeam.None }) {
        super(coords, gamePiece)
        this.hexes = []
        this.sidePoints = []
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


