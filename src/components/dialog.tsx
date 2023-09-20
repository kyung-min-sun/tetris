import {ReactNode} from 'react';
import {TetrisLogicService} from '@/services/tetrisLogic.service';

interface LoseDialogProps {
  score: number;
}

/**
 * Displayed to user upon loss.
 * @return {ReactNode}
 */
export function LoseDialog({score}: LoseDialogProps): ReactNode {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>Your score: {score}</div>
      <button
        className="border rounded-md border-black p-2
        hover:bg-black hover:text-white"
        onClick={() => TetrisLogicService.startGame()}
      >
        Play again
      </button>
    </div>
  );
}
