import { Table } from '@app/components/common/Table/Table';
import React, { useCallback, useEffect, useState } from 'react';
import { Pagination, getBasicTableData } from '../../api/table.api';
import { useMounted } from '@app/hooks/useMounted';
import { useTranslation } from 'react-i18next';
import { Col, Row, Space, TablePaginationConfig, Modal as Alert, Modal } from 'antd';
import { getAllUsers } from '@app/api/users.api';
import { User } from '@app/domain/interfaces';
import { AudioOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Switch } from '@app/components/common/Switch/Switch';
import { Button } from '../common/buttons/Button/Button';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { notificationController } from '@app/controllers/notificationController';
import { SSubj } from '../../domain/interfaces';
import { useNavigate } from 'react-router-dom';
import { AddSubjectForm } from './forms/AddSubjectForm';
import { getAllDepartments } from '@app/api/departments.api';
import { deleteSubjById, getAllSubjSortAndPage, getAllSubjects } from '@app/api/subjects.api';
import { useAppSelector } from '@app/hooks/reduxHooks';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 10,
};

export const SubjectsTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: SSubj[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<SSubj>();
  const [type, setType] = useState<boolean>(false);

  const { t } = useTranslation();
  const { isMounted } = useMounted();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  // const fetch = useCallback(
  //     (pagination: Pagination) => {
  //       setTableData((tableData) => ({ ...tableData, loading: true }));
  //       getBasicTableData(pagination).then((res) => {
  //         if (isMounted.current) {
  //           setTableData({ data: res.data, pagination: res.pagination, loading: false });
  //         }
  //       });
  //     },
  //     [isMounted],
  //   );

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getAllSubjSortAndPage({ ...pagination, sortBy: 'unp', sortDirection: 'ASC' }).then((res) => {
        if (isMounted.current) {
          setTableData({
            data: res.data,
            pagination: { ...pagination, total: res.total },
            loading: false,
          });
        }
      });
    },
    [isMounted],
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);

    fetch(pagination);
  };

  const updateTable = () => {
    fetch(tableData.pagination);
  };

  const showAddSubjectModal = () => {
    setOpen(true);
  };

  const hideAddSubjectModal = () => {
    setOpen(false);
  };

  const deleteItem = (deletedItem: SSubj) => {
    console.log(deletedItem);
    if (deletedItem.idSubj) {
      console.log('delete', deletedItem.idSubj);
      deleteSubjById(deletedItem.idSubj)
        .then(() => {
          notificationController.success({ message: 'Субъект успешно удален' });
          updateTable();
        })
        .catch((e) => {
          notificationController.error({ message: 'Ошибка', description: `Субъект не был удален, ${e}` });
        });
      // deleteSubjById(deletedItem.idSubj);
    }
  };

  // const handleDeleteRow = (rowId: number) => {
  //   setTableData({
  //     ...tableData,
  //     data: tableData.data.filter((item) => item.key !== rowId),
  //     pagination: {
  //       ...tableData.pagination,
  //       total: tableData.pagination.total ? tableData.pagination.total - 1 : tableData.pagination.total,
  //     },
  //   });
  // };

  const handleEditClick = (user: User) => {
    setOpen;
  };

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const columns = [
    {
      key: '2',
      title: 'УНП',
      dataIndex: 'unp',
    },
    {
      key: '3',
      title: 'Название',
      dataIndex: 'subj',
    },
    {
      key: '4',
      title: 'Юридический адрес',
      dataIndex: 'addrYur',
    },
    {
      key: '5',
      title: 'Действия',
      width: '15%',
      render: (subj: SSubj) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteItem(subj);
            },
          });
        }
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                console;
                navigate(`/common/subject/${subj.idSubj}`, { state: subj });
                // notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
              }}
            >
              {'Открыть'}
            </Button>
            <DeleteOutlined
              onClick={() => {
                onDeleteDep();
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={[30, 30]}>
        <Col sm={24} md={8} lg={8}>
          <SearchInput placeholder={''} enterButton="Поиск" size="middle" onSearch={handleSearch} />
        </Col>
        <Col sm={24} md={6} lg={6}>
          <Button onClick={showAddSubjectModal}>Добавить субъект</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={tableData.data}
        pagination={tableData.pagination}
        loading={tableData.loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
        bordered
      />
      <Modal
        maskClosable={false}
        closable
        footer={null}
        onCancel={hideAddSubjectModal}
        destroyOnClose
        title={'Создание субъекта'}
        centered
        open={open}
      >
        <AddSubjectForm onCancel={hideAddSubjectModal} onTableChange={updateTable} updateTable={updateTable} />
      </Modal>
    </>
  );
};
