import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import moment from 'moment';
import { Upload } from '@app/components/common/Upload/Upload';
import { UploadOutlined } from '@ant-design/icons';
import TnpaUpload from './../tnpaUpload/TnpaUpload';
import { notificationController } from '@app/controllers/notificationController';

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

  const onFinishFailed = () => {
    notificationController.error({ message: 'Неверно введены данные ' });
  };

  const dateFormat = 'YYYY-MM-DD';

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  const upload = useRef(null);

  useEffect(() => {
    console.log(upload.current, 'upload.current');
    if (upload.current) {
    }
  }, [upload]);

  return (
    <>
      <BaseButtonsForm
        layout="vertical"
        isFieldsChanged={false}
        onFinish={submit}
        onFinishFailed={onFinishFailed}
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
        <TnpaUpload ref={upload} />
        <BaseButtonsForm.Item>
          <Button htmlType="submit" style={{ marginTop: '10px' }} type="primary">
            Загрузить и сохранить документ
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};

export default TnpaForm;
