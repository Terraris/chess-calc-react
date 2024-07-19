export class ChessBoardUtils {

    generateBoardNotations(boardSize: number): { files: string[], ranks: string[] } {
        const files = this.generateFiles(boardSize);
        const ranks = this.generateRanks(boardSize);
        return { files, ranks };
    }

    private generateFiles(boardSize: number): string[] {
        return Array.from({ length: boardSize }, (_, index) =>
            String.fromCharCode('A'.charCodeAt(0) + index)
        );
    }

    private generateRanks(boardSize: number): string[] {
        return Array.from({ length: boardSize }, (_, index) =>
            (index + 1).toString()
        );
    }

    isCellOccupied(cellRow: number, cellColumn: number, pieceLocation: { row: number, column: number }): boolean {
        const { row: pieceRow, column: pieceColumn } = pieceLocation;
        return this.isSameLocation(cellRow, cellColumn, pieceRow, pieceColumn);
    }

    isCellUnderThreat(cellRow: number, cellColumn: number, threatenedCells: { row: number, column: number }[]): boolean {
        return threatenedCells.some(({ row: threatRow, column: threatColumn }) =>
            this.isSameLocation(cellRow, cellColumn, threatRow, threatColumn)
        );
    }

    private isSameLocation(row1: number, column1: number, row2: number, column2: number): boolean {
        return row1 === row2 && column1 === column2;
    }
}