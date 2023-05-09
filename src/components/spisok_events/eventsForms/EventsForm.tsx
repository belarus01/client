import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IEventsCategory } from '../eventsTables/EventsTable';

export interface EventsFormProps {
  data?: IEventsCategory;
  close?: () => void;
}

const EventsForm: React.FC<EventsFormProps> = ({ data }) => {
  const [newCategory, setNewCategory] = useState<IEventsCategory>({
    event: '',
    numEvent: '',
    idEvent: null,
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Номер" name="numEvent">
          <Input
            defaultValue={newCategory.numEvent}
            onChange={(e) => setNewCategory({ ...newCategory, numEvent: (newCategory.numEvent = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Название" name="event">
          <Input
            defaultValue={newCategory.event}
            onChange={(e) => setNewCategory({ ...newCategory, event: (newCategory.event = e.target.value) })}
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

export default EventsForm;
