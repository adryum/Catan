import { reactive, ref, type Reactive, type Ref } from "vue";
import  { HexPoint, HexSide, GamePiece, PlayerTeam } from "../models/Enums";
import type { ITwoDCoords } from "../models/Interfaces";

export class HexUI {
    keyInGrid: ITwoDCoords;
    sides = 6;
    outerRadiuss!: number;
    innerRadiuss!: number;

    // pointInfo: Reactive<Map<HexPoint, HexPointInfo>>
    // sideInfo: Reactive<Map<HexSide, TileSideInfo>>

    constructor(key: ITwoDCoords, pixelSize: number) {
        this.keyInGrid = key
        this.outerRadiuss = pixelSize / 2

        // this.sideInfo = reactive(new Map([
        //     [HexSide.TopRight, new TileSideInfo(HexSide.TopRight)],
        //     [HexSide.Right, new TileSideInfo(HexSide.Right)],
        //     [HexSide.TopLeft, new TileSideInfo(HexSide.TopLeft)],
        //     [HexSide.BottomLeft, new TileSideInfo(HexSide.BottomLeft)],
        //     [HexSide.BottomRight, new TileSideInfo(HexSide.BottomRight)],
        //     [HexSide.Left, new TileSideInfo(HexSide.Left)]
        // ]))

        // this.pointInfo = reactive(new Map([
        //     [HexPoint.Top, new HexPointInfo(HexPoint.Top)],
        //     [HexPoint.TopRight, new HexPointInfo(HexPoint.TopRight)],
        //     [HexPoint.TopLeft, new HexPointInfo(HexPoint.TopLeft)],
        //     [HexPoint.Bottom, new HexPointInfo(HexPoint.Bottom)],
        //     [HexPoint.BottomRight, new HexPointInfo(HexPoint.BottomRight)],
        //     [HexPoint.BottomLeft, new HexPointInfo(HexPoint.BottomLeft)]
        // ]))
    }

    setSideInfo(side: HexSide, piece: GamePiece = GamePiece.Wall) {
     
        // this.sideInfo.set(side, new TileSideInfo(side, PlayerTeam.Blue, piece))

        // console.log(this.sideInfo.get(side));
    }

    setPointInfo(point: HexPoint, piece: GamePiece) {
     
        // this.pointInfo.set(point, new HexPointInfo(point, PlayerTeam.Blue, piece))

        // console.log(this.pointInfo.get(point));
    }
}





    