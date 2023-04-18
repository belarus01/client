import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { getCardByIdSopb } from '@app/api/sopb.api';
import { useParams } from 'react-router-dom';
import { SopbCardForm } from '../forms/SopbCardForm';

export interface ISopbCard {
  active?: 1 | 0;
  brend?: string;
  comm?: string;
  dataRequest?: string;
  dateDoc?: string | 1 | 0;
  dateFrom?: string;
  dateRecord?: string;
  dateStatus?: string;
  dateTo?: string;
  fioStaff?: string;
  idCard: number | null;
  idDeptRequest: number | null;
  idSopb: number | null | undefined;
  mnfData?: string;
  model?: string | null;
  name: string;
  numDoc?: string;
  numRequest?: null;
  solution?: string | null | 1 | 0;
  statusDoc: string | null | 1 | 0;
  submit: number | null;
  uid: number | string | null;
}

export const SopbCardTable: React.FC = () => {
  const [cards, setCards] = useState<{ data: ISopbCard[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedSopb, setSelectedSopb] = useState<ISopbCard>({
    idCard: null,
    idDeptRequest: null,
    idSopb: null,
    statusDoc: '',
    submit: null,
    uid: null,
    name: '',
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const { idSopb } = useParams();

  const getCards = () => {
    console.log(idSopb);
    setCards({ ...cards, loading: true });
    getCardByIdSopb(idSopb).then((data: ISopbCard[]) => {
      setCards({ data: data, loading: false });
    });
  };

  useEffect(() => {
    getCards();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    setModalAddding(isOpen);
  };

  const toggleModalEditing = (isOpen = true) => {
    setModalEditing(isOpen);
  };

  //no be

  const filtredTable = useMemo(
    () => cards.data.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())),
    [search, cards],
  );

  const deleteItem = (sopbSelected: ISopbCard) => {
    //deleteDepartment(id)
    const newSopb = cards.data.filter((cards) => cards.idCard !== sopbSelected.idCard);
    setCards({ ...cards, data: newSopb });
  };

  const searchItems = (value: string) => {
    setSearch(value);
  };

  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const columns = [
    {
      key: '1',
      title: 'Наименование продукции, указанное в документе об оценке соответствия',
      dataIndex: 'name',
    },
    {
      key: '2',
      title: 'Марка СОПБиП',
      dataIndex: 'brend',
    },
    {
      key: '3',
      title: 'Модель СОПБиП',
      dataIndex: 'model',
    },
    {
      key: '4',
      title: 'Статус документа об оценке соответствия (5.1)',
      dataIndex: 'statusDoc',
    },

    {
      key: '5',
      title: 'Номер документа об оценке соответствия (сертификат соответствия)',
      dataIndex: 'numDoc',
    },

    {
      key: '7',
      title: 'Информ.об изготовителе, указанная в документе об оценке соответствия (4)',
      dataIndex: 'mnfData',
    },
    {
      key: '8',
      title: 'Сведения о предоставлении запрошенных документов 1-предоставлены,0-нет (7)',
      dataIndex: 'submit',
      render: (text: string) => <>{text == '1' ? 'предоставлены' : 'не предоставлены'}</>,
    },
    {
      key: '9',
      title:
        'Результаты рассмотрения документа об оценке соответствия, а также документов, послуживших основанием для его выдачи (регистрации (8))',
      dataIndex: 'solution',
    },
    {
      key: '10',
      title: 'Исх.номер документа (6.3)',
      dataIndex: 'numRequest',
    },
    {
      key: '11',
      title: 'ФИО, должность, мето работы работника, рассмотревшего документы (9)',
      dataIndex: 'fioStaff',
    },
    {
      key: '12',
      title: 'Дата окончания действия документа об оценке соответствия',
      dataIndex: 'dateTo',
    },
    {
      key: '13',
      title: 'Дата сверки статуса (5.2)',
      dataIndex: 'dateStatus',
    },
    {
      key: '14',
      title: 'Дата изменения записи',
      dataIndex: 'dateRecord',
    },
    {
      key: '15',
      title: 'Дата начала действия документа об оценке соответствия',
      dataIndex: 'dateFrom',
    },
    {
      key: '16',
      title: 'Дата документа об оценке соответствия',
      dataIndex: 'dateDoc',
    },
    {
      key: '17',
      title: 'Исх.номер документа (6.3)',
      dataIndex: 'dataRequest',
    },
    {
      key: '18',
      title: 'Ид.пользователя, внесшего изменения',
      dataIndex: 'uid',
    },
    {
      key: '19',
      title: 'Статус',
      dataIndex: 'active',
      width: '15%',
      render: (value: string) => <div>{value == '0' ? 'удалено' : 'активно'}</div>,
    },
    {
      key: '20',
      title: 'Примечание',
      dataIndex: 'comm',
    },
    {
      key: '21',
      title: 'Действия',
      render: (sopbSelected: ISopbCard) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteItem(sopbSelected);
            },
          });
        }

        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelectedSopb(sopbSelected);
                toggleModalEditing(true);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteDep();
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <TheTable
        // onRow={onRow}
        search={search}
        FormComponent={(props) => <SopbCardForm data={props.data} />}
        searchFunc={searchItems}
        selected={selectedSopb}
        setSearchFunc={searchFunc}
        dataTable={{ data: filtredTable, loading: cards.loading }}
        columns={columns}
        titleMoadlEditing={'Редактирование'}
        titleModalAdding={'Создание'}
        toggleModalAdding={toggleModalAdding}
        toggleModalEditing={toggleModalEditing}
        openAddingForm={modalAdding}
        openEditingForm={modalEditing}
      />
    </>
  );
};

export default SopbCardTable;
