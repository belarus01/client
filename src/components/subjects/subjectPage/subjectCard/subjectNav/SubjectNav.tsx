import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './SubjectNav.styles';
import { subjectNavData } from '@app/constants/subjectNavData';

export const SubjectNav: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <S.Wrapper>
      {subjectNavData.map((item) => (
        <S.Btn
          key={item.id}
          type="text"
          onClick={() => navigate(item.href, { state: location.state })}
          isActive={`${item.href}` === location.pathname}
        >
          {t(item.name)}
        </S.Btn>
      ))}
    </S.Wrapper>
  );
};
