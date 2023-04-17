import React from 'react';
import { Avatar, Col, Row } from 'antd';
import { H6 } from '@app/components/common/typography/H6/H6';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { Popover } from '@app/components/common/Popover/Popover';

export const ProfileDropdown: React.FC = () => {

  const user = useAppSelector((state) => state.user.user);

  return user ? (
    <Popover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
          <Col>
            <H6>{`${user.fName} ${user.lName[0]}`}</H6>
          </Col>
      </S.ProfileDropdownHeader>
    </Popover>
  ) : null;
};
