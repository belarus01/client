import { getAllObjectsBySubjectId } from '@app/api/objects.api';
import { Pagination } from '@app/api/users.api';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { SearchInput } from '@app/components/common/inputs/SearchInput/SearchInput';
import { SSubjObj } from '@app/domain/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useMounted } from '@app/hooks/useMounted';
import { Col, Row, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 15,
};
export const SubjectObjects: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const subj = useAppSelector((state) => state.subj.subj);
  const [tableData, setTableData] = useState<{ data: SSubjObj[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [obj, setObj] = useState<SSubjObj[]>([]);
  const { isMounted } = useMounted();

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      if (subj)
        getAllObjectsBySubjectId(subj?.idSubj).then((res) => {
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
      render: (subj: SSubjObj) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                //navigate('/subject', {state:subj})
                // notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
              }}
            >
              {'Открыть'}
            </Button>
          </Space>
        );
      },
    },
  ];
  function handleSearch(value: string): void {
    throw new Error('Function not implemented.');
  }

  function showAddUserModal(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Row gutter={[30, 30]}>
        <Col sm={24} md={8} lg={8}>
          <SearchInput placeholder={'Не менее 6 символов'} enterButton="Поиск" size="middle" onSearch={handleSearch} />
        </Col>
        <Col sm={24} md={6} lg={6}>
          <Button onClick={showAddUserModal}>Добавить объект</Button>
        </Col>
      </Row>
      <Table
        dataSource={tableData.data}
        pagination={tableData.pagination}
        loading={tableData.loading}
        scroll={{ x: 800 }}
        columns={columns}
        bordered
      />
    </>
  );
};
