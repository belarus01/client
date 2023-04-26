import React from 'react';
import styled from 'styled-components';
import { InputLine } from './InputLine';
import { InputProps as AntInputProps, InputRef } from 'antd';

export interface InputProps extends AntInputProps {
  className?: string;
}

const Block = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    text-align: center;
  }
`;

const BlockMapPogInput = React.forwardRef<InputRef, InputProps>(({ className, children, ...props }, ref) => {
  return (
    <Block className={className}>
      <InputLine {...props} ref={ref} />
      <div>{children}</div>
    </Block>
  );
});

export default BlockMapPogInput;
