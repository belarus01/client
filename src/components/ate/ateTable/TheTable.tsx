import { Pagination } from '@app/api/table.api';
import { Table } from 'antd';
import React, { ReactNode, useState } from 'react';
import { CheckBox } from './../../header/components/searchDropdown/searchOverlay/SearchFilter/SearchFilter.styles';

interface IColumn {
  key: string;
  dataIndex: string;
  title: string;
}
interface ITheTableProps {
  data: any[];
  column: IColumn[];
  pagination?: Pagination;
}

export const TheTable: React.FC<ITheTableProps> = ({ data, column, pagination }) => {
  return (
    <>
      <Table dataSource={data} columns={column} pagination={pagination} />
    </>
  );
};
