import { Cascader, Col, DatePicker, Input, Row, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { Button } from 'antd';
import FormTreb from './chListForms/FormTreb';
import { useEffect, useState } from 'react';
import FireTable from './chListTables/TableFire';
import { IFireCardBuild, SSubj } from '@app/domain/interfaces';
import { Spinner } from '../common/Spinner/Spinner';
import { getSubjectByUnp } from '@app/api/subjects.api';
import FormFIO from './chListForms/FormFIO';
import { getAllFireCardBuildsBySubjId } from '@app/api/fire.api';
import FormSumsBildings from './chListForms/FormSumsBildings';
import { useMemo } from 'react';
import './chList.css';
import { getAllDefectionNamesByIdEventOrder } from '@app/api/events.api';

const { Text } = Typography;

const Check_list_1: React.FC<IFireCardBuild> = () => {
  const [subj, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: '',
  });
  const [subjBuilds, setSubjBuilds] = useState<{ data: IFireCardBuild[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const [loadingUnp, setLoadingUnp] = useState<boolean>(false);
  const [unp, setUnp] = useState<string>('');

  const [loadingFormTreb, setLoadingFormTreb] = useState(false);
  const [fields, setFields] = useState([]);

  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const fetch = () => {
    setLoadingUnp(true);
    getSubjectByUnp(unp).then((res) => {
      setSubj(res);
      setLoadingUnp(false);
    });
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
              <Spinner spinning={loadingUnp}>
                <Row justify={'center'} style={{ marginTop: '20px' }}>
                  <Col>
                    <Text strong>Сведения о проверяемом субъекте</Text>
                  </Col>
                </Row>
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
                    <Input
                      value={subj.addrYur || ''}
                      style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                    />
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
                    <Input
                      value={subj.bossName || ''}
                      style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Должность представителя субъекта:</Text>

                  <Col>
                    <Input
                      value={subj.staffBoss || ''}
                      style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Контактный телефон представителя субъекта:</Text>

                  <Col>
                    <Input
                      value={subj.bossTel || ''}
                      style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Фамилия, инициалы ответственного за обеспечение пожарной безопасности субъекта:</Text>

                  <Col>
                    <Input
                      value={subj.chiefName || ''}
                      style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Должность ответственного за обеспечение пожарной безопасности субъекта:</Text>

                  <Col>
                    <Input
                      value={subj.staffChief || ''}
                      style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Контактный телефон ответственного за обеспечение пожарной безопасности субъекта:</Text>

                  <Col>
                    <Input
                      value={subj.chiefTel || ''}
                      style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                    />
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
