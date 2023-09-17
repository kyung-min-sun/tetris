import { randomInt } from "crypto";

export type GridListener = (grid: Cell[][]) => void;
export type CellCount = number;
export type Cell = {
  color: 'red' | 'lightBlue' | 'darkBlue' | 'green' | 'yellow' | 'purple' | 'orange' | 'black';
  isFilled: boolean;
};



/**
 *
 */
export class TetrisLogicService {
  private static tetrisGrid: Cell[][] = [];
  private static gameStateListeners: GridListener[] = [];

  private static currentPiece: (Piece | null ) = null;

  /**
   * Starts a tetris game given a frontend grid listener.
   * Frontend grid listener should be called whenever
   * there's a change in the state of the tetris grid.
   * This way, we'll be able to display the new grid to the user.
   * @param {GridListener} frontendListener
   * @param {CellCount} numCols
   * @param {CellCount} numRows
   */
  public static startGame(
      frontendListener: GridListener,
      numCols: CellCount = 10,
      numRows: CellCount = 20,
  ) {
    this.gameStateListeners.push(frontendListener);
    // Do your stuff with pushing a piece every n seconds, etc.

    // Initialize grid
    this.tetrisGrid = [];
    for (let i = 0; i < numRows; i++) {
      this.tetrisGrid.push([]);
      for (let j = 0; j < numCols; j++) {
        this.tetrisGrid[i].push({
          color: 'black',
          isFilled: false,
        });
      }
    }
    this.updateGrid();

    this.currentPiece = null;

  }

  /**
   * Updates tetris grid for all listeners.
   */
  private static updateGrid() {
    this.gameStateListeners.forEach((listener) =>
      listener([...this.tetrisGrid])
    );
  };


  /**
   * Creates a new piece and adds it to the grid.
   */
  private static createPiece() {
    const pieceID = randomInt(0, 7);
    this.currentPiece = 
  }
}
