import { generateRecomendPoUstrNarush } from '@app/api/doc.api';
import { initGenerateDocGetIdList } from '@app/api/form.api';
import { getSubjById } from '@app/api/subjects.api';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IEventOrder, IFormReport } from '@app/domain/interfaces';
import { DatePicker, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventFormCreateDoc } from './EventFormCreateDoc1000';
import moment from 'moment';
import { getEventOrderByIdEventOrder, updateEventOrder } from '@app/api/events.api';

const EventFormCreateDoc1010: React.FC<EventFormCreateDoc> = ({ event, toggleModal }) => {
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

  const [shownFIO, setShownFIO] = useState(true);

  const changeFunctionales = (value: string) => {
    if (value == '0') {
      setShownFIO(false);
    } else {
      setShownFIO(true);
    }
  };

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
    if (values.dateRec) {
      values.dateRec = moment(values.dateRec).format('YYYY-MM-DD');
    }

    const field = {
      ...values,
      idForm: 1010,
      idEventOrder: idEventOrder,
      org: 1,

      dateRec: values.dateRec,
    };

    console.log(field);
    if (idEventOrder) {
      initGenerateDocGetIdList(field, idEventOrder, 1010).then((idList) => {
        const newEventForm = { ...eventForm.getFieldsValue() };
        updateEventOrder(idEventOrder, newEventForm).then(() => {
          generateRecomendPoUstrNarush({
            id_list: idList,
            id_event_order: idEventOrder,
            unp,
          }).then(() => {
            setLoading(false);
            toggleModal(false);
          });
        });
      });
    }
  };

  const onFinishEvent = (values: IEventOrder) => {
    setCurrentEvent((prev) => ({ ...prev, ...values }));
    onFinishCreateDocUved(form.getFieldsValue());
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
        <BaseButtonsForm.Item name={'flRec'} label={'Способ отправки'}>
          <Select
            onSelect={(value) => changeFunctionales(value as string)}
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
          <Input disabled={shownFIO} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'dateRec'} label={'Дата отправки'}>
          <DatePicker getPopupContainer={(target) => target} />
        </BaseButtonsForm.Item>
      </BaseButtonsForm>

      <BaseButtonsForm layout="horizontal" form={eventForm} isFieldsChanged={false} onFinish={onFinishEvent}>
        <BaseButtonsForm.Item name={'nameAgent'} label={'ФИО представителя субъекта'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'postAgent'} label={'Должжность представителя субъекта'}>
          <Input />
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

export default EventFormCreateDoc1010;
