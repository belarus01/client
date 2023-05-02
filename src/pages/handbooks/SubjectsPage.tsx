import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

import UsersManagmentPage from './UsersManagmentPage';
import { SubjectsTable } from '@app/components/subjects/SubjectsTable';

const SubjectsPage: React.FC = () => {
  return (
    <>
      <Card title="Субъекты">
        <PageTitle>{'Субъекты'}</PageTitle>
        <SubjectsTable />
      </Card>
    </>
  );
};

export default SubjectsPage;
