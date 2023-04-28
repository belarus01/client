import { Modal } from '@app/components/common/Modal/Modal';
import { CreateUserDTO, SDept, SDeptJob, SDeptNode, UpdateUserDTO, User } from '@app/domain/interfaces';
import { useEffect, useState } from 'react';
import { BaseButtonsForm } from '../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { TreeSelect } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Pagination, getAllJobs, updateUser } from '@app/api/users.api';
import { deptToTreeNode, makeTree } from '@app/utils/utils';
import { getAllDepartments } from '@app/api/departments.api';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { notificationController } from '@app/controllers/notificationController';

interface EditUserFormProps {
  open: boolean;
  onCancel: () => void;
  onTableChange: (pagination: Pagination) => void;
  selectedUser?: User;
}

export const EditUserForm: React.FC<EditUserFormProps> = ({ open, onCancel, onTableChange, selectedUser }) => {
  const [positions, setPositions] = useState<SDeptJob[]>([]);
  const [departments, setDepartments] = useState<SDeptNode[]>([]);

  const initialvalues = {
    user: selectedUser?.user,
    fName: selectedUser?.fName,
    sName: selectedUser?.sName,
    lName: selectedUser?.lName,
    tel: selectedUser?.tel,
    job: selectedUser?.idDeptJob2.job,
    role: selectedUser?.userRole,
    departament: selectedUser?.idDept2.departament,
  };

  //const admin = useCurrentUser();

  useEffect(() => {
    getAllJobs().then((responce) => {
      setPositions(responce);
    });
  }, []);

  useEffect(() => {
    getAllDepartments().then((responce) => {
      const arr: SDeptNode[] = [];
      for (let i = 0; i < responce.length; i++) {
        arr.push(deptToTreeNode(responce[i]));
      }
      setDepartments(makeTree(arr));
    });
  }, []);

  const onFinish = (values: any) => {
    console.log(values);
    const result = {
      user: values?.user,
      fName: values?.fName,
      sName: values?.sName,
      lName: values?.lName,
      tel: values?.tel,
      idDeptJob: values.idDeptJob,
      role: values?.userRole,
      idDept: departments.find((element) => element.departament === values.departament)?.idDept,
    };
    updateUser(result).then((res) => {
      notificationController.success({ message: 'Пользователь изменен' });
    });
    onCancel();
  };

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
      <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false} initialValues={initialvalues}>
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
        <BaseButtonsForm.Item label="Должность" name="idDeptJob">
          <Select>
            {positions.map((option) => (
              <Option value={option.idDeptJob}>{option.job}</Option>
            ))}
          </Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Подразделение" name="departament">
          <TreeSelect
            fieldNames={{
              label: 'departament',
              value: 'departament',
            }}
            labelInValue={true}
            treeData={departments}
            treeDataSimpleMode={{
              id: 'idDept',
              pId: 'idParent',
            }}
            treeNodeLabelProp="departament"
            treeNodeFilterProp="idDept"
          ></TreeSelect>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Роль" name="role">
          <Select>
            <Option key={1} value={1}>
              Администратор АПК КНО
            </Option>
            <Option key={2} value={2}>
              Руководитель подразделения
            </Option>
            <Option key={3} value={3}>
              Администратор подразделения
            </Option>
            <Option key={4} value={4}>
              Пользователь
            </Option>
            <Option key={5} value={5}>
              Курсант
            </Option>
          </Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </Modal>
  );
};
