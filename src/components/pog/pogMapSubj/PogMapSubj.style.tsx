import React from 'react';
import styled from 'styled-components';
import { InputProps as AntInputProps, Col, InputRef, Row } from 'antd';
import { FONT_SIZE } from '@app/styles/themes/constants';
import { Input as AntInput } from 'antd';
import { PrinterTwoTone } from '@ant-design/icons';

export interface InputProps extends AntInputProps {
  className?: string;
}
interface IInputLineProps extends InputProps {
  align?: 'left' | 'right' | 'center';
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

export const Text = styled.div`
  font-size: ${FONT_SIZE.lg};
  padding: 1.25rem 0 0;
`;

export const PageBreak = styled.div`
  display: none;
  page-break-before: always;
`;

export const InputLine = styled(AntInput)<IInputLineProps>`
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  text-align: ${({ align = 'center' }) => align};
  position: relative;
  position: relative;
  font-size: ${FONT_SIZE.lg};
`;

const DivFlex = styled.div`
  display: flex;
`;

const PrintBottom = styled(PrinterTwoTone)`
  width: 100px;
  height: 100px;
  position: fixed;
  top: 15%;
  right: 5%;
  @media print {
    display: none;
  }
`;

interface PrintDocButtonProps {
  clickEvent: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const PrintDocButton: React.FC<PrintDocButtonProps> = ({ clickEvent }) => {
  return (
    <>
      <PrintBottom
        onClick={(e) => clickEvent(e)}
        style={{ fontSize: '40px', width: '100px', height: '100px' }}
        width={100}
        height={100}
      />
    </>
  );
};

export const HeadDoc = React.forwardRef<InputRef, InputProps>(({ ...props }, ref) => {
  return (
    <Row justify={'end'}>
      <Col xs={16} md={8} lg={8} xl={6}>
        <div>Проект Приложения 3</div>
        <DivFlex>
          <div> к приказу Госпромнадзора от 11.12.2019 №</div>
          <InputLine style={{ alignSelf: 'end', width: '30%' }} align="left" ref={ref} {...props} />
        </DivFlex>
      </Col>
    </Row>
  );
});

export const BlockMapPogInput = React.forwardRef<InputRef, InputProps>(({ className, children, ...props }, ref) => {
  return (
    <Block className={className}>
      <InputLine {...props} ref={ref} />
      <BlockItem>{children}</BlockItem>
    </Block>
  );
});
