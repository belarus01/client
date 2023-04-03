import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import { EventCard } from "@app/components/eventCard/eventCard";
import { Col, Row } from "antd";
import { Card } from '@app/components/common/Card/Card';

const EventsCardPage: React.FC = () => {
    
    return (
      <>
        <PageTitle>{'Карточка мероприятия'}</PageTitle>
     
          <Card id="validation form" title={'Карточка мероприятия'} padding="1.25rem">
            <EventCard />
          </Card>
        

       
  
      </>
    );
  };
  
  export default EventsCardPage;
  