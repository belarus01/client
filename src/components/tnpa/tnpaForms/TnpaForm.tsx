import React, { useState } from 'react';
import { Button, DatePicker, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import moment from 'moment';

export interface TnpaFormProps {
  data?: ITnpaCategory;
  close?: () => void;
}

const TnpaForm: React.FC<TnpaFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<ITnpaCategory>({
    name: '',
    addr: '',
    numDoc: '',
    idList: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  const dateFormat = 'YYYY-MM-DD';

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');

  return (
    <>
      <BaseButtonsForm
        layout="vertical"
        isFieldsChanged={false}
        initialValues={{
          ['dateDoc']: moment(newCategory.dateDoc || today, dateFormat),
        }}
      >
        <BaseButtonsForm.Item label="Название" name="name">
          <Input
            defaultValue={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: (newCategory.name = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Адрес" name="addr">
          <Input
            defaultValue={newCategory.addr}
            onChange={(e) => setNewCategory({ ...newCategory, addr: (newCategory.addr = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер документа" name="numDoc">
          <Input
            defaultValue={newCategory.numDoc}
            onChange={(e) => setNewCategory({ ...newCategory, numDoc: (newCategory.numDoc = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата документа" name="dateDoc">
          <DatePicker
            format={dateFormat}
            onChange={(value) => setNewCategory({ ...newCategory, dateDoc: value?.format(dateFormat) })}
          />
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
      <Button
        style={{ marginTop: '10px' }}
        onClick={() => {
          submit();
        }}
        type="primary"
      >
        Сохранить
      </Button>
    </>
  );
};

export default TnpaForm;
