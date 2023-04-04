import { notificationController } from "@app/controllers/notificationController";
import { useState } from "react";
import { Button } from "../common/buttons/Button/Button";
import { BaseButtonsForm } from "../common/forms/BaseButtonsForm/BaseButtonsForm"
import { Input } from "../common/inputs/Input/Input";
import { InputNumber } from "../common/inputs/InputNumber/InputNumber";
import { Select, Option } from "../common/selects/Select/Select";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const EventCard: React.FC = () => {
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

      <BaseButtonsForm.Item
        name="unp"
        label={'УНП субъекта'}
        rules={[{ required: true, message: 'Введите УНП субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date"
        label={'Дата государственной регистрации (присвоения УНП)'}
        rules={[{ required: true, message: 'Введите дату государственной регистрации' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="prin"
        label={'Ведомственная принадлежность субъекта'}
        rules={[{ required: true, message: 'Введите принадлежность субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="ur_adress"
        label={'Юридический адрес субъекта'}
        rules={[{ required: true, message: 'Введите юридический адрес субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fak_adress"
        label={'Фактический адрес субъекта'}
        rules={[{ required: true, message: 'Введите фактический адрес субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio"
        label={'Ф.И.О руководителя субъекта'}
        rules={[{ required: true, message: 'Введите Ф.И.О руководителя субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolgnost"
        label={'Должность руководителя субъекта'}
        rules={[{ required: true, message: 'Введите должность руководителя субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sfera"
        label={'Сфера (вид) деятельности'}
        hasFeedback
        rules={[{ required: true, message: 'Введите сферу (вид) деятельности' }]}
      >
        <Select placeholder={('Сфера (вид) деятельности')}>
          <Option value="Серый-машина">{('Серый-машина')}</Option>
          <Option value="Серый-милашка">{('Серый-милашка')}</Option>
          <Option value="Серый-красавчик">{('Серый-красавчик')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item label={'Количество отдельных зданий'}
      >
        <label>
          <BaseButtonsForm.Item name="col_zdani" noStyle
            hasFeedback
            rules={[{ required: true, message: 'Введите количество отдельных зданий' }]}>
            <InputNumber min={1} max={10} />
          </BaseButtonsForm.Item>
        </label>
        <span> {'зданий'}</span>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="name_zdani"
        label={'Наименование отдельных зданий'}
        hasFeedback
        rules={[{ required: true, message: 'Введите наименование отдельных зданий' }]}
      >
        <Select placeholder={('Наименование отдельных зданий')}>
          <Option value="Серый-машина">{('Серый-машина')}</Option>
          <Option value="Серый-милашка">{('Серый-милашка')}</Option>
          <Option value="Серый-красавчик">{('Серый-красавчик')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item label={'Количество отдельных сооружений'}
      >
        <label>
          <BaseButtonsForm.Item name="col_sooryg" noStyle
            hasFeedback
            rules={[{ required: true, message: 'Введите количество отдельных сооружений' }]}>
            <InputNumber min={1} max={10} />
          </BaseButtonsForm.Item>
        </label>
        <span> {'сооружений'}</span>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="name_sooryg"
        label={'Наименование отдельных сооружений'}
        hasFeedback
        rules={[{ required: true, message: 'Введите наименование отдельных сооружений' }]}
      >
        <Select placeholder={('Наименование отдельных сооружений')}>
          <Option value="Серый-машина">{('Серый-машина')}</Option>
          <Option value="Серый-милашка">{('Серый-милашка')}</Option>
          <Option value="Серый-красавчик">{('Серый-красавчик')}</Option>
        </Select>
      </BaseButtonsForm.Item>

    </BaseButtonsForm>
  )
}