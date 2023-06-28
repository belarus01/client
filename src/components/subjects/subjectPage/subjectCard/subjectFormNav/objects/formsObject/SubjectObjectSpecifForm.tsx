import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { SSubjObjSpecif } from '@app/domain/interfaces';
import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

interface ISubjectObjectSpecifFormProps {
  specifData?: SSubjObjSpecif;
  onFinish?: (values: SSubjObjSpecif) => void;
}

const SubjectObjectSpecifForm: React.FC<ISubjectObjectSpecifFormProps> = ({ specifData, onFinish }) => {
  const [specif] = BaseButtonsForm.useForm();
  const setInitialValues = useCallback(() => {
    if (specifData) {
      specifData.dateReg = moment(specifData.dateReg) as unknown as Date;
      specifData.dateAnnul = moment(specifData.dateAnnul) as unknown as Date;
      console.log(specifData);

      specif.setFieldsValue(specifData);
    }
  }, [specif, specifData]);
  useEffect(() => {
    setInitialValues();
  }, [setInitialValues, specifData]);
  return (
    <>
      <BaseButtonsForm form={specif} isFieldsChanged={false} onFinish={onFinish}>
        <BaseButtonsForm.Item
          label="Обслуживающая организация (наименование, юридический адрес,номер и дата выдачи лицензии,  руководитель,  телефон )"
          name="serviceOrg"
        >
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата регистрации" name="dateReg">
          <DatePicker getPopupContainer={(trigger) => trigger} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата аннулирования" name="dateAnnul">
          <DatePicker getPopupContainer={(trigger) => trigger} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="ФИО отверственного за пожарную безопасность" name="nameAgent">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Должность ответстввенного за пожарную безопасность" name="jobAgent">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Телефон ответственного за пожарную безопасность" name="telAgent">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Адрес службы/ответственного за пожарную безопасность" name="addrAgent">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Уточнение места нахождения" name="addrExect">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button htmlType="submit">Сохранить</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};

export default SubjectObjectSpecifForm;
