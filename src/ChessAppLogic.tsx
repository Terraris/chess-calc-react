import axios from 'axios';
import {useState} from 'react';
import {ChessResult} from "./types";

export default function ChessAppLogic() {
    const [boardSize, setBoardSize] = useState<number>(8);
    const [piece, setPiece] = useState<string>('Knight');
    const [results, setResults] = useState<ChessResult[] | null>(null);
    const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);
    const [totalThreats, setTotalThreats] = useState(0);
    const [meanThreatLevel, setMeanThreatLevel] = useState(0);

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

    return {
        boardSize, setBoardSize,
        piece, setPiece,
        results, setResults,
        currentBoardIndex, setCurrentBoardIndex,
        totalThreats, setTotalThreats,
        meanThreatLevel, setMeanThreatLevel,
        simulate, nextBoard, previousBoard, calculateStats
    }
}