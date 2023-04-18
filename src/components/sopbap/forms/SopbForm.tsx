import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { useState } from 'react';
import { ISopb } from '../sopbTables/SopbTable';
import { Select } from '@app/components/common/selects/Select/Select';

export interface ISopbFormProps {
  data?: ISopb;
}
export const SopbForm: React.FC<ISopbFormProps> = ({ data }) => {
  const [sopb, setSopb] = useState<ISopb>({
    name: '',
    idSopb: null,
    ...data,
  });

  const changeStatus = (value: number) => {
    setSopb({ ...sopb, active: value });
  };
  return (
    <>
      <BaseButtonsForm labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Наименование СОПБиП" name="name">
          <Input name="name" onChange={(e) => setSopb({ ...sopb, name: e.target.value })} defaultValue={sopb.name} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Оценка соответствия средств обеспечения пожарной безопасности и пожаротушения проводится в форме сертификации"
          name={'conditions'}
        >
          <Input
            name="conditions"
            onChange={(e) => setSopb({ ...sopb, name: e.target.value })}
            defaultValue={sopb.name}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Статус" name={'active'}>
          <Select
            defaultValue={sopb.active || 1}
            onChange={(value) => changeStatus(value as number)}
            options={[
              { value: 1, label: 'активно' },
              {
                value: 0,
                label: 'удалено',
              },
            ]}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button type="primary">Сохранить</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
