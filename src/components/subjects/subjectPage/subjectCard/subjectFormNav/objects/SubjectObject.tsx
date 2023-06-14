import { getAllObjectsBySubjectId } from '@app/api/objects.api';
import { Pagination } from '@app/api/users.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import TheTable from '@app/components/tables/TheTable';
import { SSubj, SSubjObj } from '@app/domain/interfaces';
import { useMounted } from '@app/hooks/useMounted';
import { Space } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserSwitchOutlined } from '@ant-design/icons';
import SubjectObjectForm from './formsObject/SubjectObjectForm';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 15,
};

const SwichUser = styled(UserSwitchOutlined)`
  position: fixed;
  top: 15%;
  right: 10%;
  width: 50px;
  height: 50px;
  font-size: 50px;
`;
export const SubjectObjects: React.FC = () => {
  // const user = useAppSelector((state) => state.user.user);
  // need add user from store after auth
  const [user, setUser] = useState({
    org: 1,
  });
  const [subj, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: '',
  });

  const [openAddingForm, setOpenAddingForm] = useState<boolean>(false);
  const [openEditingForm, setOpenEditingForm] = useState<boolean>(false);
  const { state } = useLocation();

  useEffect(() => {
    setSubj(state);
  }, [state]);
  const [tableData, setTableData] = useState<{ data: SSubjObj[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  const navigate = useNavigate();

  const { isMounted } = useMounted();
  const { idSubj } = useParams<{ idSubj?: string }>();
  console.log(idSubj);

  // 100008077 1460

  const fetch = useCallback(() => {
    setTableData((tableData) => ({ ...tableData, loading: true }));

    if (idSubj)
      getAllObjectsBySubjectId(idSubj).then((res) => {
        console.log(res);

        if (isMounted.current) {
          setTableData({ data: res, pagination: initialPagination, loading: false });
        }
      });
  }, [idSubj, isMounted]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const data = useMemo(() => {
    return tableData.data.filter((item) => item.org === user.org);
  }, [tableData.data, user.org]);

  const toggleModalAdd = (isOpen = false) => {
    setOpenAddingForm(isOpen);
  };

  const toggleModalEd = (isOpen = false) => {
    setOpenEditingForm(isOpen);
  };

  const columns = useMemo(() => {
    const columns = [
      {
        key: '1',
        title: 'УНП',
        dataIndex: 'unp',
      },
      {
        key: '2',
        title: 'Наименование объекта',
        dataIndex: 'nameObj',
      },
      {
        key: '3',
        title: 'Место нахождения объекта',
        dataIndex: 'addrObj',
      },
      {
        key: '4',
        title: 'Место осуществления деятельности',
        dataIndex: 'addrDescr',
      },
      {
        key: '5',
        title: 'Ответственное лицо',
        dataIndex: 'fioFireman',
      },
      {
        key: '4',
        title: 'Действия',
        width: '15%',
        render: (obj: SSubjObj) => {
          return (
            <Space>
              <Button
                type="ghost"
                onClick={() => {
                  //navigate('/subject', {state:subj})
                  navigate(`${obj.idObj}`, { state: state });
                  console.log(obj.idObj);

                  // notificationController.info({
                  //   description: 'safas',
                  //   message: 'asdfasdfadsfasdfasdf',
                  // });
                }}
              >
                Открыть
              </Button>
            </Space>
          );
        },
      },
    ];
    if (user.org == 0) {
      const actions = columns[columns.length - 1];
      columns[columns.length - 1] = {
        key: 'numOpo',
        title: 'Номер ОПО',
        dataIndex: 'numOpo',
      };
      columns.push(actions);
      return columns;
    }
    return columns;
  }, [navigate, state, user.org]);

  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <TheTable
          columns={columns}
          dataTable={{ data: data, loading: tableData.loading }}
          toggleModalEditing={toggleModalEd}
          toggleModalAdding={toggleModalAdd}
          openAddingForm={openAddingForm}
          openEditingForm={openEditingForm}
          pagination={false}
          FormComponent={(props) => <SubjectObjectForm {...props} />}
          // search={search}
          // FormComponent={(props) => <CreateEvent {...props} />}
          // searchFunc={searchCategories}
          // selected={selectedAuto}
          // setSearchFunc={searchFunc}
          // dataTable={{ data: events.data, loading: events.loading }}
          // columns={columns}
          // titleMoadlEditing={'Редактирование'}
          // titleModalAdding={'Создание'}
          // toggleModalAdding={toggleModalAdding}
          // toggleModalEditing={toggleModalEditing}
          // openAddingForm={modalAdding}
          // openEditingForm={modalEditing}
          // titleButtonAdd="Добавить новое мероприятие"
          propsFrom={{ subj: subj }}
        />
      </div>

      <SwichUser onClick={() => setUser({ ...user, org: user.org == 0 ? 1 : 0 })} />
    </>
  );
};
