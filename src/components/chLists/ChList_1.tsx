import { Col, Input, Row, Typography } from 'antd';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import FormTreb from './chListForms/ChList_1FormTreb';
import { useEffect, useState } from 'react';
import FireTable from './chListTables/ChList_1TableFire';
import { IFireCardBuild } from '@app/domain/interfaces';
import { Spinner } from '../common/Spinner/Spinner';
import FormFIO from './chListForms/ChList_1FormFIO';
import { getAllFireCardBuildsBySubjId } from '@app/api/fire.api';
import FormSumsBildings from './chListForms/ChList_1FormSumsBildings';
import './chList.css';
import { getAllDefectionNamesByIdEventOrder } from '@app/api/events.api';
import FormUNP from './chListForms/ChList_1FormUNP';

const { Text } = Typography;

const Check_list_1: React.FC<IFireCardBuild> = () => {
  const [subjBuilds, setSubjBuilds] = useState<{ data: IFireCardBuild[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const [loadingFormTreb, setLoadingFormTreb] = useState(false);
  const [fields, setFields] = useState([]);

  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const getTrebs = () => {
    setLoadingFormTreb(true);
    getAllDefectionNamesByIdEventOrder().then((treb) => {
      setFields(treb);
      setLoadingFormTreb(false);
    });
  };

  const getSubjBuilds = () => {
    setSubjBuilds({ ...subjBuilds, loading: true });
    getAllFireCardBuildsBySubjId().then((res) => {
      setSubjBuilds({ data: res, loading: false });
    });
  };

  useEffect(() => {
    getSubjBuilds();
    getTrebs();
  }, []);

  return (
    <>
      <ConfigProvider locale={ruRu}>
        <Row>
          <Col span={24} style={{ textAlign: 'center', background: 'linen' }}>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <Text strong style={{ fontSize: '17px' }}>
                МИНИСТЕРСВО ПО ЧРЕЗВЫЧАЙНЫМ СИТУАЦИЯМ <br /> РЕСПУБЛИКИ БЕЛАРУСЬ
                <br /> Органы государственного пожарного надзора
              </Text>
            </Col>

            <Row>
              <Col span={8} offset={6}>
                <Text strong style={{ fontSize: '17px', textAlign: 'center' }}>
                  КОНТРОЛЬНЫЙ СПИСОК ВОПРОСОВ (ЧЕК-ЛИСТ) №
                </Text>
              </Col>
              <Col>
                <Input style={{ marginTop: '-15px', width: '100%' }} />
              </Col>
            </Row>
            <br />

            <Col span={20} offset={2} style={{ textAlign: 'left' }}>
              <FormFIO />
              <Row justify={'center'}>
                <Text style={{ marginTop: '20px' }} strong>
                  Сведения о проверяемом субъекте
                </Text>
              </Row>

              <FormUNP data={[]} />
            </Col>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'center', background: 'linen' }}>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <Text strong style={{ fontSize: '17px' }}>
                ХАРАКТЕРИСТИКИ ПРОВЕРЯЕМОГО СУБЪЕКТА
              </Text>
            </Col>

            <Col span={20} offset={2} style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'left' }}>
              <Spinner spinning={subjBuilds.loading}>
                <FormSumsBildings data={subjBuilds.data} />
              </Spinner>
            </Col>

            <Col push={1} span={22}>
              <FireTable data={subjBuilds} update={getSubjBuilds} />
            </Col>
          </Col>
        </Row>

        <FormTreb loading={loadingFormTreb} fields={fields} />
      </ConfigProvider>
    </>
  );
};

export default Check_list_1;
