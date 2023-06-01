import Check_list_1 from '@app/components/chLists/ChList_1';
import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const SChList_1Page: React.FC = () => {
  return (
    <>
      <Card title="Чек-лист 1">
        <PageTitle>{'Чек-лист 1'}</PageTitle>
        <Check_list_1 />
      </Card>
    </>
  );
};

export default SChList_1Page;
