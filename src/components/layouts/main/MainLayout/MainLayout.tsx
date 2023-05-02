import React, { useEffect, useState } from 'react';
import { Header } from '../../../header/Header';
import MainSider from '../sider/MainSider/MainSider';
import MainContent from '../MainContent/MainContent';
import { MainHeader } from '../MainHeader/MainHeader';
import * as S from './MainLayout.styles';
import { Outlet, useLocation } from 'react-router-dom';
import { MAIN_PATH } from '@app/components/router/AppRouter';
import { useResponsive } from '@app/hooks/useResponsive';
import { sendGeolocation } from '@app/api/geolocation.api';
import useGeolocation from 'react-hook-geolocation';
import { useAppSelector } from '@app/hooks/reduxHooks';

const MainLayout: React.FC = () => {
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const location = useLocation();
  const user = useAppSelector((state) => state.user.user);

  // const onGeolocationUpdate = (geolocation: any) => {
  //   console.log(geolocation);
  //   sendGeolocation({uid:user?.uid, latitude:geolocation.latitude, longitude:geolocation.longitude});
  // }

  //   const geolocation = useGeolocation({
  //     enableHighAccuracy: true,
  //     maximumAge: 15000,
  //     timeout: 12000,
  //   }, onGeolocationUpdate)

  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  useEffect(() => {
    setIsTwoColumnsLayout([MAIN_PATH].includes(location.pathname) && isDesktop);
  }, [location.pathname, isDesktop]);

  return (
    <S.LayoutMaster>
      <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} />
      <S.LayoutMain>
        <MainHeader isTwoColumnsLayout={isTwoColumnsLayout}>
          <Header toggleSider={toggleSider} isSiderOpened={!siderCollapsed} isTwoColumnsLayout={isTwoColumnsLayout} />
        </MainHeader>
        <MainContent id="main-content" $isTwoColumnsLayout={isTwoColumnsLayout}>
          <div>
            <Outlet />
          </div>
        </MainContent>
      </S.LayoutMain>
    </S.LayoutMaster>
  );
};

export default MainLayout;
