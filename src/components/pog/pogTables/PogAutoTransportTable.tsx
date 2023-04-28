import { Table } from 'antd';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import styled from 'styled-components';
import { ColumnType } from 'antd/lib/table';

export interface ColumnProp {
  key?: string;
  dataIndex?: string;
  title?: string;
  render?: (text?: string, record?: object, index?: number) => JSX.Element;
}

interface IPogAutoTransportTableProps<T> {
  columns: ColumnProp[];
  title?: string;
  data: T[];
  numbered?: boolean;
  titleNumbered?: string;
}

const Title = styled.h2`
  font-size: ${FONT_SIZE.lg};
  font-weight: ${FONT_WEIGHT.bold};
  text-align: center;
  width: 100%;
`;
const { Column, ColumnGroup } = Table;

export default function PogAutoTransportTable<T extends object>({
  title,
  columns,
  data,
  numbered,
  titleNumbered,
}: IPogAutoTransportTableProps<T>) {
  return (
    <>
      {title && <Title>{title}</Title>}
      <Table dataSource={data} pagination={false}>
        {numbered && (
          <ColumnGroup align="center" title={1}>
            <Column align="center" title={titleNumbered} render={(text, record, index) => index + 1} />
          </ColumnGroup>
        )}
        {columns.map((item, index) => (
          <ColumnGroup align="center" key={item.key} title={`${numbered ? index + 2 : index + 1}`}>
            <Column align="center" title={item.title} dataIndex={item.dataIndex} key={item.key} />
          </ColumnGroup>
        ))}
      </Table>
    </>
  );
}
