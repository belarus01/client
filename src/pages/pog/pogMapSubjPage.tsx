import React from 'react';
import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import PogMapSubj from '@app/components/pog/pogMapSubj/PogMapSubj';
import styled from 'styled-components';

const Printtable = styled(PogMapSubj)`
  @media print {
    height: 200000px;
    overflow-y: visible;
    overflow-x: visible;
  }
`;

const PogMapSubjPage: React.FC = () => {
  return (
    <>
      <Card title="КАРТА УЧЕТА СУБЪЕКТА ПЕРЕВОЗКИ ОПАСНЫХ ГРУЗОВ">
        <PageTitle>{'КАРТА УЧЕТА СУБЪЕКТА ПЕРЕВОЗКИ ОПАСНЫХ ГРУЗОВ'}</PageTitle>
        <Printtable />
      </Card>
    </>
  );
};

export default PogMapSubjPage;
