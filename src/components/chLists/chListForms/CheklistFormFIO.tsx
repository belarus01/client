import { Button, Col, DatePicker, Row, Select, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '../../common/inputs/Input/Input';
import { Spinner } from '../../common/Spinner/Spinner.styles';
import { IFormReport } from '@app/domain/interfaces';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import UsersSelectWithPostAndTel from '@app/components/users/UsersSelectWithPostAndTel';
import { useParams } from 'react-router-dom';
import { createFormReport, getFormReportById, getFormReportMaxIdList, updateFormReport } from '@app/api/form.api';
import { getEventOrderByIdWithRelations } from '@app/api/events.api';
import moment from 'moment';
import { notificationController } from '@app/controllers/notificationController';

const { Text } = Typography;

const ChecklistFormFIO: React.FC = () => {
  const [dataForm, setDataForm] = useState<IFormReport>({});
  const [loading, setLoading] = useState(false);
  const [typeEvent, setTypeEvent] = useState<{
    value: unknown;
    label: string;
  }>({
    label: '',
    value: null,
  });
  const [loadingType, setLoadingType] = useState(false);

  const { idEventOrder, idForm } = useParams();

  const getData = useCallback(() => {
    setLoading(true);
    if (idEventOrder && idForm) {
      getFormReportMaxIdList(idForm, idEventOrder).then(({ idList }) => {
        if (!idList) {
          setLoading(false);
          return;
        }
        getFormReportById(idList).then((data) => {
          console.log(data, 'data');

          setDataForm(data);
          setLoading(false);
        });
      });
    }
  }, [idEventOrder, idForm]);

  const updateForm = (forms: IFormReport) => {
    setLoading(true);
    if (idEventOrder && idForm) {
      getFormReportMaxIdList(idForm, idEventOrder).then(({ idList }) => {
        if (!idList) {
          return;
        }
        updateFormReport(idList, forms).then(() => {
          setLoading(false);
          notificationController.success({ message: 'Данные обновлены' });
        });
      });
    }
  };

  const getTypeEvent = useCallback(() => {
    setLoadingType(true);
    if (idEventOrder) {
      getEventOrderByIdWithRelations(idEventOrder).then((data) => {
        console.log(data);

        if (data[0].idUnit_3) {
          switch (data[0].idUnit_3) {
            case '81':
              setTypeEvent({
                value: '81',
                label: 'выборочной проверки',
              });
              break;
            case '82':
              setTypeEvent({
                value: '82',
                label: 'внеплановой проверки',
              });
              break;
            case '83':
              setTypeEvent({
                value: '83',
                label: 'для использования при планировании проверок',
              });
              break;
          }
        }
        setLoadingType(false);
      });
    }
  }, [idEventOrder]);

  const onFinish = (values: IFormReport) => {
    if (dataForm.idList) {
      values = { ...dataForm, ...values };
    }
    console.log(values);
    if (values.dateRec) {
      values.dateRec = moment(values.dateRec || today).format('YYYY.MM.DD');
    }
    if (values.dateFrom) {
      values.dateFrom = moment(values.dateFrom || today).format('YYYY.MM.DD');
    }
    if (values.dateTo) {
      values.dateTo = moment(values.dateTo || today).format('YYYY.MM.DD');
    }

    if (dataForm) {
      console.log('update', values);
      updateForm(values);
    }

    createFormReport({ ...values, idForm: idForm as unknown as number, idEventOrder: idEventOrder, org: 1 }).then(
      () => {
        setLoading(false);
        notificationController.success({ message: 'Данные обновлены' });
      },
    );
  };

  useEffect(() => {
    getData();
    getTypeEvent();
  }, []);

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  const dateFormat = 'DD-MM-YYYY';

  return (
    <>
      <BaseButtonsForm isFieldsChanged={false} onFinish={onFinish}>
        <Spinner spinning={loading && loadingType}>
          <Row>
            <Col span={9} offset={6}>
              <Text strong style={{ fontSize: '17px', textAlign: 'center' }}>
                КОНТРОЛЬНЫЙ СПИСОК ВОПРОСОВ (ЧЕК-ЛИСТ) №
              </Text>
            </Col>
            <Col span={4} offset={1}>
              <BaseButtonsForm.Item name="numDoc">
                <Input
                  defaultValue={dataForm.numDoc}
                  style={{ marginTop: '-15px', width: '100%' }}
                  key={`${dataForm.numDoc}`}
                />
              </BaseButtonsForm.Item>
            </Col>
          </Row>
          <br />

          <Text style={{ fontSize: '17px' }}>
            в сфере государственного пожарного надзора, надзора за соблюдением законодательства при осуществлении
            деятельности по обеспечению пожарной безопасности:
            <Row>
              <Text>Дата начала заполнения</Text>
              <Col>
                <BaseButtonsForm.Item name="dateFrom">
                  <DatePicker
                    defaultValue={moment(dataForm.dateFrom || today)}
                    getPopupContainer={() => document.querySelector('.ant-card-body') as HTMLElement}
                    format={dateFormat}
                    key={`${dataForm.dateFrom}`}
                    style={{ marginLeft: '12px', marginTop: '-10px' }}
                  />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
            <Row>
              <Text>Дата завершения зaполнения</Text>

              <Col>
                <BaseButtonsForm.Item name="dateTo">
                  <DatePicker
                    defaultValue={moment(dataForm.dateTo) || today}
                    getPopupContainer={() => document.querySelector('.ant-card-body') as HTMLElement}
                    format={dateFormat}
                    key={`${dataForm.dateTo}`}
                    style={{ marginLeft: '15px', marginTop: '-10px' }}
                  />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
            <Row>
              <Text>Дата направления</Text>

              <Col>
                <BaseButtonsForm.Item name="dateRec">
                  <DatePicker
                    defaultValue={moment(dataForm.dateRec || today)}
                    getPopupContainer={() => document.querySelector('.ant-card-body') as HTMLElement}
                    format={dateFormat}
                    key={`${dataForm.dateRec}`}
                    style={{ marginLeft: '15px', marginTop: '-10px' }}
                  />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
          </Text>
          <Row>
            <Text>Контрольный список вопросов (чек-лист) заполняется в ходе</Text>
            <Col span={8} offset={1}>
              <BaseButtonsForm.Item>
                <Select value={typeEvent} disabled />
              </BaseButtonsForm.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <Text>Должностное лицо, выполняющее проверку (направившее контрольный список вопросов):</Text>
          </Row>

          <Row style={{ marginTop: '15px' }}>
            <Col span={10}>
              <UsersSelectWithPostAndTel uidBoss={dataForm.uidBoss} />
            </Col>
          </Row>

          <Row justify={'center'}>
            <BaseButtonsForm.Item>
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                style={{
                  color: 'black',
                  background: 'blanchedalmond',
                  border: '2px solid gold',
                  borderRadius: '8px',
                  marginTop: '15px',
                  marginBottom: '10px',
                }}
              >
                <Text strong>Сохранить изменения</Text>
              </Button>
            </BaseButtonsForm.Item>
          </Row>
        </Spinner>
      </BaseButtonsForm>
    </>
  );
};

export default ChecklistFormFIO;
