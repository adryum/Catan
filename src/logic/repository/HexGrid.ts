import { ref, type Ref } from "vue";
import { GridPoint } from "./GridPoint";
import { getDistance, loopThroughEnums } from "../utils/Utils";
import { Hex } from "./Hex";
import type { HexSides } from "../models/Types";
import  { HexSide, HexPoint, HexConnection, NeighbourHex } from "../models/Enums";
import type { ITwoDCoords, IHexBasePoint, IHexBaseSide, IIndentedRow } from "../models/Interfaces";
import  { SideGroup } from "../view/SideGroup";
import { PointGroup } from "../view/PointGroup";

export class HexGrid {
    // anchorElement: Element
    gridSize: ITwoDCoords

    tileSizePx: number
    tileInnerRadiuss: number
    tileOuterRadiuss: number
    
    gridPoints!: Ref<GridPoint[]>
    hexTiles!: IIndentedRow[]

    interactableGridPoint!: Ref<PointGroup[]>
    interactableGridSides!: Ref<SideGroup[]>

    constructor(gridSize: ITwoDCoords, tileSizePx: number) {
        // anchorElement: Element,
        // this.anchorElement = anchorElement
        this.tileSizePx = tileSizePx
        this.gridSize = gridSize

        this.tileOuterRadiuss = tileSizePx / 2
        this.tileInnerRadiuss = this.tileOuterRadiuss * Math.sqrt(3) / 2

        this.generateTiles()
        this.setTileLeftTopPosition()
        this.combineCommonHexSides()
        this.generateGridPoints()
        this.setCommonHexPoints()

        this.interactableGridPoint = ref([])
        this.interactableGridSides = ref([])
    }

    setPointReferencesToGridSides() {
        this.gridPoints.value.forEach(point => {
            point.giveReferenceToNeighbouringGridSides()
        })
    }

    generateTiles() {
        this.hexTiles = []

        for (let y = 0; y < this.gridSize.y; y++) {
            // need to make array in each row and only then put values into that array
           
            const indentedRow: IIndentedRow = {
                indentation: y % 2,
                arr: []    
            }

            this.hexTiles[y] = indentedRow
            for (let x = 0; x < this.gridSize.x; x++) {
                this.hexTiles[y].arr[x] = new Hex({x, y}, this.tileSizePx)
            }
        }

        // console.log('hex tiles: ')
        console.log(this.hexTiles);
    }

    setCommonHexPoints() {
        this.gridPoints.value.forEach(point => {
            if (point.type === HexConnection.Triangle) {
                point.getHex(NeighbourHex.First)?.setPoint(point, HexPoint.BottomLeft)
                point.getHex(NeighbourHex.Second)?.setPoint(point, HexPoint.Top)
                point.getHex(NeighbourHex.Third)?.setPoint(point, HexPoint.BottomRight)
            } else {
                point.getHex(NeighbourHex.First)?.setPoint(point, HexPoint.Bottom)
                point.getHex(NeighbourHex.Second)?.setPoint(point, HexPoint.TopLeft)
                point.getHex(NeighbourHex.Third)?.setPoint(point, HexPoint.TopRight)
            }
        })
    }

    combineCommonHexSides() {
        this.hexTiles.forEach((indentRow, y) => {
            indentRow.arr.forEach((hex, x) => {
                var hexSides: HexSides = {} as HexSides
                var neighbour: Hex | null

                neighbour = this.getNeighbouringHex(hex, HexSide.TopLeft)
                if (neighbour) {
                    hexSides[HexSide.TopLeft] = neighbour.getSide(HexSide.BottomRight)
                }

                neighbour = this.getNeighbouringHex(hex, HexSide.Left)
                if (neighbour) {
                    hexSides[HexSide.Left] = neighbour.getSide(HexSide.Right)
                }

                neighbour = this.getNeighbouringHex(hex, HexSide.BottomLeft)
                if (neighbour) {
                    hexSides[HexSide.BottomLeft] = neighbour.getSide(HexSide.TopRight)
                }

                // console.log('----hex-----');
                
                // console.log(hexSides[HexSide.TopLeft]);
                // console.log(hexSides[HexSide.Left]);
                // console.log(hexSides[HexSide.BottomLeft]);
                
                
                // hex.setSides(hexSides)
            })
        })

        // test
        // const refSides: HexGamePieceInfo[] = []
        // this.hexTiles.forEach((indentedRow) => {
        //     indentedRow.arr.forEach((hex) => {
        //         loopThroughEnums(HexSide, val => {
        //             if (!refSides.includes(hex.sides[val])) {
        //                 refSides.push(hex.sides[val])
        //             }
        //         })
        //     })
        // })

        // console.log('All sides in grid:', refSides);
    }

    generateGridPoints() {
        const distanceBetweenPoints = 1
        this.gridPoints = ref([])

        this.hexTiles.forEach(indentedRow => {
            indentedRow.arr.forEach(hex => {
                console.log('-------------------new hex ---------------------');
                
                loopThroughEnums(HexPoint, (value) => {
                    const newPointCoords = hex.getAbsolutePointCoords(value)
                    var point: GridPoint

                    // it skips it somewhere here

                    // if there's another point nearby
                    if (this.gridPoints.value.some(point => {
                            if (getDistance(point.coords, newPointCoords) < distanceBetweenPoints) {
                                point.addHex(hex)
                                return true
                            }
                    })) {
                
                        return
                    }

                    switch (value) {
                        case HexPoint.Top: 
                        case HexPoint.BottomRight:
                        case HexPoint.BottomLeft:
                            point = new GridPoint(HexConnection.Triangle, newPointCoords)
                            point.addHex(hex)
                            this.gridPoints.value.push(point)

                            break;

                        case HexPoint.TopRight:
                        case HexPoint.Bottom:
                        case HexPoint.TopLeft:
                            point = new GridPoint(HexConnection.ReverseTriangle, newPointCoords)
                            point.addHex(hex)
                            this.gridPoints.value.push(point)
                            break;

                        default:
                            console.error(value, ' - didnt trigger');
                            break;
                    }
                })
            });
        })

        this.gridPoints.value.forEach(point => {
            console.table(point.hexes);
            
        })

        console.log(this.gridPoints);
    }

    setTileLeftTopPosition() {
        this.hexTiles.forEach(indentedRow => {
            indentedRow.arr.forEach(hex => {
                const top = hex.keyInGrid.y * 3/2 * hex.outerRadiuss
                const left = hex.outerRadiuss * indentedRow.indentation + hex.keyInGrid.x * hex.outerRadiuss * 2 
                hex.setLeftTopPosition({x: left, y: top})
                hex.instantiateSides()
            })
        })
    }

    generateInteractablePointsCoords() {
        // points above ui that can be clicked
        this.interactableGridPoint.value = []

        this.hexTiles.forEach(indentedRow => {
            indentedRow.arr.forEach(hex => {
                loopThroughEnums(HexPoint, val => {
                    const connection: IHexBasePoint = {
                        coords: hex.getAbsolutePointCoords(val),
                        hex: hex,
                        point: val
                    }

                    addPointToGridArray(this.interactableGridPoint.value, connection)
                })
            });
        })
    }

    generateInteractableSideCoords() {
        // points above ui that can be clicked
        this.interactableGridSides.value = []

        this.hexTiles.forEach(indentedRow => {
            indentedRow.arr.forEach(hex => {
                loopThroughEnums(HexSide, val => {
                    const connection: IHexBaseSide = {
                        coords: hex.getAbsoluteSidesCoords(val),
                        hex: hex,
                        side: val
                    }

                    addSideToGridArray(this.interactableGridSides.value, connection)
                })
            });
        })
    }

    getNeighbouringHex(hex: Hex, side: HexSide): Hex | null {
        const hexPos = hex.keyInGrid
        const myIndentation = this.hexTiles[hexPos.y].indentation * 0.5
        var neighboursY: number
        var theirIndentation: number
        var neighbourHexesX: number

        switch (side) {
            case HexSide.Left:
                return this.tryGetHexFromArray(hexPos.y, hexPos.x - 1)

            case HexSide.Right:
                return this.tryGetHexFromArray(hexPos.y, hexPos.x + 1)

            case HexSide.TopLeft:
                neighboursY = hexPos.y - 1
                if (!this.isYInRange(neighboursY)) return null

                theirIndentation = this.hexTiles[neighboursY].indentation * 0.5
                neighbourHexesX = hexPos.x + myIndentation - theirIndentation - 0.5

                return this.tryGetHexFromArray(neighboursY, neighbourHexesX)

            case HexSide.TopRight:
                neighboursY = hexPos.y - 1
                if (!this.isYInRange(neighboursY)) return null

                theirIndentation = this.hexTiles[neighboursY].indentation * 0.5
                neighbourHexesX = hexPos.x + myIndentation - theirIndentation - 0.5
                
                return this.tryGetHexFromArray(neighboursY, neighbourHexesX + 1)

            case HexSide.BottomLeft:
                neighboursY = hexPos.y + 1
                if (!this.isYInRange(neighboursY)) return null

                theirIndentation = this.hexTiles[neighboursY].indentation * 0.5
                neighbourHexesX = hexPos.x + myIndentation - theirIndentation - 0.5
                    
                return this.tryGetHexFromArray(neighboursY, neighbourHexesX)

            case HexSide.BottomRight:
                neighboursY = hexPos.y + 1
                if (!this.isYInRange(neighboursY)) return null

                theirIndentation = this.hexTiles[neighboursY].indentation * 0.5
                neighbourHexesX = hexPos.x + myIndentation - theirIndentation - 0.5
                    
                return this.tryGetHexFromArray(neighboursY, neighbourHexesX + 1)
            default:
                console.error("stuff went south");
                return null
        }
    }

    isYInRange(y: number) {
        return y >= 0 && y < this.hexTiles.length
    }

    tryGetHexFromArray(y: number, x: number): Hex | null {
        if (y >= this.hexTiles.length || y < 0) return null

        if (x >= this.hexTiles[y].arr.length || x < 0) return null

        return this.hexTiles[y].arr[x]
    }
}

function addPointToGridArray(pointGroups: PointGroup[], connection: IHexBasePoint) {
    console.log(connection);
    
    if (pointGroups.some(e => e.tryAddPoint(connection))) return

    pointGroups.push(new PointGroup(connection))
}

function addSideToGridArray(sideGroups: SideGroup[], connection: IHexBaseSide) {
    console.log(connection);
    
    if (sideGroups.some(e => e.tryAddSide(connection))) return

    sideGroups.push(new SideGroup(connection))
}