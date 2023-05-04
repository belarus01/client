import { getAllCategs } from '@app/api/ate.api';
import TheTable from '@app/components/tables/TheTable';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal as Alert } from 'antd';
import StateForm from '../stateForm/StateForm';
import { getAllStates } from '@app/api/state.api';

export interface IStateCategory {
  worldPart: string;
  capital: string;
  state: string;
  idState: number | null;
}
const StateTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: IStateCategory[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<IStateCategory>({
    state: '',
    capital: '',
    worldPart: '',
    idState: null,
  });
  const [search, setSearch] = useState('');

  const fetch = () => {
    setTableData({ ...tableData, loading: true });
    getAllStates().then((res) => {
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

  const filtredTable = useMemo<IStateCategory[]>(() => {
    return tableData.data.filter((item) => item.state.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [search, tableData]);

  // No BE

  const deleteCategory = (category: IStateCategory) => {
    const newData = tableData.data.filter((item) => item.idState !== category.idState);
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
      title: 'Страна',
      dataIndex: 'state',
    },
    {
      key: 2,
      title: 'Столица',
      dataIndex: 'capital',
    },
    {
      key: 3,
      title: 'Континент',
      dataIndex: 'worldPart',
    },
    {
      key: 4,
      title: 'Действия',
      align: 'center',
      render: (itemSelected: IStateCategory) => {
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
        FormComponent={(props) => <StateForm data={props.data} close={toggleModal} />}
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

export default StateTable;
