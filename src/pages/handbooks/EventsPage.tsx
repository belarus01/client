import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import EventsTable from '@app/components/spisok_events/eventsTables/EventsTable';

const SEventsPage: React.FC = () => {
  return (
    <>
      <Card title="Список мероприятий">
        <PageTitle>{'Список мероприятий'}</PageTitle>
        <EventsTable />
      </Card>
    </>
  );
};

export default SEventsPage;
