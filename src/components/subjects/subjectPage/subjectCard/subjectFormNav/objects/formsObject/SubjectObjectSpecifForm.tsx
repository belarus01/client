import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { SSubjObjSpecif } from '@app/domain/interfaces';
import React from 'react';

interface ISubjectObjectSpecifFormProps {
  specifData?: SSubjObjSpecif;
  onFinish?: (values: SSubjObjSpecif) => void;
}

const SubjectObjectSpecifForm: React.FC<ISubjectObjectSpecifFormProps> = ({ specifData, onFinish }) => {
  const [specif] = BaseButtonsForm.useForm();
  return (
    <>
      <BaseButtonsForm form={specif} isFieldsChanged={false} onFinish={onFinish}>
        <BaseButtonsForm.Item label="test" name="test">
          <Input></Input>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button htmlType="submit">asdfasdfa</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};

export default SubjectObjectSpecifForm;
