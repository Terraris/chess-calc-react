// ChessBoard.tsx
import React from 'react';
import {ChessResult} from './App';

interface ChessBoardProps {
    result: ChessResult;
}

const ChessBoard: React.FC<ChessBoardProps> = ({result}) => {
    const board = result.board;

    // Define notations
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"]; // For different board sizes, generate this dynamically
    const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"]; // For different board sizes, generate this dynamically

    return (
        <div className='chess-board justify-content-md-center'
             style={{gridTemplateColumns: `repeat(${board.size + 1}, 1fr)`}}> {/* board size + 1 for the rank file column*/}
            {/* Render rank header */}
            <div></div>
            {/* Empty corner cell */}
            {ranks.map(rank => (
                <div key={rank}>{rank}</div>
            ))}

            {Array.from({length: board.size * board.size}, (_, i) => {
                const row = board.size - 1 - Math.floor(i / board.size);
                const col = board.size - 1 - (i % board.size); // subtract column from board size
                const colFile = i % board.size;
                let extraClass = '';

                if (row === board.occupiedLocation.row && col === board.occupiedLocation.column) {
                    extraClass = 'piece';
                } else if (board.cellsUnderThreat.some(cell => cell.row === row && cell.column === col)) {
                    extraClass = 'threat';
                }

                return (
                    <React.Fragment key={i}>
                        {/* Render file name at the start of each row */}
                        {colFile === 0 && <div>{files[row]}</div>}

                        <div className={`chess-cell ${extraClass}`}/>
                    </React.Fragment>
                );
            })}
        </div>
    )
};

export default ChessBoard;