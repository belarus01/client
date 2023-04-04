import { Modal } from "@app/components/common/Modal/Modal";
import { SDept, SDeptJob, SDeptNode, User } from "@app/domain/interfaces";
import { useEffect, useState } from "react";
import { BaseButtonsForm } from '../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from "@app/components/common/inputs/Input/Input";
import { Select, Option } from "@app/components/common/selects/Select/Select";
import { TreeSelect } from "antd";
import { Button } from "@app/components/common/buttons/Button/Button";
import { getAllJobs } from "@app/api/users.api";
import { deptToTreeNode } from "@app/utils/utils";
import { getAllDepartments } from "@app/api/departments.api";

type Props = {
    selectedUser?: User;
    type: boolean;
    setSelectedUser: any;
    open: boolean;
    setOpen: any;
}


export const AddEditUserForm = ({ selectedUser, setSelectedUser, open, setOpen, type }: Props) => {
    const [modalName, setModalName] = useState('Содание пользователя');
    const [positions, setPositions] = useState<SDeptJob[]>([]);
    const [positionsStr, setPositionsStr] = useState<string[]>([]);
    const [departments, setDepartments] = useState<SDeptNode[]>([]);
    
    //const admin = useCurrentUser();

    useEffect(() => {
        if (type === false)
            setModalName('Содание пользователя');
        else if (type === true)
            setModalName('Редактирование пользователя');
    }, [type]);

    useEffect(() => {
        getAllJobs().then((responce) => {
            let arr: string[] = [];
            setPositions(responce.data);
            positions.forEach(element => {
                arr.push(element.job);
            });
            setPositionsStr(arr);
        })
    }, [selectedUser]);

    useEffect(() => {
        getAllDepartments().then((responce) => {
            // console.log(responce.data);
            // const arr:SDeptNode[] = [];
            // console.log(responce.data.length);
            // for(let i = 0; i<responce.data.length; i++){
            //     console.log(responce.data[i]);
            //     arr.push(deptToTreeNode(responce.data[i]));
            // }
            // console.log('arr');
            // console.log(arr);
            // setDepartments(makeTree(arr));
        })
    }, [selectedUser]);


    const cancelEdit = () => {
        setOpen(false);
    }

    const onFinish = (values: any) => {
        console.log(values);
    }

    const initialvalues = {
        login: selectedUser?.user,
        fName: selectedUser?.fName,
        sName: selectedUser?.sName,
        lName: selectedUser?.lName,
        tel: selectedUser?.tel,
        job: selectedUser?.idDeptJob2.job,
        userRole: selectedUser?.userRole,
        departament: selectedUser?.idDept2.departament

    }

    return (
        <Modal
            closable
            footer={null}
            onCancel={cancelEdit}
            destroyOnClose
            title={modalName}
            centered
            open={open}
        >
            <BaseButtonsForm
                layout="vertical"
                initialValues={initialvalues}
                onFinish={onFinish} isFieldsChanged={false}            >
                <BaseButtonsForm.Item label="Фамилия" name="lName">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Имя" name="fName">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Отчество" name="sName">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Телефон" name="tel">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Логин" name="login">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Должность" name='job'>
                    <Select>{
                        positionsStr.map((option) => (
                            <Option value={option}>{option}</Option>
                        ))}
                    </Select>
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Подразделение" name='departament'>
                    <TreeSelect fieldNames={{
                        label: 'departament',
                        value: 'departament'
                    }} labelInValue={true} treeData={departments} treeDataSimpleMode={{
                        id: 'idDept',
                        pId: 'idParent',
                    }}
                        treeNodeLabelProp='departament'
                        treeNodeFilterProp='idDept'
                    >

                    </TreeSelect>
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Роль" name='userRole'>
                    <Select >
                        <Option key={1} value={1}>Администратор АПК КНО</Option>
                        <Option key={2} value={2}>Руководитель подразделения</Option>
                        <Option key={3} value={3}>Администратор подразделения</Option>
                        <Option key={4} value={4}>Пользователь</Option>
                        <Option key={5} value={5}>Курсант</Option>
                    </Select>
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item >
                    <Button htmlType="submit" type="primary">Сохранить</Button>
                </BaseButtonsForm.Item>


            </BaseButtonsForm>
        </Modal>
    )
}