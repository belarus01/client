import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './ProfileOverlay.styles';

export const ProfileOverlay: React.FC = ({ ...props }) => {
  return (
    <div {...props}>
      <S.Text>
        <Link to="/profile">{'Профиль'}</Link>
      </S.Text>
      <S.ItemsDivider />
      <S.Text>
        <Link to="/logout">{'Выйти'}</Link>
      </S.Text>
    </div>
  );
};
