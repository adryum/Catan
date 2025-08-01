import type { GridPoint } from "../repository/GridPoint";
import type { GridSide } from "../repository/GridSide";
import type { HexPoint, HexSide } from "./Enums";

export type HexSides = {
    [key in HexSide]: GridSide;
}

export type HexPoints = {
    [key in HexPoint]: GridPoint;
}