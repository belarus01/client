import { IDoc } from '@app/domain/interfaces';
import { Row, Col, List } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { FileAddOutlined, FileDoneOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Modal } from '../../common/Modal/Modal.styles';
import { useNavigate } from 'react-router-dom';
import EventCreateDocForm from './formGenerate/EventCreateDocForm';

interface EventDocItemListProps {
  doc: IDoc;
}

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 3fr repeat(5, 1fr);
  margin-bottom: 20px;
  position: relative;
  align-items: center;
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

const EventDocItemList: React.FC<EventDocItemListProps> = ({ doc }) => {
  const [shownModal, setShownModal] = useState(false);
  const toggleModal = (isOpne = false) => {
    setShownModal(isOpne);
  };

  const navigate = useNavigate();

  const openDocCreate = () => {
    console.log('EventDocItemList', doc.idTypeDoc);
    if (doc.idTypeDoc == 300) {
      navigate(`${doc.idForm}`);
    }
    toggleModal(true);
  };
  return (
    <ListItem>
      <div>{doc.nameDoc || ''}</div>
      <div>{doc.dateFrom || ''}</div>
      <div>{doc.dateTo || ''} </div>
      <div>{doc.record || ''} </div>
      <ListItemName onClick={openDocCreate}>
        <FileAddOutlined />
      </ListItemName>
      <ListItemName>
        <FileDoneOutlined />
      </ListItemName>
      <Modal open={shownModal} onCancel={() => toggleModal()}>
        <EventCreateDocForm toggleModal={toggleModal} />
      </Modal>
    </ListItem>
  );
};

export default EventDocItemList;
