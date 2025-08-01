import  { PlayerTeam, HexSide, GamePiece } from "../models/Enums";


export class TileSideInfo {
    team: PlayerTeam = PlayerTeam.None;
    side: HexSide;
    piece: GamePiece;

    constructor(side: HexSide, team: PlayerTeam = PlayerTeam.None, piece: GamePiece = GamePiece.None) {
        this.team = team;
        this.side = side;
        this.piece = piece;
    }

    isPlaced() {
        return this.piece != GamePiece.None 
    }

    getPieceImage(side: HexSide): string {
        switch (this.piece) {
            case GamePiece.None:
                return ''

            case GamePiece.Wall:
                if (side === HexSide.BottomLeft || side === HexSide.TopRight) {
                    console.log('WALL: left-bottom')
                    return '/src/assets/images/wallLeftBottom.svg'

                } else if (side === HexSide.TopLeft || side === HexSide.BottomRight) {
                    console.log('WALL: right-bottom')
                    return '/src/assets/images/wallRightBottom.svg'

                } else {
                    console.log('WALL: vertical')
                    return '/src/assets/images/wallVertical.svg'
                }

            default:
                return ''
        }
    }
}
