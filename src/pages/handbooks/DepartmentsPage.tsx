import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { DepartmentsTable } from '@app/components/departments/DepatmentsTable';

const DepartmentsPage: React.FC = () => {
  return (
    <>
      <Card title="Департаменты">
        <PageTitle>{'Департаменты'}</PageTitle>
        <DepartmentsTable />
        {/* <AteObl /> */}
      </Card>
    </>
  );
};

export default DepartmentsPage;
