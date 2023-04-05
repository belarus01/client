import { Modal } from "@app/components/common/Modal/Modal";
import { SDept, SDeptJob, SDeptNode, User } from "@app/domain/interfaces";
import { useEffect, useState } from "react";
import { BaseButtonsForm } from '../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from "@app/components/common/inputs/Input/Input";
import { Select, Option } from "@app/components/common/selects/Select/Select";
import { TreeSelect } from "antd";
import { Button } from "@app/components/common/buttons/Button/Button";
import { Pagination, getAllJobs } from "@app/api/users.api";
import { deptToTreeNode, makeTree } from "@app/utils/utils";
import { getAllDepartments } from "@app/api/departments.api";
import { InputPassword } from "@app/components/common/inputs/InputPassword/InputPassword";

interface EditUserFormProps {
    open: boolean;
    onCancel: () => void;
    onTableChange: (pagination: Pagination) => void;
    selected: User;
}


export const AddUserForm: React.FC<EditUserFormProps> = ({ open, onCancel, onTableChange }) => {
    const [positions, setPositions] = useState<SDeptJob[]>([]);
    const [positionsStr, setPositionsStr] = useState<string[]>([]);
    const [departments, setDepartments] = useState<SDeptNode[]>([]);

    //const admin = useCurrentUser();

    useEffect(() => {
        // getAllJobs().then((responce) => {
        //     let arr: string[] = [];
        //     setPositions(responce.data);
        //     positions.forEach(element => {
        //         arr.push(element.job);
        //     });
        //     setPositionsStr(arr);
        // })
    }, []);

    useEffect(() => {
        // getAllDepartments().then((responce) => {
        //     console.log(responce.data);
        //     const arr:SDeptNode[] = [];
        //     console.log(responce.data.length);
        //     for(let i = 0; i<responce.data.length; i++){
        //         console.log(responce.data[i]);
        //         arr.push(deptToTreeNode(responce.data[i]));
        //     }
        //     console.log('arr');
        //     console.log(arr);
        //     setDepartments(makeTree(arr));
        // })
    }, []);

    const onFinish = (values: any) => {
        console.log(values);
        onCancel();
    }

    return (
        <Modal
            closable
            footer={null}
            onCancel={onCancel}
            destroyOnClose
            title={'Создание пользователя'}
            centered
            open={open}
        >
            <BaseButtonsForm
                layout="vertical"
                onFinish={onFinish}
                 isFieldsChanged={false}
            >
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