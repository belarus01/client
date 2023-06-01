import { getAllDefectionQuestionsByIdForms } from '@app/api/defections.api';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { IDefection, IEventOrder, IQuestionForEvent, IQuestionsForDoc } from '@app/domain/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactI18NextChild } from 'react-i18next';

interface AddQuastionsFormEventProps {
  newEvent: { event: IEventOrder; questions: IQuestionForEvent };
  submitEventCreate?: () => void;
  canIClose: (isClosable: boolean) => void;
  getQuestionsCurrent: (questions: IQuestionsForDoc) => void;
  finishCreate: (allQuestsForEvent: number[]) => void;
}

const AddQuastionsFormEvent: React.FC<AddQuastionsFormEventProps> = ({
  finishCreate,
  newEvent,
  canIClose,
  getQuestionsCurrent,
}) => {
  const [forms, setForms] = useState<IQuestionForEvent>({
    checklists: [],
    questionsAdditional: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const getForms = useCallback(() => {
    setForms(newEvent.questions);
  }, [newEvent.questions]);

  const getQuests = (params: { checklists: number[]; questionsAdditional: number[] }) => {
    setLoading(true);
    getAllDefectionQuestionsByIdForms(params).then((questions) => {
      setLoading(false);
      if (!questions.questionsAdditional || questions.questionsAdditional?.length == 0) {
        finishCreate(questions.checklists.map((ques) => ques.idDef as number));
      } else {
        getQuestionsCurrent(questions);
      }
    });
  };

  const prepareParametrs = (checklistsQues: number[], questionsAdditional?: number[]) => {
    const params: { checklists: number[]; questionsAdditional: number[] } = {
      checklists: [],
      questionsAdditional: [],
    };
    checklistsQues.forEach((idQuestion) => {
      params.checklists.push(idQuestion);
    });
    if (questionsAdditional && questionsAdditional.length > 0) {
      questionsAdditional.forEach((idQuestion) => {
        params.questionsAdditional.push(idQuestion);
      });
    }
    return params;
  };

  const onFinish = (values: { idsChecklist: number[]; idFormQue: number[] }) => {
    // setIdFormCurrent(values.idForm);

    console.log(newEvent.event.idEventOrder, values.idsChecklist);
    const params = prepareParametrs(values.idsChecklist, values.idFormQue);
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
  }, [canIClose]);
  return (
    <Spinner spinning={loading}>
      <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
        <BaseButtonsForm.Item name="idsChecklist" label={'Выбор чек листа'} rules={[{ required: true }]}>
          <Select mode="multiple">
            {forms.checklists.map(
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
    </Spinner>
  );
};

export default AddQuastionsFormEvent;