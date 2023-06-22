import { Typography, Col, Input, Row, Button } from 'antd';
import { useEffect, useState } from 'react';
import { getSubjectByUnp, updateSubj } from '@app/api/subjects.api';
import { SSubj } from '@app/domain/interfaces';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { BaseButtonsForm } from '../../common/forms/BaseButtonsForm/BaseButtonsForm';
import styled from 'styled-components';
import { notificationController } from '@app/controllers/notificationController';

const { Text } = Typography;

const TextStyled = styled.div`
  display: table-cell;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  line-height: 17px;
`;

interface FormUNPProps {
  subj: SSubj;
}

const CheklistFormSubj: React.FC<FormUNPProps> = ({ subj }) => {
  const [subjRefactor, setSubjRefactor] = useState<SSubj>({
    unp: null,
    idSubj: null,
  });

  const [loadingUnp, setLoadingUnp] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subj) {
      setLoadingUnp(false);
      setSubjRefactor((prev) => ({
        ...prev,
        ...subj,
      }));
    }
  }, [subj]);

  const update = () => {
    setLoading(true);
    if (subjRefactor.idSubj) {
      updateSubj(subjRefactor.idSubj, subjRefactor)
        .then(() => {
          setLoading(false);
          notificationController.success({ message: 'Субъект Обновлен' });
        })
        .catch((e) => {
          notificationController.error({ message: e, description: 'К сожалению действие не завершенно' });
        });
    }
  };

  return (
    <Spinner spinning={loadingUnp}>
      <BaseButtonsForm isFieldsChanged={false}>
        <Row justify={'center'} style={{ marginTop: '20px' }}>
          <Col span={2}>
            <TextStyled>УНП:</TextStyled>
          </Col>

          <Col span={8}>
            <Input
              type="number"
              value={subjRefactor.unp || ''}
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  unp: e.target.value,
                }))
              }
              style={{ width: '100%', marginLeft: '15px' }}
            />
          </Col>

          {/* <Col span={5} offset={2}>
          <Button
            style={{
              color: 'black',
              background: 'blanchedalmond',
              border: '2px solid gold',
              borderRadius: '8px',
              marginTop: '-10px',
            }}
            onClick={fetch}
          >
            <TextStyled style={{ marginTop: '-4px' }}>Заполнить форму</TextStyled>
          </Button>
        </Col> */}

          <Col span={5} offset={2}>
            <Button
              style={{
                color: 'black',
                background: 'blanchedalmond',
                border: '2px solid gold',
                borderRadius: '8px',
              }}
              loading={loading}
              onClick={update}
            >
              <Text>Обновить данные</Text>
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <TextStyled>Наименование проверяемого субъекта:</TextStyled>
          </Col>

          <Col>
            <Input
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  subj: e.target.value,
                }))
              }
              value={subjRefactor.subj || ''}
              style={{ width: '100%', marginLeft: '10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <TextStyled>Место нахождения проверяемого субъекта (объекта проверяемого субъекта):</TextStyled>
          </Col>

          <Col>
            <Input
              value={subjRefactor.addrYur || ''}
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  addrYur: e.target.value,
                }))
              }
              style={{ width: '100%', marginLeft: '10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <TextStyled>Место осуществления деятельности:</TextStyled>
          </Col>
          <Col>
            <Input
              value={subjRefactor.idVed || ''}
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  idVed: e.target.value,
                }))
              }
              readOnly
              style={{ width: '100%', marginLeft: '10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <TextStyled>Фамилия, инициалы представителя субъекта:</TextStyled>
          </Col>

          <Col>
            <Input
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  bossName: e.target.value,
                }))
              }
              value={subjRefactor.bossName || ''}
              style={{ width: '100%', marginLeft: '10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <TextStyled>Должность представителя субъекта:</TextStyled>
          </Col>

          <Col>
            <Input
              value={subjRefactor.staffBoss || ''}
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  staffBoss: e.target.value,
                }))
              }
              style={{ width: '100%', marginLeft: '10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <TextStyled>Контактный телефон представителя субъекта:</TextStyled>
          </Col>

          <Col>
            <Input
              value={subjRefactor.bossTel || ''}
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  bossTel: e.target.value,
                }))
              }
              style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <TextStyled>Фамилия, инициалы ответственного за обеспечение пожарной безопасности субъекта:</TextStyled>
          </Col>

          <Col>
            <Input
              value={subjRefactor.chiefName || ''}
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  chiefName: e.target.value,
                }))
              }
              style={{ width: '100%', marginLeft: '10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col span={10}>
            <TextStyled>Должность ответственного за обеспечение пожарной безопасности субъекта:</TextStyled>
          </Col>

          <Col span={10} offset={1}>
            <Input
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  staffChief: e.target.value,
                }))
              }
              value={subjRefactor.staffChief || ''}
            />
          </Col>
        </Row>
        <Row style={{ margin: '30px 0' }}>
          <Col span={10}>
            <TextStyled>Контактный телефон ответственного за обеспечение пожарной безопасности субъекта:</TextStyled>
          </Col>

          <Col span={10} offset={1}>
            <Input
              onChange={(e) =>
                setSubjRefactor((prev) => ({
                  ...prev,
                  chiefTel: e.target.value,
                }))
              }
              value={subjRefactor.chiefTel || ''}
            />
          </Col>
        </Row>
      </BaseButtonsForm>
    </Spinner>
  );
};

export default CheklistFormSubj;
