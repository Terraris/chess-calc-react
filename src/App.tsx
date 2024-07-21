import React, {useEffect} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import Results from './Results';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container} from 'react-bootstrap';

import useChessAppLogic from './ChessAppLogic';

export default function App() {
    const appLogic = useChessAppLogic({row: 0, column: 0});

    useEffect(() => {
        document.title = "My Chess App";
    }, []);

    useEffect(() => {
        window.focus();
    }, []);

    useEffect(() => {
        appLogic.calculateStats();
    }, [appLogic.results]);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    appLogic.movePieceUp();
                    break;
                case 'ArrowDown':
                    appLogic.movePieceDown();
                    break;
                case 'ArrowLeft':
                    appLogic.movePieceLeft();
                    break;
                case 'ArrowRight':
                    appLogic.movePieceRight();
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [appLogic, appLogic.results]);

    return (
        <Container className="App">
            <AppNavbar
                boardSize={appLogic.boardSize}
                piece={appLogic.piece}
                onBoardSizeChange={(e) => appLogic.setBoardSize(Number(e.target.value))}
                onPieceChange={(e) => appLogic.setPiece(e.target.value)}
                onSimulate={appLogic.simulate}
                onNext={appLogic.movePieceRight}
                onPrevious={appLogic.movePieceLeft}
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