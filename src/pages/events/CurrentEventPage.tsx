import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { EventsTable } from '@app/components/events/EvetsTableNew';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { EventDocs } from '../../components/events/currentEvent/EventDocs';
import { Spinner } from '../../components/common/Spinner/Spinner.styles';
import { getEventOrderByIdWithRelations } from '@app/api/events.api';
import { IEventOrder } from '@app/domain/interfaces';

const CurrentEventPage: React.FC = () => {
  const [currentEventOreder, setCurrentEventOreder] = useState<IEventOrder>({
    idEvent: null,
    idSubj: null,
    idUnit_3: null,
    idUnit_4: null,
    org: 1,
    nameAgent: '',
    postAgent: '',
    uidBoss: null,
    fioPostTitle: '',
    dateBegin: '',
    dateEnd: '',
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { idEventOrder } = useParams();

  const getEvent = (idEvent: string) => {
    setLoading(true);
    getEventOrderByIdWithRelations(idEvent).then((event) => {
      setLoading(false);
      console.log(event);

      setCurrentEventOreder(event[0]);
    });
  };

  useEffect(() => {
    if (idEventOrder) {
      getEvent(idEventOrder);
      console.log(idEventOrder);
      console.log(currentEventOreder);
    }
  }, []);
  return (
    <>
      <Card title="Мероприятиe">
        <PageTitle>{'Мероприятиe'}</PageTitle>
        <Spinner spinning={loading}>
          <EventDocs event={currentEventOreder} />
        </Spinner>
      </Card>
    </>
  );
};

export default CurrentEventPage;
