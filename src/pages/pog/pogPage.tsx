import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import PogTabs from './../../components/pog/pogTabs';

const pogPage: React.FC = () => {
  return (
    <>
      <Card title="ПОГ">
        <PageTitle>{'ПОГ'}</PageTitle>
        <PogTabs />
      </Card>
    </>
  );
};

export default pogPage;
