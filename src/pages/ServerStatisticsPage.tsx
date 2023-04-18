import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { ServerStatistics } from '../components/serverStatistics/ServerStatistics';

const ServerStatisticsPage: React.FC = () => {
  
    return (
      <>
        <PageTitle>{'Статистика сервера'}</PageTitle>
        <ServerStatistics/>
      </>
    );
  };
  
  export default ServerStatisticsPage;