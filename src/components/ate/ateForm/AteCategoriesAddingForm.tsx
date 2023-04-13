import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { IAteCategory } from '../ateTable/AteCategoriesTable';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

export interface IAteAddingFormProps {
  data?: IAteCategory;
}

const AteCategoriesAddingForm: React.FC<IAteAddingFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IAteCategory>({
    nameCateg: '',
    nameShort: '',
    idCateg: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="наименование категории" name="nameCateg">
          <Input
            defaultValue={newCategory.nameCateg}
            onChange={(e) => setNewCategory({ ...newCategory, nameCateg: (newCategory.nameCateg = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="сокращенное наименование" name="nameShort">
          <Input
            defaultValue={newCategory.nameShort}
            onChange={(e) => setNewCategory({ ...newCategory, nameShort: (newCategory.nameShort = e.target.value) })}
          />
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
      <Button
        style={{ marginTop: '10px' }}
        onClick={() => {
          submit();
        }}
      >
        Сохранить
      </Button>
    </>
  );
};

export default AteCategoriesAddingForm;
