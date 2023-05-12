import React, { useState } from 'react';
import { Button, DatePicker, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import moment from 'moment';
import { ITb3 } from './Steps/3';

export interface EventFormProps {
  data?: ITb3;
  close?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<ITb3>({
    name_def: '',
    date_fix: '',
    date_inform: '',
    date_check_fix: '',
    fl_ok: '',
    transfer_data: '',
    idTb3: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  const dateFormat = 'DD.MM.YYYY';

  const today = new Date().toLocaleDateString();

  return (
    <>
      <BaseButtonsForm
        layout="vertical"
        isFieldsChanged={false}
        initialValues={{
          ['date_fix']: moment(newCategory.date_fix || today, dateFormat),
          ['date_inform']: moment(newCategory.date_inform || today, dateFormat),
          ['date_check_fix']: moment(newCategory.date_check_fix || today, dateFormat),
        }}
      >
        <BaseButtonsForm.Item label="Нарушение" name="name">
          <Input
            defaultValue={newCategory.name_def}
            onChange={(e) => setNewCategory({ ...newCategory, name_def: (newCategory.name_def = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата устранения нарушений" name="date_fix">
          <DatePicker
            format={dateFormat}
            onChange={(value) => setNewCategory({ ...newCategory, date_fix: value?.format(dateFormat) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата информирования об устранении нарушений" name="date_inform">
          <DatePicker
            format={dateFormat}
            onChange={(value) => setNewCategory({ ...newCategory, date_inform: value?.format(dateFormat) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Дата проведения мероприятия по контролю за устранением нарушений"
          name="date_check_fix"
        >
          <DatePicker
            format={dateFormat}
            onChange={(value) => setNewCategory({ ...newCategory, date_check_fix: value?.format(dateFormat) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Результат проведения мероприятия по контролю за устранением нарушений"
          name="fl_ok"
        >
          <Input
            defaultValue={newCategory.fl_ok}
            onChange={(e) => setNewCategory({ ...newCategory, fl_ok: (newCategory.fl_ok = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Примечания" name="transfer_data">
          <Input
            defaultValue={newCategory.transfer_data}
            onChange={(e) =>
              setNewCategory({ ...newCategory, transfer_data: (newCategory.transfer_data = e.target.value) })
            }
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

export default EventForm;
