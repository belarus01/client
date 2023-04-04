import { Table } from '@app/components/common/Table/Table';
import React, { useCallback, useEffect, useState } from 'react';
import { UserModel } from '../../domain/UserModel';
import { Pagination, getBasicTableData } from '../../api/table.api';
import { useMounted } from '@app/hooks/useMounted';
import { useTranslation } from 'react-i18next';
import { TablePaginationConfig } from 'antd';
import { getAllUsers } from '@app/api/users.api';
import { User } from '@app/domain/interfaces';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Switch } from '@app/components/common/Switch/Switch';
import { AddEditUserForm } from '@app/components/users/forms/AddUserForm';

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
        setTableData((tableData) => ({ ...tableData, loading: true }));
        getAllUsers().then((res) => {
          if (isMounted.current) {
            setTableData({ data: res, pagination: initialPagination, loading: false });
          }
        });
      },
      [isMounted],
    );

      useEffect(() => {
        fetch(initialPagination);
      }, [fetch]);
    
      const handleTableChange = (pagination: TablePaginationConfig) => {
        fetch(pagination);
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
                    <>
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
                    </>
                )
            }
        },
    ];

    return (
      <> 
        <Table
          columns={columns}
          dataSource={tableData.data}
          pagination={tableData.pagination}
          loading={tableData.loading}
          onChange={handleTableChange}
          scroll={{x:800}}
          bordered
        />
         <AddEditUserForm selectedUser={selectedUser} setSelectedUser={setSelectedUser} open={open} setOpen={setOpen} type={type} />
      </>
       
    )
}