import { Cascader, Col, DatePicker, Row, Typography, UploadProps } from 'antd';
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
import { Upload } from '@app/components/common/Upload/Upload';
import { UploadOutlined } from '@ant-design/icons';
import CheklistUpload from '../CheklistUpload/CheklistUpload';
import { Select } from '@app/components/common/selects/Select/Select';

interface FormTreb {
  loading: boolean;
  fields: any[];
  updateFields: () => Promise<void>;
}

const { Text } = Typography;

const FormTreb: React.FC<FormTreb> = ({ loading, fields, updateFields }) => {
  const [numPunct, setNumPunct] = useState('');
  const [rulePunct, setRulePunct] = useState('');
  const [shortTnpa, setShortTnpa] = useState('');
  const [currentNumQuestion, setCurrentNumQuestion] = useState<(string | number)[]>([]);
  const [currentField, setCurrentField] = useState<IEventOrderQueDef>({
    idDef: null,
  });
  const [chlComm, setChlComm] = useState('');
  const [shownComm, setShownComm] = useState(false);

  const [loadingForm, setLoadingForm] = useState(false);

  const initialValuesFlOk = (value: number) => {
    switch (value) {
      case 0:
        return {
          value: '0',
          label: 'Исправлено',
        };
      case 0:
        return {
          value: '1',
          label: 'Не исправлено',
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
    const flOk = initialValuesFlOk(parseFloat(field.flOk));
    const chlFlYes = initialValuesChlOk(parseFloat(field.chlFlYes));
    console.log(flOk, chlFlYes, field);

    form.setFieldsValue({
      dateFix: field.dateFix ? moment(field.dateFix) : null,
      dateInform: field.dateInform ? moment(field.dateInform) : null,
      dateCheckFix: field.dateCheckFix ? moment(field.dateCheckFix) : null,
      chlComm: field.chlComm,
      flOk:
        flOk?.value == '0' || flOk
          ? flOk
          : {
              value: '1',
              label: 'Не исправленно',
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
        console.log(currentField.chlComm);
        console.log(currentField.idDef2?.numQuestion, 'currentField.idDef2?.numQuestion');

        changeCurrentNumQuestion(currentField);
        setRulePunct(currentField.idDef2?.rulePunct);
        setShortTnpa(currentField.idDef2?.shortTnpa);
        setChlComm(currentField.chlComm);
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
    console.log(currentField.idList, 'kanfjklnakjdnfkasndkfjansdjkfansdjfas');

    setLoadingForm(true);
    const finalyValues: IEventOrderQueDef = {
      idList: currentField.idList,
      ...values,
      dateFix: values.dateFix ? moment(values.dateFix).format('YYYY.MM.DD') : null,
      dateCheckFix: values.dateCheckFix ? moment(values.dateCheckFix).format('YYYY.MM.DD') : null,
      dateInform: values.dateInform ? moment(values.dateInform).format('YYYY.MM.DD') : null,
      flOk: values.flOk?.value ? values.flOk?.value : values.flOk,
      chlFlYes: values.chlFlYes?.value ? values.chlFlYes?.value : values.chlFlYes,
      chlComm: chlComm,
    };
    if (currentField.idList) {
      updateEventOrderQueDef(currentField.idList, finalyValues).then(() => {
        updateFields().then(() => {
          changePuncts(currentNumQuestion[0]);
          changeCurrentNumQuestion(finalyValues);
          setChlComm(chlComm);
          setCurrentNumQuestion([currentField.idDef2?.numQuestion]);
        });
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
                <Row justify="space-between" align="middle">
                  <Col>
                    <Row align="middle">
                      <div style={{ fontSize: '17px' }}>Выбор пункта:</div>

                      <BaseButtonsForm.Item>
                        <Select
                          style={{ margin: '16px' }}
                          placeholder="1.1"
                          options={puncts}
                          value={currentNumQuestion}
                          onChange={(value) => changePuncts(value)}
                          key={`${currentNumQuestion}`}
                          defaultValue={currentNumQuestion}
                        />
                      </BaseButtonsForm.Item>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row align="middle" justify="center" style={{ gap: '20px' }}>
                      <BaseButtonsForm.Item>
                        <Button
                          style={{
                            color: 'black',
                            background: 'blanchedalmond',
                            border: '2px solid gold',
                            borderRadius: '8px',
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
                          }}
                          onClick={next}
                        >
                          <Text strong>Следующий</Text>
                        </Button>
                      </BaseButtonsForm.Item>
                    </Row>
                  </Col>
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
                    {shownComm ? <TextArea value={chlComm} onChange={(e) => setChlComm(e.target.value)} /> : null}
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
                  <Row
                    style={{
                      display: 'flex',
                      alignItems: 'stretch',
                      alignContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Text>Решение по требованию</Text>

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

                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name={'dateFix'}>
                        <DatePicker
                          getPopupContainer={(triger) => triger}
                          format={dateFormat}
                          style={{ marginTop: '5px' }}
                        />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name="dateInform">
                        <DatePicker
                          getPopupContainer={(triger) => triger}
                          format={dateFormat}
                          style={{ marginTop: '5px' }}
                        />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name="dateCheckFix">
                        <DatePicker
                          getPopupContainer={(triger) => triger}
                          format={dateFormat}
                          style={{ marginTop: '5px' }}
                        />
                      </BaseButtonsForm.Item>
                    </Col>

                    <Col style={{ textAlign: 'center' }} span={4}>
                      <BaseButtonsForm.Item name="flOk">
                        <Select
                          placeholder="Исправлено"
                          style={{ textAlign: 'center', marginTop: '5px' }}
                          options={[
                            {
                              value: '1',
                              label: 'Не исправленно',
                            },
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
                    <CheklistUpload />
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
                        <Text strong>Сохранить изменения</Text>
                      </Button>
                    </BaseButtonsForm.Item>
                  </Row>
                </Col>
              </Col>

              <Col span={22} offset={1} style={{ textAlign: 'left', marginBottom: '30px', fontSize: '15px' }}></Col>
            </Col>
          </Row>
        </Spinner>
      </BaseButtonsForm>
    </>
  );
};

export default FormTreb;
