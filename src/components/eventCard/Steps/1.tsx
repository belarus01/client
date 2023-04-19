import { Input } from '@app/components/common/inputs/Input/Input';
import * as S from '../eventCard.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { useMemo, useState } from 'react';
import { Button, Col, Divider, List, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


//const data1 = getFirst(setFields([data]));

export const Step1: React.FC<any> = ({ data }) => {
    const [isFieldsChanged, setFieldsChanged] = useState(false);

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        //console.log(obj);
    };
    //const { t } = useTranslation();
    // const [obj, setObj] = useState<any>({
    //     result2:[],
    //     ...data
    // });
    // console.log(obj);
    

    const items_zdan = useMemo(() => {
        if (data) {
            return data.result2.filter((item: { id_unit_41: string; }) => item.id_unit_41 == '4000') 
            
        }
        return []
    }, [data]);

    const items_sooryg = useMemo(() => {
        if (data) {
            return data.result2.filter((item: { id_unit_41: string; }) => item.id_unit_41 == '4001')
        }
        return []
    }, [data]);
      

    return (
        <S.FormContent>
            <BaseButtonsForm.Item
                name="group"
                label={'Наименование субъекта'}
                rules={[{ required: true, message: 'Введите наименование субъекта' }]}

            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="unp"
                label={'УНП субъекта'}
                rules={[{ required: true, message: 'Введите УНП субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="date"
                label={'Дата государственной регистрации (присвоения УНП)'}
                rules={[{ required: true, message: 'Введите дату государственной регистрации' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="prin"
                label={'Ведомственная принадлежность субъекта'}
                rules={[{ required: true, message: 'Введите принадлежность субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="ur_adress"
                label={'Юридический адрес субъекта'}
                rules={[{ required: true, message: 'Введите юридический адрес субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="fak_adress"
                label={'Фактический адрес субъекта'}
                rules={[{ required: true, message: 'Введите фактический адрес субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="fio"
                label={'Ф.И.О руководителя субъекта'}
                rules={[{ required: true, message: 'Введите Ф.И.О руководителя субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="dolgnost"
                label={'Должность руководителя субъекта'}
                rules={[{ required: true, message: 'Введите должность руководителя субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="sfera"
                label={'Сфера (вид) деятельности'}
                rules={[{ required: true, message: 'Введите сферу (вид) деятельности' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                label={'Количество отдельных зданий'}
                name="col_zdani"
                rules={[{ required: true, message: 'Введите количество отдельных зданий' }]}
            >
                
                <Input style={{ width: "100px", textAlign: "center" }} defaultValue={items_zdan.length} key={items_zdan} />
                
            </BaseButtonsForm.Item>

            <Col span={6}>
                <BaseButtonsForm.Item
                    name="name_zdani"
                    label={'Наименование отдельных зданий'}
                    rules={[{ required: true, message: 'Введите наименование отдельных зданий' }]}
                >
                    {data ? <List
                        bordered
                        dataSource={items_zdan}
                        renderItem={(item: { name_build: string; id_specif: string; id_unit_41: string }) => (

                            <List.Item>
                                {item.name_build}
                            </List.Item>
                        )}
                    /> : <p>Petya</p>
                    }

                </BaseButtonsForm.Item>
            </Col>

            <BaseButtonsForm
                name="dobavit_zdan"
                isFieldsChanged={isFieldsChanged}
                onFinish={onFinish}
                autoComplete="off"
            >
                <BaseButtonsForm.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Row key={field.key} style={{ marginTop: "35px" }}>
                                    <Col span={6}>
                                        <BaseButtonsForm.Item
                                            {...field}
                                            name={[field.name, 'last']}
                                            hasFeedback
                                        >
                                            <S.Wrapper>
                                                <Input />
                                                <S.RemoveBtn onClick={() => remove(field.name)} />
                                            </S.Wrapper>
                                        </BaseButtonsForm.Item>
                                    </Col>
                                </Row>
                            ))}

                            <BaseButtonsForm.Item>
                                <Button type="primary" style={{ width: 200 }} onClick={() => add()} >
                                    Добавить здание
                                </Button>
                                <Button type="primary" style={{ marginLeft: '10px' }} >
                                    Сохранить
                                </Button>
                            </BaseButtonsForm.Item>
                        </>
                    )}
                </BaseButtonsForm.List>
            </BaseButtonsForm>

            <BaseButtonsForm.Item
                label={'Количество отдельных сооружений'}
                name="col_sooryg"
                rules={[{ required: true, message: 'Введите количество отдельных сооружений' }]}
            >
                <Input style={{ width: "100px", textAlign: "center" }} defaultValue={items_sooryg.length} key={items_sooryg} />

            </BaseButtonsForm.Item>

            <Col span={6}>
                <BaseButtonsForm.Item
                    name="name_sooryg"
                    label={'Наименование отдельных сооружений'}
                    rules={[{ required: true, message: 'Введите наименование отдельных сооружений' }]}
                >
                    {data ? <List
                        bordered
                        dataSource={items_sooryg}
                        renderItem={(item: { name_build: string; id_specif: string; id_unit_41: string }) => (

                            <List.Item>
                                {item.name_build}
                            </List.Item>
                        )}
                    /> : <p>Petya</p>
                    }

                </BaseButtonsForm.Item>
            </Col>

            <BaseButtonsForm
                name="dobavit_sooryg"
                isFieldsChanged={isFieldsChanged}
                onFinish={onFinish}
                autoComplete="off"
            >
                <BaseButtonsForm.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Row key={field.key} style={{ marginTop: "35px" }}>
                                    <Col span={6}>
                                        <BaseButtonsForm.Item
                                            {...field}
                                            name={[field.name, 'last']}
                                            hasFeedback
                                        >
                                            <S.Wrapper>
                                                <Input />
                                                <S.RemoveBtn onClick={() => remove(field.name)} />
                                            </S.Wrapper>
                                        </BaseButtonsForm.Item>
                                    </Col>
                                </Row>
                            ))}

                            <BaseButtonsForm.Item>
                                <Button type="primary" style={{ width: 200 }} onClick={() => add()} >
                                    Добавить здание
                                </Button>
                                <Button type="primary" style={{ marginLeft: '10px' }} >
                                    Сохранить
                                </Button>
                            </BaseButtonsForm.Item>
                        </>
                    )}
                </BaseButtonsForm.List>
            </BaseButtonsForm>

        </S.FormContent>
    )
};

// function setFields(arg0: { name: string; value: any; }[]) {
//     throw new Error('Function not implemented.');
// }

//if (item.id_unit_41 === '4000')