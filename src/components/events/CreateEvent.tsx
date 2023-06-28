import React, { useEffect, useState } from 'react';
import { AddEventOrderForm } from './forms/AddEventForm';
import { IDefection, IEventOrder, IQuestionForEvent, IQuestionsForDoc } from '@app/domain/interfaces';
import AddQuastionsFormEvent from './forms/AddQuastionsFormEvent';
import AddQuestionsInEvent from './forms/AddQuestionsInEvent';
import { createEventOrderQueDef } from '@app/api/events.api';
import { notification } from 'antd';

interface CreateEventProps {
  submitForm: () => void;
  canIClose: (isClosebl: boolean) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ submitForm, canIClose, ...props }) => {
  const [newEvent, setNewEvent] = useState<{ event: IEventOrder; questions: IQuestionForEvent }>({
    event: {
      dateBegin: '',
      dateEnd: '',
      fioPostTitle: '',
      idEvent: null,
      idSubj: null,
      idUnit_3: null,
      idUnit_4: null,
      nameAgent: '',
      postAgent: '',
      uidBoss: null,
      org: 1,
    },
    questions: {
      checklists: [],
      questionsAdditional: [],
    },
  });

  const [questions, setQuestions] = useState<IDefection[]>([]);
  const [questionsCheckLists, setQuestionsCheckLists] = useState<IDefection[]>([]);

  const getNewEventWitsQues = (eventWitsQues: { event: IEventOrder; questions: IQuestionForEvent }) => {
    console.log(eventWitsQues);

    setNewEvent(eventWitsQues);
  };

  const getQuestionsCurrent = (questions: IQuestionsForDoc) => {
    getQuestCheckLists(questions.checklists);
    if (questions.questionsAdditional && questions.questionsAdditional.length > 0) {
      setQuestions(questions.questionsAdditional);
    }
  };

  const getQuestCheckLists = (questionsChekLists: IDefection[]) => {
    setQuestionsCheckLists(questionsChekLists);
  };

  const finishCreatedQuestsForEvent = (allQuests: number[]) => {
    console.log(allQuests);

    canIClose(true);
    if (newEvent.event.idEventOrder) {
      createEventOrderQueDef(newEvent.event.idEventOrder, allQuests).catch((e) => {
        notification.error({ message: 'Упс... Что-то пошло не так' });
        console.log(e);
      });
    }

    submitForm();
  };

  useEffect(() => {
    console.log(questions, 'questions');
  }, [questions]);

  useEffect(() => {
    canIClose(true);
  }, [canIClose]);

  const shownAddEventOrderForm = !newEvent.event.idEventOrder && (
    <AddEventOrderForm getNewEventWithsQues={getNewEventWitsQues} {...props} />
  );
  const shownAddQuestionsForm = newEvent.event.idEventOrder && questions.length == 0 && (
    <AddQuastionsFormEvent
      getQuestionsCurrent={getQuestionsCurrent}
      canIClose={canIClose}
      submitEventCreate={submitForm}
      newEvent={newEvent}
      finishCreate={finishCreatedQuestsForEvent}
    />
  );

  const shownQuestionsSelect = questions && questions.length > 0 && (
    <AddQuestionsInEvent
      finishCreate={finishCreatedQuestsForEvent}
      questionsCheckLists={questionsCheckLists}
      data={questions}
    />
  );
  return (
    <>
      <>{shownAddEventOrderForm || shownAddQuestionsForm || shownQuestionsSelect}</>
    </>
  );
};

export default CreateEvent;
