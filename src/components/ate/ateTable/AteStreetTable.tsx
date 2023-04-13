import React, { useEffect, useState, useMemo } from 'react';
import { getAllStreets } from '@app/api/ate.api';
import { Button, Col, Modal, Row, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchInput } from '../../common/inputs/SearchInput/SearchInput';
import AteStreetAddingForm from '../ateForm/AteStreetAddingForm';

export interface IAteStreet {
  soatoCode?: number;
  idReestr?: number | null;
  obl: string;
  rayon: string;
  sovet: string;
  nameCateg: string;
  nameReestr: string;
  idTipeStreet?: number | null;
  nameTipeStreet?: string;
  idStreet: number | null;
  nameRus: string;
  active?: number;
  dateRegistr?: Date | null;
  dateAnnul?: Date | null;
}

export const AteStreetTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: IAteStreet[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<IAteStreet>({
    nameCateg: '',
    nameReestr: '',
    nameRus: '',
    idStreet: null,
    obl: '',
    sovet: '',
    rayon: '',
  });
  const [search, setSearch] = useState('');

  const fetch = () => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    getAllStreets().then((res: IAteStreet[]) => {
      setTableData({ data: res, loading: false });
    });
  };

  useEffect(() => {
    console.log('fetching street');
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

  const deleteCategory = (category: IAteStreet) => {
    const newData = tableData.data.filter((item) => item.nameRus !== category.nameRus);
    setTableData({ ...tableData, data: newData });
  };

  const filtredTable = useMemo<IAteStreet[]>(() => {
    return tableData.data.filter((item) => item.nameRus.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
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
      render: (selectedCategory: IAteStreet) => {
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
          title={'Создание улицы'}
          centered
          open={openAddingForm}
        >
          <AteStreetAddingForm />
        </Modal>
      )}
      {openEddingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalEdding(false)}
          destroyOnClose
          title={'Редактирование улицы'}
          centered
          open={openEddingForm}
        >
          <AteStreetAddingForm data={selected} />
        </Modal>
      )}
    </>
  );
};

export default AteStreetTable;
