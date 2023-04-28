import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { deletePogSubjAutoById, getPogAuto } from '@app/api/pogAuto.api';
import { PogAutoForm } from '../pogForms/PogAutoForm';
import { SSubj } from '@app/domain/interfaces';
import { getAllSubjects } from '@app/api/subjects.api';
import { Link } from 'react-router-dom';

export const PogMapSubjTable: React.FC = () => {
  const [subjs, setSubjs] = useState<{ data: SSubj[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedAuto, setSelectedAuto] = useState<SSubj>({});
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getAutos = () => {
    setSubjs({ ...subjs, loading: true });
    getAllSubjects().then((result) => {
      console.log(result);
      setSubjs({ data: result, loading: false });
    });
  };

  useEffect(() => {
    getAutos();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    setModalAddding(isOpen);
  };

  const toggleModalEditing = (isOpen = true) => {
    setModalEditing(isOpen);
  };

  //no be

  const filtredTable = useMemo(
    () => subjs.data.filter((item) => item.numGosnadz == parseFloat(search)),
    [search, subjs],
  );

  const deleteItem = (deletedItem: IPogAuto) => {
    console.log(deletedItem.idList);
    setSubjs({ ...subjs, loading: true });
    deletePogSubjAutoById(deletedItem.idList).then((data) => {
      console.log(data);
      console.log('deleted');
      getAutos();
    });

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

  const columns = [
    {
      key: '1',
      title: 'Перейти к карте',
      render: (subject: SSubj) => {
        console.log('subject', subject);

        return (
          <Link to={`${subject.idSubj}`} preventScrollReset={true}>
            Перейти
          </Link>
        );
      },
    },
    {
      key: '2',
      title: 'УНП',
      dataIndex: 'unp',
      // render: (text: string, { idSubj }: { idSubj: number }, { record }) => {
      //   console.log(record);

      //   return (
      //     <Link to={`${idSubj}`} preventScrollReset={true}>
      //       {text}
      //     </Link>
      //   );
      // },
    },
    {
      key: '3',
      title: 'Ф.И.О руководителя субъекта',
      dataIndex: 'bossName',
    },
    {
      key: '4',
      title: 'Наименование oбъекта промышленной безопасности(cубъект)',
      dataIndex: 'subj',
    },
    {
      key: '43',
      title: 'Действия',
      render: (itemSelected: SSubj) => {
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
  ];
  return (
    <>
      <TheTable
        // onRow={onRow}
        search={search}
        FormComponent={(props) => <PogAutoForm data={props.data} close={toggleModal} />}
        searchFunc={searchCategories}
        selected={selectedAuto}
        setSearchFunc={searchFunc}
        dataTable={subjs}
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

export default PogMapSubjTable;
