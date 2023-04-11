import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { AteObl } from '@app/components/ate/ateTable/AteOblTable';
import AteTabs from '@app/components/ate/AteTabs';

const AteOblPage: React.FC = () => {
  return (
    <>
      <Card title="Ате обл">
        <PageTitle>{'Ате обл'}</PageTitle>
        <AteTabs />
        {/* <AteObl /> */}
      </Card>
    </>
  );
};

export default AteOblPage;
