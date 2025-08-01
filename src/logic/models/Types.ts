
import type { HexGamePieceInfo } from "../repository/HexSideInfo";
import type { HexPoint, HexSide } from "./Enums";
import type { HexPointInfo } from "../repository/TilePointInfo";

export type HexSides = {
    [key in HexSide]: HexGamePieceInfo;
}

export type HexPoints = {
    [key in HexPoint]: HexPointInfo;
}