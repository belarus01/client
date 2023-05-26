import React from 'react';
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
import { Input } from '../common/inputs/Input/Input.styles';
import { Item } from '../profile/profileCard/profileFormNav/nav/payments/paymentHistory/Payment/Payment.styles';
import { BaseButtonsForm } from '../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Modal } from '../common/Modal/Modal';
import { notificationController } from '@app/controllers/notificationController';
import { Col, Row } from 'antd';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { Button } from '../common/buttons/Button/Button';
//import { httpApi } from '@app/api/http.api';

export const Planning: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [addOpen, setAddOpen] = useState(false);

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
    setData((current) => [...current, { title: 'Мероприятие', start: info.start, endStr: info.end }]);
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
  return (
    <>
      <Button onClick={handleAddClick} type="default">
        Создать мероприятие
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
      <Modal open={addOpen}>
        <BaseButtonsForm isFieldsChanged={false}>
          <BaseButtonsForm.Item label="name task">
            <Input />
          </BaseButtonsForm.Item>
        </BaseButtonsForm>
      </Modal>
    </>
  );
};
