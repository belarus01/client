import { createDoc, getAllFormDocsByOrg, getFormReportMaxIdList } from '@app/api/form.api';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IDoc, IEventOrder } from '@app/domain/interfaces';
import React, { useEffect, useState } from 'react';
import { Spinner } from '../../common/Spinner/Spinner.styles';
import { Button } from '../../common/buttons/Button/Button.styles';
import { Select } from '@app/components/common/selects/Select/Select.styles';

import { createQuestions } from '@app/api/events.api';
import { Col } from '../../profile/profileCard/profileFormNav/nav/notifications/CheckboxColumn/CheckboxColumn.styles';
import { DatePicker, Input, Row, List } from 'antd';
import { Modal } from '../../common/Modal/Modal.styles';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { generateDoc1 } from '@app/api/doc.api';
import EventDocItemList, { ListItem } from './EventDocItemList';
import styled from 'styled-components';
import EventCreateDocForm from './formGenerate/EventCreateDocForm';
import { useNavigate } from 'react-router-dom';

interface EventQuationProps {
  event?: IEventOrder | null;
}

const ListDoc = styled(ListItem)`
  height: 80px;
`;

export const EventDocs: React.FC<EventQuationProps> = ({ event }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shownCreateDoc, setShownCreateDoc] = useState(false);
  const [formDis, setFormDis] = useState(true);
  const [shownModalUved, setShownModalUved] = useState(false);
  const [docs, setDocs] = useState<IDoc[]>([]);
  const [shownModal, setShownModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<IDoc>({
    idForm: null,
    idTypeDoc: null,
    nameDoc: '',
    org: 1,
  });

  const toggleModal = (isOpne = false) => {
    setShownModal(isOpne);
  };

  const navigate = useNavigate();

  const openDocCreate = (doc: IDoc) => {
    console.log('EventDocItemList', doc.idTypeDoc);
    if (doc.idTypeDoc == 300) {
      navigate(`${doc.idForm}`);
    }
    toggleModal(true);
  };

  const getDocs = () => {
    setLoading(true);
    //ЗАПРОС НА ДОКУЕНТАЦИЮ c org user
    getAllFormDocsByOrg(1).then((docsFetch) => {
      console.log(docsFetch);

      setDocs(docsFetch);
      setLoading(false);
    });
  };

  const setCurrentDocForForm = (doc: IDoc) => {
    setCurrentDoc(doc);
  };
  // const onFinishCreateDocUved = (values) => {
  //   console.log(values);

  //   const field = {
  //     ...values,
  //     idForm: 1000,
  //     idEventOrder: event[0].idEventOrder,
  //     org: 1,
  //   };

  //   createDoc(field).then(() => {
  //     getFormReportMaxIdList().then((idList) => {
  //       generateDoc1({ id_list: idList, id_event_order: event[0].idEventOrder, unp: '100008077' });
  //     });
  //   });
  // };

  // const options = [
  //   {
  //     label: 'руки',
  //     value: 0,
  //   },
  //   {
  //     label: 'почтой',
  //     value: 1,
  //   },
  // ];

  // const flbooks = [
  //   {
  //     label: 'не предсвталена',
  //     value: 0,
  //   },
  //   {
  //     label: 'предсвталена',
  //     value: 1,
  //   },
  // ];

  useEffect(() => {
    getDocs();
  }, []);
  return (
    <>
      <Spinner spinning={loading}>
        <ListDoc>
          <div>Название документа</div>
          <div>Дата начала действия документа об оценке соответствия</div>
          <div>Дата окончания действия документа об оценке соответствия </div>
          <div>Дата изменения записи </div>
          <div>Создать документ</div>
          <div>Просмотреть документ</div>
        </ListDoc>
        {docs.map((doc) => {
          return (
            <EventDocItemList
              openDocCreate={openDocCreate}
              key={doc.idForm}
              setCurrentDocForForm={setCurrentDocForForm}
              doc={doc}
            />
          );
        })}

        {/* <>
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
        </Modal>*/}
        {shownModal && (
          <Modal open={shownModal} onCancel={() => toggleModal()} title="Создание документа" footer={false}>
            <EventCreateDocForm toggleModal={toggleModal} currentDoc={currentDoc} />
          </Modal>
        )}
      </Spinner>
    </>
  );
};
