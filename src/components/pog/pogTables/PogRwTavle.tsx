import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { getAllPogSubjAvias } from '@app/api/pogAuto.api';
import { PogAviaForm } from '../pogForms/PogAviaForm';

export interface IPogRw {
  idList?: null| number,
  idDept?: null | number,
  idDeptDom?: null| number,
  idObl?: null | number,
  idSubj: null| number,
  idSubjObj?: number| null,
  idNumReg: number | null,
  numReg?: number | null,
  num_order` varchar(85) DEFAULT NULL COMMENT 'Порядковый номер в журнале регистрации ПОГ',
  unp` varchar(30) DEFAULT NULL COMMENT 'УНП субъекта',
  name_addr_ovner_poo` varchar(250) DEFAULT NULL COMMENT 'Наименование организации субъекта, ФИО ИП владельца ПОГ',
  id_obl_subj` int unsigned DEFAULT NULL COMMENT 'Область субъекта владельца ПОГ mchs.s_ate_obl',
  id_rayon_subj` int unsigned DEFAULT NULL COMMENT 'Район субъекта владельца ПОГ mchs.s_ate_rayon',
  id_city_subj` int unsigned DEFAULT NULL COMMENT 'Город субъекта владельца ПОГ mchs.s_ate_street.name_reestr',
  id_street_subj` int unsigned DEFAULT NULL COMMENT 'Улица субъекта владельца ПОГ mchs.s_ate_street.name_rus',
  num_build` varchar(150) DEFAULT NULL COMMENT 'Номер дома,корп.,индекс субъекта владельца ПОГ',
  contacts` varchar(150) DEFAULT NULL COMMENT 'Контактные данные субъекта владельца ПОГ',
  num_tanc` int unsigned DEFAULT NULL COMMENT 'Количество вагонов-цистерн, предназначенных для перевозки опасных грузов',
  num_tanc_out` int unsigned DEFAULT NULL COMMENT 'Количество вагонов-цистерн, предназначенных для перевозки опасных грузов, отработавших нормативный срок службы',
  num_loko` int unsigned DEFAULT NULL COMMENT 'Количество локомотивов, занятых перевозкой опасных грузов',
  num_loko_out` int unsigned DEFAULT NULL COMMENT 'Количество локомотивов, занятых перевозкой опасных грузов, отработавших нормативный срок службы',
  org` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '0-Госнадзор, 1-пожарники,2-другие',
  date_record` date DEFAULT (now()) COMMENT 'Дата изменения записи',
  active` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '0-удалено, 1-активно',
  uid` int unsigned DEFAULT NULL COMMENT 'Пользователь, изменивший запись',
}

export const PogRwTable: React.FC = () => {
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
    },
    {
      key: '2',
      title:
        ' Наименование организации, фамилия, собственное имя, отчество (если таковое имеется) индивидуального предпринимателя',
      dataIndex: 'nameAddrOvnerPoo',
    },
    {
      key: '3',
      title: 'Тип воздушного судна',
      dataIndex: 'typeAvia',
    },
    {
      key: '4',
      title: 'Государственный регистрационный знак',
      dataIndex: 'numReGai',
    },
    {
      key: '5',
      title: 'Год выпуска',
      dataIndex: 'manufactYear',
    },
    {
      key: '6',
      title: 'Срок действия сертификата летной годности или назначенного ресурса',
      dataIndex: 'dateEnd',
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

export default PogRwTable;
