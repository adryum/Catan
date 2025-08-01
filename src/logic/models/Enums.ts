export enum PlayerTeam {
    None,
    Blue,
    Red,
    Green,
}

export enum GamePiece {
    None,
    Wall,
    Tower,
    Vilage,
    Mansion
}

export enum HexPoint {
    Top = 0,
    TopRight = 1,
    BottomRight = 2,
    Bottom = 3,
    BottomLeft = 4,
    TopLeft = 5
}

export enum HexSide {
    None,
    Right = 0,
    BottomRight = 1,
    BottomLeft = 2,
    Left = 3,
    TopLeft = 4,
    TopRight = 5,
}

export enum HexConnection {
    Triangle,
    ReverseTriangle
}

export enum NeighbourHex {
    First,
    Second,
    Third
}