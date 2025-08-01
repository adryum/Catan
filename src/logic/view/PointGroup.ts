
import type { GamePiece } from "../models/Enums";
import type { IHexBasePoint, ITwoDCoords } from "../models/Interfaces";
import { getDistance } from "../utils/Utils";

export class PointGroup {
    points: IHexBasePoint[] = []
    relativeCoords: ITwoDCoords

    maximumDistance = 1

    setPointPiece(piece: GamePiece) {
        console.log(this.points);
        
        this.points.forEach(point => {
            point.hex.setPointInfo(point.point, piece)
        });
    }

    addPoint(point: IHexBasePoint) {
        this.points.push(point)
    }

    tryAddPoint(connection: IHexBasePoint): boolean {
        if (getDistance(connection.coords, this.relativeCoords) < this.maximumDistance) {
            if (this.points.length <= 3) {
                this.addPoint(connection)
                return true
            }
        }

        return false
    }

    constructor(connection: IHexBasePoint) {
        this.relativeCoords = connection.coords
        this.addPoint(connection)
    }
}
