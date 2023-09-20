import {Cell, CellCount, TetrisLogicService}
  from '@/services/tetrisLogic.service';
import {ReactNode, useEffect, useState} from 'react';

import {CellView} from './cell';
import {LoseDialog} from './dialog';

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
  const [gameClicked, setGameClicked] = useState<boolean>(false);
  const [grid, setGrid] = useState<Cell[][]>();
  const [isTerminated, setIsTerminated] = useState<boolean>(false);

  useEffect(() => {
    if (isTerminated) {
      setGameClicked(false);
    }
  }, [isTerminated]);

  useEffect(() => {
    if (grid == undefined) {
      TetrisLogicService.listenToGame(
          setGrid,
          setIsTerminated,
      );
    }
  }, [grid, numCols, numRows]);

  const isLastRow = (i: number, grid: Cell[][]) =>
    i == grid.length - 1;
  const isDummyCol = (j: number, gridRow: Cell[]) =>
    j == 0 || j == gridRow.length - 1;
  const handleKeyPress = (e: {key: string}) => {
    if (e.key == 'ArrowRight') {
      TetrisLogicService.shiftRight();
    } else if (e.key == 'ArrowLeft') {
      TetrisLogicService.shiftLeft();
    } else if (e.key == 'ArrowDown') {
      TetrisLogicService.shiftDown();
    } else if (e.key == ' ') {
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
        <div className={`flex flex-col ${!gameClicked ? 'opacity-40' : ''}`}
          onClick={() => setGameClicked(true)}
          tabIndex={0} onKeyDown={(e) => handleKeyPress(e)}>
          {
            grid?.map((gridRow, i) =>
              <div key={i} className={`flex flex-row items-center`}>
                {
                  !isLastRow(i, grid) &&
                  gridRow?.map((gridCell, j) =>
                    !isDummyCol(j, gridRow) &&
                    <CellView key={`col-${j}`} cell={gridCell} />
                  )
                }
              </div>
            )
          }
          {
            !gameClicked &&
            <div>Click in the box to play.</div>
          }

        </div> :
        <LoseDialog score={TetrisLogicService.getScore()} />
      }
    </>

  );
}
