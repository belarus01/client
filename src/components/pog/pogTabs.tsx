import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Карта ПОГ`,
    children: <div>Карта ПОГ</div>,
  },
  {
    key: '2',
    label: `Инциденты`,
    children: <div>инциденты</div>,
  },
  {
    key: '3',
    label: `Автотранспорт`,
    children: <div>Автотранспорт</div>,
  },
  {
    key: '4',
    label: `Авия`,
    children: <div>Авия</div>,
  },
  {
    key: '5',
    label: `ЖД`,
    children: <div>ЖД</div>,
  },
  {
    key: '5',
    label: `Воздушный`,
    children: <div>Воздушный</div>,
  },
];

const PogTabs: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default PogTabs;
