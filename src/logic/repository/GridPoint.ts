import { HexConnection, NeighbourHex,  HexSide, GamePiece, PlayerTeam } from "../models/Enums"
import type { IGamePiece, ITwoDCoords } from "../models/Interfaces"
import { loopThroughEnums } from "../utils/Utils"
import type { GridSide } from "./GridSide"
import type { Hex } from "./Hex"
import type { HexGamePieceInfo } from "./HexSideInfo"

export class GridPoint {
    type: HexConnection
    coords: ITwoDCoords
    hexes: Hex[]
    gamePiece: IGamePiece

    constructor(type: HexConnection, coords: ITwoDCoords) {
        this.type = type
        this.coords = coords
        this.hexes = []
        this.gamePiece = { 
            piece: GamePiece.None, 
            team: PlayerTeam.None 
        }
    }

    setGamePiece(piece: IGamePiece) {
        this.gamePiece = piece
    }

    getGamePiece() {
        return this.gamePiece
    }

    giveReferenceToNeighbouringGridSides() {
        loopThroughEnums(NeighbourHex, val => {
            this.getSide(val)?.setPoint(this)
        })
    }


    // left: 200px
    // poiint
    // y 150px;
    // .x 199.59292143521046px;

    addHex(hex: Hex) {
        if (this.type === HexConnection.Triangle) {
            if (this.coords.x < hex.center.x && this.coords.y > hex.center.y) {
                this.hexes[NeighbourHex.First] = hex
            } else if (hex.center.y > this.coords.y) {
                this.hexes[NeighbourHex.Second] = hex
            } else {
                if (this.hexes[NeighbourHex.Third]) console.error('third is reasigned!!')
                this.hexes[NeighbourHex.Third] = hex
            }
        } else {
            if (hex.center.y < this.coords.y) {
                this.hexes[NeighbourHex.First] = hex
            } else if (hex.center.x > this.coords.x) {
                this.hexes[NeighbourHex.Second] = hex
            } else {
                if (this.hexes[NeighbourHex.Third]) console.error('third is reasigned!!')
                this.hexes[NeighbourHex.Third] = hex
            }
        }
    }

    getHex(clockwiseNumber: NeighbourHex): Hex {
        return this.hexes[clockwiseNumber]
    }

    getSide(clockwiseNumber: NeighbourHex): GridSide | null {
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


