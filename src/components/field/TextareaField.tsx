import { useEffect, useRef } from 'react';

import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import type { Input as InputType } from '@/entities/input';

type TextareaFieldProps = {
  label: string;
  input: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  maxLength: number;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
  minLine?: number;
};

export const TextareaField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
  placeholder,
  maxLength,
  minLine,
}: TextareaFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current !== null && placeholder !== undefined) {
      textareaRef.current.setAttribute(
        'placeholder',
        placeholder.replace(/\\n/g, '\n'),
      );
    }
  }, [placeholder]);

  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input.value]);

  return (
    <LabelContainer label={label} required={required}>
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        className="w-full overflow-hidden rounded-sm border px-[10px] py-[11px] text-sm placeholder:text-grey-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        rows={minLine}
        value={input.value}
        disabled={isPending}
        onChange={(e) => {
          input.onChange(e.target.value);
        }}
      />
      <div className="flex flex-col gap-1">
        <div className="flex w-full flex-col items-end justify-start sm:flex-row sm:justify-between">
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
          <span
            className={`text-13 ${input.value.length > maxLength ? 'text-red-300' : 'font-normal text-grey-500'}`}
          >
            {input.value.length}/{maxLength}
          </span>
        </div>
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
