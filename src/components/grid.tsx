import {CellCount, TetrisLogicService} from '@/services/tetrisLogic.service';
import {ReactNode, useEffect, useState} from 'react';

export interface GridProps {
  numCols: CellCount;
  numRows: CellCount;
}

/**
 * Grid that holds all tetris cells
 * @param {GridProps} props
 * @return {ReactNode}
 */
export function Grid(
    {numCols = 10, numRows = 20}: GridProps
): ReactNode {
  const [grid, setGrid] = useState<number[][]>();

  useEffect(() => {
    if (grid == undefined) {
      TetrisLogicService.startGame(setGrid);
    }
  }, [grid]);
  return (
    <div></div>
  );
}
