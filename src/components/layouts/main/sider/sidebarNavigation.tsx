import React from 'react';
import {
  CompassOutlined,
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LayoutOutlined,
  LineChartOutlined,
  TableOutlined,
  UserOutlined,
  BlockOutlined,
  CalendarOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Планирование',
    key: 'planning',
    url: '/planning',
    icon: <CalendarOutlined />,
  },
  {
    title: 'Справочники',
    key: 'handbooks',
    icon: <BookOutlined />,
    children: [
      {
        title: 'Пользователи',
        key: 'users',
        url: '/handbooks/users',
      },
      {
        title: 'СОАТО',
        key: 'soato',
        url: '/handbooks/soato',
      },
      {
        title: 'Мероприятия',
        key: 'events',
        url: '/handbooks/events',
      },
      {
        title: 'Субъекты',
        key: 'subjects',
        url: '/handbooks/subjects',
      },
      {
        title: 'Геолокация',
        key: 'geo',
        url: '/handbooks/geo',
      },
      {
        title: 'Ате',
        key: 'ate',
        url: 'handbooks/ate',
      },
      {
        title: 'Департаменты',
        key: 'deparatments',
        url: 'handbooks/departaments',
      },
    ],
  },
  {
    title: 'СОПБиП',
    key: 'sopbap',
    icon: <BookOutlined />,
    url: '/soapb',
  },
];
