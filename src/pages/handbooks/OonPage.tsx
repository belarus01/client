import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import OonTable from '@app/components/oon/oonTables/OonTable';

const SOonPage: React.FC = () => {
  return (
    <>
      <Card title="Типы опасности(чл4)">
        <PageTitle>{'Типы опасности(чл4)'}</PageTitle>
        <OonTable />
      </Card>
    </>
  );
};

export default SOonPage;
