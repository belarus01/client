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
    title:'Планирование',
    key:'planning',
    url:'/planning',
    icon: <CalendarOutlined />
  },
  {
    title:'Статистика сервера',
    key:'server-statistics',
    url:'/server-statistics',
    icon: <CalendarOutlined />
  },
  {
    title: 'Субъекты',
    key: 'subjects',
    url: '/subjects',
    icon: <CalendarOutlined />
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
        title: 'Геолокация',
        key: 'geo',
        url: '/handbooks/geo',
      },
    ],
  },
]

