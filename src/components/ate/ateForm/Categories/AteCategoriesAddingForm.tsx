import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { IAteAddingFormProps } from '../../../../domain/interfaces';

interface INewCategory {
  nameCateg: string;
  nameShort: string;
}

const AteCategoriesAddingForm: React.FC<IAteAddingFormProps> = ({ onCancel, open }) => {
  const [newCategory, setNewCategory] = useState<INewCategory>({
    nameCateg: '',
    nameShort: '',
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <Modal closable footer={null} onCancel={onCancel} destroyOnClose title={'Создание категории'} centered open={open}>
      <form>
        <div>наименование категории</div>
        <Input
          value={newCategory.nameCateg}
          onChange={(e) => setNewCategory({ ...newCategory, nameCateg: (newCategory.nameCateg = e.target.value) })}
        />
        <div>сокращенное наименование</div>
        <Input
          value={newCategory.nameShort}
          onChange={(e) => setNewCategory({ ...newCategory, nameShort: (newCategory.nameShort = e.target.value) })}
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

export default AteCategoriesAddingForm;
