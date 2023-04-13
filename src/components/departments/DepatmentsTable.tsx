import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../common/buttons/Button/Button';
import { Table } from '../common/Table/Table';
import { AddEditDepartmentForm } from './forms/AddEditDepartmentForm';
import { Col, Row, Modal as Alert } from 'antd';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { getAllDepartments } from '@app/api/departments.api';

export interface StrDepartment {
  id: string;
  name: string;
  department: string;
}

export interface IDepartment {
  idDept: number | null;
  departament: string;
  departRod: string;
  org?: number;
  idParent?: number | null;
  address: string;
  dateRecord?: Date | string;
  active?: number;
  telHead?: string;
  telReception?: string;
  telCode?: string;
  telOper?: string;
  telDover?: string;
  email?: string;
  uid?: number;
  unp?: string;
  fioBoss?: string;
  dolznBossNadzOrg?: string;
  idObl?: number | null;
  idDeptDom?: string | null;
  idRayon?: number | null;
}

export const DepartmentsTable: React.FC = () => {
  const [departments, setDepartmnents] = useState<{ data: IDepartment[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedDep, setSelectedDep] = useState<IDepartment>({
    address: '',
    idDept: null,
    departament: '',
    departRod: '',
  });
  const [modalAdding, setModalAddding] = useState(false);
  const [modalEddit, setModalEddit] = useState(false);
  const [search, setSearch] = useState('');

  const getDepartaments = () => {
    setDepartmnents({ ...departments, loading: true });
    getAllDepartments().then((departments) => {
      setDepartmnents({ data: departments, loading: false });
    });
  };

  useEffect(() => {
    getDepartaments();
  }, []);

  const toggleModalAdding = (isOpen = true) => {
    console.log('adfasdf');
    setModalAddding(isOpen);
  };

  const toggleModalEdding = (isOpen = true) => {
    setModalEddit(isOpen);
  };

  //no be

  const deleteDepartment = (departmentSelected: IDepartment) => {
    //deleteDepartment(id)
    console.log(departmentSelected);
    const newDepearments = departments.data.filter((department) => department.idDept !== departmentSelected.idDept);
    console.log(newDepearments);
    setDepartmnents({ ...departments, data: newDepearments });
  };

  const searchCategories = (value: string) => {
    setSearch(value);
  };

  const filtredTable = useMemo<IDepartment[]>(
    () => departments.data.filter((item) => item.departament.toLocaleLowerCase().includes(search.toLocaleLowerCase())),
    [search, departments],
  );

  const columns = [
    {
      key: '1',
      title: 'Адрес',
      dataIndex: 'address',
    },
    {
      key: '2',
      title: 'Департамент',
      dataIndex: 'departament',
    },
    {
      key: '3',
      title: 'Департамент в р.п.',
      dataIndex: 'departRod',
    },
    {
      key: '4',
      title: 'ФИО руководителя',
      dataIndex: 'fioBoss',
    },
    {
      key: '5',
      title: 'Тел. код',
      dataIndex: 'telCode',
    },
    {
      key: '6',
      title: 'Тел. руководителя',
      dataIndex: 'telHead',
    },
    {
      key: '7',
      title: 'Тел. центра оперативного управления',
      dataIndex: 'telCode',
    },
    {
      key: '8',
      title: 'Тел. приемной',
      dataIndex: 'telReception',
    },
    {
      key: '9',
      title: 'unp',
      dataIndex: 'unp',
    },
    {
      key: '10',
      title: 'Действия',
      render: (departmentSelected: IDepartment) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить структурное подразделение?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteDepartment(departmentSelected);
            },
          });
        }

        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelectedDep(departmentSelected);
                toggleModalEdding();
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
      <Row gutter={[30, 30]}>
        <Col sm={24} md={8} lg={8}>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={''}
            enterButton="Поиск"
            size="middle"
            onSearch={searchCategories}
          />
        </Col>
        <Col sm={24} md={6} lg={6}>
          <Button onClick={() => toggleModalAdding()}>Добавить новый департамент</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filtredTable}
        loading={departments.loading}
        scroll={{ x: 800 }}
        bordered
      ></Table>
      {modalEddit && (
        <AddEditDepartmentForm
          modalName="Редактрование департамента"
          open={modalEddit}
          cancle={toggleModalEdding}
          data={selectedDep}
        />
      )}
      {modalAdding && (
        <AddEditDepartmentForm modalName="Создание департамента" open={modalAdding} cancle={toggleModalAdding} />
      )}
    </>
  );
};
