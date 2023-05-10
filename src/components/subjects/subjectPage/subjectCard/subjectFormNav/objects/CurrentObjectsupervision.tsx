import { getObjById } from '@app/api/objects.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';
import { IPooSubjPb, IUnits, SSubj, SSubjObj } from '@app/domain/interfaces';
import { Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getAllPooSubjPbsBySubjObjId } from '@app/api/poo.api';
import { getAllUnits } from '@app/api/units.api';
import GroopedTables from './GroopedTables';
import { UserSwitchOutlined } from '@ant-design/icons';

const SwichUser = styled(UserSwitchOutlined)`
  position: fixed;
  top: 15%;
  right: 10%;
  width: 50px;
  height: 50px;
  font-size: 50px;
`;
export const CurrentObjectSupervision: React.FC = () => {
  // const user = useAppSelector((state) => state.user.user);
  // need add user from store after auth
  const [user, setUser] = useState({
    org: 0,
  });

  const [, setObj] = useState<SSubjObj>({
    idObj: null,
    idSubj: null,
    unp: null,
    org: null,
  });

  const [units, setUnits] = useState<IUnits[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pooSubjPbs, setPooSubjPbs] = useState<IPooSubjPb[]>([]);

  const [, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: '',
  });
  const { state } = useLocation();

  useEffect(() => {
    setSubj(state);
  }, [state]);

  const { idObj } = useParams<{ idObj?: string }>();
  console.log(idObj);
  // 130 id obj
  const fetch = useCallback(() => {
    setLoading(true);
    if (idObj) {
      const promiseObj: Promise<SSubjObj> = getObjById(130);
      const promiseSpetific: Promise<IPooSubjPb[]> = getAllPooSubjPbsBySubjObjId(130);
      const promiseUnits: Promise<IUnits[]> = getAllUnits();
      Promise.all([promiseObj, promiseSpetific, promiseUnits]).then((res) => {
        console.log(res);
        setObj(res[0]);
        setPooSubjPbs(res[1]);
        setUnits(res[2]);
        setLoading(false);
      });
    }
  }, [idObj]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const columns = [
    {
      key: '1',
      title: 'Основные технические характеристики ПОО',
      dataIndex: 'specificPoo',
    },
    {
      key: '2',
      title: 'Наименование организации – изготовителя ПОО',
      dataIndex: 'manufactName',
    },
    {
      key: '3',
      title: 'Расположение ПОО/ Адрес ПОО',
      dataIndex: 'addrPoo',
    },
    {
      key: '4',
      title: 'Наименование владельца ПОО, адрес, номер телефона',
      dataIndex: 'nameAddrOvnerPoo',
    },
    {
      key: '5',
      title: 'Тип (марка) ПОО',
      dataIndex: 'typePoo',
    },
    {
      key: '4',
      title: 'Действия',
      width: '15%',
      render: (obj: SSubjObj) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                //navigate('/subject', {state:subj})
                // navigate(obj.idObj);
                console.log(obj.idObj);

                notificationController.info({
                  description: 'safas',
                  message: 'asdfasdfadsfasdfasdf',
                });
              }}
            >
              Открыть
            </Button>
          </Space>
        );
      },
    },
  ];

  // const currentUnits = useMemo(() => {
  //   setLoading(true);
  //   const currentTypes = pooSubjPbs.map((item) => item.idUnit_8).filter((item) => item);
  //   const pooSubjPbsGrooped: { [key: string]: IPooSubjPb[] } = {};
  //   currentTypes.forEach((item) => {
  //     pooSubjPbsGrooped[`${item}`] = pooSubjPbs.filter((poo) => item == poo.idUnit_8);
  //   });
  //   pooSubjPbsGrooped.unsorted = pooSubjPbs.filter((poo) => poo.idUnit_8 == null);
  //   const groops = units.filter((item) => currentTypes.includes(item.idUnit));
  //   setLoading(false);
  //   return {
  //     groops,
  //     pooSubjPbsGrooped,
  //   };
  // }, [pooSubjPbs, units]);

  return (
    <>
      <GroopedTables
        objects={pooSubjPbs}
        types={units}
        keyObj={'idUnit_8'}
        keyType={'idUnit'}
        titleType={'name'}
        columns={columns}
        loadingProps={loading}
      />
      <SwichUser onClick={() => setUser({ ...user, org: user.org == 0 ? 1 : 0 })} />
    </>
  );
};
