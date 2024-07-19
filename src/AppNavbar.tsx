import React from 'react';
import {Navbar} from 'react-bootstrap';
import BoardControls from './BoardControls';

interface AppNavbarProps {
    boardSize: number;
    piece: string;
    onBoardSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPieceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSimulate: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

const AppNavbar: React.FC<AppNavbarProps> = ({
                                                 boardSize,
                                                 piece,
                                                 onBoardSizeChange,
                                                 onPieceChange,
                                                 onSimulate,
                                                 onNext,
                                                 onPrevious
                                             }) => (
    <Navbar bg="light">
        <Navbar.Brand href="#home">My Chess App</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
            <BoardControls
                boardSize={boardSize}
                piece={piece}
                onBoardSizeChange={onBoardSizeChange}
                onPieceChange={onPieceChange}
                onSimulate={onSimulate}
                onNext={onNext}
                onPrevious={onPrevious}
            />
        </Navbar.Collapse>
    </Navbar>
);

export default AppNavbar;