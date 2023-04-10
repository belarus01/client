import React, { useCallback, useEffect, useState } from 'react';
import { getObl } from '@app/api/ate.api';
import { useMounted } from '@app/hooks/useMounted';
import { Col, Row, Space, TablePaginationConfig } from 'antd';
import { Table } from '../common/Table/Table.styles';
import { ateObl } from '@app/domain/interfaces';

export const AteObl: React.FC = () => {
    const [tableData, setTableData] = useState<{ data: ateObl[]; loading: boolean }>({
        data: [],
        loading: false
    });

    const {isMounted} = useMounted()

    const fetch = useCallback(
        () => {
        setTableData((tableData) => ({ ...tableData, loading: true }));
        getObl().then((res: any) => {
         
         setTableData({data: res, loading: false})
         console.log(tableData);
        })
        
     }, [isMounted])

    useEffect(() => {
        console.log('ssss1');
        fetch()
    }, [fetch])

    const columns = [
        {
            key: "1",
            title: "Область",
            dataIndex: "nameObl",
        },
        {
            key: "2",
            title: "Статус",
            dataIndex: "active"
        },
        {
            key: "3",
            title: "Дата обновления",
            dataIndex: "dateRecord"
        },
        {
            key: "4",
            title: "Действие",
            render: (active: number) => {
                return (
                    <>
                        <button>aaaaaaaaaa</button>
                    </>
                )
            }
        }
    ]
    
        return (
            <>
                {/* <Row gutter={[30, 30]}>
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
                </Row> */}
                <Table
                    columns={columns}
                    dataSource={tableData.data}
                    pagination={false}
                    loading={tableData.loading}
                    scroll={{ x: 800 }}
                    bordered
                />
            </>
    
        )
    }

export default AteObl;