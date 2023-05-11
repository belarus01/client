import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import DeptJobTable from '@app/components/deptJob/deptJobTables/DeptJobTable';

const SDeptJobPage: React.FC = () => {
  return (
    <>
      <Card title="Справочник должностей">
        <PageTitle>{'Справочник должностей'}</PageTitle>
        <DeptJobTable />
      </Card>
    </>
  );
};

export default SDeptJobPage;
