import { Button, Cascader, Col, DatePicker, Row, Select, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '../../common/inputs/Input/Input';
import { Spinner } from '../../common/Spinner/Spinner.styles';
import { getAllRucsAndDolzhnLicas } from '@app/api/group.api';
import { IFormReport, UserGroup } from '@app/domain/interfaces';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import UsersSelectWithPostAndTel from '@app/components/users/UsersSelectWithPostAndTel';
import { useParams } from 'react-router-dom';
import { createFormReport, getFormReportById, getFormReportMaxIdList } from '@app/api/form.api';
import { getEventOrderByIdWithRelations } from '@app/api/events.api';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';

const { Text } = Typography;

const ChecklistFormFIO: React.FC = () => {
  const [dataForm, setDataForm] = useState<IFormReport>({});
  const [loading, setLoading] = useState(false);
  const [typeEvent, setTypeEvent] = useState<{
    value: any;
    label: string;
  }>({
    label: '',
    value: null,
  });
  const [loadingType, setLoadingType] = useState(false);

  const { idEventOrder, idSubj, idForm } = useParams();

  const getData = useCallback(() => {
    setLoading(true);
    if (idEventOrder && idForm) {
      getFormReportMaxIdList(idForm, idEventOrder).then(({ idList }) => {
        getFormReportById(idList).then((data) => {
          console.log(data, 'data');

          setDataForm(data);
          setLoading(false);
        });
      });
    }
  }, [idEventOrder, idForm]);

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
    console.log(values);
    if (values.dateRec) {
      values.dateRec = (values.dateRec as unknown as Dayjs).format('YYYY-MM-DD');
    }
    if (values.dateFrom) {
      values.dateFrom = (values.dateFrom as unknown as Dayjs).format('YYYY-MM-DD');
    }
    if (values.dateTo) {
      values.dateTo = (values.dateTo as unknown as Dayjs).format('YYYY-MM-DD');
    }

    if (dataForm) {
      console.log('update');
      //updateFormReport();
    }

    //createFormReport({ ...values, idForm: idForm as unknown as number, idEventOrder: idEventOrder });
  };

  useEffect(() => {
    getData();
    getTypeEvent();
  }, []);

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  const dateFormat = 'DD-MM-YYYY';

  const { numDoc, dateFrom, dateTo, dateRec } = dataForm;

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
                <Input defaultValue={numDoc} style={{ marginTop: '-15px', width: '100%' }} key={numDoc} />
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
                    defaultValue={moment(dataForm.dateFrom || today, dateFormat)}
                    format={dateFormat}
                    style={{ marginLeft: '12px', marginTop: '-10px' }}
                  />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
            <Row>
              <Text>Дата завершения зaполнения</Text>

              <Col>
                <BaseButtonsForm.Item name="dateTo">
                  <DatePicker value={dateTo} style={{ marginLeft: '15px', marginTop: '-10px' }} key={`${dateTo}`} />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
            <Row>
              <Text>Дата направления</Text>

              <Col>
                <BaseButtonsForm.Item name="dateRec">
                  <DatePicker value={dateRec} style={{ marginLeft: '15px', marginTop: '-10px' }} key={`${dateRec}`} />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
          </Text>
          <Row>
            <Text>Контрольный список вопросов (чек-лист) заполняется в ходе</Text>
            <Col span={8} offset={1}>
              <BaseButtonsForm.Item>
                <Select value={typeEvent} disabled style={{ marginTop: '-10px' }} />
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

            {/* <Text>Фамилия, инициалы:</Text>
            <Col>
              <BaseButtonsForm.Item name="uidBoss">
                <Select
                  placeholder="выбор из списка"
                  style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                  options={usersOptions}
                  onChange={changeUser}
                />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <Row>
            <Text>Должность:</Text>
            <Col>
              <BaseButtonsForm.Item>
                <Input
                  value={selectedUser?.uidGr2?.idDeptJob2?.job || ''}
                  style={{ width: '200%', marginLeft: '15px', marginTop: '-10px' }}
                />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <Row>
            <Text>Контактный телефон:</Text>
            <Col>
              <BaseButtonsForm.Item>
                <Input
                  value={selectedUser?.uidGr2?.tel || ''}
                  style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                />
              </BaseButtonsForm.Item>
            </Col> */}
          </Row>

          <Row justify={'center'}>
            <BaseButtonsForm.Item>
              <Button
                htmlType="submit"
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
            </BaseButtonsForm.Item>
          </Row>
        </Spinner>
      </BaseButtonsForm>
    </>
  );
};

export default ChecklistFormFIO;
