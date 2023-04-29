import React from 'react';
import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import PogMapSubj from '@app/components/pog/pogMapSubj/PogMapSubj';

const PogMapSubjPage: React.FC = () => {
  return (
    <>
      <Card>
        <PageTitle>{'КАРТА УЧЕТА СУБЪЕКТА ПЕРЕВОЗКИ ОПАСНЫХ ГРУЗОВ'}</PageTitle>
        <PogMapSubj />
      </Card>
    </>
  );
};

export default PogMapSubjPage;
