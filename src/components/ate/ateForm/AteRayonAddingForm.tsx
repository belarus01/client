import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { IAteRayon } from '../ateTable/AteRayonTable';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

export interface IAteRayonForm {
  data?: IAteRayon | object;
}
const AteRayonAddingForm: React.FC<IAteRayonForm> = ({ data }) => {
  const [rayon, setRayon] = useState<IAteRayon>({
    nameRayon: '',
    idRayon: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    //update()
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Наименование района" name="nameRayon">
          <Input
            defaultValue={rayon.nameRayon}
            onChange={(e) => setRayon({ ...rayon, nameRayon: (rayon.nameRayon = e.target.value) })}
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

export default AteRayonAddingForm;
