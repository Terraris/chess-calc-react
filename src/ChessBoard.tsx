import {ChessBoardUtils} from './ChessBoardUtils';
import React from 'react';
import {ChessResult} from "./types";

interface ChessBoardProps {
    result: ChessResult;
}

const ChessBoard: React.FC<ChessBoardProps> = ({result}) => {
    const boardUtils = new ChessBoardUtils();
    const board = result.board;

    const {files, ranks} = boardUtils.generateBoardNotations(board.size);

    return (
        <div className='chess-board justify-content-md-center'
             style={{gridTemplateColumns: `repeat(${board.size + 1}, 1fr)`}}>
            <div></div>
            {ranks.map(rank => (
                <div key={rank}>{rank}</div>
            ))}
            {Array.from({length: board.size * board.size}, (_, i) => {
                const row = board.size - 1 - Math.floor(i / board.size);
                const col = board.size - 1 - (i % board.size);
                const colFile = i % board.size;
                let extraClass = '';

                if (boardUtils.isCellOccupied(row, col, board.occupiedLocation)) {
                    extraClass = 'piece';
                } else if (boardUtils.isCellUnderThreat(row, col, board.cellsUnderThreat)) {
                    extraClass = 'threat';
                }
                return (
                    <React.Fragment key={i}>
                        {colFile === 0 && <div>{files[row]}</div>}
                        <div className={`chess-cell ${extraClass}`}/>
                    </React.Fragment>
                );
            })}
        </div>
    )
};

export default ChessBoard;