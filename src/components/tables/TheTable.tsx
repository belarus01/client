import React from 'react';
import { Button, Col, Row, Table, TablePaginationConfig } from 'antd';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { Modal } from '@app/components/common/Modal/Modal';

interface ITheTableData {
  data: object[];
  loading: boolean;
}

interface ITheTableProps {
  dataTable: ITheTableData;
  columns: any[];
  titleModalAdding?: string | null | undefined;
  titleMoadlEditing?: string | null | undefined;
  FormComponent?: React.ElementType;
  selected?: object;
  searchFunc?: (value: string) => void;
  setSearchFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search?: string;
  toggleModalAdding?: (isOpen: boolean) => void;
  toggleModalEditing?: (isOpen: boolean) => void;
  openAddingForm?: boolean;
  openEditingForm?: boolean;
  titleButtonAdd?: string;
  onRow?: undefined | ((recod?: any, rowIndex?: number | undefined) => object);
  pagination?: false | TablePaginationConfig;
  propsFrom?: any;
  typeButton?: 'link' | 'text' | 'default' | 'ghost' | 'primary' | 'dashed';
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
  onRow,
  pagination,
  titleButtonAdd,
  propsFrom,
  typeButton,
}) => {
  return (
    <>
      <Row gutter={[30, 30]}>
        {setSearchFunc && (
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
        )}
        {toggleModalAdding && (
          <Col sm={24} md={6} lg={6}>
            <Button type={typeButton || 'default'} onClick={() => toggleModalAdding(true)}>
              {titleButtonAdd || 'Добавить новую категорию'}
            </Button>
          </Col>
        )}
      </Row>
      <Table
        columns={columns}
        dataSource={dataTable.data}
        loading={dataTable.loading}
        scroll={{ x: 800 }}
        bordered
        pagination={pagination}
        onRow={onRow}
      />
      {toggleModalAdding && openAddingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalAdding(false)}
          destroyOnClose
          title={titleModalAdding}
          centered
          open={openAddingForm}
        >
          {Component && <Component {...propsFrom} />}
        </Modal>
      )}
      {toggleModalEditing && openEditingForm && (
        <Modal
          closable
          footer={null}
          onCancel={() => toggleModalEditing(false)}
          destroyOnClose
          title={titleMoadlEditing}
          centered
          open={openEditingForm}
        >
          {Component && <Component data={selected} {...propsFrom} />}
        </Modal>
      )}
    </>
  );
};

export default TheTable;
