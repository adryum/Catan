import type { GridSide } from "../repository/GridSide";
import type { Hex } from "../repository/Hex";
import type { GamePiece, HexPoint, HexSide, PlayerTeam } from "./Enums";

export interface IHexBase {
    hex: Hex,
    coords: ITwoDCoords
}

export interface IHexBasePoint extends IHexBase {
    point: HexPoint,
}

export interface IHexBaseSide extends IHexBase {
    side: HexSide,
}

export interface ITwoDCoords {
    x: number,
    y: number
}

export interface IIndentedRow {
    indentation: number,
    arr: Hex[]
} 

export interface IGridSideResponse {
    hasNoHexesForSide: boolean,
    side: GridSide | undefined
} 

export function isSamePoint(point1: ITwoDCoords, point2: ITwoDCoords) {
    return point1.x === point2.x && point1.y === point2.y
}

export function containsPoint(arr: ITwoDCoords[], point: ITwoDCoords): boolean {
  return arr.some(p => isSamePoint(p, point));
}

export interface IGamePiece {
    piece: GamePiece,
    team: PlayerTeam,
}

export interface IPlayer {
    name: string,
    team: PlayerTeam
}

export interface ILongestRoad {
    team: PlayerTeam
    length: number
}
