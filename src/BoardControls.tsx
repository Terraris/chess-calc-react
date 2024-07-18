import React from 'react';
import {Button, Form, InputGroup, Row, Col} from 'react-bootstrap';

interface BoardControlsProps {
    boardSize: number;
    piece: string;
    onBoardSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPieceChange: React.ChangeEventHandler; // Updated type
    onSimulate: () => void;
}

const BoardControls: React.FC<BoardControlsProps> = ({
                                                         boardSize, piece, onBoardSizeChange, onPieceChange, onSimulate
                                                     }) => (
    <div className="board-controls">
        <Row>
            <Col>
                <InputGroup className="mb-8">
                    <InputGroup>
                        <InputGroup.Text id="board-size-label">Board Size</InputGroup.Text>
                    </InputGroup>
                    <Form.Control type="number" onChange={onBoardSizeChange} value={boardSize} aria-label="Board size"
                                  aria-describedby="board-size-label"/>
                </InputGroup>
            </Col>

            <Col>
                <Form.Group controlId="piece-select">
                    <Form.Label>Piece</Form.Label>
                    <Form.Control as="select" onChange={onPieceChange} value={piece}>
                        <option value='Knight'>Knight</option>
                        <option value='Rook'>Rook</option>
                    </Form.Control>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="d-flex align-items-end">
                    <Button variant="primary" onClick={onSimulate}>Simulate</Button>
                </Form.Group>
            </Col>
        </Row>
    </div>
);

export default BoardControls;