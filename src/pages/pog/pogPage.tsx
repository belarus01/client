import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import PogTabs from './../../components/pog/pogTabs';

const SopbsCardsPage: React.FC = () => {
  return (
    <>
      <Card title="ПОГ">
        <PageTitle>{'ПОГ'}</PageTitle>
        <PogTabs />
      </Card>
    </>
  );
};

export default SopbsCardsPage;
