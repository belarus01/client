import React, { useEffect, useState } from 'react';
import { AddEventOrderForm } from './forms/AddEventForm';
import { IEventOrder, IEventsSphere, IQuestion, IQuestionForEvent } from '@app/domain/interfaces';
import { Spinner } from '../common/Spinner/Spinner.styles';
import AddQuastionsFormEvent from './forms/AddQuastionsFormEvent';
import { Table } from '../common/Table/Table';

interface CreateEventProps {
  submitForm: () => void;
  canIClose: (isClosebl: boolean) => void;
}

const data = [
  {
    idDef: '8394',
    idTnpa: 4,
    numReg: 2,
    nameDef: 'Не обеспечен контроль выполнения требований пожарной безопаности на объекте его руководителем',
    recomend: 'Обеспечить контроль выполнения требований пожарной безопаности на объекте его руководителю',
    shortTnpa: 'Абзац 2 подпункта 3.1 пункта 3 общих требований пожарной безопасности к содержанию и ',
    typeDoc: 'Декрет Президента Республики Беларусь',
    chapterTnpa: 'Обязанности руководителей (должностных лиц), работников субъектов хозяйствования',
    headTnpa: '2',
    articleTnpa: '',
    punctTnpa: '3',
    subpunctTnpa: '3.1',
    partTnpa: '',
    paragrTnpa: '2',
    preambleTnpa: '',
    chList:
      'Контрольный список вопрсов (чек-лист) в сфере государственного пожарного надзора, надзора за соблюдением законодательства при осуществлении деятельности по обеспечению пожарной безопасности\n',
    numQuestion: '1.1',
    rulePunct:
      'Руководителем субъекта хозяйствования обеспечены соблюдение и контроль выполнения требований пожарной безопасности',
    org: 1,
    idForm: 311,
    typeDef: 0,
    dateRecord: '2023-03-07',
    dateBegin: null,
    dateEnd: null,
    active: 1,
    uid: null,
  },
  {
    idDef: '8395',
    idTnpa: 4,
    numReg: 3,
    nameDef:
      'Не обеспечена руководителем субъекта хозяйствования работоспособность и исправность средств противопожарной защиты и пожаротушения',
    recomend:
      'Обеспечить руководителю субъекта хозяйствования работоспособность и исправность средств противопожарной защиты и пожаротушения',
    shortTnpa: 'Абзац 3 подпункта 3.1 пункта 3 общих требований пожарной безопасности к содержанию и ',
    typeDoc: 'Декрет Президента Республики Беларусь',
    chapterTnpa: 'Обязанности руководителей (должностных лиц), работников субъектов хозяйствования',
    headTnpa: '2',
    articleTnpa: '',
    punctTnpa: '3',
    subpunctTnpa: '3.1',
    partTnpa: '',
    paragrTnpa: '3',
    preambleTnpa: '',
    chList:
      'Контрольный список вопрсов (чек-лист) в сфере государственного пожарного надзора, надзора за соблюдением законодательства при осуществлении деятельности по обеспечению пожарной безопасности\n',
    numQuestion: '1.2',
    rulePunct:
      'Руководителем субъекта хозяйствования обеспечены работоспособность и исправность средств противопожарной защиты и пожаротушения, противопожарного водоснабжения, связи, защиты от статического электричества, наружных пожарных лестниц, ограждений крыш зданий, а также постоянная готовность к применению этих средств',
    org: 1,
    idForm: 311,
    typeDef: 0,
    dateRecord: '2023-03-07',
    dateBegin: null,
    dateEnd: null,
    active: 1,
    uid: null,
  },
];
const columns = [
  {
    title: 'Название',
    dataIndex: 'nameDef',
  },
];

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
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<{
    org: number;
    idEventOrder: number;
    numAppendix: number[];
  }>({
    org: 1,
    idEventOrder: 0,
    numAppendix: [],
  });

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getNewEventWitsQues = (eventWitsQues: { event: IEventOrder; questions: IQuestionForEvent }) => {
    console.log(eventWitsQues);

    setNewEvent(eventWitsQues);
  };

  const getQuestionsCurrent = (questions: IQuestion[]) => {
    setQuestions(questions);
  };

  useEffect(() => {
    console.log('newEvent', newEvent);
  }, [newEvent]);
  useEffect(() => {
    console.log('createEvent');

    canIClose(true);
  }, [canIClose]);

  const shownAddEventOrderForm = !newEvent.event.idEventOrder && (
    <AddEventOrderForm submitForm={submitForm} getNewEventWithsQues={getNewEventWitsQues} {...props} />
  );
  const shownAddQuestionsForm = newEvent.event.idEventOrder && questions.length == 0 && (
    <AddQuastionsFormEvent
      getQuestionsCurrent={getQuestionsCurrent}
      canIClose={canIClose}
      submitEventCreate={submitForm}
      newEvent={newEvent}
    />
  );

  const shownQuestionsSelect = true && <Table dataSource={data} columns={columns} />;
  return (
    <>
      <Spinner spinning={loading}>{false || false || shownQuestionsSelect}</Spinner>
    </>
  );
};

export default CreateEvent;
