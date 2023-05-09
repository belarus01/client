import TheTable from '@app/components/tables/TheTable';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal as Alert } from 'antd';
import EventsForm from '../eventsForms/EventsForm';
import { getAllEvents } from '@app/api/spis_events.api';

export interface IEventsCategory {
  event: string;
  numEvent: string;
  idEvent: number | null;
}
const EventsTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: IEventsCategory[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<IEventsCategory>({
    event: '',
    numEvent: '',
    idEvent: null,
  });
  const [search, setSearch] = useState('');

  const fetch = () => {
    setTableData({ ...tableData, loading: true });
    getAllEvents().then((res) => {
      setTableData({ data: res, loading: false });
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    setOpenAddingForm(isOpen);
  };

  const toggleModalEdding = (isOpen = true) => {
    setOpenEddingForm(isOpen);
  };

  const searchCategories = (value: string) => {
    setSearch(value);
    console.log(value);
  };

  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filtredTable = useMemo<IEventsCategory[]>(() => {
    return tableData.data.filter((item) => item.event.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [search, tableData]);

  // No BE

  const deleteCategory = (category: IEventsCategory) => {
    const newData = tableData.data.filter((item) => item.idEvent !== category.idEvent);
    setTableData({ ...tableData, data: newData });
  };

  const toggleModal = () => {
    setOpenAddingForm(false);
    setOpenEddingForm(false);
    fetch();
  };

  const columns = [
    {
      key: 1,
      title: 'Номер',
      dataIndex: 'numEvent',
    },
    {
      key: 2,
      title: 'Название',
      dataIndex: 'event',
    },
    {
      key: 3,
      title: 'Действия',
      align: 'center',
      render: (itemSelected: IEventsCategory) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteCategory(itemSelected);
            },
          });
        }

        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelected(itemSelected);
                toggleModalEdding(true);
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
        FormComponent={(props) => <EventsForm data={props.data} close={toggleModal} />}
        searchFunc={searchCategories}
        selected={selected}
        setSearchFunc={searchFunc}
        dataTable={{ data: filtredTable, loading: tableData.loading }}
        columns={columns}
        titleMoadlEditing={'Редактирование'}
        titleModalAdding={'Создание'}
        toggleModalAdding={toggleModalAdding}
        toggleModalEditing={toggleModalEdding}
        openAddingForm={openAddingForm}
        openEditingForm={openEddingForm}
      />
    </>
  );
};

export default EventsTable;
