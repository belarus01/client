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
import { AddUserForm } from '@app/components/users/forms/AddUserForm';
import { Button } from '../common/buttons/Button/Button';
import { SearchInput } from '../common/inputs/SearchInput/SearchInput';
import { notificationController } from '@app/controllers/notificationController';
import { SSubj } from '../../domain/interfaces';
import { useNavigate } from 'react-router-dom';
import { AddSubjectForm } from './forms/AddSubjectForm';

const initialPagination: Pagination = {
    current: 1,
    pageSize: 15,
};

export const SubjectsTable: React.FC = () => {
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
    const navigate = useNavigate();

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

    const updateTable = () => {
        // fetch(tableData.pagination);
    }

    const showAddSubjectModal = () => {
        setOpen(true);
    };

    const hideAddSubjectModal = () => {
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

    const handleDeleteRow = (user: SSubj) => {

    }

    const handleSwitchClick = (user: User) => {

    }

    const handleEditClick = (user: User) => {
        setOpen
    }

    const handleSearch = (value: string) => {
        console.log(value);
    }

    const columns = [
        {
            key: "2",
            title: "УНП",
            dataIndex: "unp",
        },
        {
            key: "3",
            title: "Юридический адрес",
            dataIndex: "addr_yur"
        },

        {
            key: "4",
            title: "Действия",
            width: '15%',
            render: (subj: SSubj) => {
                return (
                    <Space>
                        <Button
                            type="ghost"
                            onClick={() => {
                                navigate('subjectId=' + `${subj.idSubj}`)
                                // notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
                            }}
                        >
                            {'Открыть'}
                        </Button>

                    </Space>

                )
            }
        },
    ];

    return (
        <>
            <Row gutter={[30, 30]}>
                <Col sm={24} md={8} lg={8} >
                    <SearchInput
                        placeholder={''}
                        enterButton="Поиск"
                        size="middle"
                        onSearch={handleSearch}
                    />
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
            <AddSubjectForm open={open} onCancel={hideAddSubjectModal} onTableChange={updateTable} />
        </>

    )
}