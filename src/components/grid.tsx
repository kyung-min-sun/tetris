/* eslint-disable no-unused-vars */
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
      TetrisLogicService.listenToGame(
          setGrid,
          setIsTerminated,
      );
    }
  }, [grid, numCols, numRows]);

  const isLastRow = (i: number, grid: Cell[][]) => i == grid.length - 1;
  const isDummyCol = (j: number, gridRow: Cell[]) => j == 0 || j == gridRow.length - 1;
  const handleKeyPress = (e: {key: string}) => {
    if (e.key == 'ArrowRight') {
      TetrisLogicService.shiftRight();
    } else if (e.key == 'ArrowLeft') {
      TetrisLogicService.shiftLeft();
    } else if (e.key == 'ArrowDown') {
      TetrisLogicService.shiftDown();
    } else if (e.key == ' ') {
      console.log('hi');
      TetrisLogicService.dropDown();
    } else {
      TetrisLogicService.rotate();
    }
  };

  return (
    <>
      {
        !isTerminated ?
        // (tabIndex = 0 is necessary to track key presses)
        <div className="flex flex-col" tabIndex={0} onKeyDown={(e) => handleKeyPress(e)}>
          {
            grid?.map((gridRow, i) =>
              <div key={i} className={`flex flex-row items-center`}>
                {
                  isLastRow(i, grid) ? <></> :
                  gridRow?.map((gridCell, j) =>
                    isDummyCol(j, gridRow) ? <></> :
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
