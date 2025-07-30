import { ref, type Ref } from "vue";
import { Hex, HexPoint, isSamePoint, type TwoDCoords } from "./Hex";
import { getLineAndCharacterOfPosition } from "typescript";
import { getDistance } from "./Utils";
import { GamePiece } from "./TilePointInfo";

export class TwoDGrid {
    size: TwoDCoords;
    tileSize: number;
    tiles!: Hex[][];
    interactableGridPoint!: Ref<PointGroup[]>

    constructor(size: TwoDCoords, tileSize: number) {
        this.size = size
        this.tileSize = tileSize
        this.interactableGridPoint = ref([])
        this.generate2DTileArray();
    }

    generate2DTileArray() {
        this.tiles = []

        for (let y = 0; y < this.size.y; y++) {
            // need to make array in each row and only then put values into that array
            this.tiles[y] = []
            for (let x = 0; x < this.size.x; x++) {
                this.tiles[y][x] = new Hex({x, y}, this.tileSize)
            }
        }
    }

    generateInteractablePointsCoords() {
        // points above ui that can be clicked
        this.interactableGridPoint.value = []

        this.tiles.forEach(row => {
            row.forEach(hex => {

                for (const enumPoint of Object.values(HexPoint).filter(v => typeof v === "number") as HexPoint[]) {
                    const connection: HexConnectionPoint = {
                        coords: hex.getAbsolutePointCoords(enumPoint),
                        hex: hex,
                        point: enumPoint
                    }

                    addPointToGridArray(this.interactableGridPoint.value, connection)
                }
            });
        })
    }
}

export interface HexConnectionPoint {
    hex: Hex,
    point: HexPoint,
    coords: TwoDCoords
}

export class PointGroup {
    points: HexConnectionPoint[] = []
    relativeCoords: TwoDCoords

    maximumDistance = 1

    setPointPiece(piece: GamePiece) {
        console.log(this.points);
        
        this.points.forEach(point => {
            point.hex.setPointInfo(point.point, piece)
        });
    }

    addPoint(point: HexConnectionPoint) {
        this.points.push(point)
    }

    tryAddPoint(connection: HexConnectionPoint): boolean {
        if (getDistance(connection.coords, this.relativeCoords) < this.maximumDistance) {
            if (this.points.length <= 3) {
                this.addPoint(connection)
                return true
            }
        }

        return false
    }

    constructor(connection: HexConnectionPoint) {
        this.relativeCoords = connection.coords
        this.addPoint(connection)
    }
}

function addPointToGridArray(pointGroups: PointGroup[], connection: HexConnectionPoint) {
    console.log(connection);
    
    if (pointGroups.some(e => e.tryAddPoint(connection))) return

    pointGroups.push(new PointGroup(connection))
}