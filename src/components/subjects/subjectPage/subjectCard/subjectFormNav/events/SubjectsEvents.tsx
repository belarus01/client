import { getAllEventsBySubjectId } from '@app/api/events.api';
import { getAllObjectsBySubjectId } from '@app/api/objects.api';
import { Pagination } from '@app/api/users.api';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { SDept, SEvents, SEventsOrder, SSubjObj } from '@app/domain/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useMounted } from '@app/hooks/useMounted';
import { Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 15,
};

export const SubjectEvents: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const subj = useAppSelector((state) => state.subj.subj);
  const [tableData, setTableData] = useState<{ data: SEventsOrder[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { isMounted } = useMounted();

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      if (subj)
        getAllEventsBySubjectId(subj?.idSubj).then((res) => {
          if (isMounted.current) {
            console.log(res);
            setTableData({ data: res, pagination: initialPagination, loading: false });
          }
        });
    },
    [isMounted],
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleAddClick = () => {};

  const columns = [
    {
      key: '1',
      title: 'Мероприятие',
      dataIndex: 'idEvent2',
      render: (idEvent2: SEvents) => {
        return <p>{idEvent2.event}</p>;
      },
    },
    {
      key: '2',
      title: 'Орган, выдавший предписание',
      dataIndex: 'idDeptIss',
    },
    {
      key: '3',
      title: 'Орган, проводящий проверку',
      dataIndex: 'idDept2',
      render: (idDept2: SDept) => {
        return <p>{idDept2 !== null ? idDept2.departament : ''}</p>;
      },
    },
    {
      key: '4',
      title: 'Основание назначения мероприятия',
      dataIndex: 'addrDescr',
    },
    {
      key: '5',
      title: 'Вид',
      dataIndex: 'idUnit_3',
    },
    {
      key: '6',
      title: 'Тип',
      dataIndex: 'idUnit_4',
    },
    {
      key: '7',
      title: 'Применяемые научно-технические средства',
      dataIndex: 'technical',
    },
    {
      key: '8',
      title: 'Дата начала',
      dataIndex: 'dateBegin',
      render: (date: Date) => {
        const newDate = new Date(date);
        return <p>{newDate.toLocaleDateString()}</p>;
      },
    },
    {
      key: '9',
      title: 'Дата окончания',
      dataIndex: 'dateEnd',
      render: (date: Date) => {
        const newDate = new Date(date);
        return <p>{newDate.toLocaleDateString()}</p>;
      },
    },
    {
      key: '10',
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
  return (
    <>
      <Button onClick={handleAddClick}>Добавить мероприятие</Button>
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
