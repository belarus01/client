import { Cascader, Col, DatePicker, Input, Row, Space, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { Button } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { InfoOutlined } from '@ant-design/icons';
import { color } from 'echarts';


const { Text } = Typography;
const Check_list_1 = () => {

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <ConfigProvider locale={ruRu}>
                <Row>
                    <Col span={24} style={{ textAlign: "center", background: "linen" }}>

                        <Col style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Text strong style={{ fontSize: "17px" }}>МИНИСТЕРСВО ПО ЧРЕЗВЫЧАЙНЫМ СИТУАЦИЯМ <br /> РЕСПУБЛИКИ БЕЛАРУСЬ
                                <br /> Органы государственного пожарного надзора</Text>
                        </Col>

                        <Row >
                            <Col span={8} offset={6}>
                                <Text strong style={{ fontSize: "17px", textAlign: "center" }}>КОНТРОЛЬНЫЙ СПИСОК ВОПРОСОВ (ЧЕК-ЛИСТ) №
                                </Text>
                            </Col>
                            <Col >
                                <Input style={{ marginTop: "-15px", width: '100%' }} />
                            </Col>
                        </Row>
                        <br />

                        <Col span={20} offset={2} style={{ textAlign: "left" }}>

                            <Text style={{ fontSize: "17px" }}>в сфере государственного пожарного надзора, надзора за соблюдением
                                законодательства при осуществлении деятельности по обеспечению
                                пожарной безопасности:

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Дата начала заполнения
                                    </Text>

                                    <Col>
                                        <DatePicker onChange={onChange} style={{ marginLeft: "12px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Дата завершения зaполнения
                                    </Text>

                                    <Col>
                                        <DatePicker onChange={onChange} style={{ marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Дата направления
                                    </Text>

                                    <Col>
                                        {/* <Cascader placeholder="выбор из списка" style={{ width: 170, marginLeft: "-15px" }}
                                            options={[
                                                {
                                                    value: '12.11.2022',
                                                    label: '12.11.2022',
                                                },
                                                {
                                                    value: '05.11.2022',
                                                    label: '05.11.2022',
                                                },
                                            ]}
                                        /> */}
                                        <DatePicker onChange={onChange} style={{ marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Контрольный список вопросов (чек-лист) заполняется в ходе
                                    </Text>

                                    <Col>
                                        <Cascader placeholder="выбор из списка" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'внеплановой проверки',
                                                    label: 'внеплановой проверки',
                                                },
                                                {
                                                    value: 'выборочной проверки',
                                                    label: 'выборочной проверки',
                                                },
                                                {
                                                    value: 'для использования при планировании проверок',
                                                    label: 'для использования при планировании проверок',
                                                },
                                            ]}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "5px" }}>
                                    <Text>
                                        Должностное лицо, выполняющее проверку (направившее
                                        контрольный список вопросов):
                                    </Text>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Фамилия, инициалы:
                                    </Text>

                                    <Col>
                                        {/* <Cascader placeholder="выбор из списка" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Сергей-Красавчик Миранович',
                                                    label: 'Сергей-Красавчик Миранович',
                                                },
                                                {
                                                    value: 'Петя-Киборг Казанцев',
                                                    label: 'Петя-Киборг Казанцев',
                                                },
                                                {
                                                    value: 'Глеб-Казах Зыско',
                                                    label: 'Глеб-Казах Зыско',
                                                },
                                            ]}
                                        /> */}
                                        <Input style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Должность:
                                    </Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Контактный телефон:
                                    </Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row justify={'center'}>
                                    <Button type="primary" style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "15px", marginBottom: "10px"
                                    }}>
                                        <Text strong>Подтвердить</Text>
                                    </Button>
                                </Row>

                                <Row justify={'center'} style={{ marginTop: '20px' }}>
                                    <Col>
                                        <Text strong >Сведения о проверяемом субъекте</Text>
                                    </Col>
                                </Row>

                                <Row justify={'center'} style={{ marginTop: "20px" }}>
                                    <Col span={1}>
                                        <Text>УНП:</Text>
                                    </Col>

                                    <Col span={5}>
                                        <Input style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>

                                    <Col span={5} offset={2}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px"
                                        }}>
                                            <Text style={{ marginTop: "-4px" }}>Заполнить форму</Text>
                                        </Button>
                                    </Col>

                                    <Col span={5} offset={2}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px"
                                        }}>
                                            <Text style={{ marginTop: "-4px" }}>Обновить данные</Text>
                                        </Button>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Наименование проверяемого субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Место нахождения проверяемого
                                        субъекта (объекта проверяемого субъекта):</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "25px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Место осуществления деятельности:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Фамилия, инициалы представителя субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Должность представителя субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Контактный телефон представителя субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Фамилия, инициалы ответственного
                                        за обеспечение пожарной безопасности субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Должность ответственного за
                                        обеспечение пожарной безопасности субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Контактный телефон ответственного за
                                        обеспечение пожарной безопасности субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row justify={'center'}>
                                    <Button type="primary" style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "10px", marginBottom: "20px",
                                    }}>
                                        <Text strong>Подтвердить</Text>
                                    </Button>

                                </Row>
                            </Text>

                        </Col>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} style={{ textAlign: "center", background: "linen" }}>

                        <Col style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Text strong style={{ fontSize: "17px" }}>ХАРАКТЕРИСТИКИ ПРОВЕРЯЕМОГО СУБЪЕКТА</Text>
                        </Col>

                        <Col span={20} offset={2} style={{ marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                            <Row>
                                <Text style={{ fontSize: "17px" }}>Численность работников (персонала):</Text>

                                <Col>
                                    <Input placeholder="заполняется вручную" style={{ width: 190, marginLeft: "15px", marginTop: "-10px", }} />
                                </Col>

                                <Text style={{ fontSize: "17px", marginLeft: "15px" }}>чел.</Text>
                            </Row>

                            <Row style={{ marginTop: "20px" }}>
                                <Text style={{ fontSize: "17px" }}>Расчетное количество посетителей:</Text>

                                <Col>
                                    <Input placeholder="заполняется вручную" style={{ width: 190, marginLeft: "15px", marginTop: "-10px" }} />
                                </Col>

                                <Text style={{ fontSize: "17px", marginLeft: "15px" }}>чел.</Text>
                            </Row>

                            <Row style={{ marginTop: "20px" }}>
                                <Text style={{ fontSize: "17px" }}>Площадь территории:</Text>

                                <Col>
                                    <Input placeholder="заполняется вручную" style={{ width: 190, marginLeft: "15px", marginTop: "-10px" }} />
                                </Col>

                                <Text style={{ fontSize: "17px", marginLeft: "15px" }}>м<sup>2</sup>.</Text>
                            </Row>
                        </Col>

                        <Col span={22} offset={1} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "17px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={1}>
                                        <Text>
                                            Класс:
                                        </Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader placeholder="Ф1.3" style={{ width: 100, marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Ф1.1',
                                                    label: 'Ф1.1',
                                                },
                                                {
                                                    value: 'Ф1.2',
                                                    label: 'Ф1.2',
                                                },
                                                {
                                                    value: 'Ф1.3',
                                                    label: 'Ф1.3',
                                                },
                                                {
                                                    value: 'Ф1.4',
                                                    label: 'Ф1.4',
                                                },
                                                {
                                                    value: 'Ф2.1',
                                                    label: 'Ф2.1',
                                                },
                                                {
                                                    value: 'Ф2.2',
                                                    label: 'Ф2.2',
                                                },
                                                {
                                                    value: 'Ф2.3',
                                                    label: 'Ф2.3',
                                                },
                                                {
                                                    value: 'Ф3.1',
                                                    label: 'Ф3.1',
                                                },
                                                {
                                                    value: 'Ф3.2',
                                                    label: 'Ф3.3',
                                                },
                                                {
                                                    value: 'Ф3.3',
                                                    label: 'Ф3.3',
                                                },
                                                {
                                                    value: 'Ф3.4',
                                                    label: 'Ф3.4',
                                                },
                                                {
                                                    value: 'Ф3.5',
                                                    label: 'Ф3.5',
                                                },
                                                {
                                                    value: 'Ф3.6',
                                                    label: 'Ф3.6',
                                                },
                                                {
                                                    value: 'Ф4.1',
                                                    label: 'Ф4.1',
                                                },
                                                {
                                                    value: 'Ф4.2',
                                                    label: 'Ф4.2',
                                                },
                                                {
                                                    value: 'Ф4.3',
                                                    label: 'Ф4.3',
                                                },
                                                {
                                                    value: 'Ф5.1',
                                                    label: 'Ф5.1',
                                                },
                                                {
                                                    value: 'Ф5.2',
                                                    label: 'Ф5.2',
                                                },
                                                {
                                                    value: 'Ф5.3',
                                                    label: 'Ф5.3',
                                                },
                                                {
                                                    value: 'Ф5.4',
                                                    label: 'Ф5.4',
                                                },
                                            ]}
                                        />
                                    </Col>

                                    <Col span={1} >
                                        <Text>
                                            Тип:
                                        </Text>
                                    </Col>

                                    <Col span={3} >
                                        <Cascader placeholder="Сооружение" style={{ width: '150%', marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Здание',
                                                    label: 'Здание',
                                                },
                                                {
                                                    value: 'Сооружение',
                                                    label: 'Сооружение',
                                                },
                                                {
                                                    value: 'Помещение',
                                                    label: 'Помещение',
                                                },
                                                {
                                                    value: 'Наружная установка',
                                                    label: 'Наружная установка',
                                                },
                                            ]}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Площадь, кв. м.:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>

                                    <Col span={2} offset={15}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px", marginBottom: "10px", marginLeft: "0px"
                                        }}>
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>

                        {/* <Col span={22} offset={1} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "17px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={1}>
                                        <Text>
                                            Класс:
                                        </Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader placeholder="Ф2.3" style={{ width: 100, marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Ф1.1',
                                                    label: 'Ф1.1',
                                                },
                                                {
                                                    value: 'Ф1.2',
                                                    label: 'Ф1.2',
                                                },
                                                {
                                                    value: 'Ф1.3',
                                                    label: 'Ф1.3',
                                                },
                                                {
                                                    value: 'Ф1.4',
                                                    label: 'Ф1.4',
                                                },
                                                {
                                                    value: 'Ф2.1',
                                                    label: 'Ф2.1',
                                                },
                                                {
                                                    value: 'Ф2.2',
                                                    label: 'Ф2.2',
                                                },
                                                {
                                                    value: 'Ф2.3',
                                                    label: 'Ф2.3',
                                                },
                                                {
                                                    value: 'Ф3.1',
                                                    label: 'Ф3.1',
                                                },
                                                {
                                                    value: 'Ф3.2',
                                                    label: 'Ф3.3',
                                                },
                                                {
                                                    value: 'Ф3.3',
                                                    label: 'Ф3.3',
                                                },
                                                {
                                                    value: 'Ф3.4',
                                                    label: 'Ф3.4',
                                                },
                                                {
                                                    value: 'Ф3.5',
                                                    label: 'Ф3.5',
                                                },
                                                {
                                                    value: 'Ф3.6',
                                                    label: 'Ф3.6',
                                                },
                                                {
                                                    value: 'Ф4.1',
                                                    label: 'Ф4.1',
                                                },
                                                {
                                                    value: 'Ф4.2',
                                                    label: 'Ф4.2',
                                                },
                                                {
                                                    value: 'Ф4.3',
                                                    label: 'Ф4.3',
                                                },
                                                {
                                                    value: 'Ф5.1',
                                                    label: 'Ф5.1',
                                                },
                                                {
                                                    value: 'Ф5.2',
                                                    label: 'Ф5.2',
                                                },
                                                {
                                                    value: 'Ф5.3',
                                                    label: 'Ф5.3',
                                                },
                                                {
                                                    value: 'Ф5.4',
                                                    label: 'Ф5.4',
                                                },
                                            ]}
                                        />
                                    </Col>

                                    <Col span={1} >
                                        <Text>
                                            Тип:
                                        </Text>
                                    </Col>

                                    <Col span={3} >
                                        <Cascader placeholder="Помещение" style={{ width: '150%', marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Здание',
                                                    label: 'Здание',
                                                },
                                                {
                                                    value: 'Сооружение',
                                                    label: 'Сооружение',
                                                },
                                                {
                                                    value: 'Помещение',
                                                    label: 'Помещение',
                                                },
                                                {
                                                    value: 'Наружная установка',
                                                    label: 'Наружная установка',
                                                },
                                            ]}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Площадь, кв. м.:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>

                                    <Col span={2} offset={15}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px", marginBottom: "10px", marginLeft: "0px"
                                        }}>
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>

                        <Col span={22} offset={1} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "17px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={1}>
                                        <Text>
                                            Класс:
                                        </Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader placeholder="Ф5.3" style={{ width: 100, marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Ф1.1',
                                                    label: 'Ф1.1',
                                                },
                                                {
                                                    value: 'Ф1.2',
                                                    label: 'Ф1.2',
                                                },
                                                {
                                                    value: 'Ф1.3',
                                                    label: 'Ф1.3',
                                                },
                                                {
                                                    value: 'Ф1.4',
                                                    label: 'Ф1.4',
                                                },
                                                {
                                                    value: 'Ф2.1',
                                                    label: 'Ф2.1',
                                                },
                                                {
                                                    value: 'Ф2.2',
                                                    label: 'Ф2.2',
                                                },
                                                {
                                                    value: 'Ф2.3',
                                                    label: 'Ф2.3',
                                                },
                                                {
                                                    value: 'Ф3.1',
                                                    label: 'Ф3.1',
                                                },
                                                {
                                                    value: 'Ф3.2',
                                                    label: 'Ф3.3',
                                                },
                                                {
                                                    value: 'Ф3.3',
                                                    label: 'Ф3.3',
                                                },
                                                {
                                                    value: 'Ф3.4',
                                                    label: 'Ф3.4',
                                                },
                                                {
                                                    value: 'Ф3.5',
                                                    label: 'Ф3.5',
                                                },
                                                {
                                                    value: 'Ф3.6',
                                                    label: 'Ф3.6',
                                                },
                                                {
                                                    value: 'Ф4.1',
                                                    label: 'Ф4.1',
                                                },
                                                {
                                                    value: 'Ф4.2',
                                                    label: 'Ф4.2',
                                                },
                                                {
                                                    value: 'Ф4.3',
                                                    label: 'Ф4.3',
                                                },
                                                {
                                                    value: 'Ф5.1',
                                                    label: 'Ф5.1',
                                                },
                                                {
                                                    value: 'Ф5.2',
                                                    label: 'Ф5.2',
                                                },
                                                {
                                                    value: 'Ф5.3',
                                                    label: 'Ф5.3',
                                                },
                                                {
                                                    value: 'Ф5.4',
                                                    label: 'Ф5.4',
                                                },
                                            ]}
                                        />
                                    </Col>

                                    <Col span={1} >
                                        <Text>
                                            Тип:
                                        </Text>
                                    </Col>

                                    <Col span={3} >
                                        <Cascader placeholder="Сооружение" style={{ width: '150%', marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Здание',
                                                    label: 'Здание',
                                                },
                                                {
                                                    value: 'Сооружение',
                                                    label: 'Сооружение',
                                                },
                                                {
                                                    value: 'Помещение',
                                                    label: 'Помещение',
                                                },
                                                {
                                                    value: 'Наружная установка',
                                                    label: 'Наружная установка',
                                                },
                                            ]}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Площадь, кв. м.:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>

                                    <Col span={2} offset={15}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px", marginBottom: "10px", marginLeft: "0px"
                                        }}>
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Col> */}

                        <Col span={22} offset={1} style={{ textAlign: "left", marginBottom: "30px", fontSize: "15px" }}>
                            <Button style={{
                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                borderRadius: "8px", marginTop: "-25px", marginBottom: "10px", marginLeft: "0px"
                            }}>
                                <Text strong>Добавить</Text>
                            </Button>
                        </Col>

                        <Col span={22} offset={1} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "17px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={2}>
                                        <Text>
                                            Категория:
                                        </Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader placeholder="Б" style={{ width: 100, marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'А',
                                                    label: 'А',
                                                },
                                                {
                                                    value: 'Б',
                                                    label: 'Б',
                                                },
                                                {
                                                    value: 'В',
                                                    label: 'В',
                                                },
                                                {
                                                    value: 'Г',
                                                    label: 'Г',
                                                },
                                                {
                                                    value: 'Д',
                                                    label: 'Д',
                                                },
                                                {
                                                    value: 'Ан',
                                                    label: 'Ан',
                                                },
                                                {
                                                    value: 'Бн',
                                                    label: 'Бн',
                                                },
                                                {
                                                    value: 'Вн',
                                                    label: 'Вн',
                                                },
                                                {
                                                    value: 'Гн',
                                                    label: 'Гн',
                                                },
                                                {
                                                    value: 'Дн',
                                                    label: 'Дн',
                                                },
                                            ]}
                                        />
                                    </Col>

                                    <Col span={1} >
                                        <Text>
                                            Тип:
                                        </Text>
                                    </Col>

                                    <Col span={3} >
                                        <Cascader placeholder="Здание" style={{ width: '150%', marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Здание',
                                                    label: 'Здание',
                                                },
                                                {
                                                    value: 'Сооружение',
                                                    label: 'Сооружение',
                                                },
                                                {
                                                    value: 'Помещение',
                                                    label: 'Помещение',
                                                },
                                            ]}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Площадь, кв. м.:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>

                                    <Col span={2} offset={15}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px", marginBottom: "10px", marginLeft: "0px"
                                        }}>
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>

                        {/* <Col span={22} offset={1} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "17px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={2}>
                                        <Text>
                                            Категория:
                                        </Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader placeholder="Ан" style={{ width: 100, marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'А',
                                                    label: 'А',
                                                },
                                                {
                                                    value: 'Б',
                                                    label: 'Б',
                                                },
                                                {
                                                    value: 'В',
                                                    label: 'В',
                                                },
                                                {
                                                    value: 'Г',
                                                    label: 'Г',
                                                },
                                                {
                                                    value: 'Д',
                                                    label: 'Д',
                                                },
                                                {
                                                    value: 'Ан',
                                                    label: 'Ан',
                                                },
                                                {
                                                    value: 'Бн',
                                                    label: 'Бн',
                                                },
                                                {
                                                    value: 'Вн',
                                                    label: 'Вн',
                                                },
                                                {
                                                    value: 'Гн',
                                                    label: 'Гн',
                                                },
                                                {
                                                    value: 'Дн',
                                                    label: 'Дн',
                                                },
                                            ]}
                                        />
                                    </Col>

                                    <Col span={1} >
                                        <Text>
                                            Тип:
                                        </Text>
                                    </Col>

                                    <Col span={3} >
                                        <Cascader placeholder="Помещение" style={{ width: '150%', marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'Здание',
                                                    label: 'Здание',
                                                },
                                                {
                                                    value: 'Сооружение',
                                                    label: 'Сооружение',
                                                },
                                                {
                                                    value: 'Помещение',
                                                    label: 'Помещение',
                                                },
                                                {
                                                    value: 'Наружная установка',
                                                    label: 'Наружная установка',
                                                },
                                            ]}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Площадь, кв. м.:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>

                                    <Col span={2} offset={15}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px", marginBottom: "10px", marginLeft: "0px"
                                        }}>
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Col> */}

                        <Col span={22} offset={1} style={{ textAlign: "left", marginBottom: "30px", fontSize: "15px" }}>
                            <Button style={{
                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                borderRadius: "8px", marginTop: "-25px", marginBottom: "10px", marginLeft: "0px"
                            }}>
                                <Text strong>Добавить</Text>
                            </Button>
                        </Col>

                        <Col span={22} offset={1} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "17px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={2}>
                                        <Text>
                                            Категория:
                                        </Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader placeholder="Д" style={{ width: 100, marginLeft: "10px", marginTop: "-10px" }}
                                            options={[
                                                {
                                                    value: 'А',
                                                    label: 'А',
                                                },
                                                {
                                                    value: 'Б',
                                                    label: 'Б',
                                                },
                                                {
                                                    value: 'В',
                                                    label: 'В',
                                                },
                                                {
                                                    value: 'Г',
                                                    label: 'Г',
                                                },
                                                {
                                                    value: 'Д',
                                                    label: 'Д',
                                                },
                                                {
                                                    value: 'Ан',
                                                    label: 'Ан',
                                                },
                                                {
                                                    value: 'Бн',
                                                    label: 'Бн',
                                                },
                                                {
                                                    value: 'Вн',
                                                    label: 'Вн',
                                                },
                                                {
                                                    value: 'Гн',
                                                    label: 'Гн',
                                                },
                                                {
                                                    value: 'Дн',
                                                    label: 'Дн',
                                                },
                                            ]}
                                        />
                                    </Col>

                                    <Col span={1} >
                                        <Text>
                                            Тип:
                                        </Text>
                                    </Col>

                                    <Col span={3} >
                                        <Input placeholder="Наружная установка" disabled style={{ width: '150%', marginLeft: "10px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>Объём обращающихся веществ и материалов, куб. м.:</Text>

                                    <Col span={4}>
                                        <Input placeholder="заполняется вручную" style={{ width: '100%', marginLeft: "15px", marginTop: "-10px" }} />
                                    </Col>

                                    <Col span={2} offset={9}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginTop: "-10px", marginBottom: "10px", marginLeft: "0px"
                                        }}>
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>

                        <Col span={22} offset={1} style={{ textAlign: "left", marginBottom: "30px", fontSize: "15px" }}>
                            <Button style={{
                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                borderRadius: "8px", marginTop: "-25px", marginBottom: "10px", marginLeft: "0px"
                            }}>
                                <Text strong>Добавить</Text>
                            </Button>
                        </Col>

                        <Row justify={'center'}>
                            <Button type="primary" style={{
                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                borderRadius: "8px", marginBottom: "20px", marginTop: "-10px"
                            }}>
                                <Text strong>Подтвердить</Text>
                            </Button>
                        </Row>

                    </Col>
                </Row>

                <Row>
                    <Col span={24} style={{ textAlign: "center", background: "linen" }}>

                        <Col style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Text strong style={{ fontSize: "17px" }}>Перечень требований, предъявляемых к проверяемому субъекту</Text>
                        </Col>

                        <Col offset={2} style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
                            <Row>
                                <Text style={{ fontSize: "17px" }}>Выбор пункта:</Text>
                                <Cascader placeholder="1.1" style={{ width: '10%', marginLeft: '20px', marginTop: '-10px' }}
                                    options={[
                                        {
                                            value: '1.1',
                                            label: '1.1',
                                        },
                                        {
                                            value: '1.2',
                                            label: '1.2',
                                        },
                                        {
                                            value: '2.1',
                                            label: '2.1',
                                        },
                                        {
                                            value: '2.2',
                                            label: '2.2',
                                        },
                                        {
                                            value: '2.3',
                                            label: '2.3',
                                        },
                                        {
                                            value: '2.4',
                                            label: '2.4',
                                        },
                                        {
                                            value: '2.5',
                                            label: '2.5',
                                        },
                                        {
                                            value: '2.6',
                                            label: '2.6',
                                        },
                                        {
                                            value: '2.1',
                                            label: '2.1',
                                        },
                                        {
                                            value: '3',
                                            label: '3',
                                        },
                                        {
                                            value: '4.1',
                                            label: '4.1',
                                        },
                                        {
                                            value: '4.2',
                                            label: '4.2',
                                        },
                                        {
                                            value: '4.3',
                                            label: '4.3',
                                        },
                                        {
                                            value: '5',
                                            label: '5',
                                        },
                                        {
                                            value: '6',
                                            label: '6',
                                        },
                                        {
                                            value: '7.1',
                                            label: '7.1',
                                        },
                                        {
                                            value: '7.2',
                                            label: '7.2',
                                        },
                                        {
                                            value: '7.3',
                                            label: '7.3',
                                        },
                                        {
                                            value: '8',
                                            label: '8',
                                        },
                                        {
                                            value: '9',
                                            label: '9',
                                        },
                                        {
                                            value: '10',
                                            label: '10',
                                        },
                                        {
                                            value: '11',
                                            label: '11',
                                        },
                                        {
                                            value: '12',
                                            label: '12',
                                        },
                                        {
                                            value: '13',
                                            label: '13',
                                        },
                                        {
                                            value: '14',
                                            label: '14',
                                        },
                                        {
                                            value: '15',
                                            label: '15',
                                        },
                                        {
                                            value: '16',
                                            label: '16',
                                        },
                                        {
                                            value: '17',
                                            label: '17',
                                        },
                                        {
                                            value: '18.1',
                                            label: '18.1',
                                        },
                                        {
                                            value: '18.2',
                                            label: '18.2',
                                        },
                                        {
                                            value: '18.3',
                                            label: '18.3',
                                        },
                                        {
                                            value: '18.4',
                                            label: '18.4',
                                        },
                                        {
                                            value: '19',
                                            label: '19',
                                        },
                                        {
                                            value: '20',
                                            label: '20',
                                        },
                                        {
                                            value: '21',
                                            label: '21',
                                        },
                                        {
                                            value: '22',
                                            label: '22',
                                        },
                                        {
                                            value: '23',
                                            label: '23',
                                        },
                                        {
                                            value: '24',
                                            label: '24',
                                        },
                                        {
                                            value: '25.1',
                                            label: '25.1',
                                        },
                                        {
                                            value: '25.2',
                                            label: '25.2',
                                        },
                                        {
                                            value: '26',
                                            label: '26',
                                        },
                                        {
                                            value: '27',
                                            label: '27',
                                        },
                                        {
                                            value: '28',
                                            label: '28',
                                        },
                                        {
                                            value: '29',
                                            label: '29',
                                        },
                                        {
                                            value: '30',
                                            label: '30',
                                        },
                                        {
                                            value: '31.1',
                                            label: '31.1',
                                        },
                                        {
                                            value: '31.2',
                                            label: '31.2',
                                        },
                                        {
                                            value: '31.3',
                                            label: '31.3',
                                        },
                                        {
                                            value: '31.4',
                                            label: '31.4',
                                        },
                                        {
                                            value: '31.5',
                                            label: '31.5',
                                        },
                                        {
                                            value: '32',
                                            label: '32',
                                        },
                                        {
                                            value: '33',
                                            label: '33',
                                        },
                                        {
                                            value: '34',
                                            label: '34',
                                        },
                                        {
                                            value: '35',
                                            label: '35',
                                        },
                                        {
                                            value: '36',
                                            label: '36',
                                        },
                                        {
                                            value: '37.1',
                                            label: '37.1',
                                        },
                                        {
                                            value: '37.2',
                                            label: '37.2',
                                        },
                                        {
                                            value: '37.3',
                                            label: '37.3',
                                        },
                                        {
                                            value: '37.4',
                                            label: '37.4',
                                        },
                                        {
                                            value: '37.5',
                                            label: '37.5',
                                        },
                                        {
                                            value: '38.1',
                                            label: '38.1',
                                        },
                                        {
                                            value: '38.2',
                                            label: '38.2',
                                        },
                                        {
                                            value: '38.3',
                                            label: '38.3',
                                        },
                                        {
                                            value: '38.4',
                                            label: '38.4',
                                        },
                                        {
                                            value: '38.5',
                                            label: '38.5',
                                        },
                                        {
                                            value: '38.6',
                                            label: '38.6',
                                        },
                                        {
                                            value: '38.7',
                                            label: '38.7',
                                        },
                                        {
                                            value: '39',
                                            label: '39',
                                        },
                                        {
                                            value: '40.1',
                                            label: '40.1',
                                        },
                                        {
                                            value: '40.2',
                                            label: '40.2',
                                        },
                                        {
                                            value: '40.3',
                                            label: '40.3',
                                        },
                                        {
                                            value: '41.1',
                                            label: '41.1',
                                        },
                                        {
                                            value: '41.2',
                                            label: '41.2',
                                        },
                                        {
                                            value: '41.3',
                                            label: '41.3',
                                        },
                                        {
                                            value: '42',
                                            label: '42',
                                        },
                                        {
                                            value: '43',
                                            label: '43',
                                        },
                                        {
                                            value: '44',
                                            label: '44',
                                        },
                                        {
                                            value: '45',
                                            label: '45',
                                        },
                                        {
                                            value: '46',
                                            label: '46',
                                        },
                                        {
                                            value: '47',
                                            label: '47',
                                        },
                                        {
                                            value: '48',
                                            label: '48',
                                        },
                                        {
                                            value: '49',
                                            label: '49',
                                        },
                                        {
                                            value: '50',
                                            label: '50',
                                        },
                                        {
                                            value: '51',
                                            label: '51',
                                        },
                                        {
                                            value: '52',
                                            label: '52',
                                        },
                                        {
                                            value: '53',
                                            label: '53',
                                        },
                                        {
                                            value: '54.1',
                                            label: '54.1',
                                        },
                                        {
                                            value: '54.2',
                                            label: '54.2',
                                        },
                                        {
                                            value: '54.3',
                                            label: '54.3',
                                        },
                                        {
                                            value: '54.4',
                                            label: '54.4',
                                        },
                                        {
                                            value: '55',
                                            label: '55',
                                        },
                                        {
                                            value: '56',
                                            label: '56',
                                        },
                                        {
                                            value: '57',
                                            label: '57',
                                        },
                                        {
                                            value: '58',
                                            label: '58',
                                        },
                                        {
                                            value: '59',
                                            label: '59',
                                        },
                                        {
                                            value: '60',
                                            label: '60',
                                        },
                                        {
                                            value: '61',
                                            label: '61',
                                        },
                                        {
                                            value: '62',
                                            label: '62',
                                        },
                                        {
                                            value: '63.1',
                                            label: '63.1',
                                        },
                                        {
                                            value: '63.2',
                                            label: '63.2',
                                        },
                                        {
                                            value: '63.3',
                                            label: '63.3',
                                        },
                                        {
                                            value: '63.4',
                                            label: '63.4',
                                        },
                                        {
                                            value: '63.5',
                                            label: '63.5',
                                        },
                                        {
                                            value: '64',
                                            label: '64',
                                        },
                                        {
                                            value: '65',
                                            label: '65',
                                        },
                                        {
                                            value: '66',
                                            label: '66',
                                        },
                                        {
                                            value: '67',
                                            label: '67',
                                        },
                                        {
                                            value: '68.1',
                                            label: '68.1',
                                        },
                                        {
                                            value: '68.2',
                                            label: '68.2',
                                        },
                                        {
                                            value: '68.3',
                                            label: '68.3',
                                        },
                                        {
                                            value: '69',
                                            label: '69',
                                        },
                                        {
                                            value: '70',
                                            label: '70',
                                        },
                                        {
                                            value: '71',
                                            label: '71',
                                        },
                                        {
                                            value: '72',
                                            label: '72',
                                        },
                                        {
                                            value: '73',
                                            label: '73',
                                        },
                                        {
                                            value: '74',
                                            label: '74',
                                        },
                                        {
                                            value: '75',
                                            label: '75',
                                        },
                                        {
                                            value: '76',
                                            label: '76',
                                        },
                                        {
                                            value: '77',
                                            label: '77',
                                        },
                                        {
                                            value: '78',
                                            label: '78',
                                        },
                                        {
                                            value: '79',
                                            label: '79',
                                        },
                                        {
                                            value: '80',
                                            label: '80',
                                        },
                                        {
                                            value: '81',
                                            label: '81',
                                        },
                                        {
                                            value: '82',
                                            label: '82',
                                        },
                                        {
                                            value: '83',
                                            label: '83',
                                        },
                                        {
                                            value: '84',
                                            label: '84',
                                        },
                                        {
                                            value: '85',
                                            label: '85',
                                        },
                                        {
                                            value: '86',
                                            label: '86',
                                        },
                                        {
                                            value: '87',
                                            label: '87',
                                        },
                                        {
                                            value: '88',
                                            label: '88',
                                        },
                                        {
                                            value: '89',
                                            label: '89',
                                        },
                                        {
                                            value: '90',
                                            label: '90',
                                        },
                                        {
                                            value: '91',
                                            label: '91',
                                        },
                                        {
                                            value: '92',
                                            label: '92',
                                        },
                                        {
                                            value: '93',
                                            label: '93',
                                        },
                                        {
                                            value: '94',
                                            label: '94',
                                        },
                                        {
                                            value: '95',
                                            label: '95',
                                        },
                                        {
                                            value: '96',
                                            label: '96',
                                        },
                                        {
                                            value: '97',
                                            label: '97',
                                        },
                                        {
                                            value: '98',
                                            label: '98',
                                        },
                                        {
                                            value: '99',
                                            label: '99',
                                        },
                                        {
                                            value: '100',
                                            label: '100',
                                        },
                                        {
                                            value: '101',
                                            label: '101',
                                        },
                                        {
                                            value: '102',
                                            label: '102',
                                        },
                                        {
                                            value: '103',
                                            label: '103',
                                        },
                                        {
                                            value: '104',
                                            label: '104',
                                        },
                                        {
                                            value: '105',
                                            label: '105',
                                        },
                                        {
                                            value: '106',
                                            label: '106',
                                        },
                                        {
                                            value: '107',
                                            label: '107',
                                        },
                                        {
                                            value: '108',
                                            label: '108',
                                        },
                                        {
                                            value: '109',
                                            label: '109',
                                        },
                                        {
                                            value: '110',
                                            label: '110',
                                        },
                                        {
                                            value: '111',
                                            label: '111',
                                        },
                                        {
                                            value: '112',
                                            label: '112',
                                        },
                                        {
                                            value: '113',
                                            label: '113',
                                        },
                                        {
                                            value: '114.1',
                                            label: '114.1',
                                        },
                                        {
                                            value: '114.2',
                                            label: '114.2',
                                        },
                                        {
                                            value: '114.3',
                                            label: '114.3',
                                        },
                                        {
                                            value: '114.4',
                                            label: '114.4',
                                        },
                                        {
                                            value: '114.5',
                                            label: '114.5',
                                        },
                                        {
                                            value: '114.6',
                                            label: '114.6',
                                        },
                                        {
                                            value: '114.7',
                                            label: '114.7',
                                        },
                                        {
                                            value: '114.8',
                                            label: '114.8',
                                        },
                                        {
                                            value: '114.9',
                                            label: '114.9',
                                        },
                                        {
                                            value: '114.10',
                                            label: '114.10',
                                        },
                                        {
                                            value: '114.11',
                                            label: '114.11',
                                        },
                                        {
                                            value: '114.12',
                                            label: '114.12',
                                        },
                                        {
                                            value: '114.13',
                                            label: '114.13',
                                        },
                                        {
                                            value: '115',
                                            label: '115',
                                        },
                                        {
                                            value: '116',
                                            label: '116',
                                        },
                                        {
                                            value: '117',
                                            label: '117',
                                        },
                                        {
                                            value: '118',
                                            label: '118',
                                        },
                                        {
                                            value: '119',
                                            label: '119',
                                        },
                                        {
                                            value: '120',
                                            label: '120',
                                        },
                                        {
                                            value: '121',
                                            label: '121',
                                        },
                                        {
                                            value: '122',
                                            label: '122',
                                        },
                                        {
                                            value: '123',
                                            label: '123',
                                        },
                                        {
                                            value: '124',
                                            label: '124',
                                        },
                                        {
                                            value: '125',
                                            label: '125',
                                        },
                                        {
                                            value: '126',
                                            label: '126',
                                        },
                                        {
                                            value: '127',
                                            label: '127',
                                        },
                                        {
                                            value: '128',
                                            label: '128',
                                        },
                                        {
                                            value: '129',
                                            label: '129',
                                        },
                                    ]}
                                />
                            </Row>
                        </Col>

                        {/* <Col style={{ marginTop: "20px", marginBottom: "10px" }}>
                            <Text style={{ fontSize: "16px" }}>1.Общие требования</Text>
                        </Col>

                        <Col span={20} offset={2} style={{ marginTop: "10px", marginBottom: "20px", textAlign: "left", }}>
                            <Text style={{ fontSize: "16px", marginLeft: "15px" }}>1.Руководителем субъекта хозяйствования обеспечены:</Text>
                        </Col> */}

                        <Col span={22} offset={1} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "16px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row style={{ marginTop: "15px" }}>
                                    <Col>
                                        <Text>
                                            Номер пункта:
                                        </Text>
                                        <Input style={{ width: '50%', marginLeft: '15px' }} readOnly />
                                    </Col>

                                    <Col>
                                        <Cascader placeholder="Да" style={{ marginLeft: "-15px", }}
                                            options={[
                                                {
                                                    value: 'Да',
                                                    label: 'Да',
                                                },
                                                {
                                                    value: 'Нет',
                                                    label: 'Нет',
                                                },
                                                {
                                                    value: 'Не требуется',
                                                    label: 'Не требуется',
                                                },
                                            ]}
                                        />
                                    </Col>

                                    <Col span={2} offset={6}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px", marginLeft: "0px", marginRight: "0px"
                                        }}>
                                            <Text strong>Изменить</Text>
                                        </Button>
                                    </Col>

                                    <Col span={2} offset={1}>
                                        <Button style={{
                                            color: "black", background: "blanchedalmond", border: "2px solid gold",
                                            borderRadius: "8px",
                                        }}>
                                            <Text strong>Подтвердить</Text>
                                        </Button>
                                    </Col>
                                </Row>


                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Требование:
                                    </Text>


                                    <TextArea readOnly />

                                </Row>


                                <Row>
                                    <Text style={{ marginTop: "30px" }}>
                                        Структурные элементы
                                        нормативных правовых актов:
                                    </Text>

                                    <Input style={{ width: '50%', marginLeft: '15px', marginTop: '15px' }} readOnly />
                                    <Button shape="sqaure" size='small' style={{ marginTop: "25px", marginLeft: "15px", background: '#CCFF99', color: 'black' }}>
                                        <InfoOutlined />
                                    </Button>
                                    {/* <Button type="primary" shape="circle" icon={<QuestionCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px', marginTop: "30px", marginLeft: "15px" }} />} /> */}
                                    {/* <QuestionCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '30px', marginTop: "30px", marginLeft: "15px" }} /> */}
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Button style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "-3px", marginBottom: "10px", marginRight: "20px"
                                    }}>
                                        <Text strong>Добавить примечание</Text>
                                    </Button>

                                    <Button style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "-3px"
                                    }}>
                                        <Text strong>Добавить фото/видео</Text>
                                    </Button>
                                </Row>

                            </Col>
                        </Col>

                        {/* <Col style={{ marginTop: "-20px", marginBottom: "10px" }}>
                            <Text style={{ fontSize: "16px" }}>...</Text>
                        </Col>

                        <Col style={{ marginTop: "10px", marginBottom: "20px" }}>
                            <Text style={{ fontSize: "16px" }}>2.Требования при осуществлении технического обслуживания<br />
                                систем пожарной автоматики</Text>
                        </Col>

                        <Col span={20} offset={2} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "16px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row>
                                    <Col style={{ marginTop: "15px" }}>

                                        <Row>
                                            <Text>
                                                Номер пункта: 84
                                            </Text>

                                            <Col>
                                                <Cascader placeholder="Нет" style={{ width: 130, marginLeft: "-15px", marginRight: "45px", marginTop: "-10px" }}
                                                    options={[
                                                        {
                                                            value: 'Да',
                                                            label: 'Да',
                                                        },
                                                        {
                                                            value: 'Нет',
                                                            label: 'Нет',
                                                        },
                                                        {
                                                            value: 'Не требуется',
                                                            label: 'Не требуется',
                                                        },
                                                    ]}
                                                />
                                            </Col>

                                            <Button style={{
                                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                                borderRadius: "8px", marginTop: "-3px", marginLeft: "65px", marginRight: "10px"
                                            }}>
                                                <Text strong>Изменить</Text>
                                            </Button>

                                            <Button style={{
                                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                                borderRadius: "8px", marginTop: "-3px"
                                            }}>
                                                <Text strong>Подтвердить</Text>
                                            </Button>
                                        </Row>

                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Требование:
                                    </Text>

                                    <Text style={{ marginLeft: "110px", marginTop: "-25px" }}>
                                        Для проведения работ по техническому обслуживанию систем
                                        пожарной сигнализации и (или) систем оповещения и управления
                                        эвакуацией людей, линейной части установок автоматического
                                        пожаротушения, систем противодымной вентиляции, в штате
                                        имеется инженерно-технический работник и не менее трех
                                        электромонтеров охранно-пожарной сигнализации
                                    </Text>
                                </Row>

                                <Row>
                                    <Text style={{ marginTop: "30px" }}>
                                        Структурные элементы<br />
                                        нормативных правовых актов:
                                    </Text>

                                    <Text style={{ marginTop: "55px", marginLeft: "15px" }}>
                                        часть первая пункта 4.9<sup>3</sup>
                                    </Text>

                                    <QuestionCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px', marginTop: "58px", marginLeft: "15px" }} />
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Button style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "-3px", marginBottom: "10px", marginRight: "20px"
                                    }}>
                                        <Text strong>Добавить примечание</Text>
                                    </Button>

                                    <Button style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "-3px"
                                    }}>
                                        <Text strong>Добавить фото/видео</Text>
                                    </Button>

                                </Row>

                            </Col>
                        </Col>

                        <Col style={{ marginTop: "-20px", marginBottom: "10px" }}>
                            <Text style={{ fontSize: "16px" }}>...</Text>
                        </Col>

                        <Col style={{ marginTop: "10px", marginBottom: "20px" }}>
                            <Text style={{ fontSize: "16px" }}>3.Прочие мероприятия
                            </Text>
                        </Col>

                        <Col span={20} offset={2} style={{ background: "lightblue", textAlign: "left", marginBottom: "30px", fontSize: "16px", border: "1px solid mediumpurple" }}>
                            <Col span={22} offset={1} >

                                <Row>
                                    <Col style={{ marginTop: "15px" }}>

                                        <Row>
                                            <Text>
                                                Номер пункта: 129
                                            </Text>

                                            <Col>
                                                <Cascader placeholder="Не требуется" style={{ width: 130, marginLeft: "-15px", marginRight: "45px", marginTop: "-10px" }}
                                                    options={[
                                                        {
                                                            value: 'Да',
                                                            label: 'Да',
                                                        },
                                                        {
                                                            value: 'Нет',
                                                            label: 'Нет',
                                                        },
                                                        {
                                                            value: 'Не требуется',
                                                            label: 'Не требуется',
                                                        },
                                                    ]}
                                                />
                                            </Col>

                                            <Button style={{
                                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                                borderRadius: "8px", marginTop: "-3px", marginLeft: "65px", marginRight: "10px"
                                            }}>
                                                <Text strong>Изменить</Text>
                                            </Button>

                                            <Button style={{
                                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                                borderRadius: "8px", marginTop: "-3px"
                                            }}>
                                                <Text strong>Подтвердить</Text>
                                            </Button>
                                        </Row>

                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Text>
                                        Требование:
                                    </Text>

                                    <Text style={{ marginLeft: "110px", marginTop: "-25px" }}>
                                        Предписание об устранении нарушений, вынесенное органами
                                        государственного пожарного надзора по результатам
                                        предыдущей проверки, выполнено в полном объеме
                                    </Text>
                                </Row>

                                <Row>
                                    <Text style={{ marginTop: "30px" }}>
                                        Структурные элементы<br />
                                        нормативных правовых актов:
                                    </Text>

                                    <Text style={{ marginTop: "55px", marginLeft: "15px" }}>
                                        статья 20<sup>2</sup>
                                    </Text>

                                    <QuestionCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px', marginTop: "58px", marginLeft: "15px" }} />
                                </Row>

                                <Row style={{ marginTop: "15px" }}>
                                    <Button style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "-3px", marginBottom: "10px", marginRight: "20px"
                                    }}>
                                        <Text strong>Добавить примечание</Text>
                                    </Button>

                                    <Button style={{
                                        color: "black", background: "blanchedalmond", border: "2px solid gold",
                                        borderRadius: "8px", marginTop: "-3px"
                                    }}>
                                        <Text strong>Добавить фото/видео</Text>
                                    </Button>

                                </Row>

                            </Col>
                        </Col> */}
                        <Col span={22} offset={1} style={{ textAlign: "left", marginBottom: "30px", fontSize: "15px" }}>
                            <Button style={{
                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                borderRadius: "8px", marginTop: "-25px", marginBottom: "10px", marginLeft: "0px"
                            }}>
                                <Text strong>Добавить</Text>
                            </Button>
                        </Col>

                        <Row justify={'center'}>
                            <Button type="primary" style={{
                                color: "black", background: "blanchedalmond", border: "2px solid gold",
                                borderRadius: "8px", marginBottom: "20px", marginTop: "-10px"
                            }}>
                                <Text strong>Завершить</Text>
                            </Button>
                        </Row>

                    </Col>
                </Row>

            </ConfigProvider>
        </>
    );
}

export default Check_list_1;