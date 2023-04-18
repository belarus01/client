import { SDept, SEvents, SEventsOrder } from "@app/domain/interfaces";
import { useMounted } from "@app/hooks/useMounted";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from '../../api/users.api';
import { getAllEvents, getAllEventsOrders } from "@app/api/events.api";
import { notificationController } from "@app/controllers/notificationController";
import { Button } from "../common/buttons/Button/Button";
import { Table } from "../common/Table/Table";
import { Space } from "antd";

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
        throw new Error("Function not implemented.");
    }
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
                        {str === 91 ? <p>проверка</p> : str === 92 ? <p>мониторинг</p> : str === 93 ? <p>обследование</p> : str === 94 ? <p>мониторинг</p> : <p> </p>}
                    </>
                )
            }
        },
        {
            key: "6",
            title: "Вид",

            render: (event: SEventsOrder) => {
                
               
                    if (event.idUnit_4 === 91 && event.idUnit_3 === 81) {
                        console.log("2");
                        return (<p>выборочная</p>);
                    }
                    else if (event.idUnit_4 === 91 && event.idUnit_3 === 82) {
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
                    </Space>

                )
            }
        },
    ];

    return (
        <>

            <Button onClick={handleAddClick}>Добавить мероприятие</Button>
            <Table
                dataSource={tableData.data}
                pagination={tableData.pagination}
                loading={tableData.loading}
                scroll={{ x: 800 }}
                columns={columns}
                bordered

            />
        </>

    )
}