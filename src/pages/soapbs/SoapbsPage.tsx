import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import SoapbTable from '@app/components/sopbap/SopbTable';

const SoapbPage: React.FC = () => {
  return (
    <>
      <Card title="Пользователи">
        <PageTitle>{'Пользователи'}</PageTitle>
        <SoapbTable />
      </Card>
    </>
  );
};

export default SoapbPage;
