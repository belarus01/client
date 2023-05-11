import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IDeptUnitsCategory } from '../deptUnitsTables/DeptUnitsTable';

export interface DeptUnitsFormProps {
  data?: IDeptUnitsCategory;
  close?: () => void;
}

const DeptUnitsForm: React.FC<DeptUnitsFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IDeptUnitsCategory>({
    nameUnit: '',
    idDeptUnits: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Название подразделения" name="nameUnit">
          <Input
            defaultValue={newCategory.nameUnit}
            onChange={(e) => setNewCategory({ ...newCategory, nameUnit: (newCategory.nameUnit = e.target.value) })}
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

export default DeptUnitsForm;
