import { getAllDepartments } from "@app/api/departments.api"
import { getSubjectByUnp } from "@app/api/subjects.api"
import { Button } from "@app/components/common/buttons/Button/Button"
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm"
import { Input } from "@app/components/common/inputs/Input/Input"
import { Select, Option } from "@app/components/common/selects/Select/Select"
import { notificationController } from "@app/controllers/notificationController"
import { SDept, SDeptNode, SSubj, SSubjObj, SUnits } from "@app/domain/interfaces"
import { deptToTreeNode, makeTree } from "@app/utils/utils"
import { Col, Row, TreeSelect, message } from "antd"
import { useEffect, useState } from "react"
import { Collapse } from "antd"
import { getAllObjectsBySubjectId } from "@app/api/objects.api"
import { DefaultOptionType } from "antd/lib/cascader"
import { getUnitsByTypeUnit } from "@app/api/units.api"

interface Option extends DefaultOptionType {
   
    children?: Option[];
    isLeaf?: boolean;
    loading?: boolean;
}

export const AddEventOrderForm: React.FC = () => {

    const [unp, setUnp] = useState<string>();
    const [subj, setSubj] = useState<SSubj>();
    const [deps, setDeps] = useState<SDept[]>();
    const [departments, setDepartments] = useState<SDeptNode[]>([]);
    const [selectedDept, setSelectedDept] = useState<SSubj>();
    const [type, setType] = useState<any>();
    const [createGroup, setCreateGroup] = useState<boolean>();
    const [selectGroup, setSelectGroup] = useState<boolean>();
    const [objects, setObjects] = useState<SSubjObj[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const [units, setUnits] = useState<SUnits[]>([]);

    const onFinish = (values: any) => {
        // subj?.sSubjObjs.
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

    useEffect(()=>{
        getUnitsByTypeUnit(0).then((res)=>{
            setUnits(res);
        }).catch((e)=>{
            notificationController.error({message:'Произошла ошибка'});
        })
    },[]);

    const getSubject = () => {
        if (unp)
            getSubjectByUnp(unp).then((res) => {
                setSubj(res);
                console.log(res);
                getAllObjectsBySubjectId(res.idSubj).then((responce) => {
                    setObjects(responce);
                    const opt: Option[] = [];
                    responce.forEach(element => opt.push({ value: element.idObj, label: element.nameObj }));
                    console.log(responce);
                    setOptions(opt);
                })
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

    const onCreateGroupClick = () => {

    }

    const onChange = (value: string[], selectedOptions: Option[]) => {
        console.log(value, selectedOptions);
      };

    const loadData = (selectedOptions: Option[]) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        
        
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

                      <BaseButtonsForm.Item label="Сфера мероприятия" name='sphera'>
                        <Select>
                            {
                                units.map((unit)=>{
                                    return <Option key={unit.idUnit} value={unit.idUnit}>{unit.name}</Option>
                                })
                            }
                        </Select>
                    </BaseButtonsForm.Item>


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

                    


                    {/* <BaseButtonsForm.Item>
                        <Row gutter={[30, 30]}>
                            <Col sm={12} md={12} lg={12}>
                                <BaseButtonsForm.Item
                                    name="unp"
                                    label={'УНП субъекта'}
                                    rules={[{ required: true, message: 'Введите УНП субъекта' }]}
                                >
                                    <Input onChange={handleUnpChange} />
                                </BaseButtonsForm.Item>
                            </Col>
                            <Col sm={12} md={12} lg={12}>
                                <BaseButtonsForm.Item>
                                    <Button type="primary" style={{ width: 200 }} onClick={(values) => onCreateGroupClick()} >
                                        Создать группу
                                    </Button>
                                </BaseButtonsForm.Item>
                            </Col>
                        </Row>
                    </BaseButtonsForm.Item> */}
                </BaseButtonsForm>
            </>
        )
    }