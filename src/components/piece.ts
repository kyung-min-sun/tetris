import { Cell } from './cell';

export class Piece {
    private name: 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
    // The cells in tetrisGrid that this piece occupies.
    private cells: Cell[];
    // Rotation 1~4, inclusive
    rotation: number;
    color: 'red' | 'lightBlue' | 'darkBlue' | 'green' | 'yellow' | 'purple' | 'orange' | 'black';

    private createPieceFromID() {
        
    }
}