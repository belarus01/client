import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import VedomstvaTable from '@app/components/vedomstva/vedomstvaTables/VedomstvaTable';

const SVedomstvaPage: React.FC = () => {
  return (
    <>
      <Card title="Ведомства РБ">
        <PageTitle>{'Ведомства РБ'}</PageTitle>
        <VedomstvaTable />
      </Card>
    </>
  );
};

export default SVedomstvaPage;
