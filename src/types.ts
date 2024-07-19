export interface PieceLocation {
    row: number;
    column: number;
}

export interface ChessBoard {
    size: number;
    cellsUnderThreat: PieceLocation[];
    occupiedLocation: PieceLocation;
}

export interface Piece {
    pieceType: string;
}

export interface ChessResult {
    id: string;
    threats: number;
    piece: Piece;
    location: PieceLocation;
    board: ChessBoard;
}