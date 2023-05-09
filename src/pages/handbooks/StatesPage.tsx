import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import StateTable from '@app/components/state/stateTable/StateTable';

const SStatePage: React.FC = () => {
  return (
    <>
      <Card title="Страны мира">
        <PageTitle>{'Страны мира'}</PageTitle>
        <StateTable />
      </Card>
    </>
  );
};

export default SStatePage;
