import { type Reactive, reactive } from "vue";
import { HexPoint, HexSide, GamePiece, PlayerTeam } from "../models/Enums";
import type { ITwoDCoords } from "../models/Interfaces";
import type { HexSides } from "../models/Types";
import { loopThroughEnums } from "../utils/Utils";
import { HexGamePieceInfo } from "./HexSideInfo";
import { HexPointInfo } from "./TilePointInfo";
import { TileSideInfo } from "./TileSideInfo";


export class Hex {
    keyInGrid: ITwoDCoords;

    // hex size info
    sizePx: number
    outerRadiuss: number;
    innerRadiuss: number;

    leftTopPosition!: ITwoDCoords
    
    center!: ITwoDCoords;
    sides: HexSides

    parentElement!: HTMLDivElement
    pointInfo: Reactive<Map<HexPoint, HexPointInfo>>
    sideInfo: Reactive<Map<HexSide, TileSideInfo>>

    constructor(key: ITwoDCoords, sizePx: number) {
        this.keyInGrid = key
        this.sizePx = sizePx
        this.outerRadiuss = sizePx / 2
        this.innerRadiuss =  this.outerRadiuss * Math.sqrt(3) / 2
        this.sides = {} as HexSides

        this.instantiateSides()

        this.sideInfo = reactive(new Map([
            [HexSide.TopRight, new TileSideInfo(HexSide.TopRight)],
            [HexSide.Right, new TileSideInfo(HexSide.Right)],
            [HexSide.TopLeft, new TileSideInfo(HexSide.TopLeft)],
            [HexSide.BottomLeft, new TileSideInfo(HexSide.BottomLeft)],
            [HexSide.BottomRight, new TileSideInfo(HexSide.BottomRight)],
            [HexSide.Left, new TileSideInfo(HexSide.Left)]
        ]))

        this.pointInfo = reactive(new Map([
            [HexPoint.Top, new HexPointInfo(HexPoint.Top)],
            [HexPoint.TopRight, new HexPointInfo(HexPoint.TopRight)],
            [HexPoint.TopLeft, new HexPointInfo(HexPoint.TopLeft)],
            [HexPoint.Bottom, new HexPointInfo(HexPoint.Bottom)],
            [HexPoint.BottomRight, new HexPointInfo(HexPoint.BottomRight)],
            [HexPoint.BottomLeft, new HexPointInfo(HexPoint.BottomLeft)]
        ]))
    }

    getSide(side: HexSide): HexGamePieceInfo {
        return this.sides[side]
    }

    getMySides(): HexSides {
        return this.sides
    }

    setSideInfo(side: HexSide, piece: GamePiece = GamePiece.Wall) {
        this.sideInfo.set(side, new TileSideInfo(side, PlayerTeam.Blue, piece))

        console.log(this.sideInfo.get(side));
    }

    setPointInfo(point: HexPoint, piece: GamePiece) {
        this.pointInfo.set(point, new HexPointInfo(point, PlayerTeam.Blue, piece))

        console.log(this.pointInfo.get(point));
    }

    instantiateSides() {
        loopThroughEnums(HexSide, val => {
            this.sides[val] = new HexGamePieceInfo(GamePiece.None)
        })
    }

    setSides(givenSides: HexSides) {
        loopThroughEnums(HexSide, val => {
            if (givenSides[val]) {
                this.sides[val] = givenSides[val]
            }
        })
    }

    setLeftTopPosition(coords: ITwoDCoords) {
        this.leftTopPosition = coords
    }

    setHexElement(element: HTMLDivElement) {
        const rect = element.getBoundingClientRect();

        element.style.height = this.outerRadiuss * 2 + 'px'
        element.style.width = this.outerRadiuss * 2 + 'px'

        this.parentElement = element
        // this.outerRadiuss = rect.width / 2
        this.innerRadiuss = this.outerRadiuss * Math.sqrt(3) / 2
        this.center = {
            y: rect.realTop + this.outerRadiuss, 
            x: rect.left + this.outerRadiuss
        }

    }

    getRelativeSidesCoords(side: HexSide): ITwoDCoords {
        var angle_deg = 60 * side
        var angle_rad = Math.PI / 180 * angle_deg
        return { 
            x: this.outerRadiuss + this.innerRadiuss * Math.cos(angle_rad) * 1.15 ,
            y: this.outerRadiuss + this.innerRadiuss * Math.sin(angle_rad) * 1
        }
    }

    getAbsoluteSidesCoords(side: HexSide): ITwoDCoords {
        const relativeCoords = this.getRelativeSidesCoords(side)
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