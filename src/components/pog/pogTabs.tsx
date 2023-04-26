import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PogAutoTable from './pogTables/PogAutoTable';
import PogMapSubjTable from './pogTables/PogMapSubjTable';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Карта ПОГ`,
    children: <PogMapSubjTable />,
  },
  {
    key: '2',
    label: `Автотранспорт`,
    children: <PogAutoTable />,
  },
  {
    key: '3',
    label: `Авия`,
    children: <div>Авия</div>,
  },
  {
    key: '4',
    label: `ЖД`,
    children: <div>ЖД</div>,
  },
  {
    key: '5',
    label: `Водный`,
    children: <div>Воздушный</div>,
  },
];

const PogTabs: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default PogTabs;
