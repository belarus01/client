import { IDefection } from '@app/domain/interfaces';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import React, { useState } from 'react';
import { BaseButtonsForm } from '../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Button } from '@app/components/common/buttons/Button/Button';

export interface AddQuestionsInEvent {
  data: IDefection[];
  questionsCheckLists: IDefection[];
}

const columns = [
  {
    title: 'Название',
    dataIndex: 'rulePunct',
    key: 'idDef',
  },
];

const AddQuestionsInEvent: React.FC<AddQuestionsInEvent> = ({ data, questionsCheckLists }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IDefection[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], selected: IDefection[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys, selected);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(selected);
  };

  const rowSelection: TableRowSelection<IDefection> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const createEventOrderWithThemeAndDefections = () => {
    console.log(selectedRows, questionsCheckLists);
    // createEventOrderQueDef(selectedRows);
  };

  return (
    <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
      <BaseButtonsForm.Item>
        <Table rowSelection={rowSelection} rowKey={'idDef'} columns={columns} dataSource={data} />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item>
        <Button htmlType="submit" type="primary" onClick={createEventOrderWithThemeAndDefections}>
          Сохранить
        </Button>
      </BaseButtonsForm.Item>
    </BaseButtonsForm>
  );
};

export default AddQuestionsInEvent;
