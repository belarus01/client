import { SDept, SEvents, SEventsOrder } from "@app/domain/interfaces";
import { useMounted } from "@app/hooks/useMounted";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from '../../api/users.api';
import { deleteEventOrder, getAllEvents, getAllEventsOrders, searchEventsOrders } from "@app/api/events.api";
import { notificationController } from "@app/controllers/notificationController";
import { Button } from "../common/buttons/Button/Button";
import { Table } from "../common/Table/Table";
import { Col, Modal, Row, Space, TablePaginationConfig } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { SearchInput } from "../common/inputs/SearchInput/SearchInput";
import { AddEventOrderForm } from "./forms/AddEventForm";

const initialPagination: Pagination = {
    current: 1,
    pageSize: 15,
};

export const EventsTable: React.FC = () => {

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [selected, setSelected] = useState<SEventsOrder>();
    const [tableData, setTableData] = useState<{ data: SEventsOrder[]; pagination: Pagination; loading: boolean }>({
        data: [],
        pagination: initialPagination,
        loading: false
    });

    const { isMounted } = useMounted();

    const fetch = useCallback((pagination: Pagination) => {
        setTableData((tableData) => ({ ...tableData, loading: true }));
        getAllEventsOrders().then((res) => {
            if (isMounted.current) {
                setTableData({ data: res, pagination: initialPagination, loading: false });
            }
        }).catch((e) =>
            notificationController.error({ message: 'Произошла ошибка при загрузке данных' }));
    },
        [isMounted]);

    useEffect(() => {
        fetch(initialPagination);
    }, [fetch]);

    function handleAddClick(): void {
        setOpenAdd(true);
    }

    const onCancelAdd = () =>{
        setOpenAdd(false);
    }

    const handleDeleteRow = (event: SEventsOrder) => {
        Modal.confirm({
            title: "Вы действительно хотите удалить мероприятие?",
            okText: 'Удалить',
            cancelText: 'Отмена',
            onOk: async () => {
                deleteEventOrder(event.idEventOrder).then((res) => {
                    notificationController.success({ message: 'Мероприятие удалено' })
                    handleTableChange(initialPagination);
                }).catch((e) => {
                    notificationController.error({ message: 'Ошибка при удалении мероприятия' });
                })
            }
        }
        );

    }

    const handleSearch = (value: string) => {
        // setTableData({ ...tableData, loading: true });
        // if (value.length === 0)
        //   fetch(tableData.pagination)
        // searchEventsOrders(value).then((res) => {
        //   setTableData({ ...tableData, data: res, loading: false })
        // })
    }

    const handleTableChange = (pagination: TablePaginationConfig) => {
        fetch(pagination);
    };

    const columns = [
        {
            key: "1",
            title: "Мероприятие",
            dataIndex: "idEvent2",
            render: (idEvent2: SEvents) => {
                return (
                    <>
                        {idEvent2 ? <p>{idEvent2.event}</p> : <p> </p>}
                    </>
                )
            }
        },
        {
            key: "2",
            title: "Орган, выдавший предписание",
            dataIndex: "idDeptIss2",
            render: (idDeptIss2: SDept) => {
                return (
                    <p>{idDeptIss2 !== null ? idDeptIss2.departament : ''}</p>
                )
            }
        },
        {
            key: "3",
            title: "Орган, проводящий проверку",
            dataIndex: "idDept2",
            render: (idDept2: SDept) => {
                return (
                    <p>{idDept2 !== null ? idDept2.departament : ''}</p>
                )
            }
        },
        {
            key: "4",
            title: "Основание назначения мероприятия",
            dataIndex: "reasonOrder",
        },
        {
            key: "5",
            title: "Тип",
            dataIndex: "idUnit_4",
            render: (str: number) => {
                return (
                    <>
                        {String(str) === '91' ? <p>проверка</p> : String(str) === '92' ? <p>мониторинг</p> : String(str) === '93' ? <p>обследование</p> : String(str) === '94' ? <p>мониторинг</p> : <p> </p>}
                    </>
                )
            }
        },
        {
            key: "6",
            title: "Вид",

            render: (event: SEventsOrder) => {

                console.log(typeof (event.idUnit_4));
                if (String(event.idUnit_4) === '91' && String(event.idUnit_3) === '81') {
                    console.log("2");
                    return (<p>выборочная</p>);
                }
                else if (String(event.idUnit_4) === '91' && String(event.idUnit_3) === '82') {
                    console.log("3");
                    return (<p>внеплановая</p>);
                }

                else
                    return (<p> </p>);
            }
        }
        ,

        {
            key: "7",
            title: "Применяемые научно-технические средства",
            dataIndex: "technical"
        },
        {
            key: "8",
            title: "Дата начала",
            dataIndex: "dateBegin",
            render: (date: Date) => {
                const newDate = new Date(date);
                return (
                    <p>{newDate.toLocaleDateString()}</p>
                )
            }
        },
        {
            key: "9",
            title: "Дата окончания",
            dataIndex: "dateEnd",
            render: (date: Date) => {
                const newDate = new Date(date);
                return (
                    <p>{newDate.toLocaleDateString()}</p>
                )
            }
        },
        {
            key: "10",
            title: "Cтатус",
            dataIndex: "dateEnd",
            render: (date: Date) => {
                const newDate = new Date(date);
                return (
                    <p>{newDate.toLocaleDateString()}</p>
                )
            }
        },
        {
            key: "11",
            title: "Действия",
            width: '15%',
            render: (event: SEventsOrder) => {
                return (
                    <Space>
                        <Button
                            type="ghost"
                            onClick={() => {

                                //navigate('/subject', {state:subj})
                                // notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
                            }}
                        >
                            {'Открыть'}
                        </Button>
                        <DeleteOutlined
                            onClick={() => {
                                handleDeleteRow(event);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
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
                        placeholder={'Не менее 6 символов'}
                        enterButton="Поиск"
                        size="middle"
                        onSearch={handleSearch}
                    />
                </Col>
                <Col sm={24} md={6} lg={6}>
                    <Button onClick={handleAddClick}>Добавить мероприятие</Button>
                </Col>
            </Row>
            <Table
                dataSource={tableData.data}
                pagination={tableData.pagination}
                loading={tableData.loading}
                scroll={{ x: 800 }}
                columns={columns}
                bordered
            />
            <Modal
            closable
            footer={null}
            onCancel={onCancelAdd}
            destroyOnClose
            title={'Создание мероприятия'}
            centered
            
            open={openAdd}
            >
                <AddEventOrderForm/>
            </Modal>
        </>

    )
}