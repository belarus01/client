import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import SopbCardTable from '@app/components/sopbap/sopbTables/SopbCardTable';

const SopbsCardsPage: React.FC = () => {
  return (
    <>
      <Card title="СОПБиП">
        <PageTitle>{'СОПБиП'}</PageTitle>
        <SopbCardTable />
      </Card>
    </>
  );
};

export default SopbsCardsPage;
