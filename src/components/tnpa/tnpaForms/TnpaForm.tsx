import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, DatePicker, Input, Row } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import moment from 'moment';
import { Upload } from '@app/components/common/Upload/Upload';
import { UploadOutlined } from '@ant-design/icons';
import TnpaUpload from './../tnpaUpload/TnpaUpload';
import { notificationController } from '@app/controllers/notificationController';
import { Select } from '@app/components/common/selects/Select/Select';
import { Checkbox } from './../../common/Checkbox/Checkbox';

export interface TnpaFormProps {
  data?: ITnpaCategory;
  close?: () => void;
  update?: () => void;
}

const TnpaForm: React.FC<TnpaFormProps> = ({ data, close, update }) => {
  const submit = (values: any) => {
    // post, body newCategory
    console.log('submit', values);
  };

  const [form] = BaseButtonsForm.useForm();

  const onFinishFailed = () => {
    notificationController.error({ message: 'Неверно введены данные ' });
  };

  const onFinish = () => {
    const fields = form.getFieldsValue();
    if (data) {
      return {
        update: true,
        fields,
      };
    }
    return {
      update: false,
      fields,
    };
  };

  const dateFormat = 'YYYY-MM-DD';

  const upload = useRef(null);

  const setInitialValues = () => {
    if (data) {
      console.log(data);

      const initialValues = {
        ...data,
        dateBegin: data.dateBegin ? moment(data.dateBegin) : null,
        dateEnd: data.dateEnd ? moment(data.dateEnd) : null,
        dateDoc: data.dateDoc ? moment(data.dateDoc) : null,
      };
      form.setFieldsValue(initialValues);
    }
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  useEffect(() => {
    console.log(upload.current, 'upload.current');
    if (upload.current) {
    }
  }, [upload]);

  return (
    <>
      <BaseButtonsForm
        layout="vertical"
        form={form}
        isFieldsChanged={false}
        onFinish={submit}
        onFinishFailed={onFinishFailed}
      >
        <BaseButtonsForm.Item label="Название" name="name" rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер документа" name="numDoc" rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="URI документа" name="addr">
          <Input />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Дата документа" wrapperCol={{ span: 24 }} name="dateDoc">
          <DatePicker getPopupContainer={(target) => target} format={dateFormat} />
        </BaseButtonsForm.Item>

        <Row>
          <Col offset={1}>
            <BaseButtonsForm.Item label="Дата начала действия документа" name="dateBegin">
              <DatePicker getPopupContainer={(target) => target} format={dateFormat} />
            </BaseButtonsForm.Item>
          </Col>
          <Col offset={1}>
            <BaseButtonsForm.Item label="Дата окончания действия документа" name="dateEnd">
              <DatePicker getPopupContainer={(target) => target} format={dateFormat} />
            </BaseButtonsForm.Item>
          </Col>
        </Row>

        <BaseButtonsForm.Item label="Дата окончания действия документа" name="typeDoc">
          <Select
            options={[
              {
                label: 'Закон',
                value: 1,
              },
              {
                label: 'Декрет',
                value: 2,
              },
              {
                label: 'Постановление',
                value: 3,
              },
              {
                label: 'Общие требования',
                value: 4,
              },
              {
                label: 'Договор',
                value: 5,
              },
              {
                label: 'Порядок',
                value: 6,
              },
              {
                label: 'Инструкция',
                value: 7,
              },
              {
                label: 'Правила',
                value: 8,
              },
              {
                label: 'Положение',
                value: 9,
              },
              {
                label: 'Перечень',
                value: 10,
              },
              {
                label: 'ТР',
                value: 11,
              },
              {
                label: 'ТКП',
                value: 12,
              },
              {
                label: 'СН',
                value: 13,
              },
            ]}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Документ общего пользования" name="org">
          <Checkbox></Checkbox>
        </BaseButtonsForm.Item>
        <TnpaUpload close={close} ref={upload} onFinish={onFinish} titleButton="Загрузить и сохранить документ" />
      </BaseButtonsForm>
    </>
  );
};

export default TnpaForm;
