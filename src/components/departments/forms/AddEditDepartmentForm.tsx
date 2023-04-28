import { Modal } from '@app/components/common/Modal/Modal';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';

export const AddEditDepartmentForm = (modalName, cancleEdit, open) => {
  function cancleEdit(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  function handleChange(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Modal
      closable
      footer={null}
      onCancel={() => cancleEdit(false)}
      destroyOnClose
      title={modalName}
      centered
      open={open}
    >
      <BaseButtonsForm labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} layout="horizontal" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Название">
          <Input name="name" onChange={() => handleChange()} defaultValue={selectedStrDep?.name} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button type="primary">Сохранить</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </Modal>
  );
};
