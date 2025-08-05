import { GamePiece, NeighbourHex, PlayerTeam } from "../models/Enums"
import type { ILongestRoad, IPlayer, ITwoDCoords } from "../models/Interfaces"
import { loopThroughEnums } from "../utils/Utils"
import type { GridPoint } from "./GridPoint"
import type { GridSide } from "./GridSide"
import { HexGrid } from "./HexGrid"
import type { PiecePositionOnHex } from "./PiecePositionOnHex"

export class GameManager {
    placedPieces: Map<PlayerTeam, IPieces>
    players: IPlayer[]
    grid: HexGrid
    longestRoad: ILongestRoad = { team: PlayerTeam.None, length: 0 }

    constructor(
        gridSize: ITwoDCoords
    ) {
        this.grid = new HexGrid(gridSize, 200);
        this.players = [{name: 'pablo', team: PlayerTeam.Red}, {name: 'bruno', team: PlayerTeam.Green}];
        this.placedPieces = new Map();
    }

    setPiece(piece: GamePiece, team: PlayerTeam, partOfHex: PiecePositionOnHex) {
        if (!partOfHex.hasPiece()) {
            partOfHex.setGamePiece({piece, team})

            // need to calculate for every team :() intersection...
            this.longestRoad = this.calculateLongestRoad()
        }
    }

    calculateLongestRoad(): ILongestRoad {

        const pathLength: ILongestRoad[] = []
            
        this.players.forEach(player => {
            const road = this.calculateTeamRoadLength(player.team)
            
            pathLength.push(road)
        });

        // sort two biggest numbers in front
        pathLength.sort((a, b) => b.length - a.length);

        if (pathLength[0].length === pathLength[1].length) {
            return { team: PlayerTeam.None, length: 0 }
        }

        return {
            team: pathLength[0].team,
            length: pathLength[0].length
        } 
    }

    calculateTeamRoadLength(team: PlayerTeam): ILongestRoad  {
        const road: ConnectedPiece[] = []
        console.log(this.placedPieces);

        const teamPieces = this.placedPieces.get(team)
        
        if (!teamPieces) {
            return { team: PlayerTeam.None, length: 0 }
        }

        var firstPointPiece = teamPieces.pointPiece[0]!

        // go for all sides
        const startingSides = findExistingSide(firstPointPiece, team)
        const pathLength: number[] = []
        
        startingSides.forEach(side => {
            // get only path count
            var pathCount = 0
            findLongestPath(firstPointPiece, side, road).forEach(piece => {
                if (piece instanceof Wall) {
                    pathCount++
                }
            })
            pathLength.push(pathCount)
        });

        // sort two biggest numbers in front
        pathLength.sort((a, b) => b - a);
        return {
            team: team,
            length: pathLength[0] + pathLength[1]
        } 

        // will go in loops if connects in circle
        function findLongestPath(point: GridPoint, sideToGoTo: GridSide, currentPath: ConnectedPiece[]): ConnectedPiece[] {
            const myPath: ConnectedPiece[] = []

            var longestSidePath: ConnectedPiece[] | undefined
            var longestSidePathsInterection: ConnectedPiece | undefined

            var previousSide = sideToGoTo
            var sidePath: GridSide | undefined
            var currPoint = previousSide.getOtherPoint(point)

            while (true) {
                const existingSides = findExistingSide(currPoint, team)

                if (existingSides.length === 3) {
                    const intersectionPoint = new IntersectionPoint(currPoint)
                    myPath.push(intersectionPoint)
                    
                    sidePath = getSideNotIn([previousSide], existingSides)!
                    const sidePathResult = findLongestPath(currPoint, sidePath, myPath)

                    if (!longestSidePath) {
                        longestSidePath = sidePathResult
                        longestSidePathsInterection = intersectionPoint
                    } else {
                        if (longestSidePath.length > sidePathResult.length) {
                            longestSidePath = sidePathResult
                            longestSidePathsInterection = intersectionPoint
                        }
                    }
                } else {
                    road.push(new Point(currPoint))
                }

                // return
                if (existingSides.length === 1 
                    || isPathLooping(currentPath.concat(myPath)) 
                    || isPathIntercepted(myPath[myPath.length - 1], team)
                ) {
                    const sidePathLengthFromIntersection = (longestSidePath) 
                    ? getPieceCountInfrontOfPiece(longestSidePathsInterection!, longestSidePath) 
                    : -1
                    const mainPathLengthFromIntersection = getPieceCountInfrontOfPiece(longestSidePathsInterection!, longestSidePath!)
                    
                    if (sidePathLengthFromIntersection < mainPathLengthFromIntersection) {
                        return currentPath.concat(myPath)
                    } else {
                        return currentPath.concat(longestSidePath!)
                    }
                }

                const nextSide = getSideNotIn(
                    (sidePath) ? [sidePath, previousSide] : [previousSide], 
                    existingSides
                )!
                myPath.push(new Wall(nextSide))
                currPoint = nextSide.getOtherPoint(currPoint)
            }

        }

        function isPathIntercepted(point: ConnectedPiece, myTeam: PlayerTeam) {
            if (point instanceof Point || point instanceof IntersectionPoint) {
                if (point.hexPoint.getGamePiece().team != myTeam) {
                    return true
                }
            } else {
                console.error('Interception --- piece was not a point');
            }

            return false
        }

        function isPathLooping(path: ConnectedPiece[]) {
            const lastPiece = path[path.length - 1]

            if (!(lastPiece instanceof Point || lastPiece instanceof IntersectionPoint)) {
                console.error('lastPiece was not a point!');
            }
            
            for (let i = 0; i < path.length - 1; i++) {
                const piece = path[i]

                if (
                    (piece instanceof Point || piece instanceof IntersectionPoint)
                    && (lastPiece instanceof Point || lastPiece instanceof IntersectionPoint)
                ) {
                    if (piece.hexPoint === lastPiece.hexPoint) {
                        return true
                    }
                }
            }

            return false
        }

        function getPieceCountInfrontOfPiece(piece: ConnectedPiece, pieces: ConnectedPiece[]): number {
            return pieces.length - 1 - pieces.indexOf(piece)
        }

        function getSideNotIn(sides: GridSide[], existingSides: GridSide[]): GridSide | null {
            existingSides.forEach(existingSide => {
                if (!sides.includes(existingSide))
                    return existingSide
            })

            console.error('couldnt find new side!');
            return null
        }

        function findExistingSide(point: GridPoint, team: PlayerTeam) {
            const sides: GridSide[] = []
            loopThroughEnums(NeighbourHex, val => {
                const response = point.getSideResponse(val)
                if (response.side && response.side.getGamePiece().team === team) {
                    sides.push(response.side)
                }
            })

            return sides
        }
    }
}

class ConnectedPiece {
    constructor() {
    

    }
}

class IntersectionPoint extends ConnectedPiece { 
    hexPoint: GridPoint

    constructor(hexPoint: GridPoint) {
        super()
        this.hexPoint = hexPoint
     

    }
}

class Point extends ConnectedPiece { 
    hexPoint: GridPoint

    constructor(hexPoint: GridPoint) {
        super()
        this.hexPoint = hexPoint
     

    }
}

class Wall extends ConnectedPiece { 
    hexSide: GridSide
    constructor(hexSide: GridSide) {
        super()
        this.hexSide = hexSide

    }
}

export interface IPieces {
    pointPiece: GridPoint[]
    sidePieces: GridSide[]
}
