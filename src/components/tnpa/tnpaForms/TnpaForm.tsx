import React, { useEffect, useRef, useState } from 'react';
import { Col, DatePicker, Input, Row } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import moment, { Moment } from 'moment';
import TnpaUpload from './../tnpaUpload/TnpaUpload';
import { notificationController } from '@app/controllers/notificationController';
import { Select } from '@app/components/common/selects/Select/Select';
import { Checkbox } from './../../common/Checkbox/Checkbox';
import { FieldRow, LabelText } from './TnpaForm.Style';

export interface TnpaFormProps {
  data?: ITnpaCategory;
  close?: () => void;
  update?: () => void;
}

interface click {
  onClick: () => void;
}

const TnpaForm: React.FC<TnpaFormProps> = ({ data, close, update }) => {
  const [org, setOrg] = useState(false);
  const [user, setUser] = useState({
    org: 1,
  });
  const submit = (values: any) => {
    const finishValues = onFinish(values);
    console.log(finishValues);
    // upload.current?.handleUpload(finishValues);
    // upload.current.onBatchStart()
    // upload.current?.upload.uploader.onClick();
  };

  const [form] = BaseButtonsForm.useForm();

  const onFinishFailed = () => {
    notificationController.error({ message: 'Неверно введены данные ' });
    return;
  };

  const onFinish = (
    values: ITnpaCategory,
  ): {
    update: boolean;
    fields: ITnpaCategory;
    idList?: string | number | null;
  } => {
    const fields = {
      ...values,
      org: user.org,
    };

    if (org) {
      fields.org = 2;
    }
    if (data) {
      return {
        update: true,
        fields,
        idList: data.idList,
      };
    }
    fields.dateBegin = fields.dateBegin ? (fields.dateBegin as unknown as Moment).format(dateFormat) : null;
    fields.dateDoc = fields.dateDoc ? (fields.dateDoc as unknown as Moment).format(dateFormat) : null;
    fields.dateEnd = fields.dateEnd ? (fields.dateEnd as unknown as Moment).format(dateFormat) : null;

    return {
      update: false,
      fields,
    };
  };

  const dateFormat = 'YYYY-MM-DD';

  const upload = useRef<{
    handleUpload: (values: { fields: ITnpaCategory; update: boolean; idList?: number | string | null }) => void;
  }>(null);

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
        style={{ textAlign: 'center' }}
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
        <Row justify={'center'}>
          <Col>
            <BaseButtonsForm.Item label="Дата документа" name="dateDoc" labelCol={{ offset: 5 }}>
              <DatePicker getPopupContainer={(target) => target} format={dateFormat} />
            </BaseButtonsForm.Item>
          </Col>
        </Row>

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
        <FieldRow>
          <LabelText htmlFor="org">Документ общего пользования</LabelText>
          <Checkbox id="org" onChange={(e) => setOrg(e.target.checked)} />
        </FieldRow>
        <TnpaUpload close={close} formInstance={form} ref={upload} titleButton="Загрузить и сохранить документ" />
      </BaseButtonsForm>
    </>
  );
};

export default TnpaForm;
