import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getObl } from '@app/api/ate.api';
import { Table } from '../../common/Table/Table.styles';
import { ateObl } from '@app/domain/interfaces';

export const AteObl: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: ateObl[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const fetch = () => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    getObl().then((res: ateObl[]) => {
      console.log(res);
      setTableData({ data: res, loading: false });
      console.log(tableData);
    });
  };

  useEffect(() => {
    console.log('fetching');
    fetch();
  }, []);

  const columns = [
    {
      key: '1',
      title: 'Область',
      dataIndex: 'nameObl',
    },
    {
      key: '3',
      title: 'Дата обновления',
      dataIndex: 'dateRecord',
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData.data}
        pagination={false}
        loading={tableData.loading}
        scroll={{ x: 800 }}
        bordered
      />
    </>
  );
};

export default AteObl;
