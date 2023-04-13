import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AteObl from './ateTable/AteOblTable';
import AteCategories from './ateTable/AteCategoriesTable';
import AteRayonTable from './ateTable/AteRayonTable';
import AteReestrTable from './ateTable/AteReestrTable';
import AteStreetTable from './ateTable/AteStreetTable';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Области`,
    children: <AteObl />,
  },
  {
    key: '2',
    label: `Категории`,
    children: <AteCategories />,
  },
  {
    key: '3',
    label: `Районы`,
    children: <AteRayonTable />,
  },
  {
    key: '4',
    label: `Реестр`,
    children: <AteReestrTable />,
  },
  {
    key: '5',
    label: `Улицы`,
    children: <AteStreetTable />,
  },
];

const AteTabs: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default AteTabs;
