import { Cascader, Col, DatePicker, Input, Row, Space, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { Button } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { InfoOutlined } from '@ant-design/icons';
import { color } from 'echarts';
import FormTreb from './FormTreb';
import { useEffect, useState } from 'react';

const { Text } = Typography;

const Check_list_1 = () => {
    const [loadingFormTreb, setLoadingFormTreb] = useState(false);
    const [fields, setFields] = useState([]);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const getTrebs = () => {
        setLoadingFormTreb(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        idChlistForm: 1,
                        // id_chlist int UNSIGNED NOT NULL,
                        field1: 1,
                        // id_type_unit1 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля index_num (чекбохс,текстовое поле, кнопки, переключатели )',
                        field2: 'Предусмотрены ли проектом оборудования системы подачи воздуха и газоснабжения для шлюзирования',
                        // id_type_unit2 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_requir',
                        field3: 'подпункт д) пункта 106 приложения 2<2>',
                        //id_type_unit3 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_normative',
                        field4: '',
                        field5: '',
                        field6: '',
                        //id_type_unit4_6 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для полей Да,Нет,Не требуется',
                        field7: '',
                        // id_type_unit7 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля Примечание',
                        field8: '',
                    },
                    {
                        idChlistForm: 1,
                        // id_chlist int UNSIGNED NOT NULL,
                        field1: 2,
                        // id_type_unit1 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля index_num (чекбохс,текстовое поле, кнопки, переключатели )',
                        field2:
                            'Обеспечивают ли средства газового контроля барокамеры точность замеров содержания кислорода, гелия и диоксида углерода, а также возможных вредных веществ',
                        // id_type_unit2 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_requir',
                        field3: 'пункт 108 приложения 2<2>',
                        //id_type_unit3 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_normative',
                        field4: '',
                        field5: '',
                        field6: '',
                        //id_type_unit4_6 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для полей Да,Нет,Не требуется',
                        field7: '',
                        // id_type_unit7 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля Примечание',
                        field8: '',
                    },
                    {
                        idChlistForm: 1,
                        // id_chlist int UNSIGNED NOT NULL,
                        field1: 2.1,
                        // id_type_unit1 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля index_num (чекбохс,текстовое поле, кнопки, переключатели )',
                        field2:
                            'Обеспечивают ли система и средства противопожарной защиты обнаружение начала пожара в барокамере или предпосылок возгорания (дым, бесконтрольное повышение температу-ры), подачу аварийного сигнала, а также тушение обнаруженного пожара всеми имеющимися в барокамере средствами ',
                        // id_type_unit2 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_requir',
                        field3: 'пункт 109 приложения 2<2>',
                        //id_type_unit3 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля name_normative',
                        field4: '',
                        field5: '',
                        field6: '',
                        //id_type_unit4_6 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для полей Да,Нет,Не требуется',
                        field7: '',
                        // id_type_unit7 int UNSIGNED DEFAULT NULL COMMENT 'Тип элемента для поля Примечание',
                        field8: '',
                    },
                ]);
            }, 1000);
        });
    };

    useEffect(() => {
        getTrebs().then((res) => {
            setFields(res);
            setLoadingFormTreb(false);
        });
    }, []);

    return (
        <>
            <ConfigProvider locale={ruRu}>
                <Row>
                    <Col span={24} style={{ textAlign: 'center', background: 'linen' }}>
                        <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Text strong style={{ fontSize: '17px' }}>
                                МИНИСТЕРСВО ПО ЧРЕЗВЫЧАЙНЫМ СИТУАЦИЯМ <br /> РЕСПУБЛИКИ БЕЛАРУСЬ
                                <br /> Органы государственного пожарного надзора
                            </Text>
                        </Col>

                        <Row>
                            <Col span={8} offset={6}>
                                <Text strong style={{ fontSize: '17px', textAlign: 'center' }}>
                                    КОНТРОЛЬНЫЙ СПИСОК ВОПРОСОВ (ЧЕК-ЛИСТ) №
                                </Text>
                            </Col>
                            <Col>
                                <Input style={{ marginTop: '-15px', width: '100%' }} />
                            </Col>
                        </Row>
                        <br />

                        <Col span={20} offset={2} style={{ textAlign: 'left' }}>
                            <Text style={{ fontSize: '17px' }}>
                                в сфере государственного пожарного надзора, надзора за соблюдением законодательства при осуществлении
                                деятельности по обеспечению пожарной безопасности:
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Дата начала заполнения</Text>

                                    <Col>
                                        <DatePicker onChange={onChange} style={{ marginLeft: '12px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Дата завершения зaполнения</Text>

                                    <Col>
                                        <DatePicker onChange={onChange} style={{ marginLeft: '15px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Дата направления</Text>

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
                                        <DatePicker onChange={onChange} style={{ marginLeft: '15px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Контрольный список вопросов (чек-лист) заполняется в ходе</Text>

                                    <Col>
                                        <Cascader
                                            placeholder="выбор из списка"
                                            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
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
                                <Row style={{ marginTop: '5px' }}>
                                    <Text>Должностное лицо, выполняющее проверку (направившее контрольный список вопросов):</Text>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Фамилия, инициалы:</Text>

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
                                        <Input style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Должность:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Контактный телефон:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row justify={'center'}>
                                    <Button
                                        type="primary"
                                        style={{
                                            color: 'black',
                                            background: 'blanchedalmond',
                                            border: '2px solid gold',
                                            borderRadius: '8px',
                                            marginTop: '15px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <Text strong>Подтвердить</Text>
                                    </Button>
                                </Row>
                                <Row justify={'center'} style={{ marginTop: '20px' }}>
                                    <Col>
                                        <Text strong>Сведения о проверяемом субъекте</Text>
                                    </Col>
                                </Row>
                                <Row justify={'center'} style={{ marginTop: '20px' }}>
                                    <Col span={1}>
                                        <Text>УНП:</Text>
                                    </Col>

                                    <Col span={5}>
                                        <Input style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }} />
                                    </Col>

                                    <Col span={5} offset={2}>
                                        <Button
                                            style={{
                                                color: 'black',
                                                background: 'blanchedalmond',
                                                border: '2px solid gold',
                                                borderRadius: '8px',
                                                marginTop: '-10px',
                                            }}
                                        >
                                            <Text style={{ marginTop: '-4px' }}>Заполнить форму</Text>
                                        </Button>
                                    </Col>

                                    <Col span={5} offset={2}>
                                        <Button
                                            style={{
                                                color: 'black',
                                                background: 'blanchedalmond',
                                                border: '2px solid gold',
                                                borderRadius: '8px',
                                                marginTop: '-10px',
                                            }}
                                        >
                                            <Text style={{ marginTop: '-4px' }}>Обновить данные</Text>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Наименование проверяемого субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Место нахождения проверяемого субъекта (объекта проверяемого субъекта):</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '25px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Место осуществления деятельности:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Фамилия, инициалы представителя субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Должность представителя субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Контактный телефон представителя субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Фамилия, инициалы ответственного за обеспечение пожарной безопасности субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Должность ответственного за обеспечение пожарной безопасности субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Контактный телефон ответственного за обеспечение пожарной безопасности субъекта:</Text>

                                    <Col>
                                        <Input style={{ width: '100%', marginLeft: '10px', marginTop: '-10px' }} />
                                    </Col>
                                </Row>
                                <Row justify={'center'}>
                                    <Button
                                        type="primary"
                                        style={{
                                            color: 'black',
                                            background: 'blanchedalmond',
                                            border: '2px solid gold',
                                            borderRadius: '8px',
                                            marginTop: '10px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <Text strong>Подтвердить</Text>
                                    </Button>
                                </Row>
                            </Text>
                        </Col>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} style={{ textAlign: 'center', background: 'linen' }}>
                        <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Text strong style={{ fontSize: '17px' }}>
                                ХАРАКТЕРИСТИКИ ПРОВЕРЯЕМОГО СУБЪЕКТА
                            </Text>
                        </Col>

                        <Col span={20} offset={2} style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'left' }}>
                            <Row>
                                <Text style={{ fontSize: '17px' }}>Численность работников (персонала):</Text>

                                <Col>
                                    <Input
                                        placeholder="заполняется вручную"
                                        style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }}
                                    />
                                </Col>

                                <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
                            </Row>

                            <Row style={{ marginTop: '20px' }}>
                                <Text style={{ fontSize: '17px' }}>Расчетное количество посетителей:</Text>

                                <Col>
                                    <Input
                                        placeholder="заполняется вручную"
                                        style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }}
                                    />
                                </Col>

                                <Text style={{ fontSize: '17px', marginLeft: '15px' }}>чел.</Text>
                            </Row>

                            <Row style={{ marginTop: '20px' }}>
                                <Text style={{ fontSize: '17px' }}>Площадь территории:</Text>

                                <Col>
                                    <Input
                                        placeholder="заполняется вручную"
                                        style={{ width: 190, marginLeft: '15px', marginTop: '-10px' }}
                                    />
                                </Col>

                                <Text style={{ fontSize: '17px', marginLeft: '15px' }}>
                                    м<sup>2</sup>.
                                </Text>
                            </Row>
                        </Col>



                        <Col
                            span={22}
                            offset={1}
                            style={{
                                background: 'lightblue',
                                textAlign: 'left',
                                marginBottom: '30px',
                                fontSize: '17px',
                                border: '1px solid mediumpurple',
                            }}
                        >
                            <Col span={22} offset={1}>
                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={2}>
                                        <Text>Класс:</Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader
                                            placeholder="Ф1.1"
                                            style={{ width: 100, marginLeft: '10px', marginTop: '-10px', marginRight: '10px' }}
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

                                    <Col span={1}>
                                        <Text >Тип:</Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader
                                            placeholder="Сооружение"
                                            style={{ width: '150%', marginLeft: '10px', marginTop: '-10px' }}
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

                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input
                                            placeholder="заполняется вручную"
                                            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Площадь, кв. м.:</Text>

                                    <Col span={4}>
                                        <Input
                                            placeholder="заполняется вручную"
                                            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                                        />
                                    </Col>

                                    <Col span={2} offset={15}>
                                        <Button
                                            style={{
                                                color: 'black',
                                                background: 'blanchedalmond',
                                                border: '2px solid gold',
                                                borderRadius: '8px',
                                                marginTop: '-10px',
                                                marginBottom: '10px',
                                                marginLeft: '0px',
                                            }}
                                        >
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>

                        <Col span={22} offset={1} style={{ textAlign: 'left', marginBottom: '30px', fontSize: '15px' }}>
                            <Button
                                style={{
                                    color: 'black',
                                    background: 'blanchedalmond',
                                    border: '2px solid gold',
                                    borderRadius: '8px',
                                    marginTop: '-25px',
                                    marginBottom: '10px',
                                    marginLeft: '0px',
                                }}
                            >
                                <Text strong>Добавить</Text>
                            </Button>
                        </Col>

                        <Col
                            span={22}
                            offset={1}
                            style={{
                                background: 'lightblue',
                                textAlign: 'left',
                                marginBottom: '30px',
                                fontSize: '17px',
                                border: '1px solid mediumpurple',
                            }}
                        >
                            <Col span={22} offset={1}>
                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={2}>
                                        <Text>Категория:</Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader
                                            placeholder="Б"
                                            style={{ width: 100, marginLeft: '10px', marginTop: '-10px' }}
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

                                    <Col span={1}>
                                        <Text>Тип:</Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader
                                            placeholder="Здание"
                                            style={{ width: '150%', marginLeft: '10px', marginTop: '-10px' }}
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

                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input
                                            placeholder="заполняется вручную"
                                            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Площадь, кв. м.:</Text>

                                    <Col span={4}>
                                        <Input
                                            placeholder="заполняется вручную"
                                            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                                        />
                                    </Col>

                                    <Col span={2} offset={15}>
                                        <Button
                                            style={{
                                                color: 'black',
                                                background: 'blanchedalmond',
                                                border: '2px solid gold',
                                                borderRadius: '8px',
                                                marginTop: '-10px',
                                                marginBottom: '10px',
                                                marginLeft: '0px',
                                            }}
                                        >
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

                        <Col span={22} offset={1} style={{ textAlign: 'left', marginBottom: '30px', fontSize: '15px' }}>
                            <Button
                                style={{
                                    color: 'black',
                                    background: 'blanchedalmond',
                                    border: '2px solid gold',
                                    borderRadius: '8px',
                                    marginTop: '-25px',
                                    marginBottom: '10px',
                                    marginLeft: '0px',
                                }}
                            >
                                <Text strong>Добавить</Text>
                            </Button>
                        </Col>

                        <Col
                            span={22}
                            offset={1}
                            style={{
                                background: 'lightblue',
                                textAlign: 'left',
                                marginBottom: '30px',
                                fontSize: '17px',
                                border: '1px solid mediumpurple',
                            }}
                        >
                            <Col span={22} offset={1}>
                                <Row style={{ marginTop: '15px' }}>
                                    <Col span={2}>
                                        <Text>Категория:</Text>
                                    </Col>

                                    <Col span={3}>
                                        <Cascader
                                            placeholder="Д"
                                            style={{ width: 100, marginLeft: '10px', marginTop: '-10px' }}
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

                                    <Col span={1}>
                                        <Text>Тип:</Text>
                                    </Col>

                                    <Col span={3}>
                                        <Input
                                            placeholder="Наружная установка"
                                            disabled
                                            style={{ width: '150%', marginLeft: '10px', marginTop: '-10px' }}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Количество:</Text>

                                    <Col span={4}>
                                        <Input
                                            placeholder="заполняется вручную"
                                            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '15px' }}>
                                    <Text>Объём обращающихся веществ и материалов, куб. м.:</Text>

                                    <Col span={4}>
                                        <Input
                                            placeholder="заполняется вручную"
                                            style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                                        />
                                    </Col>

                                    <Col span={2} offset={9}>
                                        <Button
                                            style={{
                                                color: 'black',
                                                background: 'blanchedalmond',
                                                border: '2px solid gold',
                                                borderRadius: '8px',
                                                marginTop: '-10px',
                                                marginBottom: '10px',
                                                marginLeft: '0px',
                                            }}
                                        >
                                            <Text strong>Удалить</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>

                        <Col span={22} offset={1} style={{ textAlign: 'left', marginBottom: '30px', fontSize: '15px' }}>
                            <Button
                                style={{
                                    color: 'black',
                                    background: 'blanchedalmond',
                                    border: '2px solid gold',
                                    borderRadius: '8px',
                                    marginTop: '-25px',
                                    marginBottom: '10px',
                                    marginLeft: '0px',
                                }}
                            >
                                <Text strong>Добавить</Text>
                            </Button>
                        </Col>

                        <Row justify={'center'}>
                            <Button
                                type="primary"
                                style={{
                                    color: 'black',
                                    background: 'blanchedalmond',
                                    border: '2px solid gold',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    marginTop: '-10px',
                                }}
                            >
                                <Text strong>Подтвердить</Text>
                            </Button>
                        </Row>
                    </Col>
                </Row>

                <FormTreb loading={loadingFormTreb} fields={fields} />
            </ConfigProvider>
        </>
    );
};

export default Check_list_1;
