import { createDoc, getAllMchsForms, getFormReportMaxIdList } from '@app/api/form.api';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IEventOrder } from '@app/domain/interfaces';
import React, { useEffect, useState } from 'react';
import { Spinner } from '../../components/common/Spinner/Spinner.styles';
import { Button } from '../../components/common/buttons/Button/Button.styles';
import { Select } from '@app/components/common/selects/Select/Select.styles';

import { createQuestions } from '@app/api/events.api';
import { Col } from '../../components/profile/profileCard/profileFormNav/nav/notifications/CheckboxColumn/CheckboxColumn.styles';
import { DatePicker, Input, Row } from 'antd';
import { Modal } from '../../components/common/Modal/Modal.styles';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { generateDoc1 } from '@app/api/doc.api';
import { Option } from '@app/components/common/selects/Select/Select';

interface EventQuationProps {
  event?: IEventOrder;
  idEventOrder?: number;
}
export const EventQuation: React.FC<EventQuationProps> = ({ event, idEventOrder }) => {
  const [forms, setForms] = useState<any>([]);
  const [idFormCurrent, setIdFormCurrent] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shownCreateDoc, setShownCreateDoc] = useState(false);
  const [formDis, setFormDis] = useState(true);
  const [shownModalUved, setShownModalUved] = useState(false);

  const getForms = () => {
    setLoading(true);
    getAllMchsForms().then((formsMchs) => {
      console.log(formsMchs);
      setForms(formsMchs);
      setLoading(false);
    });
  };

  const createQuests = (ideventOrder: number, idFrom: number) => {
    setLoading(true);
    createQuestions(ideventOrder, idFrom).then(() => {
      setLoading(false);
      setShownCreateDoc(true);
    });
  };

  const onFinish = (values: any) => {
    console.log(values);
    console.log(event);
    setIdFormCurrent(values.idForm);

    console.log(event[0].idEventOrder, values.idForm);
    //createQuests(event[0].idEventOrder, values.idForm);
    setLoading(false);
    setShownCreateDoc(true);
    setFormDis(false);
  };

  const onFinishCreateDocUved = (values) => {
    console.log(values);

    const field = {
      ...values,
      idForm: 1000,
      idEventOrder: event[0].idEventOrder,
      org: 1,
    };

    createDoc(field).then(() => {
      getFormReportMaxIdList().then((idList) => {
        generateDoc1({ id_list: idList, id_event_order: event[0].idEventOrder, unp: '100008077' });
      });
    });
  };

  const options = [
    {
      label: 'руки',
      value: 0,
    },
    {
      label: 'почтой',
      value: 1,
    },
  ];

  const flbooks = [
    {
      label: 'не предсвталена',
      value: 0,
    },
    {
      label: 'предсвталена',
      value: 1,
    },
  ];

  useEffect(() => {
    getForms();
  }, []);
  return (
    <>
      <Spinner spinning={loading}>
        {formDis ? (
          <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
            <BaseButtonsForm.Item name="idForm" label={'Тема'} rules={[{ required: true }]}>
              <Select>
                {forms.map((form) => {
                  return (
                    <Option key={form.idForm as number}>
                      <span>{form.nameDoc}</span>
                    </Option>
                  );
                })}
              </Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item>
              <Button htmlType="submit" type="primary">
                сохранить
              </Button>
            </BaseButtonsForm.Item>
          </BaseButtonsForm>
        ) : null}

        {shownCreateDoc ? (
          <>
            <Button onClick={() => setShownModalUved(true)}>Уведомление</Button>
            <Button>Предписание</Button>
            <Button>Акт проверки</Button>
            <Button>Акт об отказе в допуске</Button>
            <Button>Справка проверки</Button>
            <Button>предписание об устранении нарушений</Button>
            <Button>Пожарнотехничексая карта</Button>
            <Button>Уведомление о проведении мониторинга</Button>
            <Button>Протокол об ОП</Button>
            <Button>Чек-лист 1</Button>
            <Button>Чек-лист 2</Button>
          </>
        ) : null}
        <Modal open={shownModalUved} closable footer={null} onCancel={() => setShownModalUved(false)}>
          <BaseButtonsForm layout="horizontal" onFinish={onFinishCreateDocUved} isFieldsChanged={false}>
            <BaseButtonsForm.Item name="numDoc" label={'Номер документа'} rules={[{ required: true }]}>
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="dateDoc" label={'Дата документа'} rules={[{ required: true }]}>
              <DatePicker />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="addrRecord" label={'Место составления документа'} rules={[{ required: true }]}>
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="comm" label={'Замечания'}>
              <TextArea />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="otherInfo" label={'Комментарий инспектора'}>
              <TextArea />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="receiver" label={'Вручено'} rules={[{ required: true }]}>
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="flRec" label={'Передача'} rules={[{ required: true }]}>
              <Select options={options} />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="flBook" label={'Представлена книга учета'} rules={[{ required: true }]}>
              <Select options={flbooks} />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="numBook"
              label={'Номер записи в книге учета проверок у субъекта'}
              rules={[{ required: true }]}
            >
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="dateBook"
              label={'Дата записи в книге учета проверок у субъекта'}
              rules={[{ required: true }]}
            >
              <DatePicker />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="dateRec" label={'Дата вручения'} rules={[{ required: true }]}>
              <DatePicker />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item>
              <Button htmlType="submit" type="primary">
                сохранить
              </Button>
            </BaseButtonsForm.Item>
          </BaseButtonsForm>
        </Modal>
      </Spinner>
    </>
  );
};
