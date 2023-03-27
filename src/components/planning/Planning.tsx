import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
import { Card } from '../common/Card/Card';
import { useTranslation } from 'react-i18next';
import { Alert } from '../common/Alert/Alert';

export const Planning: React.FC = () => {
    const { t } = useTranslation();

    const onDateClick = (info:any) =>{
        const date = info.start;
        alert('clicked ' + date);
    }

    const onSelect = (info:any) =>{
        alert('selected ' + info.startStr + ' to ' + info.endStr);
    }
    return (
             
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                locale={ruLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                dateClick={onDateClick}
                select={onSelect}
                selectable={true}
                
            />
       

    )
}