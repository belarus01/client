import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import DepartmentsTabs from '@app/components/departments/DepartmentsTabs';

const DepartmentsPage: React.FC = () => {
  return (
    <>
      <Card title="Департаменты">
        <PageTitle>{'Департаменты'}</PageTitle>
        <DepartmentsTabs />
        {/* <AteObl /> */}
      </Card>
    </>
  );
};

export default DepartmentsPage;
