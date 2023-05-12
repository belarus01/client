import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert, Button, Space } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { deletePogSubjAutoById, getPogAuto } from '@app/api/pog.api';
import { useNavigate } from 'react-router-dom';
import { SEventsOrder } from '@app/domain/interfaces';
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

  const [columns, setColumns] = useState([
    {
      key: '1',
      title: 'Регистрационный номер',
      dataIndex: 'numGosnadz',
      align: 'center',
    },
    {
      key: '2',
      title: 'Дата регистрации заявления о регистрации транспортного средства',
      dataIndex: 'dateRegPoo',
      align: 'center',
    },
    {
      key: '45',
      title: 'Действия',
      align: 'center',
      render: (itemSelected: SEventsOrder) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteItem(itemSelected);
            },
          });
        }

        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelectedAuto(itemSelected);
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
  ]);

  const navigate = useNavigate();

  const changeColumns = () => {
    const newColumns = [...columns];
    newColumns.splice(columns.length - 1, 1, {
      key: `${columns.length + 1}`,
      title: 'Действия',
      render: () => {
        return (
          <>
            <Space>
              <Button
                type="ghost"
                onClick={() => {
                  //navigate('/subject', {state:subj})
                  navigate(`/common/pog`);
                  // notificationController.info({
                  //   description: 'safas',
                  //   message: 'asdfasdfadsfasdfasdf',
                  // });
                }}
              >
                Открыть
              </Button>
            </Space>
          </>
        );
      },
      align: 'center',
    });
    console.log(columns);
    setColumns(newColumns);
  };

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
      />
    </>
  );
};
