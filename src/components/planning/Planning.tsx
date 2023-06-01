import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import { Card } from '../common/Card/Card';
import { useTranslation } from 'react-i18next';
import { Alert } from '../common/Alert/Alert';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { httpApi } from '@app/api/http.api';
import { User, IUnits, SSubj } from '../../domain/interfaces';
import { getAllObjectsBySubjectId } from '../../api/objects.api';
import { Input } from '../common/inputs/Input/Input.styles';
import { Item } from '../profile/profileCard/profileFormNav/nav/payments/paymentHistory/Payment/Payment.styles';
import { BaseButtonsForm } from '../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Modal } from '../common/Modal/Modal';
import { notificationController } from '@app/controllers/notificationController';
import { Col, DatePicker, Row, Select, notification } from 'antd';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { Button } from '../common/buttons/Button/Button';
import CreateEvent from '../events/CreateEvent';
import { getAllUsers } from '@app/api/users.api';
import { getAllUnits } from '@app/api/units.api';
import { getAllSubjects } from '@app/api/subjects.api';
import { Option } from '../profile/profileCard/profileFormNav/nav/notifications/interfaces';
import dayjs from 'dayjs';
//import { httpApi } from '@app/api/http.api';

export const Planning: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [shownEventModal, setShownEventModal] = useState(false);
  const [shownTaskModal, setShownTaskModal] = useState(false);
  const closeble = useRef(false);

  const onDateClick = (info: any) => {
    const date = info.start;
    //setData([...data, {title:'', start:info., end:}])
    alert('clicked ' + date);
    handleAddClick();
  };

  const handleAddClick = () => {
    setAddOpen(true);
  };

  const onSelect = (info: any) => {
    alert('selected ' + info.startStr + ' to ' + info.endStr);
    setData((current) => [
      ...current,
      { title: `Мероприятие №${info.idEventOrder}`, start: info.start, endStr: info.end },
    ]);
  };

  const toggleAddingModalTask = (isOpen = true) => {
    setShownTaskModal(isOpen);
  };

  // EVENT
  const toggleEventModal = (isOpen = true) => {
    if (!isOpen) {
      if (closeble.current) {
        setShownEventModal(isOpen);
      } else {
        notification.error({ message: 'Вы не закончили создание мероприятия ' });
        return;
      }
    }
    setShownEventModal(isOpen);
  };

  // TASK
  const [executors, setExecutor] = useState<User[]>([]);
  const [typesEvent, setTypesEvent] = useState<IUnits[]>([]);
  const [subjs, setSubjs] = useState<SSubj[]>([]);
  const [objects, setObjects] = useState([]);
  const [currentObject, setCurrentObject] = useState({
    label: '',
    value: null,
  });
  const [shownObject, setShownObject] = useState(true);
  const [base, setBase] = useState([]);

  const getExecutors = () => {
    getAllUsers().then((users) => {
      setExecutor(users);
    });
  };

  const getAllInfoForFormTask = () => {
    const users = getAllUsers();
    const typeEvent = getAllUnits();
    const subj = getAllSubjects();
    Promise.all([users, typeEvent, subj]).then((results) => {
      const resultsOptions = results.map((result, index) => {
        if (index == 1) {
          const currentTypes: IUnits[] = (result as IUnits[]).filter(
            (unit) => unit.idUnit == 91 || unit.idUnit == 92 || unit.idUnit == 94,
          );
          console.log(currentTypes);
          return currentTypes.map((type) => ({
            label: type.name,
            value: type.idUnit,
          }));
        }
        return result.map((data) => {
          switch (index) {
            case 0: // if (x === 'value1')
              return {
                label: (data as User)?.fio,
                value: (data as User).uid,
              };
            case 2:
              return {
                label: (data as SSubj).unp,
                value: (data as SSubj).idSubj,
              };
          }
        });
      });
      console.log(resultsOptions);
      setExecutor((prevValue) => [...prevValue, ...(resultsOptions[0] as unknown as User[])]);
      setTypesEvent((prevValue) => [...prevValue, ...(resultsOptions[1] as unknown as IUnits[])]);
      setSubjs((prevValue) => [...prevValue, ...(resultsOptions[2] as unknown as SSubj[])]);
    });
    // const obj = getAllObjectsBySubjectId();
  };

  const changeSubj = (value: string | number) => {
    getAllObjectsBySubjectId(value).then((objs) => {
      setCurrentObject({
        label: '',
        value: null,
      });

      setShownObject(false);
      const objectsOptions = objs.map((obj) => {
        return {
          label: obj.nameObj,
          value: obj.idObj,
        };
      });
      setObjects(objectsOptions);
    });
  };

  const createTask = (values) => {
    console.log(values);
    const currentEnd = values.end._d;
    const start = values.start._d;
    setData([...data, { ...values, start: start, end: currentEnd }]);
  };

  const submitForm = () => {
    toggleEventModal(false);
  };

  const canIClose = (isCloseble = false) => {
    closeble.current = isCloseble;
  };

  useEffect(() => {
    const res = httpApi
      .get<any>('events/get/all/userId=1')
      .then((e: any) => {
        setData(e.data);
        console.log(e.data);
      })
      .catch((e) => {
        notificationController.error({ message: 'Ошибка' });
      });
  }, []);

  useEffect(() => {
    getAllInfoForFormTask();
    // .then((units: IUnits[]) => {
    //   setAllUnits(units);
    //   return units;
    // })
    // .then((units) => {
    //   const currentTypes: IUnits[] = units.filter(
    //     (unit) => unit.idUnit == 91 || unit.idUnit == 92 || unit.idUnit == 94,
    //   );
    //   const types: TOptions[] = currentTypes.map((type) => ({
    //     label: type.name,
    //     value: type.idUnit,
    //   }));
    //   setTypes(types);
    // });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <Button onClick={() => toggleEventModal()} type="default">
        Создать мероприятие
      </Button>
      <Button onClick={() => toggleAddingModalTask()} type="default">
        Создать задачу
      </Button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ruLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        dateClick={onDateClick}
        select={onSelect}
        selectable={true}
        eventDrop={function (info) {
          data.map((element) => {
            console.log(element.title);
          });
          alert(data.find((element) => element.title == info.event.title));
          if (!confirm(info.event.title)) {
            info.revert();
          }
        }}
        // eventResize={function(info){
        //     if(Modal.confirm)
        // }}
        events={data}
      />
      <Modal open={shownEventModal} footer={false} onCancel={() => toggleEventModal(false)}>
        {/* <BaseButtonsForm isFieldsChanged={false}>
          <BaseButtonsForm.Item label="name task">
            <Input />
          </BaseButtonsForm.Item>
        </BaseButtonsForm> */}
        <CreateEvent submitForm={submitForm} canIClose={canIClose} />
      </Modal>
      <Modal title="Создание" open={shownTaskModal} footer={false} onCancel={() => toggleAddingModalTask(false)}>
        <div style={{ margin: '20px 0' }}>
          Для создания задачи заполните все поля формы, назначьте исполнителя. Не забудьте установить срок исполнения,
          иначе задача может быть не выполнена вовремя
        </div>
        <BaseButtonsForm isFieldsChanged={false} onFinish={createTask}>
          <BaseButtonsForm.Item label="Название задачи" name={'title'}>
            <Input />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Назначить исполнителя" name={'executor'}>
            <Select options={executors} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Тип проверочного мероприятия" name={'typeEvent'}>
            <Select options={typesEvent} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Субъект" name={'subject'}>
            <Select options={subjs} onChange={changeSubj} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Объект" name={'object'}>
            <Select
              value={currentObject}
              disabled={shownObject}
              options={objects}
              onSelect={(value, option) => {
                setCurrentObject(option);
              }}
            />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Основание">
            <Select />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Срок исполнения" name={'start'}>
            <DatePicker showTime />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Срок исполнения" name={'end'}>
            <DatePicker showTime />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </BaseButtonsForm.Item>
        </BaseButtonsForm>
      </Modal>
    </>
  );
};
