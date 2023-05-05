import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IPooCategory } from '../pooTables/PooTable';

export interface PooFormProps {
  data?: IPooCategory;
  close?: () => void;
}

const PooForm: React.FC<PooFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IPooCategory>({
    num: '',
    idParent: '',
    name: '',
    idPoo: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      {/* <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Номер" name="num">
          <Input
            defaultValue={newCategory.num}
            onChange={(e) => setNewCategory({ ...newCategory, num: (newCategory.num = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип" name="type">
          <Input
            defaultValue={newCategory.type}
            onChange={(e) => setNewCategory({ ...newCategory, type: (newCategory.type = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип субъекта" name="typeSub">
          <Input
            defaultValue={newCategory.typeSub}
            onChange={(e) => setNewCategory({ ...newCategory, typeSub: (newCategory.typeSub = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Название" name="name">
          <Input
            defaultValue={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: (newCategory.name = e.target.value) })}
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
      </Button> */}
    </>
  );
};

export default PooForm;
