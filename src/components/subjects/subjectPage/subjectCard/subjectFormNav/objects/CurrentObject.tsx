import { getObjById } from '@app/api/objects.api';
import { Pagination } from '@app/api/users.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import TheTable from '@app/components/tables/TheTable';
import { notificationController } from '@app/controllers/notificationController';
import { IPooSubjPb, IUnits, SSubjObj } from '@app/domain/interfaces';
import { Space } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAllPooSubjPbsBySubjObjId } from '@app/api/poo.api';
import { getAllUnits } from '@app/api/units.api';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Collapse } from '@app/components/common/Collapse/Collapse.styles';
import { Panel } from '@app/components/common/Collapse/Collapse';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 15,
};

const SwichUser = styled.div`
  position: fixed;
  top: 10%;
  right: 10%;
  width: 50px;
  height: 50px;
  background-color: red;
`;
export const CurrentObject: React.FC = () => {
  // const user = useAppSelector((state) => state.user.user);
  // need add user from store after auth
  const [user, setUser] = useState({
    org: 0,
  });

  const [obj, setObj] = useState<SSubjObj>({
    idObj: null,
    idSubj: null,
    unp: null,
    org: null,
  });

  const [units, setUnits] = useState<IUnits[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pooSubjPbs, setPooSubjPbs] = useState<IPooSubjPb[]>([]);

  const navigate = useNavigate();

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
  // dateRecord?: Date | string;
  // dateRegPoo?: Date | string;
  // dateUnregPoo?: Date | string | null;
  // fioRegPoo?: string;
  // fioStaff?: string;
  // flPbPog?: number;
  // idDept?: number | null;
  // idDeptDom?: number | null;
  // idList?: string;
  // idNumReg?: number | null;
  // idObl?: number | null;
  // idSubj?: number | null;
  // idSubjObj: number | null;
  // idUnit_8: number | null;
  // idVed?: null | number;
  // infoChange?: null | string | number;
  // manufactName?: string;
  // manufactNum?: number | null;
  // manufactYear?: Date | string;
  // nameAddrOvnerPoo?: string;
  // numOrder?: number | null;
  // numReg?: null;
  // org?: null;
  // specificPoo?: string;
  // symbol?: string;
  // typePoo?: string;
  // uid?: string | null | number;
  // unp: number | string;
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

  const currentUnits = useMemo(() => {
    setLoading(true);
    const currentTypes = pooSubjPbs.map((item) => item.idUnit_8).filter((item) => item);
    const pooSubjPbsGrooped: { [key: string]: IPooSubjPb[] } = {};
    currentTypes.forEach((item) => {
      pooSubjPbsGrooped[`${item}`] = pooSubjPbs.filter((poo) => item == poo.idUnit_8);
    });
    pooSubjPbsGrooped.unsorted = pooSubjPbs.filter((poo) => poo.idUnit_8 == null);
    const groops = units.filter((item) => currentTypes.includes(item.idUnit));
    return {
      groops,
      pooSubjPbsGrooped,
    };
  }, [pooSubjPbs, units]);

  return (
    <>
      <Spinner spinning={loading}>
        <Collapse defaultActiveKey={['1']}>
          {currentUnits.groops.map((groop) => {
            return (
              <Panel header={groop.name} key={String(groop.idUnit)}>
                <TheTable
                  pagination={false}
                  dataTable={{ data: currentUnits.pooSubjPbsGrooped[`${groop.idUnit}`], loading: loading }}
                  columns={columns}
                />
              </Panel>
            );
          })}
          <Panel header={'Несортированные'} key="unsorted">
            <TheTable
              pagination={false}
              dataTable={{ data: currentUnits.pooSubjPbsGrooped.unsorted, loading: loading }}
              columns={columns}
            />
          </Panel>
        </Collapse>
        <SwichUser onClick={() => setUser({ ...user, org: user.org == 0 ? 1 : 0 })} />
      </Spinner>
    </>
  );
};
