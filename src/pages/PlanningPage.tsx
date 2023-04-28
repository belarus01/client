import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import { Planning } from '@app/components/planning/Planning';

const PlanningPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{'Планирование'}</PageTitle>
      <Planning />
    </>
  );
};

export default PlanningPage;
