import styled from 'styled-components';

export const Stars = styled.span`
  width: 5px;
  height: 5px;
  margin-right: 10px;
  ::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 20px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
`;
