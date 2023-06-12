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
import { getAllDefectionNamesByIdEventOrder } from '@app/api/events.api';
import FormUNP from './chListForms/CheklistFormSubj';
import ChecklistFormFIO from './chListForms/CheklistFormFIO';
import { useParams } from 'react-router-dom';
import { getSubjById } from '@app/api/subjects.api';
import CheklistFormSubj from './chListForms/CheklistFormSubj';
import { Button } from '../common/buttons/Button/Button';
import { generateCheckList1 } from '@app/api/doc.api';
import { getFormReportMaxIdList, initGenerateDocGetIdList } from '@app/api/form.api';
import { notificationController } from '@app/controllers/notificationController';

const { Text } = Typography;

const Check_list_1: React.FC<IFireCardBuild> = () => {
  const [subjBuilds, setSubjBuilds] = useState<{ data: IFireCardBuild[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const [loadingFormTreb, setLoadingFormTreb] = useState(false);
  const [fields, setFields] = useState<any[]>([]);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const [subj, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: null,
  });

  const { idSubj, idEventOrder, idForm } = useParams();

  const getUnp = () => {
    if (idSubj) {
      console.log(idSubj);
      getSubjById(idSubj).then((subj) => {
        setSubj(subj);
      });
    }
  };

  const createCheckList = () => {
    if (idForm && idEventOrder) {
      setLoadingGenerate(true);
      getFormReportMaxIdList(idForm, idEventOrder).then(({ idList }) => {
        if (!idList) {
          notificationController.info({ message: 'Внесите информацию о чеклисте ' });
        }
        generateCheckList1({
          id_event_order: idEventOrder,
          unp: subj.unp,
          id_list: idList,
        }).then(() => {
          setLoadingGenerate(false);
        });
      });
    }
  };

  const getTrebs = () => {
    setLoadingFormTreb(true);
    if (idEventOrder) {
      return getAllDefectionNamesByIdEventOrder(idEventOrder).then((treb) => {
        setFields(treb);
        setLoadingFormTreb(false);
      });
    }
    return new Promise<void>((resolve) => resolve());
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

  const updateFields = () => {
    return getTrebs();
  };

  useEffect(() => {
    getSubjBuilds();
    getTrebs();
    getUnp();
  }, []);

  return (
    <>
      <ConfigProvider locale={ruRu}>
        <Spinner spinning={loadingGenerate}>
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

          <FormTreb loading={loadingFormTreb} fields={fields} updateFields={updateFields} />
          <Row justify={'center'} style={{ background: 'linen' }}>
            <Button
              type="primary"
              style={{
                color: 'black',
                background: 'blanchedalmond',
                border: '2px solid gold',
                borderRadius: '8px',
                marginBottom: '20px',
                marginTop: '-10px',
              }}
              onClick={createCheckList}
            >
              <Text strong>Завершить заполнение и создать документ</Text>
            </Button>
          </Row>
        </Spinner>
      </ConfigProvider>
    </>
  );
};

export default Check_list_1;
