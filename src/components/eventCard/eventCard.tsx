import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Step1 } from './Steps/1';
import { Step2 } from './Steps/2';
import { Step3 } from './Steps/3';
import { Step4 } from './Steps/4';
import { notificationController } from '@app/controllers/notificationController';
import { mergeBy } from '@app/utils/utils';
import * as S from './eventCard.styles';


interface FormValues {
  [key: string]: string | undefined;
}

interface FieldData {
  name: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

export const EventCard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = BaseForm.useForm();
  const [fields, setFields] = useState<FieldData[]>([
    { name: 'group', value: '' },
    { name: 'unp', value: '' },
    // { name: 'confirmPassword', value: '123456' },
    // { name: 'salutation', value: 'mr' },
    // { name: 'gender', value: 'male' },
    // { name: 'firstName', value: 'John' },
    // { name: 'lastName', value: 'Black' },
    // { name: 'birthday', value: Dates.getDate(1576789200000) },
    // { name: 'phone', value: '298573124' },
    // { name: 'email', value: '' },
    // { name: 'address1', value: 'Slobodskay street' },
    // { name: 'address2', value: 'Nevski street' },
    // { name: 'zipCode', value: '435123' },
    // { name: 'city', value: 'Minsk' },
    // { name: 'country', value: 'Belarus' },
    // { name: 'prefix', value: '+7' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const formLabels: FormValues = {
    group: 'group',
    unp: 'unp',
    confirmPassword: t('common.confirmPassword'),
    salutation: t('forms.stepFormLabels.salutation'),
    gender: t('forms.stepFormLabels.gender'),
    firstName: t('common.firstName'),
    lastName: t('common.lastName'),
    birthday: t('forms.stepFormLabels.birthday'),
    phone: t('common.phone'),
    email: t('common.email'),
    address1: `${t('common.address')} 1`,
    address2: `${t('common.address')} 2`,
    zipCode: t('common.zipcode'),
    city: t('common.city'),
    country: t('common.country'),
  };

  const formValues = fields
    .filter((item) => item.name !== 'prefix')
    .map((item) => ({
      name: formLabels[item.name],
      value: String(item.value),
     
    }));

  const next = () => {
    // form.validateFields().then(() => {
    //   setCurrent(current + 1);
    // });
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = () =>
    form.validateFields().then(() => {
      setIsLoading(true);
      setTimeout(() => {
        notificationController.success({ message: t('common.success') });
        //console.log(form.getFieldsValue());
        console.log(fields);
        setIsLoading(false);
        setCurrent(0);
      }, 1500);
    });

  const steps = [
    {
      title: 'Данные по субъекту (объекту)',
    },
    {
      title: 'Данные по надзорному органу',
    },
    {
      title: 'Данные по надзорно-профилактическому мероприятию',
    },
    {
      title: 'Результаты',
    },
  ];

  const formFieldsUi = [
    <Step1 key="1" />,
    <Step2 key="2" />,
    <Step3 key="3" />,
    // <Step4 key="4" formValues={formValues} />,
    <Step4 key="4" />,
  ];

  return (
    <BaseForm
      name="stepForm"
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        const currentFields = allFields.map((item) => ({
          name: Array.isArray(item.name) ? item.name[0] : '',
          value: item.value,
        }));
        const uniqueData = mergeBy(fields, currentFields, 'name');
        setFields(uniqueData);
      }}
      onFinish={onFinish}
    >
      <S.Steps labelPlacement="vertical" size="small" current={current} items={steps} />

      <div>{formFieldsUi[current]}</div>
      <S.Row>
        {current > 0 && (
          <S.PrevButton type="default" onClick={() => prev()}>
            {'Предыдущий'}
          </S.PrevButton>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            {'Следующий'}
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onFinish} loading={isLoading}>
            {'Готово'}
          </Button>
        )}
      </S.Row>
    </BaseForm>
  );
};
