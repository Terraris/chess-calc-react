import React from 'react';
import {ChessResult} from "./types";
import {Col, Row} from 'react-bootstrap';
import ChessBoard from './ChessBoard';

interface ResultsProps {
    results: ChessResult[];
    currentBoardIndex: number;
    totalThreats: number;
    meanThreatLevel: number;
}

function Results({results, currentBoardIndex, totalThreats, meanThreatLevel}: ResultsProps) {
    return (
        <div>
            <Row className="justify-content-md-center mt-3 mb-3">
                Use the Arrow Keys to navigate through the positions...
            </Row>

            <Row className="justify-content-md-center mt-3 mb-3">
                <Col md="auto">
                    <ChessBoard result={results[currentBoardIndex]}/>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3 mb-3">
                <Col md="auto">
                    <p>Threat level: {results[currentBoardIndex].threats}</p>
                </Col>
                <Col sm={12}>
                    <p>Total Boards: {results.length}</p>
                    <p>Total Threats: {totalThreats}</p>
                    <p>Mean Threat Level: {meanThreatLevel.toFixed(2)}</p>
                </Col>
            </Row>
        </div>
    );
}

export default Results;