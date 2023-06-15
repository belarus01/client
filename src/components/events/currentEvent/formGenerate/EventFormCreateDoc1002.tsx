import { generateCertificateOfRefusalOfAdmission, generatePredpisanie } from '@app/api/doc.api';
import { initGenerateDocGetIdList } from '@app/api/form.api';
import { getSubjById } from '@app/api/subjects.api';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { IFormReport } from '@app/domain/interfaces';
import { DatePicker, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventFormCreateDoc } from './EventFormCreateDoc1000';
import UsersSelectWithPostAndTel from '@app/components/users/UsersSelectWithPostAndTel';
import moment from 'moment';

const EventFormCreateDoc1002: React.FC<EventFormCreateDoc> = ({ event, toggleModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [unp, setUnp] = useState('');

  const { idEventOrder } = useParams();

  const getUnp = (idSubj: string) => {
    getSubjById(idSubj).then((subj) => setUnp(subj.unp as string));
  };

  const onFinishCreateDocUved = (values: IFormReport) => {
    console.log(values);
    setLoading(true);
    if (values.dateDoc) {
      values.dateDoc = moment(values.dateDoc).format('YYYY-MM-DD');
    }
    const field = {
      ...values,
      idForm: 1002,
      idEventOrder: idEventOrder,
      org: 1,
      dateDoc: values.dateDoc,
    };

    console.log(field);
    if (idEventOrder) {
      initGenerateDocGetIdList(field, idEventOrder, 1002).then((idList) => {
        console.log(idList);
        generatePredpisanie({
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

  return (
    <Spinner spinning={loading}>
      <BaseButtonsForm layout="horizontal" onFinish={onFinishCreateDocUved} isFieldsChanged={false}>
        <BaseButtonsForm.Item name="numDoc" label={'Номер документа'} rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="dateDoc" label={'Дата документа'} rules={[{ required: true }]}>
          <DatePicker />
        </BaseButtonsForm.Item>
        {/* <BaseButtonsForm.Item name="addrRecord" label={'Место составления документа'} rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item> */}
        {/* <BaseButtonsForm.Item name="dolj" label={'Должность'}>
          <Select
            options={[
              {
                value: 'Главный государственный инспектор',
                label: 'Главный государственный инспектор',
              },
              {
                value: 'Государственный инспектор',
                label: 'Государственный инспектор',
              },
            ]}
          />
        </BaseButtonsForm.Item>*/}

        <UsersSelectWithPostAndTel nameUid="uid" shownTel={false} />
        <BaseButtonsForm.Item name={'region'} label={'Область, город, район'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'nameAgent'} label={'ФИО представителя субъекта'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'PostAgent'} label={'Должжность представителя субъекта'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'TelAgent'} label={'Телефон представителя субъекта'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'Technical'} label={'Наименования научно-технических средств'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'otherInfo'} label={'Иные сведения'}>
          <TextArea />
        </BaseButtonsForm.Item>
        {/* <BaseButtonsForm.Item name={'comm'} label={'Комментарии'}>
          <TextArea />
        </BaseButtonsForm.Item> */}
        <BaseButtonsForm.Item>
          <Button htmlType="submit" type="primary">
            Создать документ в формате Word
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </Spinner>
  );
};

export default EventFormCreateDoc1002;
