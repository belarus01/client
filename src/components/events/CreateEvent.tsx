import React, { useEffect, useState } from 'react';
import { AddEventOrderForm } from './forms/AddEventForm';
import { IEventOrder, IEventsSphere } from '@app/domain/interfaces';
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
  const [params, setParams] = useState<{
    org: number;
    idEventOrder: number;
    numAppendix: number[];
  }>({
    org: 1,
    idEventOrder: 0,
    numAppendix: [],
  });

  const chooseCurrentQuestions = (event: IEventOrder) => {
    const params: {
      org: number;
      idEventOrder: number;
      numAppendix: number[];
    } = {
      // org: userSlice.org
      org: event.org,
      idEventOrder: event.idEventOrder as number,
      numAppendix: [],
    };
    // change magick mumber
    if (event.idEvent == 64 || event.idEvent == 65) {
      // change magick mumber
      if (event.eventOrderSpheras?.some((spher) => spher.idUnits_4 == 5 || spher.idUnits_4 == 4)) {
        params.numAppendix.push(1);
        params.numAppendix.push(31);
      } else {
        params.numAppendix.push(2);
        params.numAppendix.push(32);
      }
      setParams(params);
    }
  };

  const getNewEvent = (event: IEventOrder) => {
    console.log(event);
    chooseCurrentQuestions(event);
    // setNewEvent(event);
  };

  useEffect(() => {
    console.log(newEvent);
  }, [newEvent]);
  return (
    <>
      <Spinner spinning={loading}>
        {newEvent.idEventOrder ? (
          <AddQuastionsFormEvent params={params} submitEventCreate={submitForm} newEvent={newEvent} />
        ) : (
          <AddEventOrderForm submitForm={submitForm} getNewEvent={getNewEvent} {...props} />
        )}
      </Spinner>
    </>
  );
};

export default CreateEvent;
