import type { Ref } from "vue/dist/vue.js";
import type { GridPoint } from "../repository/GridPoint";
import type { GridSide } from "../repository/GridSide";
import type { HexPoint, HexSide } from "./Enums";

export type HexSides = Partial<{
    [key in HexSide]: Ref<GridSide>;
}>

export type HexPoints = {
    [key in HexPoint]: GridPoint;
}