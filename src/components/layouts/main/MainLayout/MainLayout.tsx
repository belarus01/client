import React, { useEffect, useState } from 'react';
import { Header } from '../../../header/Header';
import MainSider from '../sider/MainSider/MainSider';
import MainContent from '../MainContent/MainContent';
import { MainHeader } from '../MainHeader/MainHeader';
import * as S from './MainLayout.styles';
import { Outlet, useLocation } from 'react-router-dom';
import { MAIN_PATH, } from '@app/components/router/AppRouter';
import { useResponsive } from '@app/hooks/useResponsive';

const MainLayout: React.FC = () => {
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const { isDesktop } = useResponsive();
  const location = useLocation();

  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  useEffect(() => {
    setIsTwoColumnsLayout([MAIN_PATH, ].includes(location.pathname) && isDesktop);
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
