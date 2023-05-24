import { Cascader, Col, DatePicker, Input, Row, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { Button } from 'antd';
import FormTreb from './chListForms/FormTreb';
import { useEffect, useState } from 'react';
import FireTable from './chListTables/TableFire';
import { SSubj } from '@app/domain/interfaces';
import { Spinner } from '../common/Spinner/Spinner';
import { getSubjectByUnp } from '@app/api/subjects.api';
import FormFIO from './chListForms/FormFIO';

const { Text } = Typography;

const Check_list_1: React.FC = () => {
  const [subj, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: '',
  });

  const [loadingUnp, setLoadingUnp] = useState<boolean>(false);
  const [unp, setUnp] = useState<string>('');

  const [loadingFormTreb, setLoadingFormTreb] = useState(false);
  const [fields, setFields] = useState([]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const fetch = () => {
    setLoadingUnp(true);
    getSubjectByUnp(unp).then((res) => {
      setSubj(res);
      setLoadingUnp(false);
    });
  };

  const getTrebs = () => {
    setLoadingFormTreb(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            idChlistForm: 1,
            // id_chlist int UNSIGNED NOT NULL,
            field1: 1,
            // id_type_unit1 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля index_num (чекбохс,текстовое поле, кнопки, переключатели )',
            field2: 'Предусмотрены ли проектом оборудования системы подачи воздуха и газоснабжения для шлюзирования',
            // id_type_unit2 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_requir',
            field3: 'подпункт д) пункта 106 приложения 2<2>',
            //id_type_unit3 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_normative',
            field4: '',
            field5: '',
            field6: '',
            //id_type_unit4_6 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для полей Да,Нет,Не требуется',
            field7: '',
            // id_type_unit7 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля Примечание',
            field8: '',
          },
          {
            idChlistForm: 1,
            // id_chlist int UNSIGNED NOT NULL,
            field1: 2,
            // id_type_unit1 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля index_num (чекбохс,текстовое поле, кнопки, переключатели )',
            field2:
              'Обеспечивают ли средства газового контроля барокамеры точность замеров содержания кислорода, гелия и диоксида углерода, а также возможных вредных веществ',
            // id_type_unit2 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_requir',
            field3: 'пункт 108 приложения 2<2>',
            //id_type_unit3 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_normative',
            field4: '',
            field5: '',
            field6: '',
            //id_type_unit4_6 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для полей Да,Нет,Не требуется',
            field7: '',
            // id_type_unit7 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля Примечание',
            field8: '',
          },
          {
            idChlistForm: 1,
            // id_chlist int UNSIGNED NOT NULL,
            field1: 2.1,
            // id_type_unit1 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля index_num (чекбохс,текстовое поле, кнопки, переключатели )',
            field2:
              'Обеспечивают ли система и средства противопожарной защиты обнаружение начала пожара в барокамере или предпосылок возгорания (дым, бесконтрольное повышение температу-ры), подачу аварийного сигнала, а также тушение обнаруженного пожара всеми имеющимися в барокамере средствами ',
            // id_type_unit2 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_requir',
            field3: 'пункт 109 приложения 2<2>',
            //id_type_unit3 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_normative',
            field4: '',
            field5: '',
            field6: '',
            //id_type_unit4_6 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для полей Да,Нет,Не требуется',
            field7: '',
            // id_type_unit7 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля Примечание',
            field8: '',
          },
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    getTrebs().then((res) => {
      setFields(res);
      setLoadingFormTreb(false);
    });
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
              <Text style={{ fontSize: '17px' }}>
                в сфере государственного пожарного надзора, надзора за соблюдением законодательства при осуществлении
                деятельности по обеспечению пожарной безопасности:
                <Row style={{ marginTop: '15px' }}>
                  <Text>Дата начала заполнения</Text>

                  <Col>
                    <DatePicker onChange={onChange} style={{ marginLeft: '12px', marginTop: '-10px' }} />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Дата завершения зaполнения</Text>

                  <Col>
                    <DatePicker onChange={onChange} style={{ marginLeft: '15px', marginTop: '-10px' }} />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Дата направления</Text>

                  <Col>
                    {/* <Cascader placeholder="выбор из списка" style={{ width: 170, marginLeft: "-15px" }}
                                            options={[
                                                {
                                                    value: '12.11.2022',
                                                    label: '12.11.2022',
                                                },
                                                {
                                                    value: '05.11.2022',
                                                    label: '05.11.2022',
                                                },
                                            ]}
                                        /> */}
                    <DatePicker onChange={onChange} style={{ marginLeft: '15px', marginTop: '-10px' }} />
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Text>Контрольный список вопросов (чек-лист) заполняется в ходе</Text>

                  <Col>
                    <Cascader
                      placeholder="выбор из списка"
                      style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                      options={[
                        {
                          value: 'внеплановой проверки',
                          label: 'внеплановой проверки',
                        },
                        {
                          value: 'выборочной проверки',
                          label: 'выборочной проверки',
                        },
                        {
                          value: 'для использования при планировании проверок',
                          label: 'для использования при планировании проверок',
                        },
                      ]}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '5px' }}>
                  <Text>Должностное лицо, выполняющее проверку (направившее контрольный список вопросов):</Text>
                </Row>
                <FormFIO />
                <Row justify={'center'}>
                  <Button
                    type="primary"
                    style={{
                      color: 'black',
                      background: 'blanchedalmond',
                      border: '2px solid gold',
                      borderRadius: '8px',
                      marginTop: '15px',
                      marginBottom: '10px',
                    }}
                  >
                    <Text strong>Подтвердить</Text>
                  </Button>
                </Row>
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
                      <Input
                        value={subj.subj || ''}
                        style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '15px' }}>
                    <Text>Место нахождения проверяемого субъекта (объекта проверяемого субъекта):</Text>

                    <Col>
                      <Input
                        value={subj.addrYur || ''}
                        style={{ width: '100%', marginLeft: '10px', marginTop: '25px' }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '15px' }}>
                    <Text>Место осуществления деятельности:</Text>

                    <Col>
                      <Input
                        value={subj.idVed || ''}
                        style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }}
                      />
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
                        marginTop: '10px',
                        marginBottom: '20px',
                      }}
                    >
                      <Text strong>Подтвердить</Text>
                    </Button>
                  </Row>
                </Spinner>
              </Text>
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
              <Row>
                <Text style={{ fontSize: '17px' }}>Численность работников (персонала):</Text>

                <Col>
                  <Input
                    placeholder="заполняется вручную"
                    style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }}
                  />
                </Col>

                <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Text style={{ fontSize: '17px' }}>Расчетное количество посетителей:</Text>

                <Col>
                  <Input
                    placeholder="заполняется вручную"
                    style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }}
                  />
                </Col>

                <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Text style={{ fontSize: '17px' }}>Площадь территории:</Text>

                <Col>
                  <Input
                    placeholder="заполняется вручную"
                    style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }}
                  />
                </Col>

                <Text style={{ fontSize: '17px', marginLeft: '15px' }}>
                  м<sup>2</sup>.
                </Text>
              </Row>
            </Col>

            <Col push={1} span={22}>
              <FireTable />
            </Col>

            <Row justify={'center'}>
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
              >
                <Text strong>Подтвердить</Text>
              </Button>
            </Row>
          </Col>
        </Row>

        <FormTreb loading={loadingFormTreb} fields={fields} />
      </ConfigProvider>
    </>
  );
};

export default Check_list_1;
