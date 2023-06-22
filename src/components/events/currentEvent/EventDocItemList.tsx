import { IDoc } from '@app/domain/interfaces';
import { Row, Col, List } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { FileAddOutlined, FileDoneOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Modal } from '../../common/Modal/Modal.styles';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllFormReportDatesByFormIdNEventOrderId } from '@app/api/form.api';
import moment from 'moment';

interface EventDocItemListProps {
  doc: IDoc;
  openDocCreate: (doc: IDoc) => void;
  setCurrentDocForForm: (doc: IDoc) => void;
  isUpdated: boolean;
  setUpdateComplete: () => void;
}

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 3fr repeat(3, 1fr);
  margin-bottom: 20px;
  position: relative;
  align-items: center;
  line-height: 14px;
  min-width: 550px;
  height: 60px;
  justify-items: center;
  ::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -10%;
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: #0063be;
    margin-top: 20px;
  }
`;
const ListItemName = styled.div`
  font-size: 30px;
  transition: all 0.3s ease-in;
  cursor: pointer;
  :hover {
    font-size: 35px;
    color: #0063be;
  }
`;

const EventDocItemList: React.FC<EventDocItemListProps> = ({
  doc,
  openDocCreate,
  setCurrentDocForForm,
  isUpdated,
  setUpdateComplete,
}) => {
  const openFormWithDoc = (doc: IDoc) => {
    setCurrentDocForForm(doc);
    openDocCreate(doc);
  };
  const [dates, setDates] = useState<{ dateBegin?: Date | string; dateEnd?: Date | string }>({});
  const [loading, setLoading] = useState(false);
  const { idEventOrder } = useParams();

  const getDates = () => {
    if (doc.idForm && idEventOrder) {
      return getAllFormReportDatesByFormIdNEventOrderId(doc.idForm, idEventOrder).then((dates) => {
        const currentTime = {
          dateBegin: dates.dateBegin == '' ? '' : moment(dates.dateBegin).format('YYYY-MM-DD'),
          dateEnd: dates.dateBegin == '' ? '' : moment(dates.dateEnd).format('YYYY-MM-DD'),
        };
        setDates(currentTime);
      });
    }
  };

  useEffect(() => {
    getDates();
  }, []);
  useEffect(() => {
    if (isUpdated) {
      getDates();
      setUpdateComplete();
    }
  }, [isUpdated]);
  return (
    <ListItem>
      <div>{doc.nameDoc || ''}</div>
      <div>{doc.dateFrom || dates.dateBegin || ''}</div>
      {/* <div>{doc.dateTo || ''} </div> */}
      <div>{doc.record || dates.dateEnd || ''} </div>
      <ListItemName onClick={() => openFormWithDoc(doc)}>
        <FileAddOutlined />
      </ListItemName>
      {/* <ListItemName>
        <FileDoneOutlined />
      </ListItemName> */}
    </ListItem>
  );
};

export default EventDocItemList;
