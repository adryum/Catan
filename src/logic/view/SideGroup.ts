
import type { GamePiece } from "../models/Enums";
import type { IHexBaseSide, ITwoDCoords } from "../models/Interfaces";
import { getDistance } from "../utils/Utils";

export class SideGroup {
    sides: IHexBaseSide[] = []
    relativeCoords: ITwoDCoords

    maximumDistance = 1

    setSidePiece(piece: GamePiece) {
        console.log(this.sides, piece);
        
        this.sides.forEach(side => {
            side.hex.setSideInfo(side.side, piece)
        });
    }

    addSide(side: IHexBaseSide) {
        this.sides.push(side)
    }

    tryAddSide(connection: IHexBaseSide): boolean {
        if (getDistance(connection.coords, this.relativeCoords) < this.maximumDistance) {
            if (this.sides.length <= 2) {
                this.addSide(connection)
                return true
            }
        }

        return false
    }

    constructor(connection: IHexBaseSide) {
        this.relativeCoords = connection.coords
        this.addSide(connection)
    }
}