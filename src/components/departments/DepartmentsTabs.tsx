import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { DepartmentsTable } from './tables/DepatmentsTable';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Департаменты`,
    children: <DepartmentsTable />,
  },
];

const DepartmentsTabs: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default DepartmentsTabs;
