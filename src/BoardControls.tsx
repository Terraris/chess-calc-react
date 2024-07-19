import React from 'react';
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';

interface BoardControlsProps {
    boardSize: number;
    piece: string;
    onBoardSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPieceChange: React.ChangeEventHandler; // Updated type
    onSimulate: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

const BoardControls: React.FC<BoardControlsProps> = ({
                                                         boardSize, piece, onBoardSizeChange, onPieceChange, onSimulate,
                                                         onNext, onPrevious
                                                     }) => (
    <div className="board-controls">
        <Row>
            <Col>
                <InputGroup className="mb-8">
                    <InputGroup className="mb-8">
                        <InputGroup.Text id="board-size-label">Board Size</InputGroup.Text>
                    </InputGroup>
                    <Form.Control type="number" onChange={onBoardSizeChange} value={boardSize}
                                  aria-describedby="board-size-label"/>
                </InputGroup>
            </Col>
            <Col>
                <InputGroup className="mb-8">
                    <InputGroup className="mb-8">
                        <InputGroup.Text id="piece-label">Piece</InputGroup.Text>
                    </InputGroup>
                    <Form.Control as="select" onChange={onPieceChange} value={piece} aria-describedby="piece-label">
                        <option>Knight</option>
                        <option>Rook</option>
                    </Form.Control>
                </InputGroup>
            </Col>
            <Col md="auto">
                <Button className="ml-2" onClick={onSimulate}>Simulate</Button>
                <Button className="ml-2" onClick={onPrevious}>Previous board</Button>
                <Button className="ml-2" onClick={onNext}>Next board</Button>
            </Col>
        </Row>
    </div>
);

export default BoardControls;