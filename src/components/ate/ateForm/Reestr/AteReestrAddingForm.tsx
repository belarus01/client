import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { IAteAddingFormProps } from '../../../../domain/interfaces';
import { IAteReestr } from './../../ateTable/AteReestrTable';

const AteReestrAddingForm: React.FC<IAteAddingFormProps> = ({ onCancel, open }) => {
  const [newReestr, setNewReestr] = useState<IAteReestr>({
    soatoCode: '',
    nameReestr: '',
    idReestr: null,
    dateAnnul: '',
    dateRecord: '',
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit', newReestr);
  };

  return (
    <Modal closable footer={null} onCancel={onCancel} destroyOnClose title={'Создание категории'} centered open={open}>
      <form>
        <div>Реестр</div>
        <Input
          value={newReestr.nameReestr}
          onChange={(e) => setNewReestr({ ...newReestr, nameReestr: e.target.value })}
        />
        <div>Соато код</div>
        <Input
          value={newReestr.soatoCode}
          onChange={(e) => setNewReestr({ ...newReestr, soatoCode: e.target.value })}
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

export default AteReestrAddingForm;
