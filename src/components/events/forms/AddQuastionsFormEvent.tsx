import { getAllDefectionQuestionsByIdForms } from '@app/api/defections.api';
import { createQuestions } from '@app/api/events.api';
import { getAllFormQuestionsByOrg } from '@app/api/form.api';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { IEventOrder, IQuestion, IQuestionForEvent } from '@app/domain/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactI18NextChild } from 'react-i18next';

interface AddQuastionsFormEventProps {
  newEvent: { event: IEventOrder; questions: IQuestionForEvent };
  submitEventCreate: () => void;
  canIClose: (isClosable: boolean) => void;
  getQuestionsCurrent: (questions: IQuestion[]) => void;
}

const AddQuastionsFormEvent: React.FC<AddQuastionsFormEventProps> = ({
  newEvent,
  submitEventCreate,
  canIClose,
  getQuestionsCurrent,
}) => {
  const [forms, setForms] = useState<IQuestionForEvent>({
    checkLists: [],
    questionsAdditional: [],
  });
  const [idFormCurrent, setIdFormCurrent] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shownCreateDoc, setShownCreateDoc] = useState(false);
  const [formDis, setFormDis] = useState(true);
  const [shownModalUved, setShownModalUved] = useState(false);

  const getForms = useCallback(() => {
    setForms(newEvent.questions);
  }, [newEvent.questions]);

  const createQuests = (ideventOrder: number, idFrom: number) => {
    createQuestions(ideventOrder, idFrom).then(() => {
      setShownCreateDoc(true);
    });
  };

  const getQuests = (params: Record<string, number>) => {
    setLoading(true);
    getAllDefectionQuestionsByIdForms(params).then((questions) => {
      setLoading(false);
      getQuestionsCurrent(questions);
    });
  };

  const onFinish = (values: { idForm: number; idFormQue: number[] }) => {
    console.log(values);
    console.log(newEvent);
    // setIdFormCurrent(values.idForm);

    console.log(newEvent.event.idEventOrder, values.idForm);

    const params: Record<string, number> = {};
    params.idFormChekList = values.idForm;
    values.idFormQue.forEach((idQuestion, index) => {
      params[`${index}`] = idQuestion;
    });

    getQuests(params);
    //createQuests(event.idEventOrder, values.idForm);
    // setLoading(false);
    // submitEventCreate();
  };

  useEffect(() => {
    setLoading(true);
    if (newEvent) {
      console.log('setForms');
      getForms();
      setLoading(false);
    }
  }, [getForms, newEvent]);

  useEffect(() => {
    console.log('createQUes');

    canIClose(false);
  }, []);
  return (
    <Spinner spinning={loading}>
      {formDis ? (
        <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
          <BaseButtonsForm.Item name="idForm" label={'Выбор чек листа'} rules={[{ required: true }]}>
            <Select>
              {forms.checkLists.map(
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
          <BaseButtonsForm.Item name="idFormQue" label={'Доп. Вопросы'}>
            <Select mode="multiple">
              {forms.questionsAdditional.map(
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
