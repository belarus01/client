import React, { useState } from 'react';
import { Button, DatePicker, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import moment from 'moment';
import { Upload } from '@app/components/common/Upload/Upload';
import { UploadOutlined } from '@ant-design/icons';
import TnpaUpload from './../tnpaUpload/TnpaUpload';

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

  const submit = (values: any) => {
    // post, body newCategory
    console.log('submit', values);
  };

  const dateFormat = 'YYYY-MM-DD';

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');

  return (
    <>
      <BaseButtonsForm
        layout="vertical"
        isFieldsChanged={false}
        onFinish={submit}
        initialValues={{
          numDoc: newCategory.numDoc,
          dateDoc: moment(newCategory.dateDoc || today, dateFormat),
          addr: newCategory.addr,
          name: newCategory.name,
        }}
      >
        <BaseButtonsForm.Item label="Название" name="name" rules={[{ required: true }]}>
          <Input onChange={(e) => setNewCategory({ ...newCategory, name: (newCategory.name = e.target.value) })} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Адрес" name="addr">
          <Input onChange={(e) => setNewCategory({ ...newCategory, addr: (newCategory.addr = e.target.value) })} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер документа" name="numDoc" rules={[{ required: true }]}>
          <Input onChange={(e) => setNewCategory({ ...newCategory, numDoc: (newCategory.numDoc = e.target.value) })} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата документа" name="dateDoc">
          <DatePicker
            format={dateFormat}
            onChange={(value) => setNewCategory({ ...newCategory, dateDoc: value?.format(dateFormat) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <TnpaUpload />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button htmlType="submit" style={{ marginTop: '10px' }} type="primary">
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};

export default TnpaForm;
