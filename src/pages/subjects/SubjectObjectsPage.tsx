import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { SubjectObjects } from '@app/components/subjects/subjectPage/subjectCard/subjectFormNav/objects/SubjectObject';

const SubjectObjectsPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Объекты'}</PageTitle>
      <SubjectObjects />
    </>
  );
};

export default SubjectObjectsPage;
