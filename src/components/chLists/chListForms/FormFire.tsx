import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IFireCategory } from '../chListTables/TableFire';

export interface FireFormProps {
  data?: IFireCategory;
  close?: () => void;
}

const FireForm: React.FC<FireFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IFireCategory>({
    nameBuild: '',
    space: '',
    type: '',
    idList: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Наименование сооружения" name="nameBuild">
          <Input
            defaultValue={newCategory.nameBuild}
            onChange={(e) => setNewCategory({ ...newCategory, nameBuild: (newCategory.nameBuild = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Функциональное назначение" name="type">
          <Input
            defaultValue={newCategory.type}
            onChange={(e) => setNewCategory({ ...newCategory, type: (newCategory.type = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Площадь, кв.м" name="space">
          <Input
            defaultValue={newCategory.space}
            onChange={(e) => setNewCategory({ ...newCategory, space: (newCategory.space = e.target.value) })}
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

export default FireForm;
