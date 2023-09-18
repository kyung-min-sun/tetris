/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {IPiece, JPiece, LPiece, OPiece, Piece, SPiece, TPiece, ZPiece} from '@/services/piece';

export type GridListener = (grid: Cell[][]) => void;
export type GameTerminationListener = (terminate: boolean) => void;
export type CellCount = number;
export type Cell = {
  color: 'red' | 'lightBlue' | 'darkBlue' | 'green' |
  'yellow' | 'purple' | 'orange' | 'black';
  isFilled: boolean;
};


/**
 *
 */
export class TetrisLogicService {
  private static tetrisGrid: Cell[][] = this.initializeGrid();
  private static gameStateListeners: GridListener[] = [];
  private static terminationListeners: GameTerminationListener[] = [];

  private static topCol: number = 4;
  private static topRow: number = 0;
  private static currentPiece: Piece = this.createRandomPiece();

  /**
   * Starts a tetris game given a frontend grid listener.
   * Frontend grid listener should be called whenever
   * there's a change in the state of the tetris grid.
   * This way, we'll be able to display the new grid to the user.
   * @param {GridListener} frontendListener
   * @param {GameTerminationListener} terminationListener
   */
  public static listenToGame(
      frontendListener: GridListener,
      terminationListener: GameTerminationListener
  ) {
    this.gameStateListeners.push(frontendListener);
    this.terminationListeners.push(terminationListener);
  }

  private static nextTurn = () => {
    const shiftFailure = !this.shiftDown();
    if (shiftFailure) {
      const resetPieceFailure = !this.resetPiece();
      if (resetPieceFailure) {
        this.terminationListeners.forEach((listener) =>
          listener(true)
        );
      };
    }
  };
  private static gameInterval = setInterval(this.nextTurn, 100);

  private static createRandomPiece(): Piece {
    const random = Math.floor(Math.random() * 7);
    if (random == 0) {
      return new OPiece();
    } else if (random == 1) {
      return new IPiece();
    } else if (random == 2) {
      return new TPiece();
    } else if (random == 3) {
      return new LPiece();
    } else if (random == 4) {
      return new JPiece();
    } else if (random == 5) {
      return new SPiece();
    } else {
      return new ZPiece();
    }
  }

  private static resetPiece(): boolean {
    this.topRow = 0;
    this.currentPiece = this.createRandomPiece();
    return !this.wouldPieceCollide();
  }

  public static shiftLeft() {
    this.removePiece();
    this.topCol -= 1;
    if (this.wouldPieceCollide()) {
      this.topCol += 1;
      this.placePiece();
      return;
    }
    this.placePiece();
    this.updateGrid();
  }

  public static shiftRight() {
    this.removePiece();
    this.topCol += 1;
    if (this.wouldPieceCollide()) {
      this.topCol -= 1;
      this.placePiece();
      return;
    }
    this.placePiece();
    this.updateGrid();
  }

  public static shiftDown(): boolean {
    this.removePiece();
    this.topRow += 1;
    if (this.wouldPieceCollide()) {
      this.topRow -= 1;
      this.placePiece();
      return false;
    }
    this.placePiece();
    this.updateGrid();
    return true;
  }

  public static rotate() {
    this.currentPiece.rotate();
    if (this.wouldPieceCollide()) {
      this.currentPiece.unrotate();
      return;
    }
    this.currentPiece.unrotate();
    this.removePiece();
    this.currentPiece.rotate();
    this.placePiece();
    this.updateGrid();
  }

  private static placePiece(): void {
    const cellGrid = this.currentPiece.getCellGrid();
    cellGrid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (this.topRow + i >= this.tetrisGrid.length || this.topCol + j >= this.tetrisGrid[0].length) return;
        this.tetrisGrid[this.topRow + i][this.topCol + j] = {
          isFilled: cell.isFilled || this.tetrisGrid[this.topRow + i][this.topCol + j].isFilled,
          color: cell.isFilled ? cell.color : this.tetrisGrid[this.topRow + i][this.topCol + j].color,
        };
      })
    );
    this.updateGrid();
  };

  private static removePiece(): void {
    const cellGrid = this.currentPiece.getCellGrid();
    cellGrid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (this.topRow + i >= this.tetrisGrid.length || this.topCol + j >= this.tetrisGrid[0].length) return;
        this.tetrisGrid[this.topRow + i][this.topCol + j] = {
          isFilled: cell.isFilled ? false :
            this.tetrisGrid[this.topRow + i][this.topCol + j].isFilled,
          color: cell.isFilled ? 'black' :
            this.tetrisGrid[this.topRow + i][this.topCol + j].color,
        };
      }
      )
    );
    this.updateGrid();
  };

  private static wouldPieceCollide(): boolean {
    const cellGrid = this.currentPiece.getCellGrid();
    let isPieceCollision = false;
    cellGrid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (this.topRow + i >= this.tetrisGrid.length || this.topCol + j >= this.tetrisGrid[0].length) return;
        if (isPieceCollision) return;
        isPieceCollision = isPieceCollision || (cell.isFilled &&
          this.tetrisGrid[this.topRow + i][this.topCol + j].isFilled);
      })
    );
    return isPieceCollision;
  }


  private static initializeGrid(numRows: number = 21, numCols: number = 12): Cell[][] {
    this.tetrisGrid = [];
    for (let i = 0; i < numRows; i++) {
      this.tetrisGrid.push([]);
      for (let j = 0; j < numCols; j++) {
        this.tetrisGrid[i].push({
          color: 'black',
          isFilled: j == 0 || j == numCols - 1,
        });
      }
    }
    this.tetrisGrid.push([]);
    for (let j = 0; j < numCols; j++) {
      this.tetrisGrid[this.tetrisGrid.length - 1].push({
        color: 'black',
        isFilled: true,
      });
    }
    return this.tetrisGrid;
  }
  /**
   * Updates tetris grid for all listeners.
   */
  private static updateGrid() {
    this.gameStateListeners.forEach((listener) =>
      listener([...this.tetrisGrid])
    );
  };
}
