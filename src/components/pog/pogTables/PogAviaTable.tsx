import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { getAllPogSubjAvias } from '@app/api/pog.api';
import { PogAviaForm } from '../pogForms/PogAviaForm';

export interface IPogAvia {
  idList?: number | null | string;
  idDept: null | number;
  idDeptDom?: null | number;
  idObl?: null | number;
  idSubjObj?: null | number;
  idNumReg?: null | number;
  numReg?: null | number;
  numOrder?: null | number;
  unp?: number | null | string;
  nameAddrOvnerPoo?: string;
  idOblSubj: null | number | string;
  idRayonSubj?: null | number | string;
  idCitySubj?: null | number | string;
  idStreetSubj?: null | number | string;
  numBuild?: string | number | string | null;
  contacts?: string | null | number;
  typeAvia?: string | null | number;
  numRegGai?: string | null | number;
  manufactYear?: string;
  dateEnd?: string;
  org?: 0 | 1 | 2 | null | string | number | null | undefined;
  dateRecord?: string | null | number;
  active?: 0 | 1 | string | number | null | undefined;
  uid?: number | null | string;
}

const PogAviaTable: React.FC = () => {
  const [avias, setAvias] = useState<{ data: IPogAvia[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedAvia, setSelectedAvia] = useState<IPogAvia>({
    idDept: null,
    idOblSubj: null,
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getAvias = () => {
    setAvias({ ...avias, loading: true });
    getAllPogSubjAvias().then((result) => {
      console.log('result', result);
      setAvias({ data: result, loading: false });
    });
  };

  useEffect(() => {
    getAvias();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    setModalAddding(isOpen);
  };

  const toggleModalEditing = (isOpen = true) => {
    setModalEditing(isOpen);
  };

  //no be

  const filtredTable = useMemo(() => avias.data.filter((item) => item.unp == parseFloat(search)), [search, avias]);

  const deleteItem = (deletedItem: IPogAvia) => {
    //deleteDepartment(id)
    const newAuto = avias.data.filter((avias) => avias.unp !== deletedItem.unp);
    setAvias({ ...avias, data: newAuto });
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
    getAvias();
  };

  const columns = [
    {
      key: '1',
      title:
        'УНП (регистрационный номер в Едином государственном регистре юридических лиц и индивидуальных предпринимателей)',
      dataIndex: 'unp',
      align: 'center',
    },
    {
      key: '2',
      title:
        ' Наименование организации, фамилия, собственное имя, отчество (если таковое имеется) индивидуального предпринимателя',
      dataIndex: 'nameAddrOvnerPoo',
      align: 'center',
    },
    {
      key: '3',
      title: 'Тип воздушного судна',
      dataIndex: 'typeAvia',
      align: 'center',
    },
    {
      key: '4',
      title: 'Государственный регистрационный знак',
      dataIndex: 'numReGai',
      align: 'center',
    },
    {
      key: '5',
      title: 'Год выпуска',
      dataIndex: 'manufactYear',
      align: 'center',
    },
    {
      key: '6',
      title: 'Срок действия сертификата летной годности или назначенного ресурса',
      dataIndex: 'dateEnd',
      align: 'center',
    },

    // {
    //   key: '5',
    //   title: 'Статус',
    //   dataIndex: 'conditions',
    //   width: '15%',
    //   render: (value: string) => <div>{value == '0' ? 'удалено' : 'активно'}</div>,
    // },
    {
      key: '7',
      title: 'Действия',
      align: 'center',
      render: (itemSelected: IPogAvia) => {
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
                setSelectedAvia(itemSelected);
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
        FormComponent={(props) => <PogAviaForm data={props.data} close={toggleModal} />}
        searchFunc={searchCategories}
        selected={selectedAvia}
        setSearchFunc={searchFunc}
        dataTable={{ data: avias.data, loading: avias.loading }}
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

export default PogAviaTable;
