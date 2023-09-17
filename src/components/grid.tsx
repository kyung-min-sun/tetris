import {Cell, CellCount, TetrisLogicService}
  from '@/services/tetrisLogic.service';
import {ReactNode, useEffect, useState} from 'react';

import {CellView} from './cell';

export interface GridProps {
  numCols: CellCount;
  numRows: CellCount;
}

/**
 * Grid that holds all tetris cells
 * @param {GridProps} props
 * @return {ReactNode}
 */
export function TetrisGridView(
    {numCols = 10, numRows = 20}: GridProps
): ReactNode {
  const [grid, setGrid] = useState<Cell[][]>();

  useEffect(() => {
    if (grid == undefined) {
      setGrid(
          new Array(numRows).fill(0).map((row) =>
            new Array(numCols).fill(0).map((col) => {
              return {
                isFilled: false,
                color: 'black',
              };
            }
            )
          )
      );
    }
  }, [grid, numCols, numRows]);
  console.log('hi');

  return (
    <div className="flex flex-col-reverse">
      {
        grid?.map((gridRow, i) =>
          <div key={i} className={`flex flex-row items-center`}>
            {
              gridRow?.map((gridCell, j) =>
                <CellView key={j} cell={gridCell} />
              )
            }
          </div>
        )
      }
    </div>
  );
}
