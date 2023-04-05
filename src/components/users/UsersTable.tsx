import { Table } from '@app/components/common/Table/Table';
import React, { useCallback, useEffect, useState } from 'react';
import { UserModel } from '../../domain/UserModel';
import { Pagination, getBasicTableData } from '../../api/table.api';
import { useMounted } from '@app/hooks/useMounted';
import { useTranslation } from 'react-i18next';
import { Col, Row, Space, TablePaginationConfig } from 'antd';
import { getAllUsers } from '@app/api/users.api';
import { User } from '@app/domain/interfaces';
import { AudioOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Switch } from '@app/components/common/Switch/Switch';
import {  AddUserForm } from '@app/components/users/forms/AddUserForm';
import { Button } from '../common/buttons/Button/Button';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { notificationController } from '@app/controllers/notificationController';

const initialPagination: Pagination = {
    current: 1,
    pageSize: 15,
};

export const UsersTable: React.FC = () => {
    const [tableData, setTableData] = useState<{ data: User[]; pagination: Pagination; loading: boolean }>({
        data: [],
        pagination: initialPagination,
        loading: false
    });
    const [open, setOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [type, setType] = useState<boolean>(false);

    const { t } = useTranslation();
    const { isMounted } = useMounted();

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
        // setTableData((tableData) => ({ ...tableData, loading: true }));
        // getAllUsers().then((res) => {
        //   if (isMounted.current) {
        //     setTableData({ data: res, pagination: initialPagination, loading: false });
        //   }
        // });
      },
      [isMounted],
    );

      useEffect(() => {
       // fetch(initialPagination);
      }, [fetch]);
    
      const handleTableChange = (pagination: TablePaginationConfig) => {
       // fetch(pagination);
      };

      const updateTable = ()=>{
       // fetch(tableData.pagination);
      }

      const showAddUserModal = () => {
        setOpen(true);
      };
    
      const hideAddUserModal = () => {
        setOpen(false);
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

      const handleDeleteRow = (user:User) =>{
        
      }

      const handleSwitchClick = (user:User) =>{

      }

      const handleEditClick = (user:User) =>{
          setOpen
      }

      const handleSearch = (value:string) =>{
        console.log(value);
      }
      
      const columns = [
        {
            key: "2",
            title: "Фамилия",
            dataIndex: "lName", 
        },
        {
            key: "3",
            title: "Имя",
            dataIndex: "fName"
        },
        {
            key: "4",
            title: "Отчество",
            dataIndex: "sName"
        },
        {
            key: "5",
            title: "Должность",
            width: '10%',
            render:(user:User)=>{
                return(
                    <p>{user.idDeptJob2.job}</p>
                )
            }
        },
        {
            key: "6",
            title: "Телефон",
            dataIndex: "tel"
        },
        {
            key: "7",
            title: "Логин",
            dataIndex: "user",
            width: '10%',
        },
        {
            key: "8",
            title: "Статус",
            width: '5%',
            render: (user: User)=>{
                const active = user.active;
                return(
                  <p>{active === 1 ? 'Активен' : 'Заблокирован'}</p>
                )
            }
        },
        {
            key: "9",
            title: "Действия",
            width: '15%',
            render: (user: User) => { 
                return (
                    <Space>
                        <Button
              type="ghost"
              onClick={() => {
               // notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
              }}
            >
              {'Сменить пароль'}
            </Button>
            <EditOutlined
                            onClick={() => {
                                setSelectedUser(user);
                                setType(true);
                                setOpen(true);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {

                                handleDeleteRow(user);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />


                        <Switch checked={user.active === 1} onClick={() => { handleSwitchClick(user) }} style={{ marginLeft: 12 }}></Switch>
            </Space>
                       
                    
                )
            }
        },
    ];



    return (
      <> 
      <Row gutter={[30,30]}>
        <Col sm={24} md={8} lg={8} >
        <SearchInput
              placeholder={''}
              enterButton="Поиск"
              size="middle"
              onSearch={handleSearch}
            />
        </Col>
        <Col sm={24} md={6} lg={6}>
        <Button onClick={showAddUserModal}>Добавить пользователя</Button>
        </Col>
      </Row>
        <Table
          columns={columns}
          dataSource={tableData.data}
          pagination={tableData.pagination}
          loading={tableData.loading}
          onChange={handleTableChange}
          scroll={{x:800}}
          bordered
        />
         <AddUserForm open={open} onCancel={hideAddUserModal} onTableChange={updateTable}  />
      </>
       
    )
}