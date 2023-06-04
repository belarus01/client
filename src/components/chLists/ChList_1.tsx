import { Col, Input, Row, Typography } from 'antd';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import FormTreb from './chListForms/ChList_1FormTreb';
import { useEffect, useState } from 'react';
import FireTable from './chListTables/ChecklistFireTable';
import { IFireCardBuild, SSubj } from '@app/domain/interfaces';
import { Spinner } from '../common/Spinner/Spinner';
import FormFIO from './chListForms/CheklistFormFIO';
import { getAllFireCardBuildsBySubjId } from '@app/api/fire.api';
import FormSumsBildings from './chListForms/ChList_1FormSumsBildings';
import './chList.css';
import { getAllDefectionNamesByIdEventOrder } from '@app/api/events.api';
import FormUNP from './chListForms/CheklistFormSubj';
import ChecklistFormFIO from './chListForms/CheklistFormFIO';
import { useParams } from 'react-router-dom';
import { getSubjById } from '@app/api/subjects.api';
import CheklistFormSubj from './chListForms/CheklistFormSubj';

const { Text } = Typography;

const Check_list_1: React.FC<IFireCardBuild> = () => {
  const [subjBuilds, setSubjBuilds] = useState<{ data: IFireCardBuild[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const [loadingFormTreb, setLoadingFormTreb] = useState(false);
  const [fields, setFields] = useState([]);

  const [subj, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: null,
  });

  const { idSubj } = useParams();

  const getUnp = () => {
    if (idSubj) {
      console.log(idSubj);
      getSubjById(idSubj).then((subj) => {
        setSubj(subj);
      });
    }
  };

  const getTrebs = () => {
    setLoadingFormTreb(true);
    getAllDefectionNamesByIdEventOrder().then((treb) => {
      setFields(treb);
      setLoadingFormTreb(false);
    });
  };

  const getSubjBuilds = () => {
    setSubjBuilds({ ...subjBuilds, loading: true });
    if (idSubj) {
      getAllFireCardBuildsBySubjId(idSubj).then((res) => {
        console.log(res, 'sadfasd');

        setSubjBuilds({ data: res, loading: false });
      });
    }
  };

  useEffect(() => {
    getSubjBuilds();
    getTrebs();
    getUnp();
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

            <Col span={20} offset={2} style={{ textAlign: 'left' }}>
              <ChecklistFormFIO />
              <Row justify={'center'}>
                <Text style={{ marginTop: '20px' }} strong>
                  Сведения о проверяемом субъекте
                </Text>
              </Row>

              <CheklistFormSubj subj={subj} />
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
