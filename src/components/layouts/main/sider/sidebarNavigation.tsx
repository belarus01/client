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
  OrderedListOutlined,
} from '@ant-design/icons';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';
import EventsCardPage from '@app/pages/EventCartPage';

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
    icon: <CalendarOutlined />
  },
  {
    title: 'Карточка мероприятия',
    key: 'eventCard',
    url: '/event-card',
    icon: <OrderedListOutlined />
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
    ],
  },
];
