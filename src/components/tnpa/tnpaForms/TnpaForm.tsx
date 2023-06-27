import React, { useEffect, useRef, useState } from 'react';
import { Col, DatePicker, Input, Row, Space } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import moment from 'moment';
import { Upload } from '@app/components/common/Upload/Upload';
import { UploadOutlined } from '@ant-design/icons';
import TnpaUpload from './../tnpaUpload/TnpaUpload';
import { notificationController } from '@app/controllers/notificationController';
import { Select } from '@app/components/common/selects/Select/Select';
import { Checkbox } from './../../common/Checkbox/Checkbox';
import { Button } from './../../common/buttons/Button/Button';
import { UploadType } from 'antd/lib/upload/interface';
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
    const finalyValues = {
      ...values,
      org: user.org,
    };
    console.log(org);

    if (org) {
      finalyValues.org = 2;
    }
    // post, body newCategory
    console.log('submit', finalyValues);
    console.log(upload.current);
    const aaaa = onFinish();
    upload.current?.handleUpload(aaaa);
    // upload.current.onBatchStart()
    // upload.current?.upload.uploader.onClick();
  };

  const [form] = BaseButtonsForm.useForm();

  const onFinishFailed = () => {
    notificationController.error({ message: 'Неверно введены данные ' });
    return;
  };

  const onFinish = (): {
    update: boolean;
    fields: ITnpaCategory;
    idList?: string | number | null;
  } => {
    const values = form.getFieldsValue();
    const fields = {
      ...values,
      org: user.org,
    };
    console.log(org);

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
    return {
      update: false,
      fields,
    };
  };

  const dateFormat = 'YYYY-MM-DD';

  const upload = useRef<{ upload: { uploader: click } }>(null);

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
        <TnpaUpload
          close={close}
          formInstance={form}
          ref={upload}
          onFinish={onFinish}
          titleButton="Загрузить и сохранить документ"
        />
      </BaseButtonsForm>
    </>
  );
};

export default TnpaForm;
