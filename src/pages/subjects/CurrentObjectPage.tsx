import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ObjectTabs from '@app/components/subjects/subjectPage/subjectCard/subjectFormNav/objects/ObjectTabs';

const CurrentObjectPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Объекты'}</PageTitle>
      <ObjectTabs />
    </>
  );
};

export default CurrentObjectPage;
