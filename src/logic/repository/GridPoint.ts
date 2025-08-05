import { HexConnection, NeighbourHex,  HexSide, GamePiece, PlayerTeam } from "../models/Enums"
import type { IGamePiece, IGridSideResponse, ITwoDCoords } from "../models/Interfaces"
import { loopThroughEnums } from "../utils/Utils"
import { GridSide } from "./GridSide"
import type { Hex } from "./Hex"
import { PiecePositionOnHex } from "./PiecePositionOnHex"

export class GridPoint extends PiecePositionOnHex {
    type: HexConnection
    hexes: Hex[]

    constructor(type: HexConnection, coords: ITwoDCoords, gamePiece: IGamePiece = { piece: GamePiece.None, team: PlayerTeam.None }) {
        super(coords, gamePiece)
        this.type = type
        this.hexes = []
    }

    createAdjacentSides() {
        loopThroughEnums(NeighbourHex, sideNumber => {

            if (this.type === HexConnection.Triangle) {
                if (sideNumber === NeighbourHex.First) {
                    var sideResponse = this.getSideResponse(sideNumber)
                    if (sideResponse.hasNoHexesForSide) return

                    if (!sideResponse.side) {
                        console.log('new side! - t up');
                        const leftHex = this.getHex(NeighbourHex.Third)
                        const rightHex = this.getHex(NeighbourHex.First)
                        var side: GridSide | undefined

                        if (leftHex) {
                            if (!side) {
                                side = new GridSide(leftHex.getAbsoluteSideCoords(HexSide.Right));
                            }
                            side.addHex(leftHex)
                            leftHex.setSide(HexSide.Right, side)
                        }

                        if (rightHex) {
                            if (!side) {
                                side = new GridSide(rightHex.getAbsoluteSideCoords(HexSide.Left));
                            }
                            side.addHex(rightHex)
                            rightHex.setSide(HexSide.Left, side)
                        } 

                        side!.addPoint(this)
                    } else {
                        sideResponse.side.addPoint(this)
                    }
                } else if (sideNumber === NeighbourHex.Second) {
                    var sideResponse = this.getSideResponse(sideNumber)
                    if (sideResponse.hasNoHexesForSide) return

                    if (!sideResponse.side) {
                        console.log('new side! - t R');
                        const leftHex = this.getHex(NeighbourHex.First)
                        const rightHex = this.getHex(NeighbourHex.Second)
                        var side: GridSide | undefined

                        if (leftHex) {
                            if (!side) {
                                side = new GridSide(leftHex.getAbsoluteSideCoords(HexSide.BottomLeft));
                            }
                            side.addHex(leftHex)
                            leftHex.setSide(HexSide.BottomLeft, side)
                        }

                        if (rightHex) {
                            if (!side) {
                                side = new GridSide(rightHex.getAbsoluteSideCoords(HexSide.TopRight));
                            }
                            side.addHex(rightHex)
                            rightHex.setSide(HexSide.TopRight, side)
                        } 

                        side!.addPoint(this)
                    } else {
                        sideResponse.side.addPoint(this)
                    }
                } else {
                    var sideResponse = this.getSideResponse(sideNumber)
                    if (sideResponse.hasNoHexesForSide) return

                    if (!sideResponse.side) {
                        console.log('new side! - t L');
                        const leftHex = this.getHex(NeighbourHex.Second)
                        const rightHex = this.getHex(NeighbourHex.Third)
                        var side: GridSide | undefined

                        if (leftHex) {
                            if (!side) {
                                side = new GridSide(leftHex.getAbsoluteSideCoords(HexSide.TopLeft));
                            }
                            side.addHex(leftHex)
                            leftHex.setSide(HexSide.TopLeft, side)
                        }

                        if (rightHex) {
                            if (!side) {
                                side = new GridSide(rightHex.getAbsoluteSideCoords(HexSide.BottomRight));
                            }
                            side.addHex(rightHex)
                            rightHex.setSide(HexSide.BottomRight, side)
                        } 

                        side!.addPoint(this)
                    } else {
                        sideResponse.side.addPoint(this)
                    }
                }
            } else {
                if (sideNumber === NeighbourHex.First) {
                    var sideResponse = this.getSideResponse(sideNumber)
                    if (sideResponse.hasNoHexesForSide) return

                    if (!sideResponse.side) {
                        console.log('new side! - r R');
                        const leftHex = this.getHex(NeighbourHex.First)
                        const rightHex = this.getHex(NeighbourHex.Second)
                        var side: GridSide | undefined

                        if (leftHex) {
                            if (!side) {
                                side = new GridSide(leftHex.getAbsoluteSideCoords(HexSide.BottomRight));
                            }
                            side.addHex(leftHex)
                            leftHex.setSide(HexSide.BottomRight, side)
                        }

                        if (rightHex) {
                            if (!side) {
                                side = new GridSide(rightHex.getAbsoluteSideCoords(HexSide.TopLeft));
                            }
                            side.addHex(rightHex)
                            rightHex.setSide(HexSide.TopLeft, side)
                        } 
                    
                        side!.addPoint(this)
                    } else {
                        sideResponse.side.addPoint(this)
                    }
                } else if (sideNumber === NeighbourHex.Second) {
                    var sideResponse = this.getSideResponse(sideNumber)
                    if (sideResponse.hasNoHexesForSide) return

                    if (!sideResponse.side) {
                        console.log('new side! - r down');
                        
                        const leftHex = this.getHex(NeighbourHex.Second)
                        const rightHex = this.getHex(NeighbourHex.Third)
                        var side: GridSide | undefined

                        if (leftHex) {
                            if (!side) {
                                side = new GridSide(leftHex.getAbsoluteSideCoords(HexSide.Left));
                            }
                            side.addHex(leftHex)
                            leftHex.setSide(HexSide.Left, side)
                        }

                        if (rightHex) {
                            if (!side) {
                                side = new GridSide(rightHex.getAbsoluteSideCoords(HexSide.Right));
                            }
                            side.addHex(rightHex)
                            rightHex.setSide(HexSide.Right, side)
                        } 
                    
                        side!.addPoint(this)
                    } else {
                        sideResponse.side.addPoint(this)
                    }
                } else {
                    var sideResponse = this.getSideResponse(sideNumber)
                    if (sideResponse.hasNoHexesForSide) return

                    if (!sideResponse.side) {
                        console.log('new side! - r LEft');
                        const leftHex = this.getHex(NeighbourHex.Third)
                        const rightHex = this.getHex(NeighbourHex.First)
                        var side: GridSide | undefined

                        if (leftHex) {
                            if (!side) {
                                side = new GridSide(leftHex.getAbsoluteSideCoords(HexSide.TopRight));
                            }
                            side.addHex(leftHex)
                            leftHex.setSide(HexSide.TopRight, side)
                        }

                        if (rightHex) {
                            if (!side) {
                                side = new GridSide(rightHex.getAbsoluteSideCoords(HexSide.BottomLeft));
                            }
                            side.addHex(rightHex)
                            rightHex.setSide(HexSide.BottomLeft, side)
                        } 
                    
                        side!.addPoint(this)
                    } else {
                        sideResponse.side.addPoint(this)
                    }
                }
            }
        })
    }

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
        // works flawlesly
        return this.hexes[clockwiseNumber]
    }

    getSideResponse(sideNumber: NeighbourHex): IGridSideResponse {
        // we want to pass sides reference so we can modify it
        if (this.type === HexConnection.Triangle) {
            if (sideNumber === NeighbourHex.First) {
                if (this.hexes[NeighbourHex.First]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.First].getSide(HexSide.Left) } 
                } else if (this.hexes[NeighbourHex.Third]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Third].getSide(HexSide.Right) } 
                } else {
                    return { hasNoHexesForSide: true, side: undefined }
                }
            } else if (sideNumber === NeighbourHex.Second) {
                if (this.hexes[NeighbourHex.First]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.First].getSide(HexSide.BottomLeft) }
                } else if (this.hexes[NeighbourHex.Second]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Second].getSide(HexSide.TopRight) }
                } else {
                    return { hasNoHexesForSide: true, side: undefined }
                }
            } else if (sideNumber === NeighbourHex.Third) {
                if (this.hexes[NeighbourHex.Second]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Second].getSide(HexSide.TopLeft) }
                } else if (this.hexes[NeighbourHex.Third]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Third].getSide(HexSide.BottomRight) }
                } else {
                    return { hasNoHexesForSide: true, side: undefined }
                }
            }
        } else {
            if (sideNumber === NeighbourHex.First) {
                if (this.hexes[NeighbourHex.First]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.First].getSide(HexSide.BottomRight) }
                } else if (this.hexes[NeighbourHex.Second]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Second].getSide(HexSide.TopLeft) }
                } else {
                    return { hasNoHexesForSide: true, side: undefined }
                }
            } else if (sideNumber === NeighbourHex.Second) {
                if (this.hexes[NeighbourHex.Second]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Second].getSide(HexSide.Left) }
                } else if (this.hexes[NeighbourHex.Third]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Third].getSide(HexSide.Right) }
                } else {
                    return { hasNoHexesForSide: true, side: undefined }
                }
            } else if (sideNumber === NeighbourHex.Third) {
                if (this.hexes[NeighbourHex.First]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.First].getSide(HexSide.BottomLeft) }
                } else if (this.hexes[NeighbourHex.Third]) {
                    return { hasNoHexesForSide: false, side: this.hexes[NeighbourHex.Third].getSide(HexSide.TopRight) }
                } else {
                    return { hasNoHexesForSide: true, side: undefined }
                }
            }
        }

        console.error('Theres no side!')
        return { hasNoHexesForSide: true, side: undefined }
    }
}


