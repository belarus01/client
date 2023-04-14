import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal as Alert } from 'antd';
import TheTable from '@app/components/tables/TheTable';
import { getAllSoapb } from '@app/api/sopb.api';
import { Link } from 'react-router-dom';
import { SoapbForm } from './forms/SoapbForm';

export interface ISoapb {
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

export const SoapbTable: React.FC = () => {
  const [soapb, setSoapb] = useState<{ data: ISoapb[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedSoapb, setSelectedSoapb] = useState<ISoapb>({
    idSopb: null,
    name: '',
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEditing, setModalEditing] = useState(false);
  const [search, setSearch] = useState('');

  const getSoapbs = () => {
    setSoapb({ ...soapb, loading: true });
    getAllSoapb().then((soapbs) => {
      console.log(soapbs);
      setSoapb({ data: soapbs, loading: false });
    });
  };

  useEffect(() => {
    getSoapbs();
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
    () => soapb.data.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())),
    [search, soapb],
  );

  const deleteItem = (departmentSelected: ISoapb) => {
    //deleteDepartment(id)
    const newSoapb = soapb.data.filter((soapb) => soapb.idSopb !== departmentSelected.idSopb);
    setSoapb({ ...soapb, data: newSoapb });
  };

  const searchCategories = (value: string) => {
    console.log(value);
    setSearch(value);
  };

  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // const navigate = useNavigate();

  // const onRow = (recod: ISoapb, rowIndex: number | undefined) => {
  //   return {
  //     onClick: (e: ChangeEvent<HTMLTemplateElement>) => {
  //       navigate(`${recod.idSopb}`);
  //     },
  //   };
  // };
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
      render: (departmentSelected: ISoapb) => {
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
                setSelectedSoapb(departmentSelected);
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
      <div>soapbs</div>
      <TheTable
        // onRow={onRow}
        search={search}
        FormComponent={(props) => <SoapbForm data={props.data} />}
        searchFunc={searchCategories}
        selected={selectedSoapb}
        setSearchFunc={searchFunc}
        dataTable={{ data: filtredTable, loading: soapb.loading }}
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

export default SoapbTable;
