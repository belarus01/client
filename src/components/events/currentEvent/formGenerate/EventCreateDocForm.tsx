import { generateDoc1 } from '@app/api/doc.api';
import { createFormReport, getFormReportMaxIdList } from '@app/api/form.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { IDoc, IEventOrder } from '@app/domain/interfaces';
import { DatePicker } from 'antd';
import { doc } from 'prettier';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

interface EventCreateDocFormProps {
  toggleModal: (isOpen: boolean) => void;
  currentDoc: IDoc;
  event: IEventOrder;
}

const EventCreateDocForm: React.FC<EventCreateDocFormProps> = ({ toggleModal, currentDoc, event }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formDis, setFormDis] = useState(true);
  const [shownModalUved, setShownModalUved] = useState(false);
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null);

  // switch docs form
  // const switchDoc = (doc: IDoc) => {
  //   switch (doc.idTypeDoc) {
  //     case 1000:
  //       setCurrentForm('Form1');
  //       break;

  //     default:
  //       setCurrentForm('Form2');
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   console.log(currentDoc);
  //   switchDoc(currentDoc);
  // }, [currentDoc]);

  useEffect(() => {
    console.log(currentDoc);
    if (currentDoc) {
      const CurrentFormComponent = lazy(() => import(`./EventFormCreateDoc${currentDoc.idForm}`));
      setComponent(CurrentFormComponent);
    }
  }, [currentDoc]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {Component ? <Component event={event} toggleModal={toggleModal} /> : null}
    </Suspense>
  );
};

export default EventCreateDocForm;
