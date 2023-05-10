import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IVedomstvaCategory } from '../vedomstvaTables/VedomstvaTable';

export interface VedomstvaFormProps {
  data?: IVedomstvaCategory;
  close?: () => void;
}

const VedomstvaForm: React.FC<VedomstvaFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IVedomstvaCategory>({
    name: '',
    idVed: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
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
      </Button>
    </>
  );
};

export default VedomstvaForm;
