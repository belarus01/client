import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
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
      <BaseButtonsForm isFieldsChanged={false}>
        <Row>
          <Text style={{ fontSize: '17px' }}>Численность работников (персонала):</Text>
          <Col>
            <BaseButtonsForm.Item>
              <Input value={numStaff} style={{ width: 190, marginLeft: '15px', marginTop: '-15px' }} />
            </BaseButtonsForm.Item>
          </Col>

          <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
        </Row>
        <Row>
          <Text style={{ fontSize: '17px' }}>Расчетное количество посетителей:</Text>
          <Col>
            <BaseButtonsForm.Item>
              <Input value={numPerson} style={{ width: 190, marginLeft: '15px', marginTop: '-15px' }} />
            </BaseButtonsForm.Item>
          </Col>

          <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
        </Row>
        <Row>
          <Text style={{ fontSize: '17px' }}>Площадь территории:</Text>
          <Col>
            <BaseButtonsForm.Item>
              <Input value={area} style={{ width: 190, marginLeft: '15px', marginTop: '-15px' }} />
            </BaseButtonsForm.Item>
          </Col>

          <Text style={{ fontSize: '17px', marginLeft: '15px' }}>
            м<sup>2</sup>.
          </Text>
        </Row>
      </BaseButtonsForm>
    </>
  );
};

export default FormSumsBildings;
