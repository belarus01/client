import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import DeptUnitsTable from '@app/components/deptUnits/deptUnitsTables/DeptUnitsTable';

const SDeptUnitsPage: React.FC = () => {
  return (
    <>
      <Card title="Подразделения (отделы)">
        <PageTitle>{'Подразделения (отделы)'}</PageTitle>
        <DeptUnitsTable />
      </Card>
    </>
  );
};

export default SDeptUnitsPage;
