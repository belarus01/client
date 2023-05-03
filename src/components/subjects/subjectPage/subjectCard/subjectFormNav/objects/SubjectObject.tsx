import { getAllObjectsBySubjectId } from '@app/api/objects.api';
import { Pagination } from '@app/api/users.api';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { SearchInput } from '@app/components/common/inputs/SearchInput/SearchInput';
import TheTable from '@app/components/tables/TheTable';
import { notificationController } from '@app/controllers/notificationController';
import { SSubj, SSubjObj } from '@app/domain/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useMounted } from '@app/hooks/useMounted';
import { Col, Row, Space } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useNavigate, Outlet } from 'react-router-dom';

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
export const SubjectObjects: React.FC = () => {
  // const user = useAppSelector((state) => state.user.user);
  // need add user from store after auth
  const [user, setUser] = useState({
    org: 0,
  });
  const subj = useState<SSubj>({
    idSubj: null,
    unp: '',
  });
  const [tableData, setTableData] = useState<{ data: SSubjObj[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  const navigate = useNavigate();

  const [obj, setObj] = useState<SSubjObj[]>([]);
  const { isMounted } = useMounted();
  const { idSubj } = useParams<{ idSubj?: string }>();
  console.log(idSubj);
  // 100008077 1460
  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));

      if (idSubj)
        getAllObjectsBySubjectId(1460).then((res) => {
          console.log(res);

          if (isMounted.current) {
            setTableData({ data: res, pagination: initialPagination, loading: false });
          }
        });
    },
    [isMounted],
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const data = useMemo(() => {
    return tableData.data.filter((item) => item.org === user.org);
  }, [tableData.data, user.org]);

  const columns = useMemo(() => {
    const columns = [
      {
        key: '1',
        title: 'УНП',
        dataIndex: 'unp',
      },
      {
        key: '2',
        title: 'Наименование объекта',
        dataIndex: 'nameObj',
      },
      {
        key: '3',
        title: 'Место нахождения объекта',
        dataIndex: 'addrObj',
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
                  navigate(`${obj.idObj}`);
                  console.log(obj.idObj);

                  // notificationController.info({
                  //   description: 'safas',
                  //   message: 'asdfasdfadsfasdfasdf',
                  // });
                }}
              >
                Открыть
              </Button>
            </Space>
          );
        },
      },
    ];
    if (user.org == 0) {
      const actions = columns[columns.length - 1];
      columns[columns.length - 1] = {
        key: 'numOpo',
        title: 'Номер ОПО',
        dataIndex: 'numOpo',
      };
      columns.push(actions);
      return columns;
    }
    return columns;
  }, [user.org]);

  function handleSearch(value: string): void {
    throw new Error('Function not implemented.');
  }

  function showAddUserModal(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <TheTable columns={columns} dataTable={{ data: data, loading: tableData.loading }} />
      <SwichUser onClick={() => setUser({ ...user, org: user.org == 0 ? 1 : 0 })} />
    </>
  );
};
