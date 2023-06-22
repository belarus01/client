import { generatePerechObosobPodraz } from '@app/api/doc.api';
import { initGenerateDocGetIdList } from '@app/api/form.api';
import { getSubjById } from '@app/api/subjects.api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventFormCreateDoc } from './EventFormCreateDoc1000';

const EventFormCreateDoc1006: React.FC<EventFormCreateDoc> = ({ event, toggleModal }) => {
  const [, setLoading] = useState<boolean>(false);
  const [unp, setUnp] = useState('');

  const { idEventOrder } = useParams();

  const getUnp = (idSubj: string) => {
    return getSubjById(idSubj).then((subj) => setUnp(subj.unp as string));
  };

  const onFinishCreateDocUved = () => {
    const field = {
      idForm: 1006,
      idEventOrder: idEventOrder,
      org: 1,
    };
    if (idEventOrder) {
      initGenerateDocGetIdList(field, idEventOrder, 1006).then((idList) => {
        generatePerechObosobPodraz({
          id_list: idList,
          id_event_order: idEventOrder,
          unp,
        }).then(() => {
          setLoading(false);
          toggleModal(false);
        });
      });
    }
  };

  useEffect(() => {
    if (event) {
      console.log(event);
      getUnp(event.idSubj?.toString() || '');
    }
  }, [event]);

  useEffect(() => {
    toggleModal(false);
    getUnp(event.idSubj?.toString() || '').then(() => {
      onFinishCreateDocUved();
    });
  }, []);

  return <></>;
};

export default EventFormCreateDoc1006;
