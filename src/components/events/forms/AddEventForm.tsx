import { getAllDepartments } from "@app/api/departments.api"
import { getSubjectByUnp } from "@app/api/subjects.api"
import { Button } from "@app/components/common/buttons/Button/Button"
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm"
import { Input } from "@app/components/common/inputs/Input/Input"
import { Select, Option } from "@app/components/common/selects/Select/Select"
import { notificationController } from "@app/controllers/notificationController"
import { SDept, SDeptNode, SSubj } from "@app/domain/interfaces"
import { deptToTreeNode, makeTree } from "@app/utils/utils"
import { Col, Row, TreeSelect } from "antd"
import { useEffect, useState } from "react"

export const AddEventOrderForm: React.FC = () => {

    const [unp, setUnp] = useState<string>();
    const [subj, setSubj] = useState<SSubj>();
    const [deps, setDeps] = useState<SDept[]>();
    const [departments, setDepartments] = useState<SDeptNode[]>([]);
    const [selectedDept, setSelectedDept] = useState<SSubj>();
    const [type, setType] = useState<any>();

    const onFinish = (values: any) => {

    }

    useEffect(() => {
        getAllDepartments().then((responce) => {
            setDeps(responce);
            console.log(responce);
            const arr: SDeptNode[] = [];
            for (let i = 0; i < responce.length; i++) {
                arr.push(deptToTreeNode(responce[i]));
            }
            setDepartments(makeTree(arr));
        }).catch((e) => {
            notificationController.error({ message: 'Произошла ошибка при загрузке' });
        })
    }, []);

    const getSubject = () => {
        if (unp)
            getSubjectByUnp(unp).then((res) => {
                setSubj(res);
                console.log(res);
            }).catch((e) => {
                notificationController.error({ message: 'Произошла ошибка при загрузке' });
            })
    }

    const handleUnpChange = (event: any) => {
        setUnp(event.target.value);
    }

    const onSelectType = (selected: any) => {
        setType(selected);
    }

    const onDepartmentSelect = (selected: any) => {
        console.log(selected)
        //setSelectedDept(deps?.find(element=>element.active))
    }

    return (
        <>
            <BaseButtonsForm
                layout="vertical"
                onFinish={onFinish}
                isFieldsChanged={false}
            >
                <Row gutter={[30, 30]}>
                    <Col sm={24} md={10} lg={10}>
                        <BaseButtonsForm.Item
                            name="unp"
                            label={'УНП субъекта'}
                            rules={[{ required: true, message: 'Введите УНП субъекта' }]}
                        >
                            <Input onChange={handleUnpChange} />
                        </BaseButtonsForm.Item>
                    </Col>
                    <Col sm={24} md={10} lg={10}>
                        <BaseButtonsForm.Item>
                            <Button type="primary" style={{ width: 200 }} onClick={(values) => getSubject()} >
                                Загрузить субъект
                            </Button>
                        </BaseButtonsForm.Item>
                    </Col>
                </Row>
                {
                    subj ? (
                        <BaseButtonsForm.Item>
                            <p>УНП - {subj?.unp}</p>
                            <p>Наименование - {subj?.subj}</p>
                            <p>Адрес юридический - {subj?.addrYur}</p>
                        </BaseButtonsForm.Item>
                    ) : null
                }

                {
                    departments.length === 0 ? (<BaseButtonsForm.Item label="Подразделение" name='departament'>
                        <TreeSelect onSelect={onDepartmentSelect} fieldNames={{
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
                    </BaseButtonsForm.Item>) : null
                }


                <BaseButtonsForm.Item label="Тип мероприятия" name='type'>
                    <Select onSelect={onSelectType}>
                        <Option key={1} value={1}>Проверка</Option>
                        <Option key={2} value={2}>Мониторинг</Option>
                        <Option key={3} value={3}>МТХ</Option>
                        <Option key={4} value={4}>Технологическая???</Option>
                    </Select>
                </BaseButtonsForm.Item>

                {
                    type === 1 ? (
                        <BaseButtonsForm.Item label="Вид мероприятия" name='vid'>
                            <Select >
                                <Option key={1} value={81}>Внеплановая</Option>
                                <Option key={2} value={82}>Выборочная</Option>
                            </Select>
                        </BaseButtonsForm.Item>
                    ) : null
                }

            </BaseButtonsForm>
        </>
    )
}