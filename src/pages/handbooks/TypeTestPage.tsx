import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import TypeTestTable from '@app/components/typeTest/typeTestTables/TypeTextTable';

const STypeTestPage: React.FC = () => {
  return (
    <>
      <Card title="Типы сооружений">
        <PageTitle>{'Типы сооружений'}</PageTitle>
        <TypeTestTable />
      </Card>
    </>
  );
};

export default STypeTestPage;
