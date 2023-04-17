//import { useTranslation } from 'react-i18next';
import { Input } from '@app/components/common/inputs/Input/Input';
import * as S from '../eventCard.styles';
import React, { useEffect, useState, useCallback, ComponentProps } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row, Space, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from '@app/components/common/Table/Table';
import { DataType, getBasicDataType, vid1, vid2 } from '@app/api/eventCard.api';
import { useMounted } from '@app/hooks/useMounted';
import { Status } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentHistory/Status/Status';
import { Button } from '@app/components/common/buttons/Button/Button';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';



export const Step3: React.FC = () => {
  //const { t } = useTranslation();
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [tableData, setTableData] = useState<{ data: DataType[], loading: boolean }>({
    data: [],
    loading: false
  });
  const { isMounted } = useMounted();
  const fetch = useCallback(
    () => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getBasicDataType().then((res) => {
        if (isMounted.current) {
          setTableData({ data: res.data, loading: false });
        }
      });
    },
    [isMounted],
  );

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Перечень выявленных нарушений',
      dataIndex: 'perech_narush',
      key: 'perech_narush',
      width: '30%',
    },
    {
      title: 'Сведения о принятых мерах административного принуждения',
      children: [
        {
          title: 'Вид',
          dataIndex: 'vid_prin',
          key: 'vid_prin',
          render: (vid_prin: vid1[]) => (
            <Row gutter={[10, 10]}>
              {vid_prin.map((data) => {
                console.log(data);
                return (
                  <Col key={data.meri_admin_prin_vid}>
                    <Status text={data.meri_admin_prin_vid} color={'red'} />
                  </Col>
                );
              })}
            </Row>
          )
        },
        {
          title: 'Количество',
          dataIndex: 'vid_prin',
          key: 'vid_prin',
          render: (vid_prin: vid1[]) => (
            <Row gutter={[10, 10]}>
              {vid_prin.map((data) => {
                console.log(data);
                return (
                  <Col key={data.meri_admin_prin_vid}>
                    <Status text={data.meri_admin_prin_vid} color={'green'} />
                  </Col>
                );
              })}
            </Row>
          )
        },
      ],
    },
    {
      title: 'Сведения о принятых мерах административного пресечения',
      children: [
        {
          title: 'Вид',
          dataIndex: 'vid_pres',
          key: 'vid_pres',

          render: (vid_pres: vid2[]) => (
            <Row gutter={[10, 10]}>
              {vid_pres.map((data) => {
                console.log(data);
                return (
                  <Col key={data.meri_admin_pres_vid}>
                    <Status text={data.meri_admin_pres_vid} color={'blue'} />
                  </Col>
                );
              })}
            </Row>
          )
        },
        {
          title: 'Количество',
          dataIndex: 'vid_pres',
          key: 'vid_pres',
          render: (vid_pres: vid2[]) => (
            <Row gutter={[10, 10]}>
              {vid_pres.map((data) => {
                console.log(data);
                return (
                  <Col key={data.meri_admin_pres_col}>
                    <Status text={String(data.meri_admin_pres_col)} color={'pink'} />
                  </Col>
                );
              })}
            </Row>
          )
        },
      ],
    },
    {
      title: 'Сведения о подготовке предписания (рекомендаций) об устранении нарушений',
      dataIndex: 'podg_predpis',
      key: 'podg_predpis',
      width: 40,
    },
    {
      title: 'Дата предписания (рекомендаций) об устранении нарушений',
      dataIndex: 'date_predpis',
      key: 'date_predpis',
      width: 50,
    },
    {
      title: 'Дата вручения (направления) предписания (рекомендаций) об устранении нарушений',
      dataIndex: 'date_vruch_predpis',
      key: 'date_vruch_predpis',
      width: 50,
    },
    {
      title: 'Дата (даты) устранения нарушений',
      dataIndex: 'date_ustr_narush',
      key: 'date_ustr_narush',
      width: 50,
    },
    {
      title: 'Дата (даты) информирования об устранении нарушений',
      dataIndex: 'date_info_naush',
      key: 'date_info_naush',
      width: 50,
    },
    {
      title: 'Дата проведения мероприятия по контролю за устранением нарушений',
      dataIndex: 'date_meropri_po_control',
      key: 'date_meropri_po_control',
      width: 50,
    },
    {
      title: 'Результат проведения мероприятия по контролю за устранением нарушений',
      dataIndex: 'result_prov_meropri',
      key: 'dresult_prov_meropri',
      width: 50,
    },
    {
      title: 'Перечень не устраненных (частично устраненных) нарушений',
      dataIndex: 'perech_neustr_narush',
      key: 'perech_neustr_narush',
      width: 50,
    },
  ];


  return (



    <S.FormContent>
      <BaseButtonsForm.Item
        name="vid_meropr"
        label={'Вид надзорно-профилактического мероприятия '}
        hasFeedback
        rules={[{ required: true, message: 'Введите вид надзорно-профилактического мероприятия ' }]}
      >
        <Select placeholder={('Вид надзорно-профилактического мероприятия ')}>
          <Option value="Проверка">{('Проверка')}</Option>
          <Option value="Мониторинг">{('Мониторинг')}</Option>
          <Option value="Обследование">{('Обследование')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="vid_proverki"
        label={'Вид проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите вид проверки ' }]}
      >
        <Select placeholder={('Вид проверки ')}>
          <Option value="Выборочная">{('Выборочная')}</Option>
          <Option value="Внеплановая">{('Внеплановая')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sfera_contolya"
        label={'Сфера контроля (надзора)'}
        rules={[{ required: true, message: 'Введите сфера контроля (надзора)' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="osnovanie"
        label={'Основание назначения надзорно-профилактического мероприятия'}
        rules={[{ required: true, message: 'Введите основание назначения надзорно-профилактического мероприятия' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_lica"
        label={'Должность лица, выдавшего предписание на проведение проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите должность лица, выдавшего предписание на проведение проверки ' }]}
      >
        <Select placeholder={('Должность лица, выдавшего предписание на проведение проверки ')}>
          <Option value="Директор">{('Директор')}</Option>
          <Option value="Программист">{('Программист')}</Option>
          <Option value="Инженер">{('Инженер')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_proverki"
        label={'Ф.И.О лица, выдавшего предписание на проведение проверки (решение на проведение мониторинга)'}
        rules={[{ required: true, message: 'Введите Ф.И.О лица, выдавшего предписание на проведение проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="nomer"
        label={'Номер предписания на проведение проверки (решения на проведение мониторинга)'}
        rules={[{ required: true, message: 'Введите номер предписания на проведение проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vidaci"
        label={'Дата выдачи предписания на проведение проверки (решения на проведение мониторинга)'}
        rules={[{ required: true, message: 'Введите дату выдачи предписания на проведение проверки' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_ruc_proverki"
        label={'Должность руководителя проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите должность руководителя проверки ' }]}
      >
        <Select placeholder={('Должность руководителя проверки ')}>
          <Option value="Директор">{('Директор')}</Option>
          <Option value="Программист">{('Программист')}</Option>
          <Option value="Инженер">{('Инженер')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_ruc_proverki"
        label={'Ф.И.О руководителя проверки'}
        rules={[{ required: true, message: 'Введите Ф.И.О руководителя проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      {/* <Button type="primary" style={{ marginLeft: "auto" }} >Добавить проверяющего</Button> */}

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <BaseButtonsForm.Item
            name="dolg_prov"
            label={'Должность проверяющего '}
            hasFeedback
            //style={{ marginRight: "8px" }}
            rules={[{ required: true, message: 'Введите должность проверяющего ' }]}
          >
            <Input />
          </BaseButtonsForm.Item>
        </Col>

        <Col span={12}>
          <BaseButtonsForm.Item
            name="fio_prov"
            label={'Ф.И.О проверяющего'}
            hasFeedback
            //style={{ width: 600 }}
            rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
          >
            <Input />
          </BaseButtonsForm.Item>
        </Col>
      </Row>


      <BaseButtonsForm
        name="dobavit_prov"
        isFieldsChanged={isFieldsChanged}
        onFinish={onFinish}
        autoComplete="off"
      >

        <BaseButtonsForm.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row key={field.key} gutter={[10, 10]}>
                  <Col span={12}>
                    <BaseButtonsForm.Item
                      {...field}
                      name={[field.name, 'first']}
                      label={'Должность проверяющего '}
                      hasFeedback
                      rules={[{ required: true, message: 'Введите должность проверяющего ' }]}
                    >
                      <Input />
                    </BaseButtonsForm.Item>
                  </Col>

                  <Col span={12}>
                    <BaseButtonsForm.Item
                      {...field}
                      name={[field.name, 'last']}
                      label={'Ф.И.О проверяющего'}
                      hasFeedback
                      rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
                    >
                      <S.Wrapper>
                        <Input />
                        <S.RemoveBtn onClick={() => remove(field.name)} />
                      </S.Wrapper>
                    </BaseButtonsForm.Item>
                  </Col>
                </Row>
              ))}

              <BaseButtonsForm.Item>
                <Button type="primary" style={{ width: 300 }} onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить проверяющего
                </Button>
              </BaseButtonsForm.Item>
            </>
          )}
        </BaseButtonsForm.List>


      </BaseButtonsForm>



      <BaseButtonsForm.Item
        name="prov_period"
        label={'Проверяемый период'}
        rules={[{ required: true, message: 'Введите проверяемый период' }]}
      >
        <S.RangePicker />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_nachala_meropr"
        label={'Дата начала надзорно-профилактического мероприятия (по предписанию/решению))'}
        rules={[{ required: true, message: 'Введите дату начала надзорно-профилактического мероприятия' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_okonchaniya_meropr"
        label={'Дата окончания надзорно-профилактического мероприятия (по предписанию/решению))'}
        rules={[{ required: true, message: 'Введите дату окончания надзорно-профилактического мероприятия' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="per_voprosov"
        label={'Перечень вопросов проверки (мониторинга)'}
        rules={[{ required: true, message: 'Введите перечень вопросов проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_sredstvah"
        label={'Сведения о применении научно-технических средств (не применялись или указать какие средства применялись) '}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о применении научно-технических средств ' }]}
      >
        <Select placeholder={('Сведения о применении научно-технических средств ')}>
          <Option value="Не применялись">{('Не применялись')}</Option>
          <Option value="Средство 1">{('Средство 1')}</Option>
          <Option value="Средство 2">{('Средство 2')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fac_date_nacala"
        label={'Фактическая дата начала надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите фактическую дату начала надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fac_date_oconchaniya"
        label={'Фактическая дата окончания надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите фактическую дату окончания надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <Button type="primary" style={{ marginLeft: "auto", marginBottom: "1%" }} >Добавить нарушение</Button>

      <Table
        columns={columns}
        dataSource={tableData.data}
        bordered
        scroll={{ x: 800 }}
      />

      <BaseButtonsForm.Item
        name="date_stop"
        label={'Дата приостановления проведения надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите дату приостановления проведения надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vozobnovleniya"
        label={'Дата возобновления проведения надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите дату возобновления проведения надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_prodlenii"
        label={'Сведения о продлении срока проведения проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о продлении срока проведения проверки ' }]}
      >
        <Select placeholder={('Сведения о продлении срока проведения проверки ')}>
          <Option value="Да">{('Да')}</Option>
          <Option value="Нет">{('Нет')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_prodlenii"
        label={'Дата, до которой продлен срок проведения проверки '}
        rules={[{ required: true, message: 'Введите дату, до которой продлен срок проведения проверки ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_pred_subj"
        label={'Должность представителя субъекта '}
        hasFeedback
        rules={[{ required: true, message: 'Введите должность представителя субъекта ' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_pred_subj"
        label={'Ф.И.О представителя субъекта'}
        rules={[{ required: true, message: 'Введите Ф.И.О представителя субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="itog_doc"
        label={'Итоговый документ '}
        hasFeedback
        rules={[{ required: true, message: 'Введите итоговый документ ' }]}
      >
        <Select placeholder={('Итоговый документ ')}>
          <Option value="Акт">{('Акт')}</Option>
          <Option value="Справка">{('Справка')}</Option>
          <Option value="Аналитическая записка">{('Аналитическая записка')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_itog_doc"
        label={'Дата итогового документа '}
        rules={[{ required: true, message: 'Введите дату итогового документа ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vrucheniya_itog_doc"
        label={'Дата вручения (направления) итогового документа '}
        rules={[{ required: true, message: 'Введите дату вручения итогового документа ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_vozrag"
        label={'Сведения о наличии возражений по акту проверки'}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о наличии возражений по акту проверки  ' }]}
      >
        <Select placeholder={('Сведения о наличии возражений по акту проверки')}>
          <Option value="Да">{('Да')}</Option>
          <Option value="Нет">{('Нет')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_po_vozrag"
        label={'Дата принятия решения по возражениям по акту проверки '}
        rules={[{ required: true, message: 'Введите дату принятия решения по возражениям по акту проверки ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="reshenie_po_vozrag"
        label={'Принятое решение по возражениям по акту проверки'}
        rules={[{ required: true, message: 'Введите принятое решение по возражениям по акту проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_vneplan_proverki"
        label={'Сведения о принятии решения о назначении внеплановой проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о принятии решения о назначении внеплановой проверки' }]}
      >
        <Select placeholder={('Сведения о наличии возражений по акту проверки')}>
          <Option value="Да">{('Да')}</Option>
          <Option value="Нет">{('Нет')}</Option>
        </Select>
      </BaseButtonsForm.Item>
    </S.FormContent>
  );

};
