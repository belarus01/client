import { Cascader, Col, Row, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, TextArea } from '../../common/inputs/Input/Input';
import { Button } from '../../common/buttons/Button/Button';
import { InfoOutlined } from '@ant-design/icons';
import { Spinner } from '../../common/Spinner/Spinner.styles';

interface FormTreb {
  // field1: number | string;
  // field2: string;
  // field3: string;
  loading: boolean;
  fields: any[];
}

const { Text } = Typography;

const FormTreb: React.FC<FormTreb> = ({ loading, fields }) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [currentField1, setCurrentField1] = useState<(string | number)[]>([]);
  const [shownComm, setShownComm] = useState(false);

  const changeCurrentField1 = (field) => {
    setCurrentField1([field.field1]);
  };

  const puncts = useMemo(() => {
    if (fields) {
      return fields.map((field) => {
        return {
          label: `${field.field1}`,
          value: field.field1,
        };
      });
    }
    return [];
  }, [fields]);

  const changePuncts = useCallback(
    (value) => {
      setField1(value);

      const index = fields.findIndex((field) => field.field1 == value);
      console.log(index);
      if (index != -1) {
        const currentField = fields[index];
        changeCurrentField1(currentField);
        setField2(currentField.field2);
        setField3(currentField.field3);
      }
    },
    [fields],
  );

  const prev = () => {
    const index = fields.findIndex((field) => field.field1 == field1);
    if (index !== -1 && index !== 0) {
      const prevField = fields[index - 1];
      const prevPunct = prevField.field1;
      changePuncts(prevPunct);
    }
  };

  const next = () => {
    const index = fields.findIndex((field) => field.field1 == field1);
    if (index !== -1 && index !== fields.length - 1) {
      const nextField = fields[index + 1];
      const nextPunct = nextField.field1;
      changePuncts(nextPunct);
    }
  };

  useEffect(() => {
    if (fields.length > 0) {
      changePuncts(fields[0].field1);
    }
  }, [changePuncts, fields, fields.length]);

  return (
    <>
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
                <Cascader
                  placeholder="1.1"
                  style={{ width: '10%', marginLeft: '20px', marginTop: '-10px' }}
                  options={puncts}
                  value={currentField1}
                  onChange={(value) => changePuncts(value)}
                />
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
                <Row style={{ marginTop: '15px' }}>
                  <Col>
                    <Text>Номер пункта:</Text>
                    <Input value={field1} style={{ width: '50%', marginLeft: '15px' }} readOnly />
                  </Col>

                  <Col>
                    <Cascader
                      placeholder="Да"
                      style={{ marginLeft: '-15px' }}
                      options={[
                        {
                          value: 'Да',
                          label: 'Да',
                        },
                        {
                          value: 'Нет',
                          label: 'Нет',
                        },
                        {
                          value: 'Не требуется',
                          label: 'Не требуется',
                        },
                      ]}
                    />
                  </Col>

                  <Col span={2} offset={6}>
                    <Button
                      style={{
                        color: 'black',
                        background: 'blanchedalmond',
                        border: '2px solid gold',
                        borderRadius: '8px',
                        marginLeft: '0px',
                        marginRight: '0px',
                      }}
                    >
                      <Text strong>Изменить</Text>
                    </Button>
                  </Col>

                  <Col span={2} offset={1}>
                    <Button
                      style={{
                        color: 'black',
                        background: 'blanchedalmond',
                        border: '2px solid gold',
                        borderRadius: '8px',
                      }}
                    >
                      <Text strong>Подтвердить</Text>
                    </Button>
                  </Col>
                </Row>

                <Row style={{ marginTop: '15px' }}>
                  <Text>Требование:</Text>

                  <TextArea value={field2} readOnly />
                </Row>

                <Row>
                  <Text style={{ marginTop: '30px' }}>Структурные элементы нормативных правовых актов:</Text>

                  <Input value={field3} style={{ width: '50%', marginLeft: '15px', marginTop: '15px' }} readOnly />
                  <Button
                    shape="round"
                    size="small"
                    style={{ marginTop: '25px', marginLeft: '15px', background: '#CCFF99', color: 'black' }}
                  >
                    <InfoOutlined />
                  </Button>
                  {/* <Button type="primary" shape="circle" icon={<QuestionCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px', marginTop: "30px", marginLeft: "15px" }} />} /> */}
                  {/* <QuestionCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '30px', marginTop: "30px", marginLeft: "15px" }} /> */}
                </Row>

                <Row style={{ marginTop: '15px' }}>
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

                  <Button
                    style={{
                      color: 'black',
                      background: 'blanchedalmond',
                      border: '2px solid gold',
                      borderRadius: '8px',
                      marginTop: '15px',
                    }}
                  >
                    <Text strong>Добавить фото/видео</Text>
                  </Button>
                </Row>
              </Col>
            </Col>

            <Col span={22} offset={1} style={{ textAlign: 'left', marginBottom: '30px', fontSize: '15px' }}>
              <Row>
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
              </Row>
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
                <Text strong>Завершить</Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Spinner>
    </>
  );
};

export default FormTreb;
