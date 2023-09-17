import {ReactNode, useState} from 'react';


interface TextInputProps {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  className?: string;
  type?: 'email' | 'password' | 'name';
}

interface TextAreaInputProps {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  className?: string;
  textareaClassName?: string;
}

interface InputRowProps {
  label: string;
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  className?: string;
  type?: 'email' | 'password' | 'name';
}

/**
 * @param {TextAreaInputProps} props
 * @return {ReactNode}
 */
export function TextAreaInput(
    {value, onChange, placeholder, className, textareaClassName}:
  TextAreaInputProps): ReactNode {
  const [input, setInput] = useState<string>();

  return <div className={`${className}`}>
    <textarea
      onChange={(e) => {
        setInput(e.target.value);
        onChange(e.target.value);
      }}
      value={value ?? input ?? ''}
      placeholder={placeholder}
      className={`
    w-full
    placeholder:italic
    placeholder:font-light
    placeholder:opacity-30
    bg-es-dark-gray
    focus:outline-none
    border rounded-md border-es-gray py-1
    focus:placeholder:opacity-0
    border-none
    resize-none
    ${textareaClassName}
    `} />
  </div>;
}

/**
 * @param {TextInputProps} props
 * @return {ReactNode}
 */
export function TextInput(
    {value, onChange, placeholder, className, type}:
  TextInputProps): ReactNode {
  const [input, setInput] = useState<string>();

  return <div className={`${className}`}>
    <input
      type={!type ? 'text': type}
      onChange={(e) => {
        setInput(e.target.value);
        onChange(e.target.value);
      }}
      value={value ?? input ?? ''}
      placeholder={placeholder}
      className={`
    w-full
    placeholder:italic
    placeholder:font-light
    placeholder:opacity-80
    text-slate-600
    bg-transparent
    focus:outline-none
    rounded-md py-1
    focus:placeholder:opacity-0
    `} />
  </div>;
}


/**
 * @param {InputRowProps} props
 * @return {ReactNode}
 */
export function TextInputRow(
    {value, label, onChange, placeholder, className, type}:
  InputRowProps) {
  return (
    <div
      className={`my-1 border-b w-60 
      ${value.length > 0 ? 'border-slate-800' : 'border-slate-400'}
      ${className}`}
    >
      <div
        className={`mb-2 text-sm font-medium
        ${value ? 'text-slate-400' : 'text-slate-600'}`}
      >
        {label}
      </div>
      <TextInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

/**
 * @param {InputRowProps} props
 * @return {ReactNode}
 */
export function TextAreaInputRow(
    {value, label, onChange, placeholder, className, type}:
    InputRowProps) {
  return <div>
    <div
      className={`items-center text-sm my-2 w-fit 
      ${value ? 'text-es-gray': 'text-es-off-white'}`}
    >
      {label}
    </div>
    <TextAreaInput
      className={'h-full p-1 border border-es-gray'}
      onChange={(text) => {
        onChange(text);
      }}
      value={value}
      placeholder={placeholder}
      textareaClassName="p-2 h-full text-sm"
    />
  </div>;
}
