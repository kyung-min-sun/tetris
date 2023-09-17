import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {IconButton} from '@mui/material';
import {ReactNode, useState} from 'react';
import {theme} from '../layout';

interface DragButtonProps {
  onClick?: (isSelected: boolean) => void;
}

/**
 * Drag into button
 * @param {DragButtonProps} props
 * @return {ReactNode}
 */
export function DragButton({}: DragButtonProps): ReactNode {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <IconButton>
      <DragIndicatorIcon
        sx={{
          color: isHovering ?
          theme.palette.primary.light : theme.palette.secondary.main,
        }}
      />
    </IconButton>
  </div>;
}
