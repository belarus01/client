import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Row, Space, Table } from 'antd';
import { getAllRayons } from '@app/api/ate.api';
import { SearchInput } from '@app/components/common/inputs/SearchInput/SearchInput';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from '@app/components/common/Modal/Modal';
import AteRayonAddingForm from '../ateForm/AteRayonAddingForm';

export interface IAteRayon {
  nameRayon: string;
  idRayon: number | null;
}

const AteRayonTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: IAteRayon[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<IAteRayon>({
    nameRayon: '',
    idRayon: null,
  });
  const [search, setSearch] = useState('');

  const fetch = () => {
    setTableData({ ...tableData, loading: true });
    getAllRayons().then((result) => {
      setTableData({ data: result, loading: false });
    });
  };

  useEffect(() => {
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

  const filtredTable = useMemo<IAteRayon[]>(() => {
    return tableData.data.filter((item) => item.nameRayon.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [search, tableData]);

  // No BE

  const deleteCategory = (category: IAteRayon) => {
    const newData = tableData.data.filter((item) => item.idRayon !== category.idRayon);
    setTableData({ ...tableData, data: newData });
  };

  const columns = [
    {
      key: '1',
      title: 'Название района',
      dataIndex: 'nameRayon',
    },
    {
      key: 2,
      title: 'Действие',
      render: (selectedCategory: IAteRayon) => {
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
      <Table columns={columns} dataSource={filtredTable} />
      {openAddingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalAdding(false)}
          destroyOnClose
          title={'Создание района'}
          centered
          open={openAddingForm}
        >
          <AteRayonAddingForm />
        </Modal>
      )}
      {openEddingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalEdding(false)}
          destroyOnClose
          title={'Редактирование района'}
          centered
          open={openEddingForm}
        >
          <AteRayonAddingForm data={selected} />
        </Modal>
      )}
    </>
  );
};

export default AteRayonTable;
