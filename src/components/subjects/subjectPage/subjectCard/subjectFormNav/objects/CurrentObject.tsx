import { getAllObjectsBySubjectId, getObjById, getSubjObjSpecifByIdSubjObj } from '@app/api/objects.api';
import { Pagination } from '@app/api/users.api';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { SearchInput } from '@app/components/common/inputs/SearchInput/SearchInput';
import TheTable from '@app/components/tables/TheTable';
import { notificationController } from '@app/controllers/notificationController';
import { IPooSubjPb, IUnits, SSubj, SSubjObj } from '@app/domain/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useMounted } from '@app/hooks/useMounted';
import { Col, Row, Space } from 'antd';
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
      // <[SSubjObj, <IUnits[]>, <IPooSubjPb[]>]>
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
      title: 'УНП',
      dataIndex: 'unp',
    },
    {
      key: '2',
      title: 'num_order',
      dataIndex: 'numReg',
    },
    {
      key: '3',
      title: 'typePoo',
      dataIndex: 'typePoo',
    },
    {
      key: '4',
      title: 'Место осуществления деятельности',
      dataIndex: 'addrDescr',
    },
    {
      key: '5',
      title: 'Ответственное лицо',
      dataIndex: 'fioFireman',
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
    console.log(currentTypes);
    console.log(pooSubjPbsGrooped);

    const nes = units.filter((item) => currentTypes.includes(item.idUnit));
    console.log(nes);
    return {
      nes,
      pooSubjPbsGrooped,
    };
  }, [pooSubjPbs, units]);

  return (
    <>
      <Spinner spinning={loading}>
        <Collapse defaultActiveKey={['1']}>
          {currentUnits.nes.map((unit) => {
            return (
              <Panel header={unit.name} key={String(unit.idUnit)}>
                {console.log(currentUnits.pooSubjPbsGrooped[`${unit.idUnit}`])}
                <TheTable
                  pagination={false}
                  dataTable={{ data: currentUnits.pooSubjPbsGrooped[`${unit.idUnit}`], loading: loading }}
                  columns={columns}
                />
                {/* {currentUnits.pooSubjPbsGrooped[`${unit.idUnit}`].map((item) => (
                    <div>{item.idUnit_8}</div>
                  ))} */}
              </Panel>
            );
          })}
          <Panel header={'Несортированные'} key="unsorted">
            {console.log(currentUnits.pooSubjPbsGrooped.unsorted)}
            <TheTable
              pagination={false}
              dataTable={{ data: currentUnits.pooSubjPbsGrooped.unsorted, loading: loading }}
              columns={columns}
            />
            {/* {currentUnits.pooSubjPbsGrooped[`${unit.idUnit}`].map((item) => (
                    <div>{item.idUnit_8}</div>
                  ))} */}
          </Panel>
        </Collapse>
        <SwichUser onClick={() => setUser({ ...user, org: user.org == 0 ? 1 : 0 })} />
      </Spinner>
    </>
  );
};
