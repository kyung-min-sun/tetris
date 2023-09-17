import {Button} from '@mui/material';
import {ReactNode, useState} from 'react';
import {theme} from '../layout';

interface SelectionButtonProps {
  className?: string;
  initialIsClicked: boolean,
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  children?: ReactNode
}

/**
 *
 * @param {SelectionButtonProps} props
 * @return {ReactNode}
 */
export function SelectionButton(
    {
      className,
      initialIsClicked,
      handleClick,
      children,
    }: SelectionButtonProps): ReactNode {
  // Hover
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  // Click
  const [isClicked] = useState(initialIsClicked);
  const isToggled = isClicked || isHovering;

  return <Button
    className={`
    px-2 flex flex-start items-center
    text-slate-600
    border-slate-600
    hover:text-blue-500
    hover:border-blue-500
    ${className}`}
    onClick={handleClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    sx={{
      color: isToggled ?
      theme.palette.primary.light : theme.palette.secondary.dark,
      border: 1,
      borderColor: isToggled ?
      theme.palette.primary.light : theme.palette.secondary.dark,
    }}
  >
    {children}
  </Button>;
}
