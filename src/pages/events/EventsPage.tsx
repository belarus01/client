import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { EventsTable } from '@app/components/events/EventsTable';
import { Card } from 'antd';

const EventsPage: React.FC = () => {
  return (
    <>
      <Card title="Мероприятия">
        <PageTitle>{'Мероприятия'}</PageTitle>
        <EventsTable />
      </Card>
    </>
  );
};

export default EventsPage;
