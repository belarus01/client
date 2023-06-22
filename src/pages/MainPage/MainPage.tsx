import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@app/components/auth/LoginForm/LoginForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Col, Row } from 'antd';
import { H, Header, LinkStyled, Text } from './MainPage.styles';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/buttons/Button/Button.styles';
import { getSubjById } from '@app/api/subjects.api';
import { Spinner } from '../../components/common/Spinner/Spinner.styles';
import { SSubj } from '@app/domain/interfaces';
import { Skeleton } from '@app/components/common/Skeleton/Skeleton';

const MainPage: React.FC = () => {
  const { t } = useTranslation();
  const [subj, setSubj] = useState<SSubj>({} as SSubj);
  const [loading, setLoading] = useState(false);

  const getSubj = () => {
    setLoading(true);
    getSubjById(1460).then((subj) => {
      console.log(subj);

      setSubj(subj);
      setLoading(false);
    });
  };

  const navigate = useNavigate();
  const currentSubj = useMemo(() => {
    if (subj) {
      return `УНП: ${subj.unp}, наименование: ${subj.subj}`;
    }
    return '';
  }, [subj]);
  useEffect(() => {
    getSubj();
  }, []);
  return (
    <>
      <PageTitle>{t('Главная')}</PageTitle>
      {loading ? (
        <>
          <Row justify={'center'}>
            <Header>Рабочее место оператора АПК КНО МЧС Республики Беларусь </Header>
          </Row>
          <Skeleton active />
        </>
      ) : (
        <>
          <Row justify={'center'}>
            <Header>Рабочее место оператора АПК КНО МЧС Республики Беларусь </Header>
          </Row>
          <hr />
          <Row>
            <H>Фамилия Имя Отчество:</H>
          </Row>
          <Row>
            <Text>Кур Елена Николаевана</Text>
          </Row>
          <Row>
            <H>Подразделение:</H>
          </Row>
          <Row>
            <Text>Группа_26</Text>
          </Row>
          <Row>
            <H>Назначеный субъект для проведения проверки:</H>
          </Row>
          {/* <Row>
        <LinkStyled to={'/common/subject/1460'}>Керамин</LinkStyled>
      </Row> */}
          <Row
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'space-between',
              maxWidth: '1000px',
              alignItems: 'center',
            }}
          >
            <Text>{currentSubj}</Text>
            <Button onClick={() => navigate(`/common/subject/${subj.idSubj}`, { state: subj })}>Открыть субъект</Button>
          </Row>
        </>
      )}
    </>
  );
};

export default MainPage;
