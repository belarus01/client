import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { getAllPogSubjWaters } from '@app/api/pogAuto.api';
import { PogWaterForm } from '../pogForms/PogWaterForm';

export interface IPogWater {
  nameSud?: string | null | number;
  gruz?: string | null | number;
  dateVipusk?: string;
  dateOsvid?: string;
  //colLocOtrab?: string | null | number;
  //colLoc?: string | null | number;
  //colGDOtrab?: string | null | number;
  //colGD?: string | null | number;
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
  //typeAvia?: string | null | number;
  //numRegGai?: string | null | number;
  //manufactYear?: string;
  //dateEnd?: string;
  org?: 0 | 1 | 2 | null | string | number | null | undefined;
  dateRecord?: string | null | number;
  active?: 0 | 1 | string | number | null | undefined;
  uid?: number | null | string;
}

const PogWaterTable: React.FC = () => {
  const [Waters, setWaters] = useState<{ data: IPogWater[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedWater, setSelectedWater] = useState<IPogWater>({
    idDept: null,
    idOblSubj: null,
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getWaters = () => {
    setWaters({ ...Waters, loading: true });
    getAllPogSubjWaters().then((result) => {
      console.log('result', result);
      setWaters({ data: result, loading: false });
    });
  };

  useEffect(() => {
    getWaters();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    setModalAddding(isOpen);
  };

  const toggleModalEditing = (isOpen = true) => {
    setModalEditing(isOpen);
  };

  //no be

  const filtredTable = useMemo(() => Waters.data.filter((item) => item.unp == parseFloat(search)), [search, Waters]);

  const deleteItem = (deletedItem: IPogWater) => {
    //deleteDepartment(id)
    const newAuto = Waters.data.filter((Waters) => Waters.unp !== deletedItem.unp);
    setWaters({ ...Waters, data: newAuto });
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
    getWaters();
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
      title: 'Наименование судна',
      dataIndex: 'nameSud',
      align: 'center',
    },
    {
      key: '4',
      title: 'Грузоподъемность',
      dataIndex: 'gruz',
      align: 'center',
    },
    {
      key: '5',
      title: 'Год выпуска',
      dataIndex: 'dateVipusk',
      align: 'center',
    },
    {
      key: '6',
      title: 'Дата последнего освидетельствования',
      dataIndex: 'dateOsvid',
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
      render: (itemSelected: IPogWater) => {
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
                setSelectedWater(itemSelected);
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
        FormComponent={(props) => <PogWaterForm data={props.data} close={toggleModal} />}
        searchFunc={searchCategories}
        selected={selectedWater}
        setSearchFunc={searchFunc}
        dataTable={{ data: Waters.data, loading: Waters.loading }}
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

export default PogWaterTable;
