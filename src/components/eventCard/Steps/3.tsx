import { Input } from '@app/components/common/inputs/Input/Input';
import * as S from '../eventCard.styles';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { useTranslation } from 'react-i18next';
import { Modal as Alert, Col, DatePicker, List, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from '@app/components/common/Table/Table';
import { DataType, getFirst } from '@app/api/eventCard.api';
import { useMounted } from '@app/hooks/useMounted';
import { Button } from '@app/components/common/buttons/Button/Button';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import TheTable from '@app/components/tables/TheTable';
import EventForm from '../eventForm';

export interface ITb3 {
  name_def: string;
  date_fix?: Date | string | number | null;
  date_inform?: Date | string | number | null;
  date_check_fix?: Date | string | number | null;
  fl_ok: string;
  transfer_data: string;
  idTb3: number | null;
}

//const { RangePicker } = DatePicker;

export const Step3: React.FC<any> = ({ data }) => {
  //const { t } = useTranslation();
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [tableData, setTableData] = useState<{ data: ITb3[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const { isMounted } = useMounted();
  const fetch = useCallback(() => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    getFirst().then((res) => {
      console.log(res);
      console.log(res.result8);
      const dataTable = [];
      dataTable.push(...res.result8);
      //dataTable.push(...res.result10);
      //dataTable.push(...res.result11);
      //dataTable.push(...res.result12);
      if (isMounted.current) {
        setTableData({ data: dataTable, loading: false });
      }
    });
  }, [isMounted]);

  const items_period = useMemo(() => {
    if (data) {
      const range = data['result1'][0].period_check.split(' - ').map((item: string) => item.split(' ')[0]);
      console.log(range);
      return range;
    }
    console.log(items_period.period_check[0]);
    return [];
  }, [data]);

  const items_voprosi = useMemo(() => {
    return data.result5;
  }, [data]);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  // useEffect(() => {
  //   console.log(tableData.data);

  // }, [tableData.data])

  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<ITb3>({
    name_def: '',
    date_fix: '',
    date_inform: '',
    date_check_fix: '',
    fl_ok: '',
    transfer_data: '',
    idTb3: null,
  });

  const toggleModalAdding = (isOpen = true) => {
    setOpenAddingForm(isOpen);
  };

  const toggleModalEdding = (isOpen = true) => {
    setOpenEddingForm(isOpen);
  };

  const deleteCategory = (category: ITb3) => {
    const newData = tableData.data.filter((item) => item.name_def !== category.name_def);
    setTableData({ ...tableData, data: newData });
  };

  const toggleModal = () => {
    setOpenAddingForm(false);
    setOpenEddingForm(false);
    fetch();
  };

  const table = useMemo<ITb3[]>(() => {
    return tableData.data;
  }, [tableData]);

  const columns: ColumnsType<ITb3> = [
    {
      title: 'Перечень выявленных нарушений',
      dataIndex: 'name_def',
      key: 1,
      //width: '30%',
    },
    {
      title: 'Дата (даты) устранения нарушений',
      dataIndex: 'date_fix',
      key: 2,
      //width: 50,
    },
    {
      title: 'Дата (даты) информирования об устранении нарушений',
      dataIndex: 'date_inform',
      key: 3,
      //width: 50,
    },
    {
      title: 'Дата проведения мероприятия по контролю за устранением нарушений',
      dataIndex: 'date_check_fix',
      key: 4,
      //width: 50,
    },
    {
      title: 'Результат проведения мероприятия по контролю за устранением нарушений',
      dataIndex: 'fl_ok',
      key: 5,
      //width: 50,
    },
    {
      title: 'Примечания',
      dataIndex: 'transfer_data',
      key: 6,
      //width: 50,
    },
    {
      key: 7,
      title: 'Действия',
      align: 'center',
      render: (itemSelected: ITb3) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteCategory(itemSelected);
            },
          });
        }

        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelected(itemSelected);
                toggleModalEdding(true);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteDep();
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  console.log(data);

  return (
    <S.FormContent>
      <Col span={6}>
        <BaseButtonsForm.Item
          name="vid_meropr"
          label={'Вид надзорно-профилактического мероприятия '}
          hasFeedback
          rules={[{ required: true, message: 'Введите вид надзорно-профилактического мероприятия ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={6}>
        <BaseButtonsForm.Item
          name="vid_proverki"
          label={'Вид проверки '}
          hasFeedback
          rules={[{ required: true, message: 'Введите вид проверки ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <BaseButtonsForm.Item
        name="sfera_contolya"
        label={'Сфера контроля (надзора)'}
        rules={[{ required: true, message: 'Введите сфера контроля (надзора)' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="osnovanie"
          label={'Основание назначения надзорно-профилактического мероприятия'}
          rules={[{ required: true, message: 'Введите основание назначения надзорно-профилактического мероприятия' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="dolg_lica"
          label={'Должность лица, выдавшего предписание на проведение проверки '}
          hasFeedback
          rules={[{ required: true, message: 'Введите должность лица, выдавшего предписание на проведение проверки ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={12}>
        <BaseButtonsForm.Item
          name="fio_proverki"
          label={'Ф.И.О лица, выдавшего предписание на проведение проверки (решение на проведение мониторинга)'}
          rules={[{ required: true, message: 'Введите Ф.И.О лица, выдавшего предписание на проведение проверки' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={12}>
        <BaseButtonsForm.Item
          name="nomer"
          label={'Номер предписания на проведение проверки (решения на проведение мониторинга)'}
          rules={[{ required: true, message: 'Введите номер предписания на проведение проверки' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <BaseButtonsForm.Item
        name="date_vidaci"
        label={'Дата выдачи предписания на проведение проверки (решения на проведение мониторинга)'}
      //rules={[{ required: true, message: 'Введите дату выдачи предписания на проведение проверки' }]}
      >
        {data && (
          <DatePicker defaultValue={moment(data['result1'][0].date_order, 'DD-MM-YYYY')} format={'DD-MM-YYYY'} />
        )}
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_ruc_proverki"
        label={'Должность руководителя проверки '}
        hasFeedback
      //rules={[{ required: true, message: 'Введите должность руководителя проверки ' }]}
      >
        <Select
          placeholder={'Должность руководителя проверки '}
          onChange={(value) => {
            console.log(value);
          }}
          options={data?.result4.map((item: { job: string }) => ({
            value: item.job,
            label: item.job,
          }))}
        >
          {/* <Option value="Директор">{('Директор')}</Option>
          <Option value="Программист">{('Программист')}</Option>
          <Option value="Инженер">{('Инженер')}</Option> */}
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_ruc_proverki"
        label={'Ф.И.О руководителя проверки'}
      //rules={[{ required: true, message: 'Введите Ф.И.О руководителя проверки' }]}
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
          //rules={[{ required: true, message: 'Введите должность проверяющего ' }]}
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
          //rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
          >
            <Input />
          </BaseButtonsForm.Item>
        </Col>
      </Row>

      <BaseButtonsForm name="dobavit_prov" isFieldsChanged={isFieldsChanged} onFinish={onFinish} autoComplete="off">
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
                    //rules={[{ required: true, message: 'Введите должность проверяющего ' }]}
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
                    //rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
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
      //rules={[{ required: true, message: 'Введите проверяемый период' }]}
      >
        {data && <DatePicker defaultValue={moment(items_period[0])} format={'DD-MM-YYYY'} />}
        {data && <DatePicker defaultValue={moment(items_period[1])} format={'DD-MM-YYYY'} />}
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_nachala_meropr"
        label={'Дата начала надзорно-профилактического мероприятия (по предписанию/решению)'}
      //rules={[{ required: true, message: 'Введите дату начала надзорно-профилактического мероприятия' }]}
      >
        {data && (
          <DatePicker defaultValue={moment(data['result1'][0].date_begin, 'DD-MM-YYYY')} format={'DD-MM-YYYY'} />
        )}
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_okonchaniya_meropr"
        label={'Дата окончания надзорно-профилактического мероприятия (по предписанию/решению)'}
      // rules={[{ required: true, message: 'Введите дату окончания надзорно-профилактического мероприятия' }]}
      >
        {data && <DatePicker defaultValue={moment(data['result1'][0].date_end, 'DD-MM-YYYY')} format={'DD-MM-YYYY'} />}
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="per_voprosov"
        label={'Перечень вопросов проверки (мониторинга)'}
      //rules={[{ required: true, message: 'Введите перечень вопросов проверки' }]}
      >
        {data ? <List
          bordered
          dataSource={items_voprosi}
          renderItem={(item: { name_que: string }) => (
            <List.Item>
              {item.name_que}
            </List.Item>
          )}
        /> : <p></p>
        }
      </BaseButtonsForm.Item>

      {/* <Button type="primary" style={{ marginRight: "auto", marginBottom: "1%" }} >Добавить вопрос</Button> */}

      <BaseButtonsForm.Item
        name="sved_o_sredstvah"
        label={
          'Сведения о применении научно-технических средств (не применялись или указать какие средства применялись) '
        }
        hasFeedback
      //rules={[{ required: true, message: 'Введите сведения о применении научно-технических средств ' }]}
      >
        <Col span={12}>
          <Select placeholder={'Сведения о применении научно-технических средств '}>
            <Option value="Не применялись">{'Не применялись'}</Option>
            <Option value="Средство 1">{'Средство 1'}</Option>
            <Option value="Средство 2">{'Средство 2'}</Option>
          </Select>
        </Col>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fac_date_nacala"
        label={'Фактическая дата начала надзорно-профилактического мероприятия '}
      //rules={[{ required: true, message: 'Введите фактическую дату начала надзорно-профилактического мероприятия ' }]}
      >
        <DatePicker />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fac_date_oconchaniya"
        label={'Фактическая дата окончания надзорно-профилактического мероприятия '}
      //rules={[{ required: true, message: 'Введите фактическую дату окончания надзорно-профилактического мероприятия ' }]}
      >
        <DatePicker />
      </BaseButtonsForm.Item>

      <TheTable
        FormComponent={(props) => <EventForm data={props.data} close={toggleModal} />}
        selected={selected}
        dataTable={{ data: table, loading: tableData.loading }}
        columns={columns}
        titleMoadlEditing={'Редактирование'}
        titleModalAdding={'Создание'}
        toggleModalAdding={toggleModalAdding}
        toggleModalEditing={toggleModalEdding}
        openAddingForm={openAddingForm}
        openEditingForm={openEddingForm}
        typeButton="primary"
        titleButtonAdd="Добавить новое нарушение"
      //dataSource={tableData.data}
      //bordered
      //scroll={{ x: 800 }}
      />

      {/* <Button type="primary" style={{ marginRight: 'auto', marginBottom: '1%' }}>
        Добавить нарушение
      </Button> */}

      <Col span={10}>
        <BaseButtonsForm.Item
          name="adm_force"
          label={'Сведения о принятых мерах административного принуждения (вид, количество) '}
          rules={[
            {
              required: true,
              message: 'Введите сведения о принятых мерах административного принуждения (вид, количество) ',
            },
          ]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={18}>
        <BaseButtonsForm.Item
          name="adm_ban"
          label={'Сведения о принятых мерах административного пресечения (вид, количество) '}
          rules={[
            {
              required: true,
              message: 'Введите сведения о принятых мерах административного пресечения (вид, количество) ',
            },
          ]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="sved_ob_ustr_narush"
          label={'Сведения о подготовке предписания (рекомендаций) об устранении нарушений (да/нет) '}
        //rules={[{ required: true, message: 'Введите сведения о подготовке предписания (рекомендаций) об устранении нарушений ' }]}
        >
          <Input disabled />
        </BaseButtonsForm.Item>
      </Col>

      <BaseButtonsForm.Item
        name="date_predpis"
        label={'Дата предписания (рекомендаций) об устранении нарушений '}
      //rules={[{ required: true, message: 'Введите дату предписания (рекомендаций) об устранении нарушений ' }]}
      >
        <DatePicker disabled />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vruch"
        label={'Дата вручения (направления) предписания (рекомендаций) об устранении нарушений '}
      // rules={[{ required: true, message: 'Введите дату вручения (направления) предписания (рекомендаций) об устранении нарушений ' }]}
      >
        <DatePicker disabled />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_stop"
        label={'Дата приостановления проведения надзорно-профилактического мероприятия '}
      //rules={[{ required: true, message: 'Введите дату приостановления проведения надзорно-профилактического мероприятия ' }]}
      >
        {data && <DatePicker defaultValue={moment(data['result1'][0].date_stop, 'DD-MM-YYYY')} format={'DD-MM-YYYY'} />}
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vozobnovleniya"
        label={'Дата возобновления проведения надзорно-профилактического мероприятия '}
      // rules={[{ required: true, message: 'Введите дату возобновления проведения надзорно-профилактического мероприятия ' }]}
      >
        {data && (
          <DatePicker defaultValue={moment(data['result1'][0].date_continue, 'DD-MM-YYYY')} format={'DD-MM-YYYY'} />
        )}
      </BaseButtonsForm.Item>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="sved_o_prodlenii"
          label={'Сведения о продлении срока проведения проверки '}
          hasFeedback
          rules={[{ required: true, message: 'Введите сведения о продлении срока проведения проверки ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <BaseButtonsForm.Item
        name="date_prodlenii"
        label={'Дата, до которой продлен срок проведения проверки '}
      //rules={[{ required: true, message: 'Введите дату, до которой продлен срок проведения проверки ' }]}
      >
        {data && <DatePicker defaultValue={moment(data['result1'][0].date_to, 'DD-MM-YYYY')} format={'DD-MM-YYYY'} />}
      </BaseButtonsForm.Item>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="dolg_pred_subj"
          label={'Должность представителя субъекта '}
          hasFeedback
          rules={[{ required: true, message: 'Введите должность представителя субъекта ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="fio_pred_subj"
          label={'Ф.И.О представителя субъекта'}
          rules={[{ required: true, message: 'Введите Ф.И.О представителя субъекта' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="itog_doc"
          label={'Итоговый документ '}
          hasFeedback
          rules={[{ required: true, message: 'Введите итоговый документ ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <BaseButtonsForm.Item
        name="date_itog_doc"
        label={'Дата итогового документа '}
      //rules={[{ required: true, message: 'Введите дату итогового документа ' }]}
      >
        {data && (
          <DatePicker
            defaultValue={moment(data['result6'][0].date_doc.split(','), 'DD-MM-YYYY')}
            format={'DD-MM-YYYY'}
          />
        )}
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vrucheniya_itog_doc"
        label={'Дата вручения (направления) итогового документа '}
      //rules={[{ required: true, message: 'Введите дату вручения итогового документа ' }]}
      >
        {data && (
          <DatePicker
            defaultValue={moment(data['result6'][0].date_rec.split(','), 'DD-MM-YYYY')}
            format={'DD-MM-YYYY'}
          />
        )}
      </BaseButtonsForm.Item>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="sved_o_vozrag"
          label={'Сведения о наличии возражений по акту проверки'}
          hasFeedback
          rules={[{ required: true, message: 'Введите сведения о наличии возражений по акту проверки  ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>

      <BaseButtonsForm.Item
        name="date_po_vozrag"
        label={'Дата принятия решения по возражениям по акту проверки '}
      // rules={[{ required: true, message: 'Введите дату принятия решения по возражениям по акту проверки ' }]}
      >
        <DatePicker disabled />
      </BaseButtonsForm.Item>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="reshenie_po_vozrag"
          label={'Принятое решение по возражениям по акту проверки'}
        //rules={[{ required: true, message: 'Введите принятое решение по возражениям по акту проверки' }]}
        >
          <Input disabled />
        </BaseButtonsForm.Item>
      </Col>

      <Col span={10}>
        <BaseButtonsForm.Item
          name="sved_o_vneplan_proverki"
          label={'Сведения о принятии решения о назначении внеплановой проверки '}
          hasFeedback
          rules={[{ required: true, message: 'Введите сведения о принятии решения о назначении внеплановой проверки' }]}
        >
          <Input />
        </BaseButtonsForm.Item>
      </Col>
    </S.FormContent>
  );
};

// {
//   title: 'Сведения о принятых мерах административного принуждения (вид, количество)',
    //   dataIndex: 'adm_force',
    //   key: 'adm_force',
    //   width: '30%',
    //   // children: [
    //   //   {
    //   //     title: 'Вид',
    //   //     dataIndex: 'vid_prin',
    //   //     key: 'vid_prin',
    //   //     render: (vid_prin: vid1[]) => (
    //   //       <Row gutter={[10, 10]}>
    //   //         {vid_prin.map((data) => {
    //   //           console.log(data);
    //   //           return (
    //   //             <Col key={data.meri_admin_prin_vid}>
    //   //               <Status text={data.meri_admin_prin_vid} color={'red'} />
    //   //             </Col>
    //   //           );
    //   //         })}
    //   //       </Row>
    //   //     )
    //   //   },
    //   //   {
    //   //     title: 'Количество',
    //   //     dataIndex: 'vid_prin',
    //   //     key: 'vid_prin',
    //   //     render: (vid_prin: vid1[]) => (
    //   //       <Row gutter={[10, 10]}>
    //   //         {vid_prin.map((data) => {
    //   //           console.log(data);
    //   //           return (
    //   //             <Col key={data.meri_admin_prin_vid}>
    //   //               <Status text={data.meri_admin_prin_vid} color={'green'} />
    //   //             </Col>
    //   //           );
    //   //         })}
    //   //       </Row>
    //   //     )
    //   //   },
    //   // ],
    // },
    // {
    //   title: 'Сведения о принятых мерах административного пресечения (вид, количество)',
    //   dataIndex: 'adm_ban',
    //   key: 'adm_ban',
    //   width: '30%',
    //   // children: [
    //   //   {
    //   //     title: 'Вид',
    //   //     dataIndex: 'vid_pres',
    //   //     key: 'vid_pres',

    //   //     render: (vid_pres: vid2[]) => (
    //   //       <Row gutter={[10, 10]}>
    //   //         {vid_pres.map((data) => {
    //   //           console.log(data);
    //   //           return (
    //   //             <Col key={data.meri_admin_pres_vid}>
    //   //               <Status text={data.meri_admin_pres_vid} color={'blue'} />
    //   //             </Col>
    //   //           );
    //   //         })}
    //   //       </Row>
    //   //     )
    //   //   },
    //   //   {
    //   //     title: 'Количество',
    //   //     dataIndex: 'vid_pres',
    //   //     key: 'vid_pres',
    //   //     render: (vid_pres: vid2[]) => (
    //   //       <Row gutter={[10, 10]}>
    //   //         {vid_pres.map((data) => {
    //   //           console.log(data);
    //   //           return (
    //   //             <Col key={data.meri_admin_pres_col}>
    //   //               <Status text={String(data.meri_admin_pres_col)} color={'pink'} />
    //   //             </Col>
    //   //           );
    //   //         })}
    //   //       </Row>
    //   //     )
    //   //   },
    //   // ],
    // },
    // {
    //   title: 'Сведения о подготовке предписания (рекомендаций) об устранении нарушений',
    //   dataIndex: 'podg_predpis',
    //   key: 'podg_predpis',
    //   width: 40,
    // },
    // {
    //   title: 'Дата предписания (рекомендаций) об устранении нарушений',
    //   dataIndex: 'date_predpis',
    //   key: 'date_predpis',
    //   width: 50,
    // },
    // {
    //   title: 'Дата вручения (направления) предписания (рекомендаций) об устранении нарушений',
    //   dataIndex: 'date_vruch_predpis',
    //   key: 'date_vruch_predpis',
    //   width: 50,
    // },