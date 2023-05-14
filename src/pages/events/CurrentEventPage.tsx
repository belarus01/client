import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { EventsTable } from '@app/components/events/EvetsTableNew';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CurrentEventPage: React.FC = () => {
  const [currentEventOreder, setCurrentEventOreder] = useState({});
  const location = useLocation();
  const { idEventOrder } = useParams();

  const getCurrentEventOrder = () => {
    console.log(location.state);

    const indexEvent = location.state.findIndex((event) => event.idEventOrder == idEventOrder);
    console.log(indexEvent);

    setCurrentEventOreder(location.state[indexEvent]);
  };
  useEffect(() => {
    getCurrentEventOrder();
  });
  return (
    <>
      <Card title="Мероприятиe">
        <PageTitle>{'Мероприятиe'}</PageTitle>
        <div>{JSON.stringify(currentEventOreder)}</div>
      </Card>
    </>
  );
};

export default CurrentEventPage;
