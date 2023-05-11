import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { deleteSopbById, getAllSopb } from '@app/api/sopb.api';
import { Link } from 'react-router-dom';
import { SopbForm } from '../forms/SopbForm';
import moment from 'moment';

export interface ISopb {
  // numDoc: string;
  // dateDoc?: Date;
  // dateFrom?: Date;
  // dateTo?: Date;
  // name: string;
  // brend?: string;
  // model?: string;
  // mnfData?: string;
  // statusDoc?: string;
  // dateStatus?: Date;
  // dataRequest?: Date;
  // numRequest?: string;
  // submit?: number;
  // solution?: string;
  // fioStaff?: string;
  // comm?: string;
  // uid?: number;
  active?: number;
  conditions?: string;
  dateRecord?: Date | string;
  idSopb: number | null;
  name: string;
  uid?: number | null;
}

export const SopbTable: React.FC = () => {
  const [sopb, setSopb] = useState<{ data: ISopb[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedSopb, setSelectedSopb] = useState<ISopb>({
    idSopb: null,
    name: '',
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getSopbs = () => {
    setSopb({ ...sopb, loading: true });
    getAllSopb().then((sopbs) => {
      console.log(sopbs);
      setSopb({ data: sopbs, loading: false });
    });
  };

  useEffect(() => {
    getSopbs();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    console.log('эддинг');
    setModalAddding(isOpen);
  };

  const toggleModalEditing = (isOpen = true) => {
    console.log('editing');

    setModalEditing(isOpen);
  };

  //no be

  const filtredTable = useMemo(
    () =>
      sopb.data.filter((item) => {
        if (item.name) {
          return item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        }
      }),
    [search, sopb.data],
  );

  const deleteItem = (departmentSelected: ISopb) => {
    if (departmentSelected.idSopb) {
      deleteSopbById(departmentSelected.idSopb);
      getSopbs();
    }

    //deleteDepartment(id)
    // const newSopb = sopb.data.filter((sopb) => sopb.idSopb !== departmentSelected.idSopb);
    // setSopb({ ...sopb, data: newSopb });
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
      title: 'Наименование СОПБиП',
      dataIndex: 'name',
      render: (text: string, { idSopb }: { idSopb: number }) => <Link to={`${idSopb}`}>{text}</Link>,
    },
    {
      key: '2',
      title: 'Дата изменения записи',
      dataIndex: 'dateRecord',
      width: '18%',
      render: (date: Date | string) => <span>{moment(date).format('DD.MM.YYYY')}</span>,
    },
    {
      key: '3',
      title: 'Ид.пользователя, внесшего изменения',
      dataIndex: 'uid',
    },
    {
      key: '4',
      title:
        'Оценка соответствия средств обеспечения пожарной безопасности и пожаротушения проводится в форме сертификации',
      dataIndex: 'conditions',
      width: '15%',
    },
    {
      key: '5',
      title: 'Статус',
      dataIndex: 'conditions',
      width: '15%',
      render: (value: string) => <div>{value == '0' ? 'удалено' : 'активно'}</div>,
    },
    {
      key: '6',
      title: 'Действия',
      render: (departmentSelected: ISopb) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteItem(departmentSelected);
            },
          });
        }

        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelectedSopb(departmentSelected);
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

  const toggleModal = () => {
    setModalAddding(false);
    setModalEditing(false);
    getSopbs();
  };
  return (
    <>
      <TheTable
        // onRow={onRow}
        search={search}
        FormComponent={(props) => <SopbForm closeModal={toggleModal} data={props.data} />}
        searchFunc={searchCategories}
        selected={selectedSopb}
        setSearchFunc={searchFunc}
        dataTable={{ data: filtredTable, loading: sopb.loading }}
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

export default SopbTable;
