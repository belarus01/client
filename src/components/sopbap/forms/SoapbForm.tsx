import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { useState } from 'react';
import { ISoapb } from '../SopbTable';

export interface ISoapbFormProps {
  data?: ISoapb;
}
export const SoapbForm: React.FC<ISoapbFormProps> = ({ data }) => {
  const [soapb, setSoapb] = useState<ISoapb>({
    name: '',
    idSopb: null,
    ...data,
  });
  return (
    <>
      <BaseButtonsForm labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} layout="horizontal" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Наименование СОПБиП">
          <Input name="name" onChange={(e) => setSoapb({ ...soapb, name: e.target.value })} defaultValue={soapb.name} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button type="primary">Сохранить</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
