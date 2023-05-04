import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IStateCategory } from '../stateTable/StateTable';

export interface StateFormProps {
  data?: IStateCategory;
  close?: () => void;
}

const StateForm: React.FC<StateFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IStateCategory>({
    state: '',
    capital: '',
    worldPart: '',
    idState: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Страна" name="state">
          <Input
            defaultValue={newCategory.state}
            onChange={(e) => setNewCategory({ ...newCategory, state: (newCategory.state = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Столица" name="capital">
          <Input
            defaultValue={newCategory.capital}
            onChange={(e) => setNewCategory({ ...newCategory, capital: (newCategory.capital = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Континент" name="worldPart">
          <Input
            defaultValue={newCategory.worldPart}
            onChange={(e) => setNewCategory({ ...newCategory, worldPart: (newCategory.worldPart = e.target.value) })}
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

export default StateForm;
