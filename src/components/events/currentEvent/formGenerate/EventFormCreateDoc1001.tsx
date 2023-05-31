import { generateCertificateOfRefusalOfAdmission } from '@app/api/doc.api';
import { initGenerateDocGetIdList } from '@app/api/form.api';
import { getSubjById } from '@app/api/subjects.api';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { IFormReport } from '@app/domain/interfaces';
import { DatePicker, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventFormCreateDoc } from './EventFormCreateDoc1000';
import UsersSelectWithPostAndTel from '@app/components/users/UsersSelectWithPostAndTel';

const EventFormCreateDoc1001: React.FC<EventFormCreateDoc> = ({ event, toggleModal }) => {
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
      values.dateDoc = new Date(values.dateDoc).toLocaleDateString();
    }
    const field = {
      ...values,
      idForm: 1001,
      idEventOrder: idEventOrder,
      org: 1,
      dateDoc: values.dateDoc,
    };

    console.log(field);
    if (idEventOrder) {
      initGenerateDocGetIdList(field, idEventOrder, 1001).then((idList) => {
        generateCertificateOfRefusalOfAdmission({
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
        <UsersSelectWithPostAndTel nameUid="uid" />
        <BaseButtonsForm.Item name={'nameAegent'} label={'ФИО'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'PostAegent'} label={'Должжность'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'telAegent'} label={'Телефон'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'techni'} label={'Технические средства'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'otherInfo'} label={'Иные сведения'}>
          <TextArea />
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

export default EventFormCreateDoc1001;
