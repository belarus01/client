import React, { useMemo, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import { CurrentObjectSupervision } from './CurrentObjectsupervision';
import CurrentObjectSupervisionPog from './CurrentObjectSupervisionPog';
import CurrentObjectFireSupervision from './CurrentObjectFireSupervision';
import CurrentObjectSopbSupervision from './CurrentObjectSopbSupervision';
import { UserSwitchOutlined } from '@ant-design/icons';

const SwichUser = styled(UserSwitchOutlined)`
  position: fixed;
  top: 15%;
  right: 10%;
  width: 50px;
  height: 50px;
  font-size: 50px;
`;

const onChange = (key: string) => {
  console.log(key);
};

const ObjectTabs: React.FC = () => {
  const [user, setUser] = useState({
    org: 1,
  });
  const items: TabsProps['items'] = useMemo(() => {
    if (user.org == 0) {
      return [
        {
          key: '1',
          label: `Промбез`,
          children: <CurrentObjectSupervision />,
        },
        {
          key: '2',
          label: `ПОГ`,
          children: <CurrentObjectSupervisionPog />,
        },
      ];
    } else {
      return [
        {
          key: '3',
          label: `Пожнадзор`,
          children: <CurrentObjectFireSupervision />,
        },
        {
          key: '4',
          label: `СОПБиП`,
          children: <CurrentObjectSopbSupervision />,
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
