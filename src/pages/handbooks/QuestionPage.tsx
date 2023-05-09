import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import QuestionTable from '@app/components/question/questionTables/QuestionTable';

const SQuestionPage: React.FC = () => {
  return (
    <>
      <Card title="Вопросы МТХ">
        <PageTitle>{'Вопросы МТХ'}</PageTitle>
        <QuestionTable />
      </Card>
    </>
  );
};

export default SQuestionPage;
