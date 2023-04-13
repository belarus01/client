import { Modal } from '@app/components/common/Modal/Modal';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { IDepartment } from '../DepatmentsTable';
import { useState } from 'react';

export interface IAddEditDepartmentForm {
  modalName: string;
  open: boolean;
  cancle: (isOpen: boolean) => void;
  data?: IDepartment;
}
export const AddEditDepartmentForm: React.FC<IAddEditDepartmentForm> = ({ modalName, cancle, open, data }) => {
  const [department, setDepartmnent] = useState<IDepartment>({
    address: '',
    idDept: null,
    departament: '',
    departRod: '',
    fioBoss: '',
    telCode: '',
    telHead: '',
    telReception: '',
    unp: '',
    ...data,
  });

  console.log(data, department);

  return (
    <Modal closable footer={null} onCancel={() => cancle(false)} destroyOnClose title={modalName} centered open={open}>
      <BaseButtonsForm labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} layout="horizontal" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Адрес">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, address: e.target.value })}
            defaultValue={department.address}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Департамент">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, departament: e.target.value })}
            defaultValue={department.departament}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Департамент в р.п.">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, departRod: e.target.value })}
            defaultValue={department.departRod}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="ФИО руководителя">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, fioBoss: e.target.value })}
            defaultValue={department.fioBoss}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Тел. код">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, telCode: e.target.value })}
            defaultValue={department.telCode}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тел. руководителя">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, telHead: e.target.value })}
            defaultValue={department.telHead}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тел. центра оперативного управления">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, telCode: e.target.value })}
            defaultValue={department.telCode}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тел. приемной">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, telReception: e.target.value })}
            defaultValue={department.telReception}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="unp">
          <Input
            name="name"
            onChange={(e) => setDepartmnent({ ...department, unp: e.target.value })}
            defaultValue={department.unp}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button type="primary">Сохранить</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </Modal>
  );
};
