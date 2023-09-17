import {Cell} from '@/services/tetrisLogic.service';
import {ReactNode} from 'react';

export interface CellProps {
  cell: Cell;
}

/**
 * Displays content of cell on screen.
 * @param {CellProps} props
 * @return {ReactNode}
 */
export function CellView(
    {cell}: CellProps
): ReactNode {
  const colorToHex = {
    'red': '#FF0000',
    'lightBlue': '#ADD8E6',
    'darkBlue': '#00008B',
    'green': '#008000',
    'yellow': '#FFFF00',
    'purple': '#800080',
    'orange': '#FFA500',
    'black': '#000000',
  };
  return (
    <div className={`w-8 h-8`}
      style={{
        backgroundColor: cell.isFilled ?
          colorToHex[cell.color] : '#000000',
      }}
    />
  );
}
