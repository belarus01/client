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
import { EventsTable } from '@app/components/events/EvetsTableNew';

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

  const idSubj = subj?.idSubj ? subj.idSubj : '';
  return (
    <>
      <EventsTable idSubj={idSubj} />
      {/* <Button onClick={handleAddClick}>Добавить мероприятие</Button>
      <Table
        dataSource={tableData.data}
        pagination={tableData.pagination}
        loading={tableData.loading}
        scroll={{ x: 800 }}
        columns={columns}
        bordered
      /> */}
    </>
  );
};
