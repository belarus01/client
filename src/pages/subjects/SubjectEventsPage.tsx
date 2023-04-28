import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { SubjectEvents } from '@app/components/subjects/subjectPage/subjectCard/subjectFormNav/events/SubjectsEvents';

const SubjectEventsPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Мероприятия по субъекту'}</PageTitle>
      <SubjectEvents />
    </>
  );
};

export default SubjectEventsPage;
