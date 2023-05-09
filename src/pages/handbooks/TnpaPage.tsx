import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import TnpaTable from '@app/components/tnpa/tnpaTables/TnpaTable';

const STnpaPage: React.FC = () => {
  return (
    <>
      <Card title="Перечень НПА и ТНПА">
        <PageTitle>{'Перечень НПА и ТНПА'}</PageTitle>
        <TnpaTable />
      </Card>
    </>
  );
};

export default STnpaPage;
