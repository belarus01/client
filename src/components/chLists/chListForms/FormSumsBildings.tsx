import { IFireCardBuild } from '@app/domain/interfaces';
import { Col, Input, Row, Typography } from 'antd';
import React, { useMemo } from 'react';

interface FormSumsBildingsProps {
  data: IFireCardBuild[];
}
const { Text } = Typography;
const FormSumsBildings: React.FC<FormSumsBildingsProps> = ({ data }) => {
  const numStaff = useMemo(() => {
    if (data) {
      return data.reduce((acc, build) => {
        if (build.numStaff) {
          const summ = acc + parseInt(build.numStaff as string);
          return summ;
        }
        return acc;
      }, 0);
    }
    return 0;
  }, [data]);

  const numPerson = useMemo(() => {
    if (data) {
      return data.reduce((acc, build) => {
        if (build.numPerson) {
          const summ = acc + parseInt(build.numPerson as string);
          return summ;
        }
        return acc;
      }, 0);
    }
    return 0;
  }, [data]);

  const area = useMemo(() => {
    if (data) {
      return data.reduce((acc, build) => {
        if (build.area) {
          const summ = acc + parseFloat(build.area as string);
          return summ;
        }
        return acc;
      }, 0);
    }
    return 0;
  }, [data]);
  return (
    <>
      <>
        <Row>
          <Text style={{ fontSize: '17px' }}>Численность работников (персонала):</Text>

          <Col>
            <Input value={numStaff} style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }} />
          </Col>

          <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Text style={{ fontSize: '17px' }}>Расчетное количество посетителей:</Text>

          <Col>
            <Input value={numPerson} style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }} />
          </Col>

          <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Text style={{ fontSize: '17px' }}>Площадь территории:</Text>

          <Col>
            <Input value={area} style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }} />
          </Col>

          <Text style={{ fontSize: '17px', marginLeft: '15px' }}>
            м<sup>2</sup>.
          </Text>
        </Row>
      </>
    </>
  );
};

export default FormSumsBildings;
