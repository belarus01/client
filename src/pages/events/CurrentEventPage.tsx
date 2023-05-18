import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { EventsTable } from '@app/components/events/EvetsTableNew';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { EventDocs } from '../../components/events/currentEvent/EventDocs';
import { Spinner } from '../../components/common/Spinner/Spinner.styles';
import { getEventOrderByIdWithRelations } from '@app/api/events.api';

const CurrentEventPage: React.FC = () => {
  const [currentEventOreder, setCurrentEventOreder] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { idEventOrder } = useParams();

  const getEvent = (idEvent: string) => {
    setLoading(true);
    getEventOrderByIdWithRelations(idEvent).then((event) => {
      setLoading(false);
      setCurrentEventOreder(event);
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
