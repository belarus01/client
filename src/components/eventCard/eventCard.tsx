import { notificationController } from "@app/controllers/notificationController";
import { Button, Input } from "antd";
import { useState } from "react";
import { BaseButtonsForm } from "../common/forms/BaseButtonsForm/BaseButtonsForm"

const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export const EventCard: React.FC = () =>{
    const [isFieldsChanged, setFieldsChanged] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const onFinish = async (values = {}) => {
        console.log(values);
        // setLoading(true);
        // setTimeout(() => {
        //   setLoading(false);
        //   setFieldsChanged(false);
        //   notificationController.success({ message: t('common.success') });
        //   console.log(values);
        // }, 1000);
      };
    
      
    return (
        <BaseButtonsForm
      {...formItemLayout}
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      name="eventCardForm"
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
      footer={
        <BaseButtonsForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {'Сохранить'}
          </Button>
        </BaseButtonsForm.Item>
      }
      onFinish={onFinish}
    >
        <BaseButtonsForm.Item
          name="group"
          label={'Наименование субъекта'}
          rules={[{ required: true, message: 'Введите наименование субъекта' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
        
    </BaseButtonsForm>
    )
}