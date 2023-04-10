import React, { useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AteObl from './AteObl';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Tab 1`,
    children: <AteObl />,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];

const AteTabs: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default AteTabs;