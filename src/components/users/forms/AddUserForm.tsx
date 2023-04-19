import { Modal } from "@app/components/common/Modal/Modal";
import { SDept, SDeptJob, SDeptNode, User } from "@app/domain/interfaces";
import { useEffect, useState } from "react";
import { BaseButtonsForm } from '../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from "@app/components/common/inputs/Input/Input";
import { Select, Option } from "@app/components/common/selects/Select/Select";
import { TreeSelect } from "antd";
import { Button } from "@app/components/common/buttons/Button/Button";
import { Pagination, createUser, getAllJobs } from "@app/api/users.api";
import { deptToTreeNode, makeTree } from "@app/utils/utils";
import { getAllDepartments } from "@app/api/departments.api";
import { InputPassword } from "@app/components/common/inputs/InputPassword/InputPassword";
import { CreateUserDTO, DeleteUserDTO} from "@app/domain/interfaces";
import { notificationController } from "@app/controllers/notificationController";
import { registerUser } from "@app/api/auth.api";

interface AddUserFormProps {
    data:User| undefined;
}


export const AddEditUserForm: React.FC<AddUserFormProps> = ({ data }) => {
    const [positions, setPositions] = useState<SDeptJob[]>([]);
    const [departments, setDepartments] = useState<SDeptNode[]>([]);

    useEffect(() => {
        getAllJobs().then((responce) => {
            console.log("jobs");
            console.log(responce);
            // let arr: string[] = [];
            // responce.forEach(element => {
            //     arr.push(element.job);
            // });
            setPositions(responce);
        })
    }, []);

    useEffect(() => {
        getAllDepartments().then((responce) => {
            console.log(responce);
            const arr:SDeptNode[] = [];
            //console.log(responce.data.length);
            for(let i = 0; i<responce.length; i++){
                console.log(responce[i]);
                arr.push(deptToTreeNode(responce[i]));
            }
            console.log('arr');
            console.log(arr);
            setDepartments(makeTree(arr));
        })
    }, []);

    const onFinish = (values: CreateUserDTO) => {
        console.log(values);
        registerUser(values).then((res)=>{
            notificationController.success({message:'Пользователь добавлен'});
        }).catch((e)=>{
            notificationController.error({message:'Ошибка'});
        })

    }

    return (
        
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
                <BaseButtonsForm.Item label="Логин" name="user">
                    <Input />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Пароль" name="pas">
                    <InputPassword />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Должность" name='idDeptJob'>
                    <Select>{
                        positions.map((option) => (
                            <Option value={option.idDeptJob}>{option.job}</Option>
                        ))}
                    </Select>
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Подразделение" name='departament'>
                    <TreeSelect fieldNames={{
                        label: 'departament',
                        value: 'idDept'
                    }} labelInValue={true} treeData={departments} treeDataSimpleMode={{
                        id: 'idDept',
                        pId: 'idParent',
                    }}
                        treeNodeLabelProp='departament'
                        treeNodeFilterProp='idDept'
                    >
                    </TreeSelect>
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item label="Роль" name='role'>
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
    )
}