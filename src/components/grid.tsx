import {CellCount} from '@/services/tetrisLogic.service';
import {ReactNode} from 'react';

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
  return (
    <div></div>
  );
}
