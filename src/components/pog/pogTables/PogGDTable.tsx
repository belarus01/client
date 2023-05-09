import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { getAllPogSubjRws } from '@app/api/pog.api';
import { PogGDForm } from '../pogForms/PogGDForm';

export interface IPogGD {
  colLocOtrab?: string | null | number;
  colLoc?: string | null | number;
  colGDOtrab?: string | null | number;
  colGD?: string | null | number;
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

const PogGDTable: React.FC = () => {
  const [GDs, setGDs] = useState<{ data: IPogGD[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedGD, setSelectedGD] = useState<IPogGD>({
    idDept: null,
    idOblSubj: null,
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getGDs = () => {
    setGDs({ ...GDs, loading: true });
    getAllPogSubjRws().then((result) => {
      console.log('result', result);
      setGDs({ data: result, loading: false });
    });
  };

  useEffect(() => {
    getGDs();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    setModalAddding(isOpen);
  };

  const toggleModalEditing = (isOpen = true) => {
    setModalEditing(isOpen);
  };

  //no be

  const filtredTable = useMemo(() => GDs.data.filter((item) => item.unp == parseFloat(search)), [search, GDs]);

  const deleteItem = (deletedItem: IPogGD) => {
    //deleteDepartment(id)
    const newAuto = GDs.data.filter((GDs) => GDs.unp !== deletedItem.unp);
    setGDs({ ...GDs, data: newAuto });
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
    getGDs();
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
      title: 'Количество вагонов-цистерн, предназначенных для перевозки опасных грузов',
      dataIndex: 'colGD',
      align: 'center',
    },
    {
      key: '4',
      title:
        'Количество вагонов-цистерн, предназначенных для перевозки опасных грузов, отработавших нормативный срок службы',
      dataIndex: 'colGDOtrab',
      align: 'center',
    },
    {
      key: '5',
      title: 'Количество локомотивов, занятых перевозкой опасных грузов',
      dataIndex: 'colLoc',
      align: 'center',
    },
    {
      key: '6',
      title: 'Количество локомотивов, занятых перевозкой опасных грузов, отработавших нормативный срок службы',
      dataIndex: 'colLocOtrab',
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
      render: (itemSelected: IPogGD) => {
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
                setSelectedGD(itemSelected);
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
        FormComponent={(props) => <PogGDForm data={props.data} close={toggleModal} />}
        searchFunc={searchCategories}
        selected={selectedGD}
        setSearchFunc={searchFunc}
        dataTable={{ data: GDs.data, loading: GDs.loading }}
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

export default PogGDTable;
