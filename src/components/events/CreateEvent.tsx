import React, { useEffect, useState } from 'react';
import { AddEventOrderForm } from './forms/AddEventForm';
import { IDefection, IEventOrder, IQuestionForEvent } from '@app/domain/interfaces';
import AddQuastionsFormEvent from './forms/AddQuastionsFormEvent';
import AddQuestionsInEvent from './forms/AddQuestionsInEvent';

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
      org: 0,
    },
    questions: {
      checkLists: [],
      questionsAdditional: [],
    },
  });

  const [questions, setQuestions] = useState<IDefection[]>([]);
  const [questionsCheckLists, setQuestionsCheckLists] = useState<IDefection[]>([]);

  const getNewEventWitsQues = (eventWitsQues: { event: IEventOrder; questions: IQuestionForEvent }) => {
    console.log(eventWitsQues);

    setNewEvent(eventWitsQues);
  };

  const getQuestionsCurrent = (questions: IDefection[]) => {
    setQuestions(questions);
  };

  const getQuestCheckLists = (questionsChekLists: IDefection[]) => {
    setQuestionsCheckLists(questionsChekLists);
  };

  useEffect(() => {
    canIClose(true);
  }, [canIClose]);

  const shownAddEventOrderForm = !newEvent.event.idEventOrder && (
    <AddEventOrderForm submitForm={submitForm} getNewEventWithsQues={getNewEventWitsQues} {...props} />
  );
  const shownAddQuestionsForm = newEvent.event.idEventOrder && questions.length == 0 && (
    <AddQuastionsFormEvent
      getQuestCheckLists={getQuestCheckLists}
      getQuestionsCurrent={getQuestionsCurrent}
      canIClose={canIClose}
      submitEventCreate={submitForm}
      newEvent={newEvent}
    />
  );

  const shownQuestionsSelect = questions.length > 0 && (
    <AddQuestionsInEvent questionsCheckLists={questionsCheckLists} data={questions} />
  );
  return (
    <>
      <>{shownAddEventOrderForm || shownAddQuestionsForm || shownQuestionsSelect}</>
    </>
  );
};

export default CreateEvent;
