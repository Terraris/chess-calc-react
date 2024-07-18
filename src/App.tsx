import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface PieceLocation {
  row: number;
  column: number;
}

interface ChessBoard {
  size: number;
  cellsUnderThreat: PieceLocation[];
  occupiedLocation: PieceLocation;
}

interface Piece {
  pieceType: string;
}

interface ChessResult {
  id: string;
  threats: number;
  piece: Piece;
  location: PieceLocation;
  board: ChessBoard;
}

export default function App() {
  const [boardSize, setBoardSize] = useState<number>(8);
  const [piece, setPiece] = useState<string>('Knight');
  const [results, setResults] = useState<ChessResult[] | null>(null);
  const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => setBoardSize(Number(e.target.value));
  const handlePieceChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPiece(e.target.value);

  const handleSimulate = async () => {
    const response = await axios.post(`http://localhost:8080/api/chess/simulate?piece=${piece}&size=${boardSize}`);

    let resultArray = Object.keys(response.data).map(key => ({ id: key,...response.data[key]}));

    resultArray = resultArray.sort((a, b) => {
      if (a.location.row > b.location.row) {
        return 1;
      }
      if (a.location.row === b.location.row && a.location.column < b.location.column) {
        return 1;
      }
      return -1;
    });

    setResults(resultArray);
    setCurrentBoardIndex(0);
  };

  const drawBoard = (resultIndex: number) => {
    if (!results || !(results[resultIndex])) return null;
    let board = results[resultIndex].board;

    return (
        <div className='chess-board' style={{ gridTemplateColumns: `repeat(${board.size}, 1fr)` }}>
          {Array.from({ length: board.size * board.size }, (_, i) => {
            const row = board.size - 1 - Math.floor(i / board.size);
            const col = board.size - 1 - (i % board.size); // subtract column from board size
            let extraClass = '';

            if (row === board.occupiedLocation.row && col === board.occupiedLocation.column) {
              extraClass = 'piece';
            } else if (board.cellsUnderThreat.some(cell => cell.row === row && cell.column === col)) {
              extraClass = 'threat';
            }

            return <div key={i} className={`chess-cell ${extraClass}`} />;
          })}
        </div>
    );
  };

  return (
      <div className="App">
        <label>Board size:
          <input type="number" onChange={handleBoardSizeChange} value={boardSize}/>
        </label>
        <label>
          Piece:
          <select onChange={handlePieceChange} value={piece}>
            <option value='Knight'>Knight</option>
            <option value='Rook'>Rook</option>
          </select>
        </label>

        <button onClick={handleSimulate}>Simulate</button>

        <button
            onClick={() => {
              if (results && currentBoardIndex < results.length - 1) {
                setCurrentBoardIndex(prev => prev + 1)
              }
            }}
        >Next board
        </button>
        {results && (
            <div>
              <p>Piece: {results[currentBoardIndex].piece.pieceType}</p>
              <p>
                Location: {String.fromCharCode('H'.charCodeAt(0) - results[currentBoardIndex].location.column)},
                {results[currentBoardIndex].location.row + 1}
              </p>
              <p>Threat level: {results[currentBoardIndex].threats}</p>
              {drawBoard(currentBoardIndex)}
            </div>
        )}
      </div>
  );
}