
export type GridListener = (grid: number[][]) => void;
export type CellCount = number;

/**
 *
 */
export class TetrisLogicService {
  private static tetrisGrid: number[][] = [];
  private static gameStateListeners: GridListener[] = [];

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
