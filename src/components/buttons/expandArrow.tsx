import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {IconButton} from '@mui/material';
import {ReactNode, useState, useEffect} from 'react';
import {theme} from '../layout';

interface DropArrowExpandButtonProps {
  isInvisible?: boolean;
  clicked?: boolean;
  onClick: (isClicked: boolean) => void;
  buttonClassName?: string;
  customIconHeight?: number,
  buttonColor?: string;
}

/**
 * Arrow points right if unclicked, down if clicked.
 * @param {DropArrowExpandButtonProps} props
 * @return {ReactNode}
 */
export function DropArrowExpandButton(
    {
      isInvisible,
      clicked,
      onClick,
      buttonClassName,
      buttonColor,
      customIconHeight,
    }:
  DropArrowExpandButtonProps): ReactNode {
  const [isDropDownClicked, setIsDropDownClicked] = useState<boolean>(false);

  useEffect(() => {
    setIsDropDownClicked(clicked == true);
  }, [clicked]);

  return <IconButton
    onClick={() => {
      onClick(!isDropDownClicked);
      setIsDropDownClicked(!isDropDownClicked);
    }}
    className={`${buttonClassName}`}
  >
    {
    isDropDownClicked ?
    <KeyboardArrowDownIcon
      sx={{
        height: customIconHeight ?? 20,
        color: buttonColor ?? theme.palette.secondary.main,
        visibility: isInvisible ? 'hidden': 'visible',
      }}>
    </KeyboardArrowDownIcon> :
    <KeyboardArrowRightIcon
      sx={{
        height: customIconHeight ?? 20,
        color: buttonColor ?? theme.palette.secondary.main,
        visibility: isInvisible ? 'hidden': 'visible',
      }}>
    </KeyboardArrowRightIcon>
    }
  </IconButton>;
}
