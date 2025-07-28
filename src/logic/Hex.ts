import { TilePointInfo } from "./TilePointInfo";

export class Hex {
    keyInGrid: TwoDCoords;
    sides = 6;
    outerRadiuss!: number;
    innerRadiuss!: number;
    center!: TwoDCoords;

    parentElement!: HTMLDivElement
    pointInfo: Map<HexPoint, TilePointInfo>

    constructor(key: TwoDCoords, pixelSize: number) {
        this.keyInGrid = key
        this.outerRadiuss = pixelSize / 2

        this.pointInfo = new Map([
            [HexPoint.Top, new TilePointInfo(HexPoint.Top)],
            [HexPoint.TopRight, new TilePointInfo(HexPoint.TopRight)],
            [HexPoint.TopLeft, new TilePointInfo(HexPoint.TopLeft)],
            [HexPoint.Bottom, new TilePointInfo(HexPoint.Bottom)],
            [HexPoint.BottomRight, new TilePointInfo(HexPoint.BottomRight)],
            [HexPoint.BottomLeft, new TilePointInfo(HexPoint.BottomLeft)]
        ]) 
    }

    setPosition() {
        this.parentElement.style.top = 
            (this.keyInGrid.y * 3/2 * (this.outerRadiuss)) + 'px'

        // on each second row
        if (this.keyInGrid.y % 2 == 1) {
            this.parentElement.style.left = 
                (this.outerRadiuss + this.keyInGrid.x * (this.outerRadiuss) * 2) + 'px'
        } else {
            this.parentElement.style.left = 
                (this.keyInGrid.x * (this.outerRadiuss ) * 2) + 'px'
        }
        
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

        this.setPosition()
    }

    getSidesCenter(side: HexSide): TwoDCoords {
        var angle_deg = 60 * side
        var angle_rad = Math.PI / 180 * angle_deg
        return { 
            x: this.center.x + this.innerRadiuss * Math.cos(angle_rad), 
            y: this.center.y + this.innerRadiuss * Math.sin(angle_rad)
        }
    }

    getPointCoords(point: HexPoint): TwoDCoords {
        // start = 90deg ; topRight = 30deg
        var angle_deg = 90 - 60 * point
        var angle_rad = Math.PI / 180 * angle_deg
        return { 
            x: this.center.x + this.outerRadiuss * Math.cos(angle_rad), 
            y: this.center.y + this.outerRadiuss * Math.sin(angle_rad)
        }
    }

    getRelativePointCoords(point: HexPoint): TwoDCoords {
        if (!this.parentElement) {
            console.error("No parrent element for HEx!!!");
        }
        
        const rect = this.parentElement.getBoundingClientRect();

        // start = 90deg ; topRight = 30deg
        var angle_deg = -90 + 60 * point
        var angle_rad = Math.PI / 180 * angle_deg
        return { 
            x: (rect.width / 2) + this.outerRadiuss  * Math.cos(angle_rad) * 1.15, 
            y: (rect.height / 2) + this.outerRadiuss * Math.sin(angle_rad)
        }
    }
}

export interface TwoDCoords {
    x: number,
    y: number
} 

export enum HexPoint {
    Top = 0,
    TopRight = 1,
    BottomRight = 2,
    Bottom = 3,
    BottomLeft = 4,
    TopLeft = 5
}

export enum HexSide {
    Right = 0,
    BottomRight = 1,
    BottomLeft = 2,
    Left = 3,
    TopLeft = 4,
    TopRight = 5,
}
    