import { HexConnection, NeighbourHex,  HexSide } from "../models/Enums"
import type { ITwoDCoords } from "../models/Interfaces"
import type { Hex } from "./Hex"
import type { HexGamePieceInfo } from "./HexSideInfo"

export class GridPoint {
    type: HexConnection
    coords: ITwoDCoords
    hexes!: Hex[]

    constructor(type: HexConnection, coords: ITwoDCoords) {
        this.type = type
        this.coords = coords
    }

    addHex(hex: Hex) {
        var rect = hex.parentElement.getBoundingClientRect()

        if (this.type === HexConnection.Triangle) {
            if (rect.left > this.coords.x) {
                this.hexes[NeighbourHex.First] = hex
            } else if (rect.realTop > this.coords.y) {
                this.hexes[NeighbourHex.Second] = hex
            } else {
                this.hexes[NeighbourHex.Third] = hex
            }
        } else {
            if (rect.realTop < this.coords.y) {
                this.hexes[NeighbourHex.First] = hex
            } else if (rect.left > this.coords.x) {
                this.hexes[NeighbourHex.Second] = hex
            } else {
                this.hexes[NeighbourHex.Third] = hex
            }
        }
    }

    getSide(clockwiseNumber: NeighbourHex): HexGamePieceInfo | null {
        // we want to pass sides reference so we can modify it
        if (this.type === HexConnection.Triangle) {
            if (clockwiseNumber === NeighbourHex.First) {
                if (this.hexes[NeighbourHex.First]) {
                    return this.hexes[NeighbourHex.First].getSide(HexSide.Left)
                } else if (this.hexes[NeighbourHex.Third]) {
                    return this.hexes[NeighbourHex.Third].getSide(HexSide.Right)
                }

                return null
            } else if (clockwiseNumber === NeighbourHex.Second) {
                if (this.hexes[NeighbourHex.First]) {
                    return this.hexes[NeighbourHex.First].getSide(HexSide.BottomLeft)
                } else if (this.hexes[NeighbourHex.Second]) {
                    return this.hexes[NeighbourHex.Second].getSide(HexSide.TopRight)
                }

                return null
            } else if (clockwiseNumber === NeighbourHex.Third) {
                if (this.hexes[NeighbourHex.Second]) {
                    return this.hexes[NeighbourHex.Second].getSide(HexSide.TopLeft)
                } else if (this.hexes[NeighbourHex.Third]) {
                    return this.hexes[NeighbourHex.Third].getSide(HexSide.BottomRight)
                }

                return null
            }
        } else {
            if (clockwiseNumber === NeighbourHex.First) {
                if (this.hexes[NeighbourHex.First]) {
                    return this.hexes[NeighbourHex.First].getSide(HexSide.BottomRight)
                } else if (this.hexes[NeighbourHex.Second]) {
                    return this.hexes[NeighbourHex.Second].getSide(HexSide.TopLeft)
                }

                return null
            } else if (clockwiseNumber === NeighbourHex.Second) {
                if (this.hexes[NeighbourHex.Second]) {
                    return this.hexes[NeighbourHex.Second].getSide(HexSide.Left)
                } else if (this.hexes[NeighbourHex.Third]) {
                    return this.hexes[NeighbourHex.Third].getSide(HexSide.Right)
                }

                return null
            } else if (clockwiseNumber === NeighbourHex.Third) {
                if (this.hexes[NeighbourHex.Second]) {
                    return this.hexes[NeighbourHex.Second].getSide(HexSide.TopRight)
                } else if (this.hexes[NeighbourHex.Third]) {
                    return this.hexes[NeighbourHex.Third].getSide(HexSide.BottomLeft)
                }

                return null
            }
        }

        console.error('Theres no side!')
        return null
    }
}


