import React, {useEffect} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import Results from './Results';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container} from 'react-bootstrap';

import ChessAppLogic from './ChessAppLogic';

export default function App() {
    const appLogic = ChessAppLogic();

    useEffect(() => {
        document.title = "My Chess App";
    }, []);

    useEffect(() => {
        appLogic.calculateStats();
    }, [appLogic.results]);

    return (
        <Container className="App">
            <AppNavbar
                boardSize={appLogic.boardSize}
                piece={appLogic.piece}
                onBoardSizeChange={(e) => appLogic.setBoardSize(Number(e.target.value))}
                onPieceChange={(e) => appLogic.setPiece(e.target.value)}
                onSimulate={appLogic.simulate}
                onNext={appLogic.nextBoard}
                onPrevious={appLogic.previousBoard}
            />
            {appLogic.results && (
                <Results
                    results={appLogic.results}
                    currentBoardIndex={appLogic.currentBoardIndex}
                    totalThreats={appLogic.totalThreats}
                    meanThreatLevel={appLogic.meanThreatLevel}
                />
            )}
        </Container>
    );
}