import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getAllRayons } from '@app/api/ate.api';

interface AteRayons {
  nameRayon: string;
}

const AteRayonTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: AteRayons[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const fetch = () => {
    setTableData({ ...tableData, loading: true });
    getAllRayons().then((result) => {
      setTableData({ data: result, loading: false });
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const columns = [
    {
      key: 'nameRayon',
      title: 'Название района',
      dataIndex: 'nameRayon',
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={tableData.data} />
    </>
  );
};

export default AteRayonTable;
