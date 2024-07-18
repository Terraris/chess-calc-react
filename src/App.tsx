import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import ChessBoard from './ChessBoard';
import BoardControls from './BoardControls';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Col, Container, Row} from 'react-bootstrap';

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

export interface ChessResult {
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
        const response = await axios.get(`http://localhost:8080/api/chess/simulate?piece=${piece}&size=${boardSize}`);

        let resultArray = Object.keys(response.data).map(key => ({id: key, ...response.data[key]}));

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
        setCurrentBoardIndex(0);  // Reset to the first result
    };

    return (
        <Container className="App">
            <Row className="align-items-center mt-3 mb-3">
                <Col sm={12} md={3}>
                    <BoardControls
                        boardSize={boardSize}
                        piece={piece}
                        onBoardSizeChange={handleBoardSizeChange}
                        onPieceChange={handlePieceChange}
                        onSimulate={handleSimulate}
                    />
                </Col>

                <Col sm={12} md={3} className="d-flex justify-content-center">
                    <Button onClick={() => {
                        if (results && currentBoardIndex < results.length - 1) {
                            setCurrentBoardIndex(prev => prev + 1)
                        }
                    }}>Next board</Button>
                </Col>

                {results && (
                    <Col sm={12} md={6}>
                        <p>Piece: {results[currentBoardIndex].piece.pieceType}</p>
                        <p>
                            Location: {String.fromCharCode('H'.charCodeAt(0) - results[currentBoardIndex].location.column)},
                            {results[currentBoardIndex].location.row + 1}
                        </p>
                    </Col>
                )}

            </Row>

            {results && (
                <div>
                    <Row className="justify-content-md-center mt-3 mb-3">
                        <Col md="auto">
                            <ChessBoard result={results[currentBoardIndex]}/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-3 mb-3">
                        <Col md="auto">
                            <p>Threat level: {results[currentBoardIndex].threats}</p>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
}