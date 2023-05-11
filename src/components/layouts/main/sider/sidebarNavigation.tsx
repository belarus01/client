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
    title: 'Пользовательский',
    key: 'common',
    url: '/common',
    icon: <CalendarOutlined />,
    children: [
      {
        title: 'Субъекты',
        key: 'subjects',
        url: 'common/subjects',
        icon: <CalendarOutlined />,
      },
      // {
      //   title: 'Объекты',
      //   key: 'objects',
      //   url: 'common/objects',
      //   icon: <CalendarOutlined />,
      // },
      // {
      //   title: 'Карта НПМ',
      //   key: 'npm',
      //   url: '/common/npm',
      // },
      {
        title: 'ПОГ',
        key: 'pog',
        url: '/common/pog',
      },
      // {
      //   title: 'Карта ПБ',
      //   key: 'pb',
      //   url: '/common/pb',
      // },
      // {
      //   title: 'Пожарно-техническая карта',
      //   key: 'ptc',
      //   url: '/common/ptc',
      // },
      // {
      //   title: 'Автотранспорт',
      //   key: 'auto',
      //   url: '/common/auto',
      // },
      // {
      //   title: 'ЖД',
      //   key: 'railway',
      //   url: '/common/railway',
      // },
      // {
      //   title: 'Водный траспорт',
      //   key: 'water',
      //   url: '/common/water',
      // },
      // {
      //   title: 'Воздушный траспорт',
      //   key: 'air',
      //   url: '/common/air',
      // },
      {
        title: 'СОПБиП',
        key: 'sopb',
        url: '/common/sopb',
      },
    ],
  },
  {
    title: 'Планирование',
    key: 'planning',
    url: '/planning',
    icon: <CalendarOutlined />,
    children: [
      {
        title: 'Календарь',
        key: 'planning',
        url: '/planning/calendar',
      },
      {
        title: 'Мероприятия',
        key: 'events',
        url: '/planning/events',
      },
      // {
      //   title: 'Группы',
      //   key: 'groups',
      //   url: '/planning/groups',
      // },
    ],
  },
  {
    title: 'Администрирование',
    key: 'admin',
    url: '/admin',
    icon: <CalendarOutlined />,
    children: [
      {
        title: 'Пользователи',
        key: 'users',
        url: 'admin/users',
      },
      {
        title: 'Статистика сервера',
        key: 'server-statistics',
        url: 'admin/server-statistics',
      },
      // {
      //   title: 'Геолокация',
      //   key: 'geo',
      //   url: 'admin/geo',
      // },
      // {
      //   title: 'Архивирование',
      //   key: 'arhiv',
      //   url: 'admin/arhiv',
      // },
    ],
  },
  {
    title: 'Карточка мероприятия',
    key: 'eventCard',
    url: '/event-card',
    icon: <OrderedListOutlined />,
  },
  {
    title: 'Справочники',
    key: 'handbooks',
    icon: <BookOutlined />,
    children: [
      // {
      //   title: 'АТЕ СОАТО',
      //   key: 'soato',
      //   url: '/handbooks/soato',
      // },
      {
        title: 'АТЕ',
        key: 'ate',
        url: '/handbooks/ate',
      },
      // {
      //   title: 'Виды экономической деятельности',
      //   key: 'oked',
      //   url: '/handbooks/oked',
      // },
      // {
      //   title: 'Мероприятия',
      //   key: 'oked',
      //   url: '/handbooks/events',
      // },
      // {
      //   title: 'Перечень НПА и ТНПА',
      //   key: 'tnpanpa',
      //   url: '/handbooks/tnpanpa',
      // },
      // {
      //   title: 'Виды структурных элементов НПА',
      //   key: 'tnpastrelem',
      //   url: '/handbooks/tnpastrelem',
      // },
      {
        title: 'Департаменты',
        key: 'departments',
        url: '/handbooks/departments',
      },
      {
        title: 'Должности',
        key: 'jobs',
        url: '/handbooks/jobs',
      },
      {
        title: 'Подразделения (отделы)',
        key: 'deptunits',
        url: '/handbooks/deptunits',
      },
      {
        title: 'Список мероприятий',
        key: 'spisEvents',
        url: '/handbooks/spisEvents',
      },
      {
        title: 'Вопросы МТХ',
        key: 'question',
        url: '/handbooks/question',
      },
      // {
      //   title: 'Вопросы МТХ к мероприятиям',
      //   key: 'eventquestions',
      //   url: '/handbooks/eventquestions',
      // },
      // {
      //   title: 'Нарушения МТХ',
      //   key: 'defections',
      //   url: '/handbooks/defections',
      // },
      // {
      //   title: 'Нарушения МТХ к мероприятиям',
      //   key: 'eventsdefections',
      //   url: '/handbooks/eventsdefections',
      // },
      // {
      //   title: 'Карта к перечню СОПБиП',
      //   key: 'sopbcard',
      //   url: '/handbooks/sopbcard',
      // },
      {
        title: 'Страны мира',
        key: 'state',
        url: '/handbooks/state',
      },
      {
        title: 'Типы Опасности(чл4)',
        key: 'oon',
        url: '/handbooks/oon',
      },
      {
        title: 'Перечень потенциально опасных объектов в области промышленной безопасности',
        key: 'poo',
        url: '/handbooks/poo',
      },
      // {
      //   title: 'Перечень опасных производственных объектов',
      //   key: 'opo',
      //   url: '/handbooks/opo',
      // },
      // {
      //   title: 'Административные пресечения',
      //   key: 'admban',
      //   url: '/handbooks/admban',
      // },
      // {
      //   title: 'Административные принуждения',
      //   key: 'admforce',
      //   url: '/handbooks/admforce',
      // },
      {
        title: 'Типы сооружений',
        key: 'typebuild',
        url: '/handbooks/typebuild',
      },

      {
        title: 'Ведомства РБ',
        key: 'vedomstva',
        url: '/handbooks/vedomstva',
      },
    ],
  },
  // {
  //   title: 'Справочники',
  //   key: 'profile',
  //   icon: <BookOutlined />,
  //   children: [
  //     {
  //       title: 'Персональная информация',
  //       key: 'personal-info',
  //       url: 'profile/personal-info',
  //     },
  //   ],
  // },
  // {
  //   title: 'ТНПА и НПА',
  //   key: 'tnpa',
  //   icon: <BookOutlined />,
  //   children: [
  //     {
  //       title: 'ТНПА и НПА',
  //       key: 'tnpanpa',
  //       url: '/tnpa/tnpanpa',
  //     },
  //     {
  //       title: 'Нарушения',
  //       key: 'defections',
  //       url: '/tnpa/defections',
  //     },
  //   ],
  // },
  // {
  //   title: 'Журналы',
  //   key: 'journals',
  //   icon: <BookOutlined />,
  //   children: [
  //     {
  //       title: 'ТНПА и НПА',
  //       key: 'tnpanpa',
  //       url: '/tnpa/tnpanpa',
  //     },
  //     {
  //       title: 'Нарушения',
  //       key: 'defections',
  //       url: '/tnpa/defections',
  //     },
  //     {
  //       title: 'Ате',
  //       key: 'ate',
  //       url: 'handbooks/ate',
  //     },
  //     {
  //       title: 'Департаменты',
  //       key: 'deparatments',
  //       url: 'handbooks/departaments',
  //     },
  //   ],
  // },
  // {
  //   title: 'Документы',
  //   key: 'documents',
  //   icon: <BookOutlined />,
  //   children: [
  //     {
  //       title: 'Чек-лист 1',
  //       key: 'defections',
  //       url: '/documents/chlist1',
  //     },
  //     {
  //       //чек-лист 2
  //       title: 'ТР ЕАЭС 043/2017',
  //       key: 'chlist2',
  //       url: '/documents/chlist2',
  //     },
  //     {
  //       //чек-лист 3
  //       title: 'Чек-лист ОПО',
  //       key: 'chlist3',
  //       url: '/documents/chlist3',
  //     },
  //     {
  //       //чек-лист 4
  //       title: 'Чек-лист перевозки',
  //       key: 'chlist4',
  //       url: '/documents/chlist4',
  //     },
  //     {
  //       //чек-лист 5
  //       title: 'Чек-лист пиротехника',
  //       key: 'chlist5',
  //       url: '/documents/chlist5',
  //     },
  //     {
  //       //чек-лист 6
  //       title: 'Чек-лист аттракционы',
  //       key: 'chlist6',
  //       url: '/documents/chlist6',
  //     },
  //     {
  //       //чек-лист 7
  //       title: 'Чек-лист лифты',
  //       key: 'chlist7',
  //       url: '/documents/chlist7',
  //     },
  //     {
  //       //чек-лист 8
  //       title: 'Чек-лист взрывоопасные среды',
  //       key: 'chlist8',
  //       url: '/documents/chlist8',
  //     },
  //     {
  //       //чек-лист 9
  //       title: 'Чек-лист аппараты на газообразном топливе',
  //       key: 'chlist9',
  //       url: '/documents/chlist9',
  //     },
  //     {
  //       //чек-лист 10
  //       title: 'Чек-лист взрывчатые вещества и изделия на их основе',
  //       key: 'chlist10',
  //       url: '/documents/chlist10',
  //     },
  //     {
  //       //чек-лист 11
  //       title: 'Чек-лист оборудование под избыточным давлением',
  //       key: 'chlist11',
  //       url: '/documents/chlist11',
  //     },
  // ],
  // },
];
