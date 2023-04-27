import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { FONT_SIZE } from '@app/styles/themes/constants';

export const InputLine = styled(AntInput)`
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  text-align: center;
  position: relative;
  position: relative;
  font-size: ${FONT_SIZE.lg};
`;
