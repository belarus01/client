import { createQuestions } from '@app/api/events.api';
import { getAllFormQuestionsByOrg } from '@app/api/form.api';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { IEventOrder } from '@app/domain/interfaces';
import React, { useEffect, useState } from 'react';
import { ReactI18NextChild } from 'react-i18next';

interface AddQuastionsFormEventProps {
  newEvent: IEventOrder;
  submitEventCreate: () => void;
}

const AddQuastionsFormEvent: React.FC<AddQuastionsFormEventProps> = ({ newEvent, submitEventCreate }) => {
  const [forms, setForms] = useState<any>([]);
  const [idFormCurrent, setIdFormCurrent] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shownCreateDoc, setShownCreateDoc] = useState(false);
  const [formDis, setFormDis] = useState(true);
  const [shownModalUved, setShownModalUved] = useState(false);

  const getForms = () => {
    setLoading(true);
    getAllFormQuestionsByOrg(1).then((formsMchs) => {
      console.log(formsMchs);
      setForms(formsMchs);
      setLoading(false);
    });
  };

  const createQuests = (ideventOrder: number, idFrom: number) => {
    setLoading(true);
    createQuestions(ideventOrder, idFrom).then(() => {
      setLoading(false);
      setShownCreateDoc(true);
    });
  };

  const onFinish = (values: any) => {
    console.log(values);
    console.log(newEvent);
    // setIdFormCurrent(values.idForm);

    console.log(newEvent.idEventOrder, values.idForm);
    //createQuests(event[0].idEventOrder, values.idForm);
    setLoading(false);
    submitEventCreate();
    // setShownCreateDoc(true);
    // setFormDis(false);
  };

  useEffect(() => {
    getForms();
  }, []);
  return (
    <Spinner spinning={loading}>
      {formDis ? (
        <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
          <BaseButtonsForm.Item name="idForm" label={'Тема'} rules={[{ required: true }]}>
            <Select>
              {forms.map(
                (form: {
                  idForm: number;
                  nameDoc:
                    | boolean
                    | React.ReactChild
                    | React.ReactFragment
                    | React.ReactPortal
                    | Iterable<ReactI18NextChild>
                    | null
                    | undefined;
                }) => {
                  return (
                    <Option key={form.idForm as number}>
                      <span>{form.nameDoc}</span>
                    </Option>
                  );
                },
              )}
            </Select>
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item>
            <Button htmlType="submit" type="primary">
              сохранить
            </Button>
          </BaseButtonsForm.Item>
        </BaseButtonsForm>
      ) : null}
    </Spinner>
  );
};

export default AddQuastionsFormEvent;
