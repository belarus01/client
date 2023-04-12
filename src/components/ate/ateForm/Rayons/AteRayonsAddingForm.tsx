import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { IAteAddingFormProps } from '../../../../domain/interfaces';

const AteRayonAddingForm: React.FC<IAteAddingFormProps> = ({ onCancel, open }) => {
  const [newRayon, setNewRayon] = useState('');

  const submit = () => {
    // post, body newCategory
    console.log('submit', newRayon);
  };

  return (
    <Modal closable footer={null} onCancel={onCancel} destroyOnClose title={'Создание категории'} centered open={open}>
      <form>
        <div>Район</div>
        <Input value={newRayon} onChange={(e) => setNewRayon(e.target.value)} />
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

export default AteRayonAddingForm;
