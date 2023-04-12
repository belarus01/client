import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { IAteAddingFormProps } from '../../../../domain/interfaces';
import { IAteReestr } from '../../ateTable/AteReestrTable';

interface IEditAteReestrProps extends IAteAddingFormProps {
  data: IAteReestr;
  update?: (value: IAteReestr) => void;
}

const AteReestrEditingForm: React.FC<IEditAteReestrProps> = ({ onCancel, open, data }) => {
  const [newReestr, setNewReestr] = useState<IAteReestr>({
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

export default AteReestrEditingForm;
