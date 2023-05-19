import TheTable from '@app/components/tables/TheTable';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal as Alert } from 'antd';
import FireForm from '../chListForms/FormFire';
import { getAllFireCardBuildsBySubjId } from '@app/api/fire.api';

export interface IFireCategory {
    nameBuild: string;
    space: string;
    type: string;
    idList: number | null;
}
const FireTable: React.FC = () => {
    const [tableData, setTableData] = useState<{ data: IFireCategory[]; loading: boolean }>({
        data: [],
        loading: false,
    });
    const [openAddingForm, setOpenAddingForm] = useState(false);
    const [openEddingForm, setOpenEddingForm] = useState(false);
    const [selected, setSelected] = useState<IFireCategory>({
        nameBuild: '',
        space: '',
        type: '',
        idList: null,
    });
    const [search, setSearch] = useState('');

    const fetch = () => {
        setTableData({ ...tableData, loading: true });
        getAllFireCardBuildsBySubjId().then((res) => {
            setTableData({ data: res, loading: false });
        });
    };

    useEffect(() => {
        fetch();
    }, []);

    const toggleModalAdding = (isOpen = true) => {
        setOpenAddingForm(isOpen);
    };

    const toggleModalEdding = (isOpen = true) => {
        setOpenEddingForm(isOpen);
    };

    // const searchCategories = (value: string) => {
    //     setSearch(value);
    //     console.log(value);
    // };

    // const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearch(e.target.value);
    // };

    //   const filtredTable = useMemo<IFireCategory[]>(() => {
    //     return tableData.data.filter((item) => item.job.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    //   }, [search, tableData]);

    // No BE

    const deleteCategory = (category: IFireCategory) => {
        const newData = tableData.data.filter((item) => item.idList !== category.idList);
        setTableData({ ...tableData, data: newData });
    };

    const toggleModal = () => {
        setOpenAddingForm(false);
        setOpenEddingForm(false);
        fetch();
    };

    const table = useMemo<IFireCategory[]>(() => {
        return tableData.data;
    }, [tableData]);

    const columns = [
        {
            key: 1,
            title: 'Наименование сооружения',
            dataIndex: 'nameBuild',
        },
        {
            key: 2,
            title: ' Функциональное назначение',
            dataIndex: 'type',
            render: (_, { idUnit_2 }) => <span>{idUnit_2.type}</span>
        },
        {
            key: 3,
            title: 'Площадь, кв.м',
            dataIndex: 'space',
        },
        {
            key: 4,
            title: 'Действия',
            align: 'center',
            render: (itemSelected: IFireCategory) => {
                function onDeleteDep() {
                    Alert.confirm({
                        title: 'Вы действительно хотите удалить?',
                        okText: 'Удалить',
                        cancelText: 'Отмена',
                        closable: true,
                        onCancel: () => false,
                        onOk: () => {
                            deleteCategory(itemSelected);
                        },
                    });
                }

                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                setSelected(itemSelected);
                                toggleModalEdding(true);
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
            <TheTable
                // onRow={onRow}
                search={search}
                FormComponent={(props) => <FireForm data={props.data} close={toggleModal} />}
                //searchFunc={searchCategories}
                selected={selected}
                //setSearchFunc={searchFunc}
                dataTable={{ data: table, loading: tableData.loading }}
                columns={columns}
                titleMoadlEditing={'Редактирование'}
                titleModalAdding={'Создание'}
                toggleModalAdding={toggleModalAdding}
                toggleModalEditing={toggleModalEdding}
                openAddingForm={openAddingForm}
                openEditingForm={openEddingForm}
            />
        </>
    );
};

export default FireTable;
