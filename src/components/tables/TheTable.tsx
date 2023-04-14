import React from 'react';
import { Button, Col, Row, Table } from 'antd';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { Modal } from '@app/components/common/Modal/Modal';

interface ITheTableData {
  data: object[];
  loading: boolean;
}

interface ITheTableProps {
  dataTable: ITheTableData;
  columns: any[];
  titleModalAdding: string | null | undefined;
  titleMoadlEditing: string | null | undefined;
  FormComponent: React.ElementType;
  selected: object;
  searchFunc: (value: string) => void;
  setSearchFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  toggleModalAdding: (isOpen: boolean) => void;
  toggleModalEditing: (isOpen: boolean) => void;
  openAddingForm: boolean;
  openEditingForm: boolean;
}

export const TheTable: React.FC<ITheTableProps> = ({
  dataTable,
  columns,
  titleModalAdding,
  titleMoadlEditing,
  FormComponent: Component,
  selected,
  searchFunc,
  setSearchFunc,
  search,
  toggleModalAdding,
  toggleModalEditing,
  openAddingForm,
  openEditingForm,
}) => {
  return (
    <>
      <Row gutter={[30, 30]}>
        <Col sm={24} md={8} lg={8}>
          <SearchInput
            value={search}
            onChange={(e) => setSearchFunc(e)}
            placeholder={''}
            enterButton="Поиск"
            size="middle"
            onSearch={searchFunc}
          />
        </Col>
        <Col sm={24} md={6} lg={6}>
          <Button onClick={() => toggleModalAdding(true)}>Добавить новую категорию</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={dataTable.data} loading={dataTable.loading} scroll={{ x: 800 }} bordered />
      {openAddingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalAdding(false)}
          destroyOnClose
          title={titleModalAdding}
          centered
          open={openAddingForm}
        >
          <Component />
        </Modal>
      )}
      {openEditingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalEditing(false)}
          destroyOnClose
          title={titleMoadlEditing}
          centered
          open={openEditingForm}
        >
          <Component data={selected} />
        </Modal>
      )}
    </>
  );
};

export default TheTable;
