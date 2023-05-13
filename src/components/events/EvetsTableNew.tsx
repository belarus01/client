import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert, Button, Space } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { deletePogSubjAutoById, getPogAuto } from '@app/api/pog.api';
import { useNavigate } from 'react-router-dom';
import { SDept, SEvents, SEventsOrder, SSubjObj } from '@app/domain/interfaces';
import { getAllEventsOrders } from '@app/api/events.api';
import { AddEventOrderForm } from './forms/AddEventForm';

interface IEventsTable {
  data?: SEventsOrder[];
}

export const EventsTable: React.FC<IEventsTable> = () => {
  const [events, setEvents] = useState<{ data: SEventsOrder[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedAuto, setSelectedAuto] = useState<SEventsOrder>({
    idEvent: null,
    idEventOrder: null,
    org: null,
    idSubj: null,
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getEvents = () => {
    setEvents({ ...events, loading: true });
    getAllEventsOrders().then((result) => {
      console.log(result);
      setEvents({ data: result, loading: false });
    });
  };

  const toggleModalAdding = (isOpen = true) => {
    setModalAddding(isOpen);
  };

  const toggleModalEditing = (isOpen = true) => {
    setModalEditing(isOpen);
  };

  //no be

  // const filtredTable = useMemo(
  //   () => events.data.filter((item) => item == parseFloat(search)),
  //   [search, autos],
  // );

  const deleteItem = (deletedItem: SEventsOrder) => {
    //deleteDepartment(id)
    // const newAuto = autos.data.filter((autos) => autos.numGosnadz !== deletedItem.numGosnadz);
    // setAutos({ ...autos, data: newAuto });
  };

  const searchCategories = (value: string) => {
    console.log(value);
    setSearch(value);
  };

  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleModal = () => {
    setModalAddding(false);
    setModalEditing(false);
    getEvents();
  };

  const columns = [
    {
      key: '1',
      title: 'Мероприятие',
      dataIndex: 'idEvent2',
      render: (idEvent2: SEvents) => {
        return <p>{idEvent2.event}</p>;
      },
    },
    {
      key: '2',
      title: 'Орган, выдавший предписание',
      dataIndex: 'idDeptIss',
    },
    {
      key: '3',
      title: 'Орган, проводящий проверку',
      dataIndex: 'idDept2',
      render: (idDept2: SDept) => {
        return <p>{idDept2 !== null ? idDept2.departament : ''}</p>;
      },
    },
    {
      key: '4',
      title: 'Основание назначения мероприятия',
      dataIndex: 'addrDescr',
    },
    {
      key: '5',
      title: 'Вид',
      dataIndex: 'idUnit_3',
    },
    {
      key: '6',
      title: 'Тип',
      dataIndex: 'idUnit_4',
    },
    {
      key: '7',
      title: 'Применяемые научно-технические средства',
      dataIndex: 'technical',
    },
    {
      key: '8',
      title: 'Дата начала',
      dataIndex: 'dateBegin',
      render: (date: Date) => {
        const newDate = new Date(date);
        return <p>{newDate.toLocaleDateString()}</p>;
      },
    },
    {
      key: '9',
      title: 'Дата окончания',
      dataIndex: 'dateEnd',
      render: (date: Date) => {
        const newDate = new Date(date);
        return <p>{newDate.toLocaleDateString()}</p>;
      },
    },
    {
      key: '10',
      title: 'Действия',
      width: '15%',
      render: (subj: SSubjObj) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                //navigate('/subject', {state:subj})
                // notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
              }}
            >
              {'Открыть'}
            </Button>
          </Space>
        );
      },
    },
  ];
  const navigate = useNavigate();

  // const changeColumns = () => {
  //   const newColumns = [...columns];
  //   newColumns.splice(columns.length - 1, 1, {
  //     key: `${columns.length + 1}`,
  //     title: 'Действия',
  //     align: 'center',
  //     render: () => {
  //       return (
  //         <>
  //           <Space>
  //             <Button
  //               type="ghost"
  //               onClick={() => {
  //                 //navigate('/subject', {state:subj})
  //                 navigate(`/common/pog`);
  //                 // notificationController.info({
  //                 //   description: 'safas',
  //                 //   message: 'asdfasdfadsfasdfasdf',
  //                 // });
  //               }}
  //             >
  //               Открыть
  //             </Button>
  //           </Space>
  //         </>
  //       );
  //     },
  //   });
  //   console.log(columns);
  //   return newColumns;
  // };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <TheTable
        // onRow={onRow}
        search={search}
        FormComponent={(props) => <AddEventOrderForm />}
        searchFunc={searchCategories}
        selected={selectedAuto}
        setSearchFunc={searchFunc}
        dataTable={{ data: events.data, loading: events.loading }}
        columns={columns}
        titleMoadlEditing={'Редактирование'}
        titleModalAdding={'Создание'}
        toggleModalAdding={toggleModalAdding}
        toggleModalEditing={toggleModalEditing}
        openAddingForm={modalAdding}
        openEditingForm={modalEditing}
        titleButtonAdd="Добавить новое мероприятие"
      />
    </>
  );
};
