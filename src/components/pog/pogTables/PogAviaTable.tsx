import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { getPogAuto } from '@app/api/pogAuto.api';

export interface IPogAvia {
  idList?: number | null;
  idDept: null | number;
  idDeptDom?: null | number;
  idObl?: null | number;
  idSubjObj?: null | number;
  idNumReg?: null | number;
  numReg?: null | number;
  numOrder?: null | number;
  unp?: number | null | string;
  nameAddrOvnerPoo?: string;
  idOblSubj: null | number;
  idRayonSubj?: null | number;
  idCitySubj?: null | number;
  idStreetSubj?: null | number;
  numBuild?: string | number;
  contacts?: string | null | number;
  typeAvia?: string | null | number;
  numRegGai?: string | null | number;
  manufactYear?: string;
  dateEnd?: string;
  org?: 0 | 1 | 2;
  dateRecord?: string;
  active?: 0 | 1;
  uid?: number | null | string;
}

export const PogAutoTable: React.FC = () => {
  const [autos, setAutos] = useState<{ data: IPogAvia[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedAuto, setSelectedAuto] = useState<IPogAvia>({
    numGosnadz: null,
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getAutos = () => {
    setAutos({ ...autos, loading: true });
    getPogAuto().then((result) => {
      console.log(result);
      setAutos({ data: result, loading: false });
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
    () => autos.data.filter((item) => item.numGosnadz == parseFloat(search)),
    [search, autos],
  );

  const deleteItem = (deletedItem: IPogAuto) => {
    //deleteDepartment(id)
    const newAuto = autos.data.filter((autos) => autos.numGosnadz !== deletedItem.numGosnadz);
    setAutos({ ...autos, data: newAuto });
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
      title: 'Регистрационный номер',
      dataIndex: 'numGosnadz',
    },
    {
      key: '2',
      title: 'Дата регистрации заявления о регистрации транспортного средства',
      dataIndex: 'dateRegPoo',
    },
    {
      key: '3',
      title: 'Номер регистрации заявления о регистрации транспортного средства',
      dataIndex: 'numRegPoo',
    },
    {
      key: '4',
      title:
        'УНП (регистрационный номер в Едином государственном регистре юридических лиц и индивидуальных предпринимателей)',
      dataIndex: 'unp',
    },
    {
      key: '5',
      title: 'Наименование организации, фамилия, собственное имя, отчество (если таковое имеется)',
      dataIndex: 'nameAddrOvnerPoo',
    },
    {
      key: '5',
      title: 'Наименование организации, фамилия, собственное имя, отчество (если таковое имеется)',
      dataIndex: 'nameAddrOvnerPoo',
    },
    {
      key: '6',
      title: 'Область местонахождения субъекта',
      dataIndex: 'idOblSubj',
    },
    {
      key: '7',
      title: 'Район местонахождения субъекта ',
      dataIndex: 'idRayonSubj',
    },
    {
      key: '8',
      title: 'Город местонахождения субъекта ',
      dataIndex: 'idCitySubj',
    },
    {
      key: '9',
      title: 'Индекс ',
      dataIndex: '',
    },
    {
      key: '10',
      title: 'Улица, № дома (офиса, строения и т.д.) индекс, местонахождения субъекта ',
      dataIndex: 'idStreetSubj',
    },
    {
      key: '11',
      title: 'Контактные данные',
      dataIndex: 'contacts',
    },
    {
      key: '12',
      title: 'Тип транспортного средства',
      dataIndex: 'typeTs',
    },
    {
      key: '12',
      title: 'Тип транспортного средства',
      dataIndex: 'typeTs',
    },
    {
      key: '12',
      title: 'Тип транспортного средства по ДОПОГ',
      dataIndex: 'idTypeDopogTs',
    },
    {
      key: '13',
      title: 'Марка транспортного средства',
      dataIndex: 'brendTs',
    },
    {
      key: '14',
      title: 'Номер шасси транспортного средства',
      dataIndex: 'vinTs',
    },
    {
      key: '15',
      title: 'Заводской номер цистерны',
      dataIndex: 'manufactNumTanc',
    },
    {
      key: '16',
      title: 'Год выпуска транспортного средства',
      dataIndex: 'manufactYearTs',
    },
    {
      key: '17',
      title: 'Год выпуска транспортного средства',
      dataIndex: 'manufactYearTs',
    },
    {
      key: '18',
      title: 'Год изготовления цистерны (если известно)',
      dataIndex: 'manufactYearTanc',
    },
    {
      key: '19',
      title: 'Завод изготовитель транспортного средства',
      dataIndex: 'manufactTs',
    },
    {
      key: '20',
      title: 'Регистрационный знак',
      dataIndex: 'numRegGai',
    },
    {
      key: '21',
      title: 'Регистрационный знак',
      dataIndex: 'numRegGai',
    },
    {
      key: '22',
      title: 'Класс опасного груза',
      dataIndex: 'dangerClass',
    },
    {
      key: '23',
      title: 'Место стоянки',
      dataIndex: 'streetTs',
    },
    {
      key: '24',
      title: 'Место стоянки',
      dataIndex: 'streetTs',
    },
    {
      key: '25',
      title: 'Дата проведенной проверки цистерны',
      dataIndex: 'dateControlTanc',
    },
    {
      key: '26',
      title: 'Вид проведенной проверки цистерны',
      dataIndex: 'typeControlTanc',
    },
    {
      key: '27',
      title: 'Предэксплуатационная проверка',
      dataIndex: 'preExploit',
    },
    {
      key: '28',
      title: 'Объем цистерны',
      dataIndex: 'sizeTanc',
    },
    {
      key: '29',
      title: 'Количество секций',
      dataIndex: 'numSections',
    },
    {
      key: '30',
      title: 'Код цистерны',
      dataIndex: 'tancCode',
    },
    {
      key: '31',
      title: 'Номер, дата официального утверждения типа',
      dataIndex: 'numOk',
    },
    {
      key: '32',
      title: 'Количество и тип устройств безопасности (ДУ или ПК, или ВК)',
      dataIndex: 'numDevice',
    },
    {
      key: '33',
      title: 'Наличие разрывной мембраны (количество)',
      dataIndex: 'numMembr',
    },
    {
      key: '34',
      title: 'Материал цистерны',
      dataIndex: 'material',
    },
    {
      key: '35',
      title: 'Расчетное давление',
      dataIndex: 'pressure',
    },
    {
      key: '36',
      title: 'Наличие теплоизоляции',
      dataIndex: 'flIso',
    },
    {
      key: '37',
      title: 'Наличие солнцезащитных экранов',
      dataIndex: 'flScreen',
    },
    {
      key: '38',
      title: 'Вид крепления волнорезов (сварка/резьбовое)',
      dataIndex: 'binding',
    },
    {
      key: '39',
      title: 'Фамилия, инициалы  государственного инспектора, зарегистрировавшего транспортное средство',
      dataIndex: 'regInspector',
    },
    {
      key: '40',
      title: 'Фамилия, собственное имя, отчество (если таковое имеется) лица, получившего регистрационную карточку',
      dataIndex: 'fioStaff',
    },
    {
      key: '41',
      title: 'Дата и номер регистрации заявления о снятии с учета транспортного средства',
      dataIndex: 'dateUnreg',
    },
    {
      key: '42',
      title: 'Фамилия, инициалы государственного инспектора, снявшего с учета транспортное средство',
      dataIndex: 'unregInspector',
    },
    // {
    //   key: '5',
    //   title: 'Статус',
    //   dataIndex: 'conditions',
    //   width: '15%',
    //   render: (value: string) => <div>{value == '0' ? 'удалено' : 'активно'}</div>,
    // },
    {
      key: '43',
      title: 'Действия',
      render: (itemSelected: IPogAuto) => {
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
        FormComponent={(props) => <AutoForm data={props.data} />}
        searchFunc={searchCategories}
        selected={selectedAuto}
        setSearchFunc={searchFunc}
        dataTable={{ data: autos.data, loading: autos.loading }}
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

export default PogAutoTable;
