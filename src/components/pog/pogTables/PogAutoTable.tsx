import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { deletePogSubjAutoById, getPogAuto } from '@app/api/pogAuto.api';
import { PogAutoForm } from '../pogForms/PogAutoForm';

export interface IPogAuto {
  idList: number | string | null;
  comm: string | number | readonly string[] | undefined;
  idLlist?: number | null;
  idDept?: number | null;
  idDeptDom?: number | null;
  idObl?: number | null;
  idSubjObj?: number | null;
  idNumReg?: number | null;
  numReg?: number | null;
  numGosnadz: number | null | string;
  numOrder?: number | null;
  dateRegPoo?: Date | string | number | null;
  numRegPoo?: number | null | string;
  unp?: number | null | string;
  nameAddrOvnerPoo?: string;
  idOblSubj?: number | null | string;
  idRayonSubj?: number | null | string;
  idCitySubj?: number | null | string;
  idStreetSubj?: number | null | string;
  numBuild?: number | string | null;
  contacts?: number | string | null;
  idTypeTs?: number | null;
  typeTs?: number | string | null;
  idTypeDopogTs?: number | null | string;
  typeDopogTs?: number | string | null;
  brendTs?: number | string | null;
  modelTs?: number | string | null;
  vinTs?: number | string | null;
  manufactNumTanc?: number | string | null;
  manufactYearTs?: number | string | null;
  manufactYearTanc?: number | string | null;
  manufactTs?: number | string | null;
  numRegGai?: number | string | null;
  idDangerClass?: number | null;
  dangerClass?: number | string | null;
  idStreetTs?: number | string | null;
  streetTs?: number | string | null;
  numBuildTs?: number | string | null;
  dateControlTanc?: number | string | null;
  idTypeControlTanc?: number | null;
  typeControlTanc?: number | string | null;
  preExploit?: number | string | null;
  sizeTanc?: number | string | null;
  numSections?: number | string | null;
  tancCode?: number | string | null;
  numOk?: number | string | null;
  dateOk?: number | string | null;
  docOk?: number | string | null;
  dateDocOk?: number | string | null;
  numDevice?: number | string | null;
  numMembr?: number | string | null;
  material?: number | string | null;
  pressure?: number | string | null;
  flIso?: number | string | null;
  flScreen?: number | string | null;
  binding?: number | string | null;
  regInspector?: number | string | null;
  fioStaff?: number | string | null;
  dateUnreg?: number | string | null;
  numUnreg?: number | string | null;
  whyUnreg?: number | string | null;
  unregInspector?: number | string | null;
  org?: number | string | null;
  dateRecord?: number | string | null;
  active?: number | string | null;
  uid?: number | string | null;
}

export const PogAutoTable: React.FC = () => {
  const [autos, setAutos] = useState<{ data: IPogAuto[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedAuto, setSelectedAuto] = useState<IPogAuto>({
    numGosnadz: null,
    comm: '',
    idList: null,
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
    console.log(deletedItem.idList);
    setAutos({ ...autos, loading: true });
    deletePogSubjAutoById(deletedItem.idList as string).then((data) => {
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

  const toggleModal = () => {
    setModalAddding(false);
    setModalEditing(false);
    getAutos();
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
    {
      key: '42',
      title: 'Статус',
      dataIndex: 'active',
      render: (active: '0' | '1') => <>{active == '0' ? 'Неактивен' : 'Активно'}</>,
    },
    {
      key: '43',
      title: 'Примечание',
      dataIndex: 'comm',
    },
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
        FormComponent={(props) => <PogAutoForm data={props.data} close={toggleModal} />}
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
