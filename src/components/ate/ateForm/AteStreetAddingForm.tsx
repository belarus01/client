import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { IAteStreet } from '../ateTable/AteStreetTable';
import { Select } from '@app/components/common/selects/Select/Select';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

interface IAddingForm {
  data?: IAteStreet;
}
const AteStreetAddingForm: React.FC<IAddingForm> = ({ data }) => {
  const [newStreet, setNewStreet] = useState<IAteStreet>({
    nameCateg: '',
    nameReestr: '',
    nameRus: '',
    idStreet: null,
    obl: '',
    sovet: '',
    rayon: '',
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit', newStreet);
  };
  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Категория" name="categ">
          <Input
            defaultValue={newStreet.nameCateg}
            onChange={(e) => setNewStreet({ ...newStreet, nameCateg: e.target.value })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Реестр" name="reestr">
          <Input
            defaultValue={newStreet.nameReestr}
            onChange={(e) => setNewStreet({ ...newStreet, nameReestr: e.target.value })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Улица" name="street">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Область" name="obl">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Соато код" name="soatoCod">
          <Input
            defaultValue={newStreet.soatoCode}
            onChange={(e) => setNewStreet({ ...newStreet, nameRus: e.target.value })}
          />
        </BaseButtonsForm.Item>
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
export default AteStreetAddingForm;
