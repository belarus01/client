import { getAllCategs } from '@app/api/ate.api';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

const AteCategories: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: any[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const fetch = () => {
    setTableData({ ...tableData, loading: true });
    getAllCategs().then((res) => {
      console.log(res);
      setTableData({ data: res, loading: false });
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const columns = [
    {
      key: 1,
      title: 'Наименование категории',
      dataIndex: 'nameCateg',
    },
    {
      key: 2,
      title: 'Краткое наименование',
      dataIndex: 'nameShort',
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={tableData.data} loading={tableData.loading} scroll={{ x: 800 }} bordered />
    </>
  );
};

export default AteCategories;
