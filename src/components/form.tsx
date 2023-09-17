import {Box, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {ReactNode} from 'react';
import {SubmitButton} from './buttons/submit';

interface ModalFormProps {
  title: string;
  isReady: boolean;
  children: ReactNode;
  customWidth?: number;
  conditionLabel?: string;
  isDelete?: boolean;
  submitClassName?: string;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}


/**
 * Form to display within a modal
 * @param {ModalFormProps} props
 * @return {ReactNode}
 */
export function ModalForm(
    {
      title,
      isReady,
      children,
      conditionLabel,
      isDelete,
      submitClassName,
      submitLabel,
      customWidth,
      onClose,
      onSubmit}:
    ModalFormProps
): ReactNode {
  return <Box
    className="bg-slate-300 rounded-md"
    sx={{
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: customWidth,
      maxWidth: 1000,
      boxShadow: 24,
    }}
  >
    <div className="flex flex-row place-content-end m-0">
      <IconButton onClick={() => onClose()}>
        <CloseIcon sx={{color: 'slate-700'}}></CloseIcon>
      </IconButton>
    </div>
    <div className="px-8 pb-8">
      <div className="pb-4 flex flex-row items-center text-slate-700">
        <div className="text-lg mr-2 font-medium">
          {title}
        </div>
      </div>
      <div>
        {children}
      </div>
      <SubmitButton
        className={`
          ${isDelete && `opacity-80 text-red border-red
          hover:bg-red hover:text-es-off-white`} 
          ${submitClassName}`
        }
        label={submitLabel ?? 'Submit'}
        isEnabled={isReady}
        onSubmit={onSubmit}
        conditionLabel={
          conditionLabel ??
          '*All fields are required'
        }
      />
    </div>

  </Box>;
}
