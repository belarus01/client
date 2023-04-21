import { getAllObjectsBySubjectId, getSubjObjSpecifByIdSubjObj } from "@app/api/objects.api";
import { notificationController } from "@app/controllers/notificationController";
import { SSubjObj, SSubjObjSpecif } from "@app/domain/interfaces";
import { useMounted } from "@app/hooks/useMounted";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "../common/Table/Table";
import { Collapse, TableColumnsType } from "antd";
import { Panel } from "../common/Collapse/Collapse";
import { TableRowSelection } from "antd/lib/table/interface";

interface ExpandedDataType {
    key: React.Key;

}

export const SubObjectTableCollapsed: React.FC = () => {

    const [objects, setObjects] = useState<SSubjObj[]>([]);
    
    const { isMounted } = useMounted();


    const columns = [
        {
            key: "1",
            title: "УНП",
            dataIndex: "unp",
        },
        {
            key: "2",
            title: "Наименование объекта",
            dataIndex: "nameObj"
        },
        {
            key: "3",
            title: "Место нахождения объекта",
            dataIndex: "addrObj"
        },
        {
            key: "4",
            title: "Место осуществления деятельности",
            dataIndex: "addrDescr"
        },
        {
            key: "5",
            title: "Ответственное лицо",
            dataIndex: "fioFireman"
        }
    ];
    const fetch1 = useCallback((idObj:number) => {
        getSubjObjSpecifByIdSubjObj(idObj).then((res)=>{
            if(isMounted.current){
                res.forEach(element=>{
                    if(element.idUnit_41 == 4000)//здание
                        data1.push(element);
                    else if(element.idUnit_41 == 4001)
                        data2.push(element);
                    else if(element.idUnit_41 == 4002)
                        data3.push(element);
                })
            }
            
        })
       
    },
        [isMounted]);


    const fetch = useCallback(() => {

        getAllObjectsBySubjectId(1460).then((res) => {
            if (isMounted.current) {
                setObjects(res)
            }
        }).catch((e) =>
            notificationController.error({ message: 'Произошла ошибка при загрузке данных' }));
    },
        [isMounted]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const rowSelection: TableRowSelection<SSubjObj> = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        },
      };
    const onExpand = (expendable:boolean, record:any) =>{

    }
    
    const expandedRowRender = (record:any) => {
        const data1: SSubjObjSpecif[] = [];//здание
        const data2: SSubjObjSpecif[] = [];
        const data3: SSubjObjSpecif[] = [];
        const columns = [
            {
                key: "1",
                title: "Наименование сооружения",
                dataIndex: "nameBuild",
            },
            {
                key: "2",
                title: "Площадь",
                dataIndex: "area"
            },
            {
                key: "3",
                title: "Дата регистрации",
                dataIndex: "dateReg"
            },
            {
                key: "4",
                title: "ФИО представителя",
                dataIndex: "nameAgent"
            },
            {
                key: "5",
                title: "Телефон представителя",
                dataIndex: "telAgent"
            }
        ];
            fetch1(record.idObj);
                return (
            <Collapse>
                <Panel header="Здания" key="1">
                   <Table dataSource={data1} columns={columns} rowSelection={{ ...rowSelection }} rowKey={(record) => record.idSpecif}>

                   </Table>
                </Panel>
                <Panel header="Сооружения" key="2">
                    <Table
                        dataSource={data2} columns={columns} rowSelection={{ ...rowSelection }} rowKey={(record) => record.idSpecif}
                    >
                    
                   </Table>
                </Panel>
                <Panel header="Наружные установки" key="3">
                    <Table
                        dataSource={data3} columns={columns} rowSelection={{ ...rowSelection }} rowKey={(record) => record.idSpecif}
                    >
                    
                   </Table>
                </Panel>
            </Collapse>
        )
    }

    return (
        <>
            <Table rowKey={(record) => record.idObj}
                columns={columns}
                expandable={{expandedRowRender, onExpand}}
                
                dataSource={objects}
                rowSelection={{ ...rowSelection }}
             
            />
        </>
    )
}