import { PlayerTeam, type HexPoint,  GamePiece } from "../models/Enums";


export class HexPointInfo {
    team: PlayerTeam = PlayerTeam.None;
    point: HexPoint;
    piece: GamePiece;

    constructor(point: HexPoint, team: PlayerTeam = PlayerTeam.None, piece: GamePiece = GamePiece.None) {
        this.team = team;
        this.point = point;
        this.piece = piece;
    }

    isPlaced() {
        return this.piece != GamePiece.None 
    }

    getPieceImage(): string {
        switch (this.piece) {
            case GamePiece.None:
                return ''
                
            case GamePiece.Tower:
                return '/src/assets/images/tower.svg'
            case GamePiece.Vilage:
                return ''
            case GamePiece.Mansion:
                return ''
            
            default:
                return ''

        }
    }
}




