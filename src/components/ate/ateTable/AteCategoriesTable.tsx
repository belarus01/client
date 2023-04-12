import { getAllCategs } from '@app/api/ate.api';
import { Button, Col, Row, Space, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SearchInput } from '../../common/inputs/SearchInput/SearchInput';
import AteCategoriesAddingForm from '../ateForm/Categories/AteCategoriesAddingForm';
import AteCategoriesEditingForm from '../ateForm/Categories/AteCategoriesEditingForm';

export interface IAteCategory {
  nameCateg: string;
  nameShort: string;
  idCateg: number | null;
}
const AteCategories: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: IAteCategory[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<IAteCategory>({
    nameCateg: '',
    nameShort: '',
    idCateg: null,
  });
  const [search, setSearch] = useState('');

  const fetch = () => {
    setTableData({ ...tableData, loading: true });
    getAllCategs().then((res) => {
      setTableData({ data: res, loading: false });
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

  const filtredTable = useMemo<IAteCategory[]>(() => {
    return tableData.data.filter((item) => item.nameCateg.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [search, tableData]);

  // No BE

  const deleteCategory = (category: IAteCategory) => {
    const newData = tableData.data.filter((item) => item.idCateg !== category.idCateg);
    setTableData({ ...tableData, data: newData });
  };

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
    {
      key: 3,
      title: 'Действие',
      render: (selectedCategory: IAteCategory) => {
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
      {openAddingForm ? (
        <AteCategoriesAddingForm open={openAddingForm} onCancel={() => toggleModalAdding(false)} />
      ) : null}
      {openEddingForm ? (
        <AteCategoriesEditingForm open={openEddingForm} onCancel={() => toggleModalEdding(false)} data={selected} />
      ) : null}
    </>
  );
};

export default AteCategories;
