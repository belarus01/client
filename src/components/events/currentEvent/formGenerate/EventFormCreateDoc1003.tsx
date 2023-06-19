import { generateActProverki } from '@app/api/doc.api';
import { initGenerateDocGetIdList } from '@app/api/form.api';
import { getSubjById } from '@app/api/subjects.api';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { IEventOrder, IFormReport } from '@app/domain/interfaces';
import { DatePicker, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventFormCreateDoc } from './EventFormCreateDoc1000';
import moment from 'moment';
import { getEventOrderByIdEventOrder } from '@app/api/events.api';

const EventFormCreateDoc1003: React.FC<EventFormCreateDoc> = ({ event, toggleModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [unp, setUnp] = useState('');
  const [, setCurrentEvent] = useState<IEventOrder>({
    idEvent: null,
    idSubj: null,
    idUnit_3: null,
    idUnit_4: null,
    dateBegin: '',
    dateEnd: '',
    fioPostTitle: '',
    nameAgent: '',
    postAgent: '',
    uidBoss: null,
    org: 1,
  });

  const { idEventOrder } = useParams();

  const [form] = BaseButtonsForm.useForm();
  const [eventForm] = BaseButtonsForm.useForm();

  const getUnp = (idSubj: string) => {
    getSubjById(idSubj).then((subj) => setUnp(subj.unp as string));
  };

  const getEvent = (idEventOrder: string | number) => {
    getEventOrderByIdEventOrder(idEventOrder).then((event) => {
      console.log(event);
      setCurrentEvent(event);
      eventForm.setFieldsValue(event);
      setLoading(false);
    });
  };

  const onFinishCreateDocUved = (values: IFormReport) => {
    console.log(values);
    setLoading(true);
    if (values.dateDoc) {
      values.dateDoc = moment(values.dateDoc).format('YYYY-MM-DD');
    }
    if (values.dateRec) {
      values.dateRec = moment(values.dateRec).format('YYYY-MM-DD');
    }
    if (values.dateBook) {
      values.dateBook = moment(values.dateBook).format('YYYY-MM-DD');
    }
    const field = {
      ...values,
      idForm: 1003,
      idEventOrder: idEventOrder,
      org: 1,
      dateDoc: values.dateDoc,
      dateRec: values.dateRec,
      dateBook: values.dateBook,
    };

    console.log(field);
    if (idEventOrder) {
      initGenerateDocGetIdList(field, idEventOrder, 1003).then((idList) => {
        generateActProverki({
          id_list: idList,
          id_event_order: idEventOrder,
          unp,
        }).then(() => {
          setLoading(false);
          toggleModal(false);
        });
      });
    }
  };

  useEffect(() => {
    if (event) {
      console.log(event);
      getUnp(event.idSubj?.toString() || '');
    }
  }, [event]);

  useEffect(() => {
    if (idEventOrder) {
      setLoading(true);
      getEvent(idEventOrder);
    }
  }, [idEventOrder]);

  return (
    <Spinner spinning={loading}>
      <BaseButtonsForm form={form} layout="horizontal" onFinish={onFinishCreateDocUved} isFieldsChanged={false}>
        <BaseButtonsForm.Item name="numDoc" label={'Номер документа'} rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="dateDoc" label={'Дата документа'} rules={[{ required: true }]}>
          <DatePicker />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="addrRecord" label={'Место составления документа'} rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'otherInfo'} label={'Иные сведения'}>
          <TextArea />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'comm'} label={'Комментарии'}>
          <TextArea />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item name={'flBook'} label={'Книга учета проверок'}>
          <Select
            options={[
              {
                value: '0',
                label: 'Не представлена',
              },
              {
                value: '1',
                label: 'Представлена',
              },
            ]}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'dateBook'} label={'Дата регистрации проверки'}>
          <DatePicker />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'numBook'} label={'Номер регистрации'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'flRec'} label={'Способ отправки'}>
          <Select
            options={[
              {
                value: '0',
                label: 'В руки',
              },
              {
                value: '1',
                label: 'Почтой',
              },
              {
                value: '2',
                label: 'Факсом',
              },
            ]}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'receiver'} label={'Фамилия получателя'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'dateRec'} label={'Дата отправки'}>
          <DatePicker />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button htmlType="submit" type="primary">
            Создать документ в формате Word
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </Spinner>
  );
};

export default EventFormCreateDoc1003;
