import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PogAutoTable from './pogTables/PogAutoTable';
import PogMapSubjTable from './pogTables/PogMapSubjTable';
import PogAviaTable from './pogTables/PogAviaTable';
import PogGDTable from './pogTables/PogGDTable';
import PogWaterTable from './pogTables/PogWaterTable';

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
    children: <PogAviaTable />,
  },
  {
    key: '4',
    label: `ЖД`,
    children: <PogGDTable />,
  },
  {
    key: '5',
    label: `Водный`,
    children: <PogWaterTable />,
  },
];

const PogTabs: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default PogTabs;
