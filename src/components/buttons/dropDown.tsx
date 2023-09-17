import {Menu, TextField, MenuItem} from '@mui/material';
import {ReactNode, ReactElement, useState, useRef, useEffect} from 'react';
import {theme} from '../layout';
import {SelectionButton} from './selection';

export interface MenuOption {
  onClick: () => void,
  reactElement: ReactNode,
  value?: {toString: () => string};
}


interface StyedDropDownMenuProps {
  initialIsClicked?: boolean;
  overrideIsClicked?: boolean;
  dropDownButtonProps: ReactElement;
  menuOptions: MenuOption[];
  enableSearchBar?: boolean;
  onClose?: () => void;
}

/**
 * @param {StyedDropDownMenuProps} props
 * @return {ReactNode}
 */
export function StyledDropDownMenu(
    {initialIsClicked, dropDownButtonProps,
      menuOptions, enableSearchBar, onClose}:
StyedDropDownMenuProps): ReactNode {
// Search
  const [displayOptions, setDisplayOptions] =
  useState<MenuOption[]>(menuOptions);
  const [searchText, setSearchText] = useState<string>('');
  // Click
  const [isClicked, setIsClicked] = useState(initialIsClicked ?? false);
  const myRef = useRef(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsClicked(true);
  };
  const handleClose = () => {
    setIsClicked(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setDisplayOptions([...menuOptions]);
  }, [menuOptions]);

  useEffect(() => {
    setIsClicked(initialIsClicked ?? false);
  }, [initialIsClicked]);

  return <div className="flex flex-row items-center">
    <div ref={myRef}>
      <SelectionButton
        initialIsClicked={isClicked}
        handleClick={handleClick}
      >
        {dropDownButtonProps}
      </SelectionButton>
    </div>
    <Menu
      open={isClicked}
      anchorEl={myRef.current}
      onClose={handleClose}
      variant="menu"
      sx={{
        'maxHeight': 400,
        'marginTop': .5,
        '& .MuiMenu-paper': {
          backgroundColor: theme.palette.secondary.dark,
          border: 1,
          borderColor: theme.palette.secondary.main,
        },
        '& .MuiMenu-root': {
          backgroundColor: theme.palette.secondary.dark,
        },
      }}
    >
      {
        enableSearchBar &&
      <TextField
        value={searchText}
        key="text-field-1"
        id="2"
        className="mx-2 mb-1 w-80"
        variant="outlined"
        size="small"
        hiddenLabel
        placeholder="Search..."
        onChange={(event) => {
          const cleanInput = (input: string) =>
            input.toLowerCase().replace(/\s/g, '');
          const cleanedInputText = cleanInput(event.target.value);
          const newOptions:MenuOption[] = [];
          menuOptions.forEach((menuOption) => {
            if (!menuOption.value) {
              return;
            }
            const cleanedOptionText = cleanInput(menuOption.value.toString());
            if (cleanedOptionText.includes(cleanedInputText)) {
              newOptions.push(menuOption);
            }
          });
          setSearchText(event.target.value);
          setDisplayOptions(newOptions);
        }}
        onKeyDown={(event: { stopPropagation: () => void; }) => {
          event.stopPropagation();
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
            },
          },
        }}
      />
      }
      {
        displayOptions &&
      displayOptions.map((option, i) =>
        <MenuItem
          key={`menu-item-${i}-${option.value}`}
          className="bg-es-black text-white"
          onClick={() => {
            option.onClick();
            handleClose();
          }}>
          {option.reactElement}
        </MenuItem>)
      }
    </Menu>
  </div>;
}
