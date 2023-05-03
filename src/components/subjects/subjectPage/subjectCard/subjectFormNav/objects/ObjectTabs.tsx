import React, { useMemo, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import PogMapSubjTable from '@app/components/pog/pogTables/PogMapSubjTable';
import PogAutoTable from '@app/components/pog/pogTables/PogAutoTable';
import { CurrentObject } from './CurrentObject';

const SwichUser = styled.div`
  position: fixed;
  top: 10%;
  right: 10%;
  width: 50px;
  height: 50px;
  background-color: red;
`;

const onChange = (key: string) => {
  console.log(key);
};

const ObjectTabs: React.FC = () => {
  const [user, setUser] = useState({
    org: 0,
  });
  const items: TabsProps['items'] = useMemo(() => {
    if (user.org == 0) {
      return [
        {
          key: '1',
          label: `Промбез`,
          children: <CurrentObject />,
        },
        {
          key: '2',
          label: `ПОГ`,
          children: <PogAutoTable />,
        },
      ];
    } else {
      return [
        {
          key: '3',
          label: `Пожнадзор`,
          children: <PogMapSubjTable />,
        },
        {
          key: '4',
          label: `СОПБиП`,
          children: <PogAutoTable />,
        },
      ];
    }
  }, [user.org]);

  return (
    <>
      <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
      <SwichUser onClick={() => setUser({ ...user, org: user.org == 0 ? 1 : 0 })} />
    </>
  );
};

export default ObjectTabs;
