
import { HexPoint, HexSide, GamePiece, PlayerTeam } from "../models/Enums";
import type { ITwoDCoords } from "../models/Interfaces";
import type { HexPoints, HexSides } from "../models/Types";
import { loopThroughEnums } from "../utils/Utils";
import { HexGamePieceInfo } from "./HexSideInfo";
import { GridSide } from "./GridSide";
import type { GridPoint } from "./GridPoint";
import { type Ref, ref } from "vue";

export class Hex {
    keyInGrid: ITwoDCoords;

    // hex size info
    sizePx: number
    outerRadiuss: number;
    innerRadiuss: number;

    leftTopPosition!: ITwoDCoords
    center!: ITwoDCoords;

    sides: HexSides
    points: HexPoints

    parentElement!: HTMLDivElement
    style: Ref<string>

    constructor(key: ITwoDCoords, sizePx: number) {
        this.keyInGrid = key
        this.sizePx = sizePx
        this.outerRadiuss = sizePx / 2
        this.innerRadiuss =  this.outerRadiuss * Math.sqrt(3) / 2
        this.sides = {}
        this.points = {} as HexPoints
        this.style = ref('')
    }

    setStyle(style: string) {
        // WHY DOES THIS WORK??!??!
        this.style.value = style
    }

    getPoint(point: HexPoint): GridPoint {
        return this.points[point]
    }

    getPoints(): HexPoints {
        return this.points
    }

    setPoint(gridPoint: GridPoint, point: HexPoint) {
        this.points[point] = gridPoint
    }

    setPoints(givenPoints: HexPoints) {
        loopThroughEnums(HexPoint, val => {
            if (givenPoints[val]) {
                this.points[val] = givenPoints[val]
            }
        })
    }

    getSide(side: HexSide): GridSide | undefined {
        return this.sides[side]
    }

    getMySides(): HexSides {
        return this.sides
    }

    setSideInfo(side: HexSide, piece: GamePiece = GamePiece.Wall) {
        // this.sideInfo.set(side, new TileSideInfo(side, PlayerTeam.Blue, piece))

        // console.log(this.sideInfo.get(side));
    }

    setPointInfo(point: HexPoint, piece: GamePiece) {
        // this.pointInfo.set(point, new HexPointInfo(point, PlayerTeam.Blue, piece))

        // console.log(this.pointInfo.get(point));
    }

    // instantiateSides() {
    //     loopThroughEnums(HexSide, val => {
    //         this.sides[val] = new GridSide(this.getAbsoluteSidesCoords(val))
    //     })
    // }

    // setSides(givenSides: HexSides) {
    //     loopThroughEnums(HexSide, val => {
    //         if (givenSides[val]) {
    //             this.sides[val] = givenSides[val]
    //         }
    //     })
    // }

    setSide(side: HexSide, value: GridSide) {
        this.sides[side] = value
    }

    setLeftTopPosition(coords: ITwoDCoords) {
        this.leftTopPosition = coords
        this.center = {
            x: this.leftTopPosition.x + this.outerRadiuss,
            y: this.leftTopPosition.y + this.outerRadiuss
        }
    }

    getAbsoluteSideCoords(side: HexSide): ITwoDCoords {
        const relativeCoords = this.getRelativeSideCoords(side)
        // console.log('sideCoord' ,relativeCoords);
        
        return {
            x: this.leftTopPosition.x + relativeCoords.x,
            y: this.leftTopPosition.y + relativeCoords.y
        }
    }

    getAbsolutePointCoords(point: HexPoint): ITwoDCoords {
        const relativeCoords = this.getRelativePointCoords(point)
        // console.log('relacoords' ,relativeCoords);
        
        return {
            x:this.leftTopPosition.x + relativeCoords.x,
            y: this.leftTopPosition.y + relativeCoords.y
        }
    }

    getRelativePointCoords(point: number): ITwoDCoords {
        // console.log('outer rad:' ,this.outerRadiuss);
        
        // start = 90deg ; topRight = 30deg
        var angle_deg = -90 + 60 * point
        var angle_rad = Math.PI / 180 * angle_deg

        const coords = { 
            x: this.outerRadiuss + this.outerRadiuss * Math.cos(angle_rad) * 1.15, 
            y: this.outerRadiuss + this.outerRadiuss * Math.sin(angle_rad)
        }

        return coords
    }

    getRelativeSideCoords(side: HexSide): ITwoDCoords {
        var angle_deg = 60 * side
        var angle_rad = Math.PI / 180 * angle_deg
        return { 
            x: this.outerRadiuss + this.innerRadiuss * Math.cos(angle_rad) * 1.15 ,
            y: this.outerRadiuss + this.innerRadiuss * Math.sin(angle_rad) 
        }
    }
}

export function getPieceImage(piece: GamePiece, side: HexSide = HexSide.None): string | null {
    // safety checks
    if (piece === GamePiece.Wall && side === HexSide.None) {
        console.error('Wall side not provided:', piece, side);
        return null
    }
    
    switch (piece) {
        case GamePiece.None:
            return ''
            
        case GamePiece.Wall:
                if (side === HexSide.BottomLeft || side === HexSide.TopRight) {
                    console.log('WALL: left-bottom')
                    return '/src/assets/images/wallLeftBottom.svg'

                } else if (side === HexSide.TopLeft || side === HexSide.BottomRight) {
                    console.log('WALL: right-bottom')
                    return '/src/assets/images/wallRightBottom.svg'

                } else {
                    console.log('WALL: vertical')
                    return '/src/assets/images/wallVertical.svg'
                }
        case GamePiece.Tower:
            return '/src/assets/images/tower.svg'

        default:
            return null
    }
}