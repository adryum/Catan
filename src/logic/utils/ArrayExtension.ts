import  { HexPoint, HexSide,  } from "../models/Enums";

import type { HexPointInfo } from "../repository/TilePointInfo";

declare global {
    interface Array<T> {
        isSideConnected(this: HexPointInfo[],side: HexSide): boolean;
    }
}

Array.prototype.isSideConnected = function (side: HexSide): boolean {
    // `this` is the array of MyClass
    switch (side) {
        case HexSide.Right:
            return this[HexPoint.TopRight]?.isPlaced() 
            && this[HexPoint.BottomRight]?.isPlaced()
        case HexSide.BottomRight:
            return this[HexPoint.Bottom]?.isPlaced() 
            && this[HexPoint.BottomRight]?.isPlaced()
        case HexSide.BottomLeft:
            return this[HexPoint.Bottom]?.isPlaced() 
            && this[HexPoint.BottomLeft]?.isPlaced()
        case HexSide.Left:
            return this[HexPoint.BottomLeft]?.isPlaced() 
            && this[HexPoint.TopLeft]?.isPlaced()
        case HexSide.TopLeft:
            return this[HexPoint.TopLeft]?.isPlaced() 
            && this[HexPoint.Top]?.isPlaced()
        default:
            // mby throw an error..
            return false
    }
};

declare global {
    interface Map<K, V> {
        isSideConnected(this: Map<HexPoint, HexPointInfo>, side: HexSide): boolean;
    }
}

Map.prototype.isSideConnected = function (side: HexSide): boolean {
    // `this` is the array of MyClass
    switch (side) {
        case HexSide.Right:
            return this.get(HexPoint.TopRight)!.isPlaced()
            && this.get(HexPoint.BottomRight)!.isPlaced()

        case HexSide.BottomRight:
            return this.get(HexPoint.Bottom)!.isPlaced() 
            && this.get(HexPoint.BottomRight)!.isPlaced()

        case HexSide.BottomLeft:
            return this.get(HexPoint.Bottom)!.isPlaced() 
            && this.get(HexPoint.BottomLeft)!.isPlaced()
        case HexSide.Left:
            return this.get(HexPoint.BottomLeft)!.isPlaced() 
            && this.get(HexPoint.TopLeft)!.isPlaced()

        case HexSide.TopLeft:
            return this.get(HexPoint.TopLeft)!.isPlaced() 
            && this.get(HexPoint.Top)!.isPlaced()

        case HexSide.TopRight:
            return this.get(HexPoint.Top)!.isPlaced() 
            && this.get(HexPoint.TopRight)!.isPlaced()
            
        default:
            // mby throw an error..
            return false
    }
};