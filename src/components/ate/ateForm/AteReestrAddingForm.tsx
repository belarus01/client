import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { IAteReestr } from '../ateTable/AteReestrTable';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

export interface IAteAddingForm {
  data?: IAteReestr;
}
const AteReestrAddingForm: React.FC<IAteAddingForm> = ({ data }) => {
  const [newReestr, setNewReestr] = useState<IAteReestr>({
    soatoCode: '',
    nameReestr: '',
    idReestr: null,
    dateAnnul: '',
    dateRecord: '',
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit', newReestr);
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Реестр" name="nameReestr">
          <Input
            defaultValue={newReestr.nameReestr}
            onChange={(e) => setNewReestr({ ...newReestr, nameReestr: e.target.value })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Соато код" name="soatoCode">
          <Input
            defaultValue={newReestr.soatoCode}
            onChange={(e) => setNewReestr({ ...newReestr, soatoCode: e.target.value })}
          />
        </BaseButtonsForm.Item>
        <div>Соато код</div>
      </BaseButtonsForm>
      <Button
        style={{ marginTop: '10px' }}
        onClick={() => {
          submit();
        }}
        type="primary"
      >
        Сохранить
      </Button>
    </>
  );
};

export default AteReestrAddingForm;
