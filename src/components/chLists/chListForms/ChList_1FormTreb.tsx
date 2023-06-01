import { Cascader, Col, DatePicker, Row, Select, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, TextArea } from '../../common/inputs/Input/Input';
import { Button } from '../../common/buttons/Button/Button';
import { InfoOutlined } from '@ant-design/icons';
import { Spinner } from '../../common/Spinner/Spinner.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

interface FormTreb {
  loading: boolean;
  fields: any[];
}

const { Text } = Typography;

const FormTreb: React.FC<FormTreb> = ({ loading, fields }) => {
  const [field1, setField1] = useState('');
  const [rulePunct, setRulePunct] = useState('');
  const [shortTnpa, setShortTnpa] = useState('');
  const [currentNumQuestion, setCurrentNumQuestion] = useState<(string | number)[]>([]);
  const [shownComm, setShownComm] = useState(false);

  const changeCurrentNumQuestion = (field: { idDef2: { numQuestion: string | number } }) => {
    setCurrentNumQuestion([field.idDef2?.numQuestion]);
  };

  const puncts = useMemo(() => {
    if (fields) {
      return fields.map((field) => {
        return {
          label: `${field.idDef2?.numQuestion}`,
          value: field.idDef2?.numQuestion,
        };
      });
    }
    return [];
  }, [fields]);

  const changePuncts = useCallback(
    (value) => {
      setField1(value);

      const index = fields.findIndex((field) => field.idDef2?.numQuestion == value);
      console.log(index);
      if (index != -1) {
        const currentField = fields[index];
        changeCurrentNumQuestion(currentField);
        setRulePunct(currentField.idDef2?.rulePunct);
        setShortTnpa(currentField.idDef2?.shortTnpa);
      }
    },
    [fields],
  );

  const prev = () => {
    const index = fields.findIndex((field) => field.idDef2?.numQuestion == field1);
    if (index !== -1 && index !== 0) {
      const prevField = fields[index - 1];
      const prevPunct = prevField.idDef2?.numQuestion;
      changePuncts(prevPunct);
    }
  };

  const next = () => {
    const index = fields.findIndex((field) => field.idDef2?.numQuestion == field1);
    if (index !== -1 && index !== fields.length - 1) {
      const nextField = fields[index + 1];
      const nextPunct = nextField.idDef2?.numQuestion;
      changePuncts(nextPunct);
    }
  };

  const onFinish = (values: unknown) => {
    console.log(values);
  };

  useEffect(() => {
    if (fields.length > 0) {
      changePuncts(fields[0].idDef2?.numQuestion);
    }
  }, [changePuncts, fields, fields.length]);

  return (
    <>
      <BaseButtonsForm isFieldsChanged={false} onFinish={onFinish}>
        <Spinner spinning={loading}>
          <Row>
            <Col span={24} style={{ textAlign: 'center', background: 'linen' }}>
              <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Text strong style={{ fontSize: '17px' }}>
                  Перечень требований, предъявляемых к проверяемому субъекту
                </Text>
              </Col>

              <Col offset={2} style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <Row>
                  <Text style={{ fontSize: '17px' }}>Выбор пункта:</Text>

                  <BaseButtonsForm.Item name="numQuestion">
                    <Select
                      placeholder="1.1"
                      style={{ marginLeft: '20px', marginTop: '-10px' }}
                      options={puncts}
                      value={currentNumQuestion}
                      onChange={(value) => changePuncts(value)}
                    />
                  </BaseButtonsForm.Item>
                </Row>
              </Col>

              <Col
                span={22}
                offset={1}
                style={{
                  background: 'lightblue',
                  textAlign: 'left',
                  marginBottom: '30px',
                  fontSize: '16px',
                  border: '1px solid mediumpurple',
                }}
              >
                <Col span={22} offset={1}>
                  <Row style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                    <Col>
                      <Row>
                        <Text style={{ marginTop: '12px' }}>Номер пункта:</Text>
                        <BaseButtonsForm.Item>
                          <Input
                            value={field1}
                            style={{ width: '50%', marginLeft: '3%', textAlign: 'center' }}
                            readOnly
                          />
                        </BaseButtonsForm.Item>

                        <BaseButtonsForm.Item name="chl_fl_yes">
                          <Select
                            placeholder="Выберете значение"
                            style={{ textAlign: 'center', width: '150%' }}
                            options={[
                              {
                                value: '0',
                                label: 'Да',
                              },
                              {
                                value: '1',
                                label: 'Нет',
                              },
                              {
                                value: '2',
                                label: 'Не требуется',
                              },
                            ]}
                          />
                        </BaseButtonsForm.Item>
                      </Row>
                    </Col>
                  </Row>

                  <Text style={{ marginTop: '12px' }}>Требование:</Text>
                  <BaseButtonsForm.Item>
                    <TextArea value={rulePunct} readOnly />
                  </BaseButtonsForm.Item>

                  <Row>
                    <Text style={{ marginTop: '10px' }}>Структурные элементы нормативных правовых актов:</Text>
                    <BaseButtonsForm.Item>
                      <Input value={shortTnpa} style={{ width: '100%', marginLeft: '5%' }} readOnly />
                    </BaseButtonsForm.Item>
                    {/* <BaseButtonsForm.Item>
                      <Col offset={10}>
                        <Button
                          shape="round"
                          size="small"
                          style={{ marginTop: '0px', background: '#CCFF99', color: 'black' }}
                        >
                          <InfoOutlined />
                        </Button>
                      </Col>
                    </BaseButtonsForm.Item> */}
                  </Row>

                  <BaseButtonsForm.Item name="chl_comm">
                    {shownComm ? <TextArea /> : null}
                    <Button
                      style={{
                        color: 'black',
                        background: 'blanchedalmond',
                        border: '2px solid gold',
                        borderRadius: '8px',
                        marginTop: '15px',
                        marginBottom: '10px',
                        marginRight: '20px',
                      }}
                      onClick={() => setShownComm((prev) => !prev)}
                    >
                      <Text strong>Примечание</Text>
                    </Button>
                  </BaseButtonsForm.Item>

                  <Row style={{ justifyContent: 'space-between' }}>
                    <Col style={{ textAlign: 'center' }} span={4}>
                      <Text>Дата устранения замечаний:</Text>
                      <BaseButtonsForm.Item name="date_fix">
                        <DatePicker style={{ marginTop: '5px' }} />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <Text>Дата информирования об устранении нарушения:</Text>
                      <BaseButtonsForm.Item name="date_inform">
                        <DatePicker style={{ marginTop: '5px' }} />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <Text>Дата проведения мероприятия по контролю за устранением нарушения:</Text>
                      <BaseButtonsForm.Item name="date_check_fix">
                        <DatePicker style={{ marginTop: '5px' }} />
                      </BaseButtonsForm.Item>
                    </Col>

                    <BaseButtonsForm.Item name="fl_ok">
                      <Select
                        placeholder="Исправлено"
                        style={{ textAlign: 'center' }}
                        options={[
                          {
                            value: '0',
                            label: 'Исправлено',
                          },
                          {
                            value: '2',
                            label: 'Частично',
                          },
                          {
                            value: '3',
                            label: 'Перенесено',
                          },
                        ]}
                      />
                    </BaseButtonsForm.Item>
                  </Row>

                  <Row style={{ justifyContent: 'space-between' }}>
                    <BaseButtonsForm.Item>
                      <Button
                        style={{
                          color: 'black',
                          background: 'blanchedalmond',
                          border: '2px solid gold',
                          borderRadius: '8px',
                          marginTop: '0px',
                        }}
                      >
                        <Text strong>Добавить фото/видео</Text>
                      </Button>
                    </BaseButtonsForm.Item>

                    <BaseButtonsForm.Item>
                      <Button
                        htmlType="submit"
                        style={{
                          color: 'black',
                          background: 'blanchedalmond',
                          border: '2px solid gold',
                          borderRadius: '8px',
                        }}
                      >
                        <Text strong>Подтвердить</Text>
                      </Button>
                    </BaseButtonsForm.Item>
                  </Row>
                </Col>
              </Col>

              <Col span={22} offset={1} style={{ textAlign: 'left', marginBottom: '30px', fontSize: '15px' }}>
                <Row>
                  <BaseButtonsForm.Item>
                    <Button
                      style={{
                        color: 'black',
                        background: 'blanchedalmond',
                        border: '2px solid gold',
                        borderRadius: '8px',
                        marginTop: '-10px',
                        marginBottom: '10px',
                        marginLeft: '0px',
                      }}
                      onClick={prev}
                    >
                      <Text strong>Предыдущий</Text>
                    </Button>
                  </BaseButtonsForm.Item>
                  <BaseButtonsForm.Item>
                    <Button
                      style={{
                        color: 'black',
                        background: 'blanchedalmond',
                        border: '2px solid gold',
                        borderRadius: '8px',
                        marginTop: '-10px',
                        marginBottom: '10px',
                        marginLeft: '20px',
                      }}
                      onClick={next}
                    >
                      <Text strong>Следующий</Text>
                    </Button>
                  </BaseButtonsForm.Item>
                </Row>
              </Col>

              <Row justify={'center'}>
                <BaseButtonsForm.Item>
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
                    <Text strong>Завершить</Text>
                  </Button>
                </BaseButtonsForm.Item>
              </Row>
            </Col>
          </Row>
        </Spinner>
      </BaseButtonsForm>
    </>
  );
};

export default FormTreb;
