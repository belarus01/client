import { generatePojTechKarta } from '@app/api/doc.api';
import { initGenerateDocGetIdList } from '@app/api/form.api';
import { getSubjById } from '@app/api/subjects.api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventFormCreateDoc } from './EventFormCreateDoc1000';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { getEventOrderByIdEventOrder } from '@app/api/events.api';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from 'antd';
import { IFormReport } from '@app/domain/interfaces';

const EventFormCreateDoc1007: React.FC<EventFormCreateDoc> = ({ event, toggleModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [unp, setUnp] = useState('');

  const { idEventOrder } = useParams();
  const [form] = BaseButtonsForm.useForm();

  const getUnp = (idSubj: string) => {
    return getSubjById(idSubj).then((subj) => setUnp(subj.unp as string));
  };

  const getEvent = (idEventOrder: string | number) => {
    getEventOrderByIdEventOrder(idEventOrder).then((event) => {
      console.log(event);
      setLoading(false);
    });
  };

  const onFinishCreateDocUved = (values: IFormReport) => {
    console.log(values);
    setLoading(true);
    const field = {
      ...values,
      idForm: 1007,
      idEventOrder: idEventOrder,
      org: 1,
    };
    if (idEventOrder) {
      initGenerateDocGetIdList(field, idEventOrder, 1007).then((idList) => {
        generatePojTechKarta({
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
        <BaseButtonsForm.Item name="addrRecord" label={'Место составления документа'} rules={[{ required: true }]}>
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

export default EventFormCreateDoc1007;
