import TheTable from '@app/components/tables/TheTable';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal as Alert } from 'antd';
import TnpaForm from '../tnpaForms/TnpaForm';
import { getAllTnpaLists } from '@app/api/tnpa.api';
import { Link } from 'react-router-dom';

export interface ITnpaCategory {
  name: string;
  addr: string;
  numDoc?: string;
  type?: string | number;
  dateBegin?: Date | string;
  dateEnd?: Date | string;
  org?: number;
  dateDoc?: Date | string | number | null;
  idList: number | null;
}
const TnpaTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: ITnpaCategory[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<ITnpaCategory>({
    name: '',
    addr: '',
    numDoc: '',
    idList: null,
  });
  const [search, setSearch] = useState('');

  const fetch = () => {
    setTableData({ ...tableData, loading: true });
    getAllTnpaLists().then((res) => {
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

  const filtredTable = useMemo<ITnpaCategory[]>(() => {
    return tableData.data.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [search, tableData]);

  // No BE

  const deleteCategory = (category: ITnpaCategory) => {
    const newData = tableData.data.filter((item) => item.idList !== category.idList);
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
      title: 'Название',
      dataIndex: 'name',
    },
    {
      key: 2,
      title: 'URI документа',
      dataIndex: 'addr',
    },
    {
      key: 3,
      title: 'Номер документа',
      dataIndex: 'numDoc',
    },
    {
      key: 4,
      title: 'Дата документа',
      dataIndex: 'dateDoc',
    },
    {
      key: 5,
      title: 'Дата начала действия документа',
      dataIndex: 'dateBegin',
    },
    {
      key: 6,
      title: 'Дата окончания действия документа',
      dataIndex: 'dateEnd',
    },
    {
      key: 7,
      title: 'Тип документа',
      dataIndex: 'dateEnd',
    },
    {
      key: 8,
      title: 'путь',
      dataIndex: 'pathDoc',
      render: (name: string) => {
        return <a href={name || '#'}>{name}</a>;
      },
    },
    {
      key: 9,
      title: 'Действия',
      align: 'center',
      render: (itemSelected: ITnpaCategory) => {
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
        FormComponent={(props) => <TnpaForm data={props.data} close={toggleModal} />}
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

export default TnpaTable;
