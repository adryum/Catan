import type { HexPoint } from "./Hex";

export class TilePointInfo {
    team: PlayerTeam = PlayerTeam.None;
    point: HexPoint;
    piece: GamePiece;

    constructor(team: PlayerTeam, point: HexPoint, piece: GamePiece) {
        this.team = team;
        this.point = point;
        this.piece = piece;
    }

    isPlaced() {
        return this.piece != GamePiece.None 
    }
}



enum PlayerTeam {
    None,
    Blue,
    Red,
    Green,
}

enum GamePiece {
    None,
    Vilage,
    Mansion
}
