import { Typography, Col, Input, Row, Button } from 'antd';
import { useState } from 'react';
import { getSubjectByUnp } from '@app/api/subjects.api';
import { SSubj } from '@app/domain/interfaces';
import { Spinner } from '@app/components/common/Spinner/Spinner';

const { Text } = Typography;

interface FormUNPProps {
  data: SSubj[];
}

const FormUNP: React.FC<FormUNPProps> = () => {
  const [subj, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: '',
  });

  const [loadingUnp, setLoadingUnp] = useState<boolean>(false);

  const [unp, setUnp] = useState<string>('');

  const fetch = () => {
    setLoadingUnp(true);
    getSubjectByUnp(unp).then((res) => {
      setSubj(res);
      setLoadingUnp(false);
    });
  };
  return (
    <Spinner spinning={loadingUnp}>
      <Row justify={'center'} style={{ marginTop: '20px' }}>
        <Col span={1}>
          <Text>УНП:</Text>
        </Col>

        <Col span={5}>
          <Input
            type="number"
            value={unp}
            onChange={(e) => setUnp(e.target.value)}
            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
          />
        </Col>

        <Col span={5} offset={2}>
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
            <Text style={{ marginTop: '-4px' }}>Заполнить форму</Text>
          </Button>
        </Col>

        <Col span={5} offset={2}>
          <Button
            style={{
              color: 'black',
              background: 'blanchedalmond',
              border: '2px solid gold',
              borderRadius: '8px',
              marginTop: '-10px',
            }}
          >
            <Text style={{ marginTop: '-4px' }}>Обновить данные</Text>
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Наименование проверяемого субъекта:</Text>

        <Col>
          <Input value={subj.subj || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Место нахождения проверяемого субъекта (объекта проверяемого субъекта):</Text>

        <Col>
          <Input value={subj.addrYur || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Место осуществления деятельности:</Text>

        <Col>
          <Input value={subj.idVed || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Фамилия, инициалы представителя субъекта:</Text>

        <Col>
          <Input value={subj.bossName || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Должность представителя субъекта:</Text>

        <Col>
          <Input value={subj.staffBoss || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Контактный телефон представителя субъекта:</Text>

        <Col>
          <Input value={subj.bossTel || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Фамилия, инициалы ответственного за обеспечение пожарной безопасности субъекта:</Text>

        <Col>
          <Input value={subj.chiefName || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Должность ответственного за обеспечение пожарной безопасности субъекта:</Text>

        <Col>
          <Input value={subj.staffChief || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Text>Контактный телефон ответственного за обеспечение пожарной безопасности субъекта:</Text>

        <Col>
          <Input value={subj.chiefTel || ''} style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Button
          type="primary"
          style={{
            color: 'black',
            background: 'blanchedalmond',
            border: '2px solid gold',
            borderRadius: '8px',
            marginTop: '15px',
            marginBottom: '20px',
          }}
        >
          <Text strong>Подтвердить</Text>
        </Button>
      </Row>
    </Spinner>
  );
};

export default FormUNP;
