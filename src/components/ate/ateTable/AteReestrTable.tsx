import React, { useEffect, useState, useMemo } from 'react';
import { getAllReestr } from '@app/api/ate.api';
import { Button, Col, Row, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchInput } from '../../common/inputs/SearchInput/SearchInput';
import AteReestrAddingForm from '../ateForm/AteReestrAddingForm';
import { Modal } from '@app/components/common/Modal/Modal';

export interface IAteReestr {
  active?: number;
  dateAnnul?: Date | string;
  dateRecord?: Date | string;
  idCateg?: number;
  idObl?: number;
  idRayon?: number | null;
  idReestr: number | null;
  idReestrPre?: number;
  nameReestr: string;
  soatoCode?: string;
}

export const AteReestrTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: IAteReestr[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<IAteReestr>({
    nameReestr: '',
    idReestr: null,
  });
  const [search, setSearch] = useState('');

  // const [filtredTable, setFiltredTable] = useState<ateReestr[]>(tableData.data);

  const fetch = () => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    getAllReestr().then((res: IAteReestr[]) => {
      setTableData({ data: res, loading: false });
      console.log(tableData);
      console.log(filtredTable);
    });
  };

  useEffect(() => {
    console.log('fetching');
    fetch();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    setOpenAddingForm(isOpen);
  };

  const toggleModalEdding = (isOpen = true) => {
    setOpenEddingForm(isOpen);
  };

  const searchCategories = (value: string) => {
    setSearch(value);
    console.log(value);
  };

  // No BE

  const deleteCategory = (category: IAteReestr) => {
    const newData = tableData.data.filter((item) => item.idCateg !== category.idCateg);
    setTableData({ ...tableData, data: newData });
  };

  const filtredTable = useMemo<IAteReestr[]>(() => {
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
    {
      key: 'actions',
      title: 'Действие',
      render: (selectedCategory: IAteReestr) => {
        return (
          <Space>
            <EditOutlined
              onClick={() => {
                setSelected(selectedCategory);
                toggleModalEdding();
              }}
            />
            <DeleteOutlined onClick={() => deleteCategory(selectedCategory)} style={{ color: 'red', marginLeft: 12 }} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={[30, 30]}>
        <Col sm={24} md={8} lg={8}>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={''}
            enterButton="Поиск"
            size="middle"
            onSearch={searchCategories}
          />
        </Col>
        <Col sm={24} md={6} lg={6}>
          <Button onClick={() => toggleModalAdding()}>Добавить новую категорию</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filtredTable} loading={tableData.loading} scroll={{ x: 800 }} bordered />
      {openAddingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalAdding(false)}
          destroyOnClose
          title={'Создание Реестра'}
          centered
          open={openAddingForm}
        >
          <AteReestrAddingForm />
        </Modal>
      )}
      {openEddingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalEdding(false)}
          destroyOnClose
          title={'Создание Реестра'}
          centered
          open={openEddingForm}
        >
          <AteReestrAddingForm data={selected} />
        </Modal>
      )}
    </>
  );
};

export default AteReestrTable;
