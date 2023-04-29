import { Table } from 'antd';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import styled from 'styled-components';

export interface ColumnProp {
  key?: string;
  dataIndex?: string;
  title?: string;
  render?: (text?: string, record?: object, index?: number) => JSX.Element;
  width?: string;
  children?: ColumnProp[];
}

interface IPogAutoTransportTableProps<T> {
  columns: ColumnProp[];
  title?: string;
  data: T[];
  numbered?: boolean;
  titleNumbered?: string;
  showHeader?: boolean;
  finaly?: boolean;
}

const Title = styled.h2`
  font-size: ${FONT_SIZE.lg};
  font-weight: ${FONT_WEIGHT.bold};
  text-align: center;
  width: 100%;
  margin-top: 1.875rem;
  margin-bottom: 0.625rem;
`;
const { Column, ColumnGroup } = Table;

export default function PogAutoTransportTable<T extends object>({
  title,
  columns,
  data,
  numbered,
  titleNumbered,
  showHeader,
  finaly,
}: IPogAutoTransportTableProps<T>) {
  return (
    <>
      {title && <Title>{title}</Title>}
      <Table dataSource={data} pagination={false} showHeader={showHeader}>
        {numbered && (
          <ColumnGroup align="center" title={1}>
            <Column align="center" title={titleNumbered} render={(text, record, index) => index + 1} />
          </ColumnGroup>
        )}
        {!finaly
          ? columns.map((item, index) => (
              <ColumnGroup align="center" key={item.key} title={`${numbered ? index + 2 : index + 1}`}>
                <Column
                  align="center"
                  title={item.title}
                  dataIndex={item.dataIndex}
                  key={item.key}
                  width={item.width}
                />
              </ColumnGroup>
            ))
          : columns.map((item, index) =>
              index == 2 ? (
                <ColumnGroup align="center" key={item.key} title={`${numbered ? index + 2 : index + 1}`}>
                  <ColumnGroup align="center" key={item.key} title={`Итоговый документ`}>
                    {(item.children ? item.children : []).map((children) => (
                      <Column
                        align="center"
                        title={children.title}
                        dataIndex={children.dataIndex}
                        key={children.key}
                        width={children.width}
                      />
                    ))}
                  </ColumnGroup>
                </ColumnGroup>
              ) : (
                <ColumnGroup align="center" key={item.key} title={`${numbered ? index + 2 : index + 1}`}>
                  <Column
                    align="center"
                    title={item.title}
                    dataIndex={item.dataIndex}
                    key={item.key}
                    width={item.width}
                  />
                </ColumnGroup>
              ),
            )}
      </Table>
    </>
  );
}
