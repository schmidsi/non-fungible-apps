import React, { forwardRef } from 'react';
import { IconName } from '../icon';
import { StyledInputFile } from './input-file';
import { InputIconStyled, InputStyled, TextareaStyled } from './input.styles';

export const Textarea = TextareaStyled;

export const LogoFileInput = StyledInputFile;

type InputProps = {
  leftIcon?: IconName;
} & React.ComponentProps<typeof InputStyled>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <InputIconStyled name={leftIcon} css={{ fontSize: '$lg' }} />
        )}
        <InputStyled
          {...props}
          ref={ref}
          css={{ ...(leftIcon && { pl: '$10' }) }}
        />
      </div>
    );
  }
);
