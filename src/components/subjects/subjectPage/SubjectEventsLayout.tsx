import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '@app/components/common/Card/Card';
import { Button } from '@app/components/common/buttons/Button/Button';
import { ProfileInfo } from '@app/components/profile/profileCard/ProfileInfo/ProfileInfo';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { ProfileNav } from '@app/components/profile/profileCard/ProfileNav/ProfileNav';
import { useResponsive } from '@app/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { SubjectProfileInfo } from './subjectCard/subjectInfo/SubjectInfo';
import { SSubj } from '@app/domain/interfaces';
import { SubjectNav } from './subjectCard/subjectNav/SubjectNav';
import * as S from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentMethod/addNewCard/AddNewCardButton/AddNewCardButton.styles';
import { setSubj } from '@app/store/slices/subjSlice';

const SubjectProfileLayout: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const { t } = useTranslation();
  const { isTablet: isTabletOrHigher, mobileOnly } = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();

  const { isTablet } = useResponsive();
  const isTitleShown = isTabletOrHigher || (mobileOnly && location.pathname === '/subject');
  const isMenuShown = isTabletOrHigher || (mobileOnly && location.pathname !== '/subject');
  const [subject, setSubject] = useState<SSubj>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isTablet && location.pathname === '/profile' && navigate('personal-info');
  }, [isTablet, location.pathname, navigate]);

  useEffect(() => {
    dispatch(setSubj(location.state));
    setSubject(location.state);
  }, []);

  return (
    <>
      <PageTitle>{'Субъект'}</PageTitle>
      {!isTitleShown && (
        <Btn icon={<LeftOutlined />} type="text" onClick={() => navigate('/profile')}>
          {'Назад'}
        </Btn>
      )}

      <Row gutter={[30, 30]}>
        {isTitleShown && (
          <Col xs={24} md={24} xl={8}>
            <ProfileCard>
              <Row gutter={[30, 30]}>
                <Col xs={24} md={12} xl={24}>
                  <SubjectProfileInfo profileData={subject} />
                </Col>

                <Col xs={24} md={12} xl={24}>
                  <SubjectNav />
                </Col>
              </Row>
            </ProfileCard>
          </Col>
        )}

        {isMenuShown && (
          <Col xs={24} md={24} xl={16}>
            <Outlet />
          </Col>
        )}
      </Row>
    </>
  );
};

const ProfileCard = styled(Card)`
  height: unset;
`;

const Btn = styled(Button)`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  padding: 0;
  height: unset;
  color: var(--secondary-color);
`;

export default SubjectProfileLayout;
