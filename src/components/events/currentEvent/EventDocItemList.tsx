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
  openDocCreate: (doc: IDoc) => void;
  setCurrentDocForForm: (doc: IDoc) => void;
}

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 3fr repeat(5, 1fr);
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

const EventDocItemList: React.FC<EventDocItemListProps> = ({ doc, openDocCreate, setCurrentDocForForm }) => {
  const openFormWithDoc = (doc: IDoc) => {
    setCurrentDocForForm(doc);
    openDocCreate(doc);
  };

  return (
    <ListItem>
      <div>{doc.nameDoc || ''}</div>
      <div>{doc.dateFrom || ''}</div>
      <div>{doc.dateTo || ''} </div>
      <div>{doc.record || ''} </div>
      <ListItemName onClick={() => openFormWithDoc(doc)}>
        <FileAddOutlined />
      </ListItemName>
      <ListItemName>
        <FileDoneOutlined />
      </ListItemName>
    </ListItem>
  );
};

export default EventDocItemList;
