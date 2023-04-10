import React from 'react';
import * as S from './Error.styles';
import { Link } from 'react-router-dom';

interface ErrorProps {
  img: string;
  msg: string;
}

export const Error: React.FC<ErrorProps> = ({ img, msg }) => {

  return (
    <S.Wrapper>
      <S.Image preview={false} src={img} />
      <S.ContentWrapper>
       
        <S.Text>{msg}</S.Text>
        {/*TODO make common component */}
        <Link to="/" className="ant-btn ant-btn-link">
          {'Назад'}
        </Link>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};
