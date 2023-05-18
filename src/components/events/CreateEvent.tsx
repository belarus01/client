import React, { useEffect, useState } from 'react';
import { AddEventOrderForm } from './forms/AddEventForm';
import { IEventOrder } from '@app/domain/interfaces';
import { Spinner } from '../common/Spinner/Spinner.styles';
import AddQuastionsFormEvent from './forms/AddQuastionsFormEvent';

interface CreateEventProps {
  submitForm: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ submitForm, ...props }) => {
  const [newEvent, setNewEvent] = useState<IEventOrder>({
    idEvent: null,
    idEventOrder: null,
    idUnit_3: null,
    idUnit_4: null,
    idSubj: null,
    dateBegin: '',
    dateEnd: '',
    nameAgent: '',
    postAgent: '',
    uidBoss: '',
    fioPostTitle: '',
    org: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const getNewEvent = (event: IEventOrder) => {
    setNewEvent(event);
  };

  useEffect(() => {
    console.log(newEvent);
  }, [newEvent]);
  return (
    <>
      <Spinner spinning={loading}>
        {
          /* {newEvent.idEventOrder ? ( */ true ? (
            <AddQuastionsFormEvent submitEventCreate={submitForm} newEvent={newEvent} />
          ) : (
            <AddEventOrderForm submitForm={submitForm} getNewEvent={getNewEvent} {...props} />
          )
        }
      </Spinner>
    </>
  );
};

export default CreateEvent;
