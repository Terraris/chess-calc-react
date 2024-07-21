import axios from 'axios';
import {useState} from 'react';
import {ChessResult} from "./types";
import { useCallback } from 'react';


export default function useChessAppLogic(initialPosition: { row: number, column: number }) {
    const [boardSize, setBoardSize] = useState<number>(8);
    const [piece, setPiece] = useState<string>('Knight');
    const [results, setResults] = useState<ChessResult[] | null>(null);
    const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);
    const [totalThreats, setTotalThreats] = useState(0);
    const [meanThreatLevel, setMeanThreatLevel] = useState(0);
    // noinspection JSUnusedLocalSymbols
    const [position, setPosition] = useState(initialPosition);

    const simulate = async () => {
        const response = await axios.get(`http://localhost:8080/api/chess/simulate?piece=${piece}&size=${boardSize}`);
        let resultArray = Object.keys(response.data).map(key => ({id: key, ...response.data[key]}));

        resultArray = sortResults(resultArray);

        setResults(resultArray);
        setCurrentBoardIndex(0);
    };

    const sortResults = (resultArray: ChessResult[]) => {
        return resultArray.sort((a, b) => {
            if (a.location.row > b.location.row) {
                return 1;
            }
            if (a.location.row === b.location.row && a.location.column < b.location.column) {
                return 1;
            }
            return -1;
        });
    };

    const calculateStats = () => {
        if (results) {
            let totalThreatsTemp = 0;
            results.forEach(result => {
                totalThreatsTemp += result.threats;
            });
            const meanThreatLevelTemp = totalThreatsTemp / results.length;
            setTotalThreats(totalThreatsTemp);
            setMeanThreatLevel(meanThreatLevelTemp);
        }
    };

    const nextBoard = () => {
        if (results && currentBoardIndex < results.length - 1) {
            setCurrentBoardIndex(prev => prev + 1);
        }
    }

    const previousBoard = () => {
        if (results && currentBoardIndex > 0) {
            setCurrentBoardIndex(prev => prev - 1);
        }
    }

    const movePiece = useCallback((dx: number, dy: number) => {
        setPosition((prev) => {
            const newRow = Math.min(Math.max(prev.row + dy, 0), boardSize - 1);
            const newCol = Math.min(Math.max(prev.column + dx, 0), boardSize - 1);

            if (results) {
                const updatedIndex = results.findIndex(
                    (result) =>
                        result.location.row === newRow && result.location.column === newCol
                );

                if (updatedIndex >= 0) {
                    setCurrentBoardIndex(updatedIndex);
                }
            }

            return {
                row: newRow,
                column: newCol,
            };
        });
    }, [results, boardSize]);

    const movePieceDown = useCallback(() => movePiece(0, -1), [movePiece]);
    const movePieceUp = useCallback(() => movePiece(0, 1), [movePiece]);
    const movePieceRight = useCallback(() => movePiece(-1, 0), [movePiece]);
    const movePieceLeft = useCallback(() => movePiece(1, 0), [movePiece]);


    return {
        boardSize, setBoardSize,
        piece, setPiece,
        results, setResults,
        currentBoardIndex, setCurrentBoardIndex,
        totalThreats, setTotalThreats,
        meanThreatLevel, setMeanThreatLevel,
        simulate, nextBoard, previousBoard, calculateStats,
        movePieceUp,
        movePieceDown,
        movePieceLeft,
        movePieceRight
    }
}