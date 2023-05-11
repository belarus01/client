import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ITypeTestCategory } from '../typeTestTables/TypeTextTable';

export interface TypeTestFormProps {
  data?: ITypeTestCategory;
  close?: () => void;
}

const TypeTestForm: React.FC<TypeTestFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<ITypeTestCategory>({
    name: '',
    idTypeTest: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Тип сооружения" name="name">
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

export default TypeTestForm;
