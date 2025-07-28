import { HexPoint, HexSide } from "./Hex";
import type { TilePointInfo } from "./TilePointInfo";

declare global {
    interface Array<T> {
        isSideConnected(this: TilePointInfo[],side: HexSide): boolean;
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