import { Row } from 'antd';
import styled from 'styled-components';

export const StarsStyled = styled.span`
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

const Stars = () => {
  return (
    <Row>
      <StarsStyled /> <span style={{ color: 'red' }}>Поле обязательное к заполнению</span>
    </Row>
  );
};

export default Stars;
