import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert, Button, Space } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { deletePogSubjAutoById, getPogAuto } from '@app/api/pog.api';
import { useNavigate } from 'react-router-dom';
import { IEventOrder, IEventsSphere, SDept, SEvents, SEventsOrder, SSubjObj } from '@app/domain/interfaces';
import { getAllEventsBySubjectId, getAllEventsOrders } from '@app/api/events.api';
import { AddEventOrderForm } from './forms/AddEventForm';

interface IEventsTable {
  data?: SEventsOrder[];
  idSubj?: number;
}

export const EventsTable: React.FC<IEventsTable> = ({ idSubj }) => {
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

  const getCurrentEvents = (idSubj: number) => {
    if (idSubj) {
      return getAllEventsBySubjectId(idSubj);
    }
    return getAllEventsOrders();
  };

  const getEvents = (idSubj: number) => {
    setEvents({ ...events, loading: true });
    getCurrentEvents(idSubj).then((result) => {
      console.log(result, 'table');
      setEvents({ data: result, loading: false });
      return result;
    });
    // Add spheries array in events order
    // .then((events) => {
    //   const spheriesPromises = [];
    //   for (let i = 0; i < events.length; i++) {
    //     spheriesPromises.push(getSphereByIdEvent(events[i].idEventOrder));
    //   }
    //   Promise.all([spheriesPromises]).then((spheries) => {
    //     events.map((event, index) => {
    //       return {
    //         ...event,
    //         spheries: {
    //           ...spheries[index],
    //         },
    //       };
    //     });
    //   });
    // });
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
    getEvents(idSubj as number);
  };

  const columns = [
    {
      key: '1',
      title: 'Мероприятие',
      dataIndex: 'idEvent',
      // render: (idEvent: SEvents) => {
      //   return <p>{idEvent.event}</p>;
      // },
    },
    {
      key: '2',
      title: 'Вид',
      dataIndex: 'idUnit_3',
    },
    {
      key: '3',
      title: 'Тип',
      dataIndex: 'idUnit_4',
    },
    {
      key: '4',
      title: 'Орган, выдавший предписание',
      dataIndex: 'idDeptIss',
    },
    {
      key: '5',
      title: 'Сфера контроля',
      dataIndex: 'spheries',
      // render: (record: IEventsSphere[]) => {
      //   console.log(record);

      //   return record.map((sphere) => {
      //     return (
      //       <>
      //         <span>{sphere?.name}</span>
      //       </>
      //     );
      //   });
      // },
    },
    {
      key: '6',
      title: 'Дата начала надзорно-профилактического мероприятия',
      dataIndex: 'dateBegin',
      render: (date: Date) => {
        const newDate = new Date(date);
        return <p>{newDate.toLocaleDateString()}</p>;
      },
    },
    {
      key: '7',
      title: 'Дата окончания надзорно-профилактического мероприятия',
      dataIndex: 'dateEnd',
      render: (date: Date) => {
        const newDate = new Date(date);
        return <p>{newDate.toLocaleDateString()}</p>;
      },
    },
    {
      key: '8',
      title: 'Дата изменения записи',
      dataIndex: 'dateRecord',
      render: (date: Date) => {
        const newDate = new Date(date);
        return <p>{newDate.toLocaleDateString()}</p>;
      },
    },
    // {
    //   key: '3',
    //   title: 'Орган, проводящий проверку',
    //   dataIndex: 'idDept2',
    //   render: (idDept2: SDept) => {
    //     return <p>{idDept2 !== null ? idDept2.departament : ''}</p>;
    //   },
    // },
    // {
    //   key: '4',
    //   title: 'Основание назначения мероприятия',
    //   dataIndex: 'addrDescr',
    // },

    {
      key: '7',
      title: 'Применяемые научно-технические средства',
      dataIndex: 'technical',
    },
    {
      key: '8',
      title: 'Сфера контроля',
      dataIndex: 'spheries',
      // render: (record: IEventsSphere[]) => {
      //   console.log(record);

      //   return record.map((sphere) => {
      //     return (
      //       <>
      //         <span>{sphere?.name}</span>
      //       </>
      //     );
      //   });
      // },
    },
    {
      key: '9',
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
      render: (event: IEventOrder) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                console.log(event.technical);

                navigate(`/planning/events/${event.idEventOrder}`, {
                  state: [...events.data],
                });
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
    getEvents(idSubj as number);
  }, []);
  const save = () => {
    toggleModalAdding(false);
    getEvents(idSubj as number);
  };

  return (
    <>
      <TheTable
        // onRow={onRow}
        search={search}
        FormComponent={(props) => <AddEventOrderForm {...props} />}
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
        propsFrom={{ submitForm: save }}
      />
    </>
  );
};
