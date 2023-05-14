import { getAllDepartments } from '@app/api/departments.api';
import { getSubjectByUnp } from '@app/api/subjects.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { notificationController } from '@app/controllers/notificationController';
import { IGroup, IUnits, SDept, SDeptNode, SSubj, SSubjObj, SUnits, User } from '@app/domain/interfaces';
import { deptToTreeNode, makeTree } from '@app/utils/utils';
import { Card, Col, Row, TreeSelect, message, DatePicker } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Collapse } from 'antd';
import { getAllObjectsBySubjectId } from '@app/api/objects.api';
import { DefaultOptionType } from 'antd/lib/cascader';
import { getAllUnits, getUnitsByTypeUnit } from '@app/api/units.api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { s } from '@fullcalendar/core/internal-common';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Loading } from '@app/components/common/Loading';
import { IEventsCategory } from '@app/components/spisok_events/eventsTables/EventsTable';
import { getAllEvents } from '@app/api/events.api';
import { AddEditUserForm } from '@app/components/users/forms/AddUserForm';
import { getAllUsers } from '@app/api/users.api';
import { PlusOutlined } from '@ant-design/icons';
import * as S from '../../eventCard/eventCard.styles';

interface Option extends DefaultOptionType {
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}

type options = {
  label: string;
  value: string | number | null;
};

export const AddEventOrderForm: React.FC = () => {
  const [unp, setUnp] = useState<string>();
  const [subj, setSubj] = useState<SSubj>();
  const [type, setType] = useState<any>();
  const [deps, setDeps] = useState<SDept[]>();
  const [departments, setDepartments] = useState<SDeptNode[]>([]);
  const [selectedDept, setSelectedDept] = useState<number | string | null>(null);
  const [createGroup, setCreateGroup] = useState<boolean>();
  const [selectGroup, setSelectGroup] = useState<boolean>();
  const [objects, setObjects] = useState<SSubjObj[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [eventOptions, setEventsOptions] = useState<options[]>([]);
  const [units, setUnits] = useState<IUnits[]>([]);
  const [allUnits, setAllUnits] = useState<IUnits[]>([]);
  const [types, setTypes] = useState<options[]>([]);
  const [kinds, setKinds] = useState<options[]>([]);
  const [kind, setKind] = useState<number | string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [plansOptions, setPlansOptions] = useState<options[]>([]);
  const [plan, setPlan] = useState<options | null>(null);
  const [groupOptions, setGroupOptions] = useState<options[]>([]);
  const [groupLoading, setGroupLoading] = useState<boolean>(false);
  const [shownGroupAdd, setShouwnGroupAdd] = useState<boolean>(false);
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [group, setGroup] = useState<IGroup>({
    idGroup: null,
    name: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [usersOptions, setUsersOptions] = useState<options[]>([]);
  const [field, setField] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    // subj?.sSubjObjs.
    console.log(values);
  };

  const onFinishField = (values) => {
    console.log(values);
  };

  const getTypesEvents = () => {
    getAllUnits()
      .then((units: IUnits[]) => {
        setAllUnits(units);
        return units;
      })
      .then((units) => {
        const currentTypes: IUnits[] = units.filter(
          (unit) => unit.idUnit == 91 || unit.idUnit == 92 || unit.idUnit == 94,
        );
        const types: options[] = currentTypes.map((type) => ({
          label: type.name,
          value: type.idUnit,
        }));
        setTypes(types);
      });
  };

  useEffect(() => {
    console.log(kinds);
  }, [kinds]);

  const getSubject = () => {
    if (unp)
      getSubjectByUnp(unp)
        .then((res) => {
          setSubj(res);
          console.log(res);
          if (res.idSubj)
            getAllObjectsBySubjectId(res.idSubj).then((responce) => {
              setObjects(responce);
              const opt: Option[] = [];
              responce.forEach((element) => opt.push({ value: element.idObj, label: element.nameObj }));
              console.log(responce);
              setOptions(opt);
            });
        })
        .catch((e) => {
          notificationController.error({ message: 'Произошла ошибка при загрузке' });
        });
  };

  const getGroups = () => {
    setGroupLoading(true);
    // if (selectedDept) {
    //   getAllGroupsByIdDept(selectedDept).then(groups);
    // }
    return new Promise<IGroup[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            idGroup: 1,
            org: 1,
            name: 'группа_п',
            dateRecord: '501	1	02.11.2022',
            uid: null,
          },
          {
            idGroup: 2,
            org: 1,
            name: 'группа_п2',
            dateRecord: '501	1	02.11.2022',
            uid: null,
          },
        ]);
      }, 500);
    }).then((res) => {
      const gropupsOptions = res.map((group) => ({
        label: group.name,
        value: group.idGroup,
      }));
      setGroupOptions(gropupsOptions);
      setGroupLoading(false);
    });
  };

  const getUsers = () => {
    getAllUsers().then((users) => {
      setUsers(users);
      const options = users.map((user) => ({
        label: `${user.fName} ${user.lName}`,
        value: user.uid,
      }));
      setUsersOptions(options);
      setUsersLoading(false);
    });
  };

  const location = useLocation();
  useEffect(() => {
    console.log(location);
    if (location.state) {
      setSubj(location.state);
    }
  }, []);

  const handleUnpChange = (event: any) => {
    setUnp(event.target.value);
  };

  const getEvents = () => {
    setLoading(true);
    getAllEvents().then((events) => {
      const eventsOptionsCurrent = events.map((event) => ({ label: event.event, value: event.idEvent }));
      setEventsOptions(eventsOptionsCurrent);
      setLoading(false);
    });
  };
  const setKindsBeforeSelect = (selected: number) => {
    if (selected == 92 || selected == 91) {
      // mb we need req there
      const currentKinds: IUnits[] = allUnits.filter((unit) => unit.idUnit == 81 || unit.idUnit == 82);

      const kinds: options[] = currentKinds.map((type) => ({
        label: type.name,
        value: type.idUnit,
      }));
      kinds.push({
        label: 'плановая',
        value: 'plan',
      });
      setKinds(kinds);
    } else {
      setKinds([]);
    }
  };

  const onSelectType = (selected: any) => {
    setType(selected);
    setKindsBeforeSelect(selected);
  };

  const chekPlans = (kind: unknown) => {
    // change hardkode string plan
    if (kind === 'plan') {
      // getplanbyUnp() or id event+id subj
      // проверка если есть или нет
      const res = [
        {
          idEventPlan: 1629,
          idEvents: 64,
          idDept: 501,
          numOrder: 145,
          nameDept:
            'Департамент по надзору за безопасным ведением работ в промышленности Министерства по чрезвычайным ситуациям Республики Беларусь',
          monthEvent: 'февраль',
          halfYaerEvent: 1,
          dateRecord: '03.04.2023 13:55:08',
          telUser: '80165627140',
          status: 'wait',
          yearPlan: 2023,
        },
      ];
      const optionsPlans = res.map((plan) => ({
        label: plan.monthEvent,
        value: plan.idEventPlan,
      }));
      setPlans(res);
      setPlansOptions(optionsPlans);
    } else {
      setPlansOptions([]);
      setPlan(null);
    }
  };
  const onSelectKind = (selected: string | unknown) => {
    setKind(String(selected));
    chekPlans(selected);
  };

  const departmentsOptionsTree = useMemo(() => {
    if (plan) {
      const currentPlan = plans.find((item) => {
        return item.idEventPlan == plan.idEventPlan;
      });
      console.log(currentPlan);

      const indexDepartments = departments.findIndex((dep) => {
        return dep.idDept == currentPlan.idDept;
      });
      console.log('indexDepartments', indexDepartments, plan);
      if (indexDepartments !== -1) {
        return [departments[indexDepartments]];
      }
    }
    return departments;
  }, [plan, departments, plans]);

  const onDepartmentSelect = (selected: any) => {
    console.log(selected);
    setSelectedDept(selected);
    //setSelectedDept(deps?.find(element=>element.active))
  };

  // const addField = () => {
  //   const newFiled = [...field];
  //   newFiled.push(1);
  //   setField(newFiled);
  // };
  const onCreateGroupClick = () => {};

  const onChange = (value: string[], selectedOptions: Option[]) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
  };

  useEffect(() => {
    setLoading(true);
    getAllDepartments()
      .then((responce) => {
        setDeps(responce);
        console.log(responce);
        const arr: SDeptNode[] = [];
        for (let i = 0; i < responce.length; i++) {
          arr.push(deptToTreeNode(responce[i]));
        }
        setDepartments(makeTree(arr));
        setLoading(false);
      })
      .catch((e) => {
        notificationController.error({ message: 'Произошла ошибка при загрузке' });
      });
    getUnitsByTypeUnit(0)
      .then((res) => {
        console.log('units', res);
        setUnits(res);
      })
      .catch((e) => {
        notificationController.error({ message: 'Произошла ошибка' });
      });
    getEvents();
    getTypesEvents();
    getGroups();
  }, []);

  const formatDate = 'YYYY-MM-DD';
  return (
    <>
      <Spinner spinning={loading}>
        <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
          {subj?.idSubj || (
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
                  <Button type="primary" style={{ width: 200 }} onClick={(values) => getSubject()}>
                    Загрузить субъект
                  </Button>
                </BaseButtonsForm.Item>
              </Col>
            </Row>
          )}
          {subj?.idSubj ? (
            <BaseButtonsForm.Item>
              <p>УНП - {subj?.unp}</p>
              <p>Наименование - {subj?.subj}</p>
              <p>Адрес юридический - {subj?.addrYur}</p>
            </BaseButtonsForm.Item>
          ) : null}

          <BaseButtonsForm.Item label="Мероприятия" name="idEvent" rules={[{ required: true }]}>
            <Select
              options={eventOptions}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              showSearch
            />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Тип мероприятия" name="idUnit_4" rules={[{ required: true }]}>
            <Select onSelect={onSelectType} options={types} />
          </BaseButtonsForm.Item>
          {kinds.length > 1 ? (
            <BaseButtonsForm.Item label="Вид мероприятия" name="idUnit_3" rules={[{ required: true }]}>
              <Select onSelect={onSelectKind} options={kinds} />
            </BaseButtonsForm.Item>
          ) : null}

          {plansOptions.length > 0 ? (
            <BaseButtonsForm.Item label="Планы" name="idEventsPlans" rules={[{ required: true }]}>
              <Select
                onSelect={(value) => {
                  const selectedPlan = plans.find((plan) => plan.idEventPlan == value);
                  setPlan(selectedPlan);
                }}
                options={plansOptions}
              />
            </BaseButtonsForm.Item>
          ) : null}

          {departments.length !== 0 ? (
            <BaseButtonsForm.Item label="Подразделение" name="departament">
              <TreeSelect
                onSelect={onDepartmentSelect}
                fieldNames={{
                  label: 'departament',
                  value: 'idDept',
                }}
                labelInValue={true}
                treeData={departmentsOptionsTree}
                treeDataSimpleMode={{
                  id: 'idDept',
                  pId: 'idParent',
                }}
                treeNodeLabelProp="departament"
                treeNodeFilterProp="idDept"
              ></TreeSelect>
            </BaseButtonsForm.Item>
          ) : null}

          <Row>
            <Col sm={16} md={16} lg={16}>
              <BaseButtonsForm.Item label="Грпуппы" name="group">
                <Select
                  loading={groupLoading}
                  options={groupOptions}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  showSearch
                />
              </BaseButtonsForm.Item>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <BaseButtonsForm.Item label=" ">
                <Button
                  type="primary"
                  onClick={() => {
                    getUsers();
                    setShouwnGroupAdd(true);
                  }}
                >
                  Добавить группу
                </Button>
              </BaseButtonsForm.Item>
            </Col>
          </Row>
          {shownGroupAdd ? (
            <Card>
              <Spinner spinning={usersLoading}>
                {/* <BaseButtonsForm
                  name="groupAdd"
                  isFieldsChanged={isFieldsChanged}
                  onFinish={onFinishField}
                  autoComplete="off"
                > */}
                <BaseButtonsForm.List name={'users'}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <BaseButtonsForm.Item
                          {...field}
                          label={'Работник:'}
                          key={field.key}
                          //rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
                        >
                          <S.Wrapper>
                            <Select
                              options={usersOptions || []}
                              filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                              showSearch
                            />
                            <S.RemoveBtn onClick={() => remove(field.name)} />
                          </S.Wrapper>
                        </BaseButtonsForm.Item>
                      ))}

                      <BaseButtonsForm.Item>
                        <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                          Добавить в группу нового участника
                        </Button>
                      </BaseButtonsForm.Item>
                    </>
                  )}
                </BaseButtonsForm.List>
              </Spinner>
            </Card>
          ) : null}

          <BaseButtonsForm.Item label="Сфера мероприятия" name="sphera">
            <Select>
              {units.map((unit) => {
                return (
                  <Option key={unit.idUnit} value={unit.idUnit}>
                    {unit.name}
                  </Option>
                );
              })}
            </Select>
          </BaseButtonsForm.Item>

          <Row>
            <Col span={8} offset={2}>
              <BaseButtonsForm.Item label="Дата начала надзора" name="dateBegin">
                <DatePicker format={formatDate} />
              </BaseButtonsForm.Item>
            </Col>
            <Col span={8} offset={2}>
              <BaseButtonsForm.Item label="Дата окончания надзора" name="dateEnd">
                <DatePicker format={formatDate} />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <BaseButtonsForm.Item>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </BaseButtonsForm.Item>

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
      </Spinner>
    </>
  );
};
