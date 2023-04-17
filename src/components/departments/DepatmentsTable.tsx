import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "../common/Modal/Modal";
import { Button } from "../common/buttons/Button/Button";
import { Table } from "../common/Table/Table";
import { BaseButtonsForm } from "../common/forms/BaseButtonsForm/BaseButtonsForm";
import { Input } from "../common/inputs/Input/Input";
import { AddEditDepartmentForm } from "./forms/AddEditDepartmentForm";

export interface StrDepartment{
    id: string;
    name: string;
    department: string;
}

export const DepartmentsTable:React.FC = ()=>{
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [modalName, setModalName] = useState('Редактирование структурного подразделения');
    const [selectedStrDep, setSelectedStrDep] = useState<StrDepartment>();
    const [departments, setDepartmnents] = useState<StrDepartment[]>([]);

    const columns = [
        {
            key: "1",
            title:"№ пп",
            dataIndex:"id"
        },
        {
            key: "2",
            title:"Название",
            dataIndex:"name"
        },
        {
            key: "4",
            title:"Действия",
            render: (department: StrDepartment) =>{
                function onEditDep(department: StrDepartment) {
                   setOpen(true);
                }
    
                function onDeleteDep(department: StrDepartment) {
                    Modal({
                        title: "Вы действительно хотите удалить структурное подразделение?",
                        okText: 'Удалить',
                        cancelText: 'Отмена',
                        onOk: () => {
                           
                        }
                    })
                    const data = departments.filter(item => item.id !== department.id);
                    //await deleteUser(user.id); 
                    setDepartmnents(data);
                }
        
                return(
                    <>
                    <EditOutlined
                        onClick={()=>{
                            setSelectedStrDep(department);
                            onEditDep(department);
                        }}
                    />
                    <DeleteOutlined
                        onClick={()=>{
                            onDeleteDep(department);
                        }}
                        style={{color:"red", marginLeft: 12}}
                    />
                    </>
                )
            }
        },
    ];
    const cancleEdit =()=>  {
       
    }

    function handleChange(): void {
        throw new Error("Function not implemented.");
    }

    const handleButtonClick = ()=>{

    }

    return (
        <>
        <Button type='primary' onClick={handleButtonClick}>Добавить структурное подразделение</Button>
        <Table columns={columns} dataSource={departments} ></Table>
        <AddEditDepartmentForm />    
        </>
    )
}