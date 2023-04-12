import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { IAteAddingFormProps } from '../../../../domain/interfaces';
import { IAteRayon } from '../../ateTable/AteRayonTable';

interface IEditAteRayonProps extends IAteAddingFormProps {
  data: IAteRayon;
  update?: (value: IAteRayon) => void;
}

const AteRayonEditingForm: React.FC<IEditAteRayonProps> = ({ onCancel, open, data }) => {
  const [rayon, setRayon] = useState<IAteRayon>({
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    //update()
    console.log('submit');
  };

  return (
    <Modal
      closable
      footer={null}
      onCancel={onCancel}
      destroyOnClose
      title={'Редактирование категории'}
      centered
      open={open}
    >
      <form>
        <div>наименование района</div>
        <Input
          value={rayon.nameRayon}
          onChange={(e) => setRayon({ ...rayon, nameRayon: (rayon.nameRayon = e.target.value) })}
        />
      </form>
      <Button
        style={{ marginTop: '10px' }}
        onClick={() => {
          submit();
        }}
      >
        Сохранить
      </Button>
    </Modal>
  );
};

export default AteRayonEditingForm;
