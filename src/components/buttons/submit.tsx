import {CircularProgress} from '@mui/material';
import {ReactNode, useState} from 'react';

interface SubmitButtonProps {
  className?: string;
  isEnabled: boolean;
  onSubmit: () => Promise<void>;
  conditionLabel: string;
  label?: string;
}

/**
 * Click button to submit
 * @param {SubmitButtonProps} props
 * @return {ReactNode}
 */
export function SubmitButton(
    {
      className,
      isEnabled,
      onSubmit,
      conditionLabel,
      label,
    }: SubmitButtonProps): ReactNode {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return <div className="mt-4 flex flex-row items-center">
    <button
      className={`
      border-slate-800
    ${isEnabled && !isSubmitting ? ` text-slate-800 
    hover:bg-slate-800 hover:text-slate-200` : 'opacity-20'}
    p-2 border rounded-md ${className}`}
      onClick={async () => {
        if (!isEnabled) return;
        setIsSubmitting(true);
        await onSubmit();
        setIsSubmitting(false);
      }}
    >
      {label ?? 'Submit'}
    </button>
    {
      !isEnabled &&
    <div className="mx-3 opacity-30 text-xs italic">
      {conditionLabel}
    </div>
    }
    {
      isSubmitting &&
    <div className="mx-4">
      <CircularProgress size="2rem" color="primary" />
    </div>
    }
  </div>;
}
