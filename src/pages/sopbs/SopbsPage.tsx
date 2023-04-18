import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import SopbTable from '@app/components/sopbap/sopbTables/SopbTable';

const SopbsPage: React.FC = () => {
  return (
    <>
      <Card title="СОПБиП">
        <PageTitle>{'СОПБиП'}</PageTitle>
        <SopbTable />
      </Card>
    </>
  );
};

export default SopbsPage;
