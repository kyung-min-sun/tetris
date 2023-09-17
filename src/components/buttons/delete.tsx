import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {IconButton} from '@mui/material';
import {ReactNode, useState} from 'react';
import {theme} from '../layout';

interface DeleteButtonProps {
  onClick?: () => void;
}

/**
 * Click to delete
 * @param {DeleteButtonProps} props
 * @return {ReactNode}
 */
export function DeleteButton({onClick}: DeleteButtonProps): ReactNode {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <IconButton onClick={onClick}>
      <DeleteOutlineIcon
        sx={{
          color: isHovering ?
          theme.palette.primary.light : theme.palette.secondary.main,
        }}
      />
    </IconButton>
  </div>;
}
