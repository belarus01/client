import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IQuestionCategory } from '../questionTables/QuestionTable';

export interface QuestionFormProps {
  data?: IQuestionCategory;
  close?: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IQuestionCategory>({
    numReg: '',
    nameQue: '',
    idQue: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Название" name="numReg">
          <Input
            defaultValue={newCategory.numReg}
            onChange={(e) => setNewCategory({ ...newCategory, numReg: (newCategory.numReg = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер" name="nameQue">
          <Input
            defaultValue={newCategory.nameQue}
            onChange={(e) => setNewCategory({ ...newCategory, nameQue: (newCategory.nameQue = e.target.value) })}
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

export default QuestionForm;
