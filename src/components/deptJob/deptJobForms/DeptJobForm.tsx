import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IDeptJobCategory } from '../deptJobTables/DeptJobTable';

export interface DeptJobFormProps {
  data?: IDeptJobCategory;
  close?: () => void;
}

const DeptJobForm: React.FC<DeptJobFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IDeptJobCategory>({
    job: '',
    idDeptJob: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Должность" name="job">
          <Input
            defaultValue={newCategory.job}
            onChange={(e) => setNewCategory({ ...newCategory, job: (newCategory.job = e.target.value) })}
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

export default DeptJobForm;
