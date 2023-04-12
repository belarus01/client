import React, { useEffect, useState, useMemo } from 'react';
import { getAllReestr } from '@app/api/ate.api';
import { Table } from '../../common/Table/Table.styles';
import Search from 'antd/lib/transfer/search';
import { useNavigate } from 'react-router-dom';

interface ateReestr {
  active: 1;
  dateAnnul?: Date | string;
  dateRecord?: Date | string;
  idCateg: number;
  idObl: number;
  idRayon?: number | null;
  idReestr: 1;
  idReestrPre?: 2458;
  nameReestr: string;
  soatoCode: string;
}

export const AteObl: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: ateReestr[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [search, setSearch] = useState<string>('');

  // const [filtredTable, setFiltredTable] = useState<ateReestr[]>(tableData.data);

  const fetch = () => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    getAllReestr().then((res: ateReestr[]) => {
      setTableData({ data: res, loading: false });
      console.log(tableData);
      console.log(filtredTable);
    });
  };

  useEffect(() => {
    console.log('fetching');
    fetch();
  }, []);

  const filtredTable = useMemo<ateReestr[]>(() => {
    return tableData.data.filter((item) => item.nameReestr.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [search, tableData]);

  const columns = [
    {
      key: 'soatoCode',
      title: 'Соато код',
      dataIndex: 'soatoCode',
    },
    {
      key: 'nameReestr',
      title: 'Область',
      dataIndex: 'nameReestr',
    },
    {
      key: 'dateRecord',
      title: 'Дата обновления',
      dataIndex: 'dateRecord',
    },
    {
      key: 'dateAnnul',
      title: 'Дата анулирования',
      dataIndex: 'dateAnnul',
    },
  ];

  return (
    <>
      <Search placeholder="поиск по названию" value={search} onChange={(event) => setSearch(event.target.value)} />
      <Table columns={columns} dataSource={filtredTable} loading={tableData.loading} scroll={{ x: 800 }} bordered />
    </>
  );
};

// export default AteObl;
