import { Table } from '@app/components/common/Table/Table';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import styled from 'styled-components';

export interface Column {
  key: string;
  dataIndex: string;
  title: string;
}

interface IPogAutoTransportTableProps<T> {
  columns: Column[];
  title: string;
  data: T[];
}

const Title = styled.h2`
  font-size: ${FONT_SIZE.lg};
  font-weight: ${FONT_WEIGHT.bold};
  text-align: center;
  width: 100%;
`;

export default function PogAutoTransportTable<T>({ title, columns, data }: IPogAutoTransportTableProps<T>) {
  return (
    <>
      <Title>{title}</Title>
      <Table dataSource={data} columns={columns} />
    </>
  );
}
// const PogAutoTransportTable = <T,>({ columns, title, data }: IPogAutoTransportTableProps<T>) => {
//   return (
//     <>
//       <Title>{title}</Title>
//       <Table dataSource={data} columns={columns} />
//     </>
//   );
// };

// export default PogAutoTransportTable;
