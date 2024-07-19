export class ChessBoardUtils {

    generateChessNotations(size: number): { files: string[], ranks: string[] } {
        const files = Array.from({length: size}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
        const ranks = Array.from({length: size}, (_, i) => (i + 1).toString());
        return {files, ranks};
    }

    isCellContainsPiece(row: number, col: number, occupiedLocation: { row: number, column: number }): boolean {
        return row === occupiedLocation.row && col === occupiedLocation.column;
    }

    isCellUnderThreat(row: number, col: number, cellsUnderThreat: { row: number, column: number }[]): boolean {
        return cellsUnderThreat.some(cell => cell.row === row && cell.column === col);
    }
}