import React from 'react';
import styled from 'styled-components';
import { InputLine } from './InputLine';
import { InputProps as AntInputProps, InputRef } from 'antd';
import { FONT_SIZE } from '@app/styles/themes/constants';

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

const BlockItem = styled.div`
  font-size: ${FONT_SIZE.xxs};
`;

const BlockMapPogInput = React.forwardRef<InputRef, InputProps>(({ className, children, ...props }, ref) => {
  return (
    <Block className={className}>
      <InputLine {...props} ref={ref} />
      <BlockItem>{children}</BlockItem>
    </Block>
  );
});

export default BlockMapPogInput;
