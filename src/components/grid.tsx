/* eslint-disable max-len */
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
  const [isTerminated, setIsTerminated] = useState<boolean>(false);

  useEffect(() => {
    if (grid == undefined) {
      TetrisLogicService.startGame(
          setGrid,
          setIsTerminated,
      );
    }
  }, [grid, numCols, numRows]);

  const isLastRow = (i: number, grid: Cell[][]) => i == grid.length - 1;
  const isDummyCol = (j: number, gridRow: Cell[]) => j == 0 || j == gridRow.length - 1;

  return (
    <>
      {
        !isTerminated ?
        <div className="flex flex-col">
          {
            grid?.map((gridRow, i) =>
              <div key={i} className={`flex flex-row items-center`}>
                {
                  isLastRow(i, grid) ? new Array(numCols + 2).fill(0).map((_, j) => <div key={j} className='bg-white h-8 w-8'></div>) :
                  gridRow?.map((gridCell, j) =>
                    isDummyCol(j, gridRow) ? <div key={j} className='bg-white h-8 w-8'></div> :
                    <CellView key={`col-${j}`} cell={gridCell} />
                  )
                }
              </div>
            )
          }
        </div> :
        <div>You lose!</div>
      }
    </>

  );
}
