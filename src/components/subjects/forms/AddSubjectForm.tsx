import { Pagination } from "@app/api/users.api";
import { Modal } from "@app/components/common/Modal/Modal";
import { Button } from "@app/components/common/buttons/Button/Button";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { Input } from "@app/components/common/inputs/Input/Input";

interface AddSubjectFormProps {
    open: boolean;
    onCancel: () => void;
    onTableChange: (pagination: Pagination) => void;
}


export const AddSubjectForm: React.FC<AddSubjectFormProps> = ({ open, onCancel, onTableChange }) => {
    const onFinish = (values: any) => {
        console.log(values);
        onCancel();
    }

    return (
        <Modal
            closable
            footer={null}
            onCancel={onCancel}
            destroyOnClose
            title={'Создание субъекта'}
            centered
            open={open}
        >
            <BaseButtonsForm
                layout="vertical"
                onFinish={onFinish}
                isFieldsChanged={false}
            >
                <BaseButtonsForm.Item label="УНП" name="unp">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Юридический адрес" name="addr_yur">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item >
                    <Button htmlType="submit" type="primary">Сохранить</Button>
                </BaseButtonsForm.Item>
            </BaseButtonsForm>
        </Modal>
        )
}