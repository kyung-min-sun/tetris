import {
  IPiece,
  JPiece,
  LPiece,
  OPiece,
  Piece,
  SPiece,
  TPiece,
  ZPiece,
} from '@/services/piece';

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
  private static score: number = 0;

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
      this.clearFilledRows();
      const resetPieceFailure = !this.resetPiece();
      if (resetPieceFailure) {
        this.terminateGame();
      };
    }
  };
  private static gameInterval = setInterval(this.nextTurn, 125);

  /**
   * Finishes game.
   */
  private static terminateGame() {
    this.terminationListeners.forEach((listener) =>
      listener(true)
    );
    clearInterval(this.gameInterval);
  }

  /**
   * Starts game.
   */
  public static startGame() {
    this.tetrisGrid = this.initializeGrid();
    this.currentPiece = this.createRandomPiece();
    this.updateGrid();
    this.terminationListeners.forEach((listener) =>
      listener(false)
    );
    this.score = 0;
    this.gameInterval = setInterval(this.nextTurn, 125);
  }

  /**
   * Returns score of the most recent game (even if terminated).
   * @return {number}
   */
  public static getScore(): number {
    return this.score;
  }

  /**
   * @return {Piece}
   */
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

  /**
   * Returns whether reset piece operation was successful
   * @return {boolean}
   */
  private static resetPiece(): boolean {
    this.topRow = 0;
    this.topCol = 4;
    this.currentPiece = this.createRandomPiece();
    return !this.wouldPieceCollide();
  }

  /**
   * Moves piece one column left.
   */
  public static shiftLeft() {
    this.removePiece();
    this.topCol -= 1;
    if (this.wouldPieceCollide()) {
      this.topCol += 1;
      this.placePiece();
      return;
    }
    this.placePiece();
  }

  /**
   * Moves piece one column right.
   */
  public static shiftRight() {
    this.removePiece();
    this.topCol += 1;
    if (this.wouldPieceCollide()) {
      this.topCol -= 1;
      this.placePiece();
      return;
    }
    this.placePiece();
  }

  /**
   * Drops piece all the way down to the lowest possible row.
   */
  public static dropDown() {
    let shiftSuccess = this.shiftDown();
    while (shiftSuccess) {
      shiftSuccess = this.shiftDown();
    }
  }

  /**
   * Moves piece one row down.
   * Returns whether operation was successful.
   * @return {boolean}
   */
  public static shiftDown(): boolean {
    this.removePiece();
    this.topRow += 1;
    if (this.wouldPieceCollide()) {
      this.topRow -= 1;
      this.placePiece();
      return false;
    }
    this.placePiece();
    return true;
  }

  /**
   * Rotates piece.
   */
  public static rotate() {
    this.removePiece();
    this.currentPiece.rotate();
    if (this.wouldPieceCollide()) {
      this.currentPiece.unrotate();
      this.placePiece();
    } else {
      this.placePiece();
    }
  }

  /**
   * Places piece on the cell grid.
   */
  private static placePiece(): void {
    const cellGrid = this.currentPiece.getCellGrid();
    cellGrid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (this.isBeyondBounds(i, j) || !cell) return;
        this.tetrisGrid[this.topRow + i][this.topCol + j] = {
          isFilled: cell.isFilled ||
            this.tetrisGrid[this.topRow + i][this.topCol + j].isFilled,
          color: cell.isFilled ? cell.color :
            this.tetrisGrid[this.topRow + i][this.topCol + j].color,
        };
      })
    );
    this.updateGrid();
  };

  /**
   * Removes piece from the grid.
   */
  private static removePiece(): void {
    const cellGrid = this.currentPiece.getCellGrid();
    cellGrid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (this.isBeyondBounds(i, j) || !cell) return;
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

  /**
   * Returns whether relative cell coordinate is beyond bounds.
   * @param {number} i
   * @param {number} j
   * @return {boolean}
   */
  private static isBeyondBounds(i: number, j: number): boolean {
    return Boolean(
        this.topRow + i >= this.tetrisGrid.length ||
        this.topCol + i < 0 ||
        this.topCol + j >= this.tetrisGrid[0].length ||
        this.topCol + j < 0
    );
  }

  /**
   * Returns whether the current piece would collide if placed on the grid.
   * @return {boolean}
   */
  private static wouldPieceCollide(): boolean {
    const cellGrid = this.currentPiece.getCellGrid();
    let isPieceCollision = false;
    cellGrid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (this.isBeyondBounds(i, j) || !cell) return;
        if (isPieceCollision) return;
        isPieceCollision = isPieceCollision || (cell.isFilled &&
          this.tetrisGrid[this.topRow + i][this.topCol + j].isFilled);
      })
    );
    return isPieceCollision;
  }

  /**
   * Initializes grid to all empty cells.
   * @param {number} numRows
   * @param {number} numCols
   * @return {Array.<Cell[]>}
   */
  private static initializeGrid(
      numRows: number = 21,
      numCols: number = 12
  ): Cell[][] {
    this.tetrisGrid = [];
    for (let i = 0; i < numRows; i++) {
      this.tetrisGrid.push([]);
      for (let j = 0; j < numCols; j++) {
        this.tetrisGrid[this.tetrisGrid.length - 1].push({
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
   * Adds an empty row to the grid
   * @param {number} numCols
   */
  private static addEmptyRow(numCols: number = 12) {
    this.tetrisGrid.unshift([]);
    for (let j = 0; j < numCols; j++) {
      this.tetrisGrid[0].push({
        color: 'black',
        isFilled: j == 0 || j == numCols - 1,
      });
    }
  }

  /**
   * Calls all listeners for updates on the tetris grid.
   */
  private static updateGrid() {
    this.gameStateListeners.forEach((listener) =>
      listener([...this.tetrisGrid])
    );
  };

  /**
   * Returns whether a given grid coordinate is a border
   * @param {number | undefined} i
   * @param {number | undefined} j
   * @param {number} numRows
   * @param {number} numCols
   * @return {boolean}
   */
  private static isBorder(
      i?: number,
      j?: number,
      numRows: number = 21,
      numCols: number = 12,
  ): boolean {
    return Boolean(j && j == 0) ||
      Boolean(j && j >= numCols - 1) ||
      Boolean(i && i >= this.tetrisGrid.length - 1);
  }

  /**
   * Clears rows that are complete.
   */
  private static clearFilledRows() {
    const rowCount = this.tetrisGrid.length;
    this.tetrisGrid = this.tetrisGrid.filter((cells, i) => {
      if (this.isBorder(i)) return true;
      let isFilled = true;
      cells.forEach((cell, j) => {
        if (this.isBorder(i, j)) return;
        isFilled = isFilled && cell.isFilled;
      });
      return !isFilled;
    });
    const eliminatedRowCount = (rowCount - this.tetrisGrid.length);
    for (let i = 0; i < eliminatedRowCount; ++i) {
      this.addEmptyRow();
    }
    this.score += eliminatedRowCount * 100;
  }
}
