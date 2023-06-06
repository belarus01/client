import { Cascader, Col, DatePicker, Row, Select, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, TextArea } from '../../common/inputs/Input/Input';
import { Button } from '../../common/buttons/Button/Button';
import { Spinner } from '../../common/Spinner/Spinner.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IEventOrderQueDef } from '@app/domain/interfaces';
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';
import { updateEventOrderQueDef } from '@app/api/events.api';
import { notificationController } from '@app/controllers/notificationController';

interface FormTreb {
  loading: boolean;
  fields: any[];
}

const { Text } = Typography;

const FormTreb: React.FC<FormTreb> = ({ loading, fields }) => {
  const [numPunct, setNumPunct] = useState('');
  const [rulePunct, setRulePunct] = useState('');
  const [shortTnpa, setShortTnpa] = useState('');
  const [currentNumQuestion, setCurrentNumQuestion] = useState<(string | number)[]>([]);
  const [currentField, setCurrentField] = useState<IEventOrderQueDef>({
    idDef: null,
  });
  const [shownComm, setShownComm] = useState(false);

  const [loadingForm, setLoadingForm] = useState(false);

  const initialValuesFlOk = (value: number) => {
    switch (value) {
      case 0:
        return {
          value: '0',
          label: 'Исправлено',
        };
      case 2:
        return {
          value: '2',
          label: 'Частично',
        };
      case 3: {
        return {
          value: '3',
          label: 'Перенесено',
        };
      }
      default:
        return null;
    }
  };

  const initialValuesChlOk = (value: number) => {
    console.log(value, 'ASDFADSFASDFFADADFAADFFADADFD');

    switch (value) {
      case 0:
        return {
          value: '0',
          label: 'Да',
        };
      case 1:
        return {
          value: '1',
          label: 'Нет',
        };
      case 2: {
        return {
          value: '2',
          label: 'Не требуется',
        };
      }
      default:
        return null;
    }
  };

  const changeCurrentNumQuestion = (field: IEventOrderQueDef) => {
    setCurrentField({ ...field });
    const flOk = initialValuesFlOk(field.flOk);
    const chlFlYes = initialValuesChlOk(field.chlFlYes);
    form.setFieldsValue({
      dateFix: field.dateFix ? moment(field.dateFix) : null,
      dateInform: field.dateInform ? moment(field.dateInform) : null,
      dateCheckFix: field.dateCheckFix ? moment(field.dateCheckFix) : null,
      chlComm: field.chlComm,
      flOk: flOk
        ? flOk
        : {
            value: '0',
            label: 'Исправлено',
          },
      chlFlYes: chlFlYes
        ? chlFlYes
        : {
            value: '0',
            label: 'Да',
          },
    });
    setCurrentNumQuestion([field.idDef2?.numQuestion]);
  };
  const [form] = BaseButtonsForm.useForm();
  useEffect(() => {
    console.log(currentField.dateFix);
    console.log(form);
  }, [currentField]);

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
      setNumPunct(value);
      console.log('punct', value);
      const index = fields.findIndex((field) => field.idDef2?.numQuestion == value);
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
    const index = fields.findIndex((field) => field.idDef2?.numQuestion == numPunct);
    if (index !== -1 && index !== 0) {
      const prevField = fields[index - 1];
      const prevPunct = prevField.idDef2?.numQuestion;
      changePuncts(prevPunct);
    }
  };

  const next = () => {
    const index = fields.findIndex((field) => field.idDef2?.numQuestion == numPunct);
    if (index !== -1 && index !== fields.length - 1) {
      const nextField = fields[index + 1];
      const nextPunct = nextField.idDef2?.numQuestion;
      changePuncts(nextPunct);
    }
  };

  const onFinish = (values: IEventOrderQueDef) => {
    setLoadingForm(true);
    const finalyValues: IEventOrderQueDef = {
      ...values,
      dateFix: values.dateFix ? (values.dateFix as unknown as Moment).format('YYYY.MM.DD') : null,
      dateCheckFix: values.dateCheckFix ? (values.dateCheckFix as unknown as Moment).format('YYYY.MM.DD') : null,
      dateInform: values.dateInform ? (values.dateInform as unknown as Moment).format('YYYY.MM.DD') : null,
      flOk: values.flOk?.value ? values.flOk?.value : values.flOk,
      chlFlYes: values.chlFlYes?.value ? values.chlFlYes?.value : values.chlFlYes,
    };
    if (currentField.idList) {
      updateEventOrderQueDef(currentField.idList, finalyValues).then(() => {
        setLoadingForm(false);
        notificationController.success({ message: 'Данные внесены успешно!' });
      });
    }
  };

  useEffect(() => {
    if (fields.length > 0) {
      changePuncts(fields[0].idDef2?.numQuestion);
    }
  }, [changePuncts, fields, fields.length]);

  const dateFormat = 'DD.MM.YYYY';

  return (
    <>
      <BaseButtonsForm
        loading={loadingForm}
        form={form}
        isFieldsChanged={false}
        onFinish={onFinish}
        initialValues={{
          chlFlYes: {
            value: '0',
            label: 'Да',
          },
        }}
      >
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

                  <BaseButtonsForm.Item>
                    <Select
                      placeholder="1.1"
                      style={{ marginLeft: '20px', marginTop: '-10px' }}
                      options={puncts}
                      value={currentNumQuestion}
                      onChange={(value) => changePuncts(value)}
                      key={`${currentNumQuestion}`}
                      defaultValue={currentNumQuestion}
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
                            value={numPunct}
                            style={{ width: '50%', marginLeft: '3%', textAlign: 'center' }}
                            readOnly
                          />
                        </BaseButtonsForm.Item>

                        <BaseButtonsForm.Item name="chlFlYes" style={{ width: '150px' }}>
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

                  <BaseButtonsForm.Item name="chlComm">
                    {shownComm ? <TextArea onChange={(e) => form.setFieldValue('chlComm', e.target.value)} /> : null}
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

                  <Row style={{ justifyContent: 'space-between', lineHeight: '17px' }}>
                    <Col style={{ textAlign: 'center' }} span={4}>
                      <Text>Дата устранения замечаний:</Text>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <Text>Дата информирования об устранении нарушения:</Text>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <Text>Дата проведения мероприятия по контролю за устранением нарушения:</Text>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}></Col>
                  </Row>

                  <Row style={{ justifyContent: 'space-between' }}>
                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name={'dateFix'}>
                        <DatePicker format={dateFormat} style={{ marginTop: '5px' }} />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name="dateInform">
                        <DatePicker format={dateFormat} style={{ marginTop: '5px' }} />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name="dateCheckFix">
                        <DatePicker format={dateFormat} style={{ marginTop: '5px' }} />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name="flOk">
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
                    </Col>
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
                        loading={loadingForm}
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
            </Col>
          </Row>
        </Spinner>
      </BaseButtonsForm>
    </>
  );
};

export default FormTreb;
