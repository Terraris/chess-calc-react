import React, { useState } from 'react';
import axios from 'axios';

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
  const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0); // Added a state for the current board index

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => setBoardSize(Number(e.target.value));
  const handlePieceChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPiece(e.target.value);

  const handleSimulate = async () => {
    console.log("piece: " + piece)
    const response = await axios.post(`http://localhost:8080/api/chess/simulate?piece=${piece}&size=${boardSize}`);
    const resultArray = Object.keys(response.data).map(key => ({
      id: key,
      ...response.data[key],
    }));

    // Sorts results based on the location of the piece (row then column)
    

    setResults(resultArray);
    setCurrentBoardIndex(0); // Set the current board index to 0 when simulate is clicked
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Added to render ranks

  const drawBoard = (resultIndex: number) => {
    if (!results || !(results[resultIndex])) return '';
    const { board, location } = results[resultIndex];
    const { size, cellsUnderThreat } = board;
  
    // Create an empty board
    const asciiBoard = Array(size).fill(null).map(() => Array(size).fill('-'));
  
    // Mark the piece's location
    asciiBoard[location.row][location.column] = 'P';
  
    // Mark cells under a threat
    cellsUnderThreat.forEach(({ row, column }) => {
     
        asciiBoard[row][column] = 'T';

    });
  
    // Convert the board to ASCII
    let output = asciiBoard.map((row, rowIndex) => `${rowIndex + 1} ${row.join(' ')}`).join('\n');
  
    // Adding the ranks (alphabets representing columns)
    output += '\n  ' + Array.from({length: size}, (_, i) => alphabet[i]).join(' ');
  
    return output;
  };

  return (
    <div className="App">
      <label>Board size: 
        <input type="number" onChange={handleBoardSizeChange} value={boardSize} />
      </label>
      <label>
        Piece:
        <select onChange={handlePieceChange} value={piece}>
          <option value='Knight'>Knight</option>
          <option value='Rook'>Rook</option>
        </select>
      </label>

      <button onClick={handleSimulate}>Simulate</button>

      <button onClick={() => setCurrentBoardIndex(prev => prev + 1)}>Next board</button>
      {results && (
        <div>
          Piece: {results[currentBoardIndex].piece.pieceType}
          Location: {results[currentBoardIndex].location.row}, {results[currentBoardIndex].location.column}
          Threat level: {results[currentBoardIndex].threats}
          <pre>{drawBoard(currentBoardIndex)}</pre>
        </div>
      )}
    </div>
  );
}