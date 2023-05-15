import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { EventsTable } from '@app/components/events/EvetsTableNew';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { EventQuation } from './EventQuation';
import { Spinner } from '../../components/common/Spinner/Spinner.styles';
import { getEventOrderByIdWithRelations } from '@app/api/events.api';

const CurrentEventPage: React.FC = () => {
  const [currentEventOreder, setCurrentEventOreder] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { idEventOrder } = useParams();

  const getEvent = (idEvent) => {
    setLoading(true);
    getEventOrderByIdWithRelations(idEvent).then((event) => {
      setLoading(false);
      setCurrentEventOreder(event);
    });
  };

  // const getCurrentEventOrder = () => {
  //   console.log(location.state);

  //   const indexEvent = location.state.findIndex((event) => event.idEventOrder == idEventOrder);
  //   console.log(indexEvent);

  //   setCurrentEventOreder(location.state[indexEvent]);
  // };

  // const getCurrentEvent = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         idEvent: '5',
  //         idUnit_4: '91',
  //         idGroup: 1,
  //         org: 1,
  //         dateBegin: '2023-05-14',
  //         dateEnd: '2023-05-14',
  //         status: '2',
  //         technical: 'qwerqwerq',
  //         postTitle: 'admin',
  //         fioPostTitle: 'Ivanov',
  //         postAgent: 'Director',
  //         nameAgent: 'Vovkin',
  //         idDept: 702,
  //         idDeptIss: 701,
  //         idSubj: 1460,
  //         idUnit_3: '81',
  //         eventOrderSheras: [
  //           {
  //             org: 1,
  //             idUnit_0: '4',
  //           },
  //           {
  //             org: 1,
  //             idUnit_0: '5',
  //           },
  //           {
  //             org: 1,
  //             idUnit_0: '6',
  //           },
  //         ],
  //       });
  //     }, 500);
  //   });
  // };
  useEffect(() => {
    getEvent(idEventOrder);
    console.log(idEventOrder);
    console.log(currentEventOreder);
  }, []);
  return (
    <>
      <Card title="Мероприятиe">
        <PageTitle>{'Мероприятиe'}</PageTitle>
        <Spinner spinning={loading}>
          <EventQuation event={currentEventOreder} />
        </Spinner>
      </Card>
    </>
  );
};

export default CurrentEventPage;
