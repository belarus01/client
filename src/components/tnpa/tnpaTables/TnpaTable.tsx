import TheTable from '@app/components/tables/TheTable';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { Modal as Alert } from 'antd';
import TnpaForm from '../tnpaForms/TnpaForm';
import { deleteTnpaWithFile, getAllTnpaLists } from '@app/api/tnpa.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { notificationController } from '@app/controllers/notificationController';

export interface ITnpaCategory {
  name: string;
  addr: string;
  numDoc?: string;
  type?: string | number;
  dateBegin?: Date | string | number | null;
  dateEnd?: Date | string | number | null;
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
      console.log(res);

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

  const chooseTypeDoc = (type: number) => {
    console.log(type);

    switch (type) {
      case 1:
        return 'Закон';

      case 2:
        return 'Декрет';
      case 3:
        return 'Постановление';
      case 4:
        return 'Общие требования';
      case 5:
        return 'Договор';
      case 6:
        return 'Порядок';
      case 7:
        return 'Инструкция ';
      case 8:
        return 'Правила';
      case 9:
        return 'Положение';
      case 10:
        return 'Перечень';
      case 11:
        return 'ТР';
      case 12:
        return 'ТКП';
      case 13:
        return 'СН';
    }
  };

  const deleteCategory = (category: ITnpaCategory) => {
    if (category.idList) {
      deleteTnpaWithFile(category.idList)
        .then(() => {
          fetch();
          notificationController.success({ message: 'Файл успешно удален' });
        })
        .catch((e) => {
          notificationController.error({ message: 'Ошибка', description: `${e.message}` });
        });
    }
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
      dataIndex: 'typeDoc',
      render: (name: number) => {
        return <span>{chooseTypeDoc(name)}</span>;
      },
    },
    {
      key: 8,
      title: 'Скачать файл',
      dataIndex: 'pathDoc',
      render: (path: string) => {
        return (
          <a href={path || '#'} target="_blanck">
            {
              <Button>
                Скачать <DownloadOutlined />
              </Button>
            }
          </a>
        );
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
