import { generateDoc1 } from '@app/api/doc.api';
import { createDoc, getFormReportMaxIdList } from '@app/api/form.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { IDoc } from '@app/domain/interfaces';
import { DatePicker } from 'antd';
import { doc } from 'prettier';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

interface EventCreateDocFormProps {
  toggleModal: (isOpen: boolean) => void;
  currentDoc: IDoc;
}

const EventCreateDocForm: React.FC<EventCreateDocFormProps> = ({ toggleModal, currentDoc }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formDis, setFormDis] = useState(true);
  const [shownModalUved, setShownModalUved] = useState(false);
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null);

  const { idEventOrder } = useParams();

  const onFinishCreateDocUved = (values: object) => {
    console.log(values);

    const field = {
      ...values,
      idForm: 1000,
      idEventOrder: idEventOrder,
      org: 1,
    };

    console.log(field);

    // createDoc(field).then(() => {
    //   getFormReportMaxIdList().then((idList) => {
    //     generateDoc1({ id_list: idList, id_event_order: idEventOrder, unp: '100008077' });
    //   });
    // });
  };

  // switch docs form
  const switchDoc = (doc: IDoc) => {
    switch (doc.idTypeDoc) {
      case 1000:
        setCurrentForm('Form1');
        break;

      default:
        setCurrentForm('Form2');
        break;
    }
  };

  useEffect(() => {
    console.log(currentDoc);
    switchDoc(currentDoc);
  }, [currentDoc]);

  useEffect(() => {
    console.log(currentForm);
    if (currentForm) {
      const CurrentFormComponent = lazy(() => import(`./${currentForm}`));
      setComponent(CurrentFormComponent);
    }
  }, [currentForm]);
  const options = [
    {
      label: 'руки',
      value: 0,
    },
    {
      label: 'почтой',
      value: 1,
    },
  ];

  const flbooks = [
    {
      label: 'не предсвталена',
      value: 0,
    },
    {
      label: 'предсвталена',
      value: 1,
    },
  ];
  const OtherComponent = lazy(() => import('./Form1'));
  return (
    <BaseButtonsForm layout="horizontal" onFinish={onFinishCreateDocUved} isFieldsChanged={false}>
      <BaseButtonsForm.Item name="numDoc" label={'Номер документа'} rules={[{ required: true }]}>
        <Input />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="dateDoc" label={'Дата документа'} rules={[{ required: true }]}>
        <DatePicker />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="addrRecord" label={'Место составления документа'} rules={[{ required: true }]}>
        <Input />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="comm" label={'Замечания'}>
        <TextArea />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="otherInfo" label={'Комментарий инспектора'}>
        <TextArea />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="receiver" label={'Вручено'} rules={[{ required: true }]}>
        <Input />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="flRec" label={'Передача'} rules={[{ required: true }]}>
        <Select options={options} />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="flBook" label={'Представлена книга учета'} rules={[{ required: true }]}>
        <Select options={flbooks} />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item
        name="numBook"
        label={'Номер записи в книге учета проверок у субъекта'}
        rules={[{ required: true }]}
      >
        <Input />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item
        name="dateBook"
        label={'Дата записи в книге учета проверок у субъекта'}
        rules={[{ required: true }]}
      >
        <DatePicker />
      </BaseButtonsForm.Item>
      <BaseButtonsForm.Item name="dateRec" label={'Дата вручения'} rules={[{ required: true }]}>
        <DatePicker />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item>
        <Button htmlType="submit" type="primary">
          Сохранить
        </Button>
      </BaseButtonsForm.Item>
      <Suspense fallback={<div>Loading...</div>}>{Component ? <Component /> : null}</Suspense>
    </BaseButtonsForm>
  );
};

export default EventCreateDocForm;
