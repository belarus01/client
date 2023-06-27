import styled from 'styled-components';
import { FONT_SIZE } from './../../../styles/themes/constants';

export const LabelText = styled.label`
  color: var(--primary-color);
  font-size: ${FONT_SIZE.xs};
  cursor: pointer;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
`;
