//import { useTranslation } from 'react-i18next';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import * as S from '../eventCard.styles';
import React from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Col } from 'antd';


export const Step2: React.FC = () => {
  //const { t } = useTranslation();

  return (
    <S.FormContent>
      <Col span={12}>
        <BaseButtonsForm.Item
          name="name_nadz"
          label={'Наименование надзорного органа'}
          rules={[{ required: true, message: 'Введите наименование надзорного органа' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={8}>
        <BaseButtonsForm.Item
          name="unp_nadz"
          label={'УНП надзорного органа'}
          rules={[{ required: true, message: 'Введите УНП надзорного органа' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={8}>
        <BaseButtonsForm.Item
          name="adress_nadz"
          label={'Адрес надзорного органа'}
          rules={[{ required: true, message: 'Введите адрес надзорного органа' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={8}>
        <BaseButtonsForm.Item
          name="fio_nadz"
          label={'Ф.И.О руководителя надзорного органа'}
          rules={[{ required: true, message: 'Введите Ф.И.О руководителя надзорного органа' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={8}>
        <BaseButtonsForm.Item
          name="dolgn_nadz"
          label={'Должность руководителя надзорного органа'}
          hasFeedback
          rules={[{ required: true, message: 'Введите должность руководителя надзорного органа' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>
    </S.FormContent>
  );
};
