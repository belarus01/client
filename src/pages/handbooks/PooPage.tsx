import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import OonTable from '@app/components/oon/oonTables/OonTable';

const SPooPage: React.FC = () => {
  return (
    <>
      <Card title="Перечень потенциально опасных объектов в области промышленной безопасности">
        <PageTitle>{'Перечень потенциально опасных объектов в области промышленной безопасности'}</PageTitle>
        {/* <OonTable /> */}
      </Card>
    </>
  );
};

export default SPooPage;
