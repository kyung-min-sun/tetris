/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import {Cell} from './tetrisLogic.service';

/**
 * Piece
 */
export abstract class Piece {
  // The cells in tetrisGrid that this piece occupies.
  protected cells: Cell[][] = this.getInitiallyEmptyCells();
  // Rotation 1~4, inclusive
  protected rotation: number;

  /**
   */
  constructor() {
    this.cells = this.getInitiallyEmptyCells();
    this.rotation = 0;
    this.setPosition();
  }

  public abstract setPosition(): void;

  public getCellGrid(): Cell[][] {
    return this.cells;
  }
  public rotate() {
    this.rotation = (this.rotation + 1) % 4;
    this.setPosition();
  }
  public unrotate() {
    this.rotation = (this.rotation + 4) % 4;
    this.setPosition();
  }

  /**
   * @return {Cell[][]}
   */
  protected getInitiallyEmptyCells(): Cell[][] {
    return new Array(4).fill(0).map((row) =>
      new Array(4).fill(0).map((col) => {
        return {
          isFilled: false,
          color: 'black',
        };
      })
    );
  }
}

/**
 */
export class IPiece extends Piece {
  public setPosition(): void {
    if (this.rotation == 0) {
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[1][3] = this.getCell();
    } else if (this.rotation == 1) {
      this.cells[0][2] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][2] = this.getCell();
      this.cells[3][2] = this.getCell();
    } else if (this.rotation == 2) {
      this.cells[2][0] = this.getCell();
      this.cells[2][1] = this.getCell();
      this.cells[2][2] = this.getCell();
      this.cells[2][3] = this.getCell();
    } else {
      this.cells[0][1] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][1] = this.getCell();
      this.cells[3][1] = this.getCell();
    }
  }
  private getCell(): Cell {
    return {isFilled: true, color: 'lightBlue'};
  }
}

/**
 */
export class OPiece extends Piece {
  public setPosition(): void {
    this.cells[0][1] = this.getCell();
    this.cells[0][2] = this.getCell();
    this.cells[1][1] = this.getCell();
    this.cells[1][2] = this.getCell();
  }
  private getCell(): Cell {
    return {isFilled: true, color: 'yellow'};
  }
}

/**
 */
export class TPiece extends Piece {
  public setPosition(): void {
    if (this.rotation == 0) {
      this.cells[0][1] = this.getCell();
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
    } else if (this.rotation == 1) {
      this.cells[0][1] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][1] = this.getCell();
    } else if (this.rotation == 2) {
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][1] = this.getCell();
    } else {
      this.cells[0][1] = this.getCell();
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][1] = this.getCell();
    }
  }
  private getCell(): Cell {
    return {isFilled: true, color: 'purple'};
  }
}

/**
 */
export class LPiece extends Piece {
  public setPosition(): void {
    if (this.rotation == 0) {
      this.cells[0][2] = this.getCell();
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
    } else if (this.rotation == 1) {
      this.cells[0][1] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][1] = this.getCell();
      this.cells[2][2] = this.getCell();
    } else if (this.rotation == 2) {
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][0] = this.getCell();
    } else {
      this.cells[0][0] = this.getCell();
      this.cells[0][1] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][1] = this.getCell();
    }
  }
  private getCell(): Cell {
    return {isFilled: true, color: 'purple'};
  }
}

/**
 */
export class JPiece extends Piece {
  public setPosition(): void {
    if (this.rotation == 0) {
      this.cells[0][0] = this.getCell();
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
    } else if (this.rotation == 1) {
      this.cells[0][1] = this.getCell();
      this.cells[0][2] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][1] = this.getCell();
    } else if (this.rotation == 2) {
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][2] = this.getCell();
    } else {
      this.cells[0][1] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][0] = this.getCell();
      this.cells[2][1] = this.getCell();
    }
  }
  private getCell(): Cell {
    return {isFilled: true, color: 'purple'};
  }
}


/**
 */
export class SPiece extends Piece {
  public setPosition(): void {
    if (this.rotation == 0) {
      this.cells[0][1] = this.getCell();
      this.cells[0][2] = this.getCell();
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
    } else if (this.rotation == 1) {
      this.cells[0][1] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][2] = this.getCell();
    } else if (this.rotation == 2) {
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][0] = this.getCell();
      this.cells[2][1] = this.getCell();
    } else {
      this.cells[0][0] = this.getCell();
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][1] = this.getCell();
    }
  }
  private getCell(): Cell {
    return {isFilled: true, color: 'purple'};
  }
}

/**
 */
export class ZPiece extends Piece {
  public setPosition(): void {
    if (this.rotation == 0) {
      this.cells[0][0] = this.getCell();
      this.cells[0][1] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
    } else if (this.rotation == 1) {
      this.cells[0][2] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[1][2] = this.getCell();
      this.cells[2][1] = this.getCell();
    } else if (this.rotation == 2) {
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][1] = this.getCell();
      this.cells[2][2] = this.getCell();
    } else {
      this.cells[0][1] = this.getCell();
      this.cells[1][0] = this.getCell();
      this.cells[1][1] = this.getCell();
      this.cells[2][0] = this.getCell();
    }
  }
  private getCell(): Cell {
    return {isFilled: true, color: 'purple'};
  }
}

