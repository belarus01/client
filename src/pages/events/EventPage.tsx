import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { EventsTable } from '@app/components/events/EvetsTableNew';
import { Card } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

const EventsPage: React.FC = () => {
  const location = useLocation();
  const { dateBegin } = useParams();
  return (
    <>
      <Card title="Мероприятиe1">
        <PageTitle>{'Мероприятиe'}</PageTitle>
        asdfasdfasdfasdfadf
        {JSON.stringify(location.state)}
        {dateBegin}
      </Card>
    </>
  );
};

export default EventsPage;
