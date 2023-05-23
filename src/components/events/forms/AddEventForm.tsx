import { getAllDepartments } from '@app/api/departments.api';
import { getSubjectByUnp } from '@app/api/subjects.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { notificationController } from '@app/controllers/notificationController';
import {
  IEventOrder,
  IEventsSphere,
  IGroup,
  IUnits,
  SDept,
  SDeptNode,
  SEventsPlan,
  SSubj,
  SSubjObj,
  SUnits,
  User,
} from '@app/domain/interfaces';
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
import { createEventsWithsSphere, getAllEventPlansByUnpSubj, getAllEvents } from '@app/api/events.api';
import { AddEditUserForm } from '@app/components/users/forms/AddUserForm';
import { getAllUsers } from '@app/api/users.api';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import * as S from '../../eventCard/eventCard.styles';
import { Option } from '@app/components/common/selects/Select/Select';
import { IDepartment } from '@app/components/departments/tables/DepatmentsTable';
import { createGroup, getAllGroups } from '@app/api/groups.api';
import UsersSelectWithPostAndTel from '@app/components/users/UsersSelectWithPostAndTel';

// interface Option extends DefaultOptionType {
//   children?: Option[];
//   isLeaf?: boolean;
//   loading?: boolean;
// }

type TOptions = {
  label: string | number;
  value: string | number | null;
};

interface AddEventOrderForm {
  submitForm?: () => void;
  getNewEvent: (event: IEventOrder) => void;
}
export const AddEventOrderForm: React.FC<AddEventOrderForm> = ({ submitForm, getNewEvent }) => {
  const [unp, setUnp] = useState<string>();
  const [subj, setSubj] = useState<SSubj>();
  const [type, setType] = useState<any>();
  const [deps, setDeps] = useState<SDept[]>();
  const [departments, setDepartments] = useState<SDeptNode[]>([]);
  const [selectedDept, setSelectedDept] = useState<{
    idDept: number | string | null;
    idDeptIss: number | string | null;
  }>({
    idDept: null,
    idDeptIss: null,
  });
  const [selectGroup, setSelectGroup] = useState<boolean>();
  const [objects, setObjects] = useState<SSubjObj[]>([]);
  const [options, setOptions] = useState<TOptions[]>([]);
  const [eventOptions, setEventsOptions] = useState<TOptions[]>([]);
  const [units, setUnits] = useState<IUnits[]>([]);
  const [allUnits, setAllUnits] = useState<IUnits[]>([]);
  const [types, setTypes] = useState<TOptions[]>([]);
  const [kinds, setKinds] = useState<TOptions[]>([]);
  const [kind, setKind] = useState<number | string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [plansOptions, setPlansOptions] = useState<TOptions[]>([]);
  const [plan, setPlan] = useState<SEventsPlan>({
    idEvent: null,
    idSubj: null,
  });
  const [groupOptions, setGroupOptions] = useState<TOptions[]>([]);
  const [groupLoading, setGroupLoading] = useState<boolean>(false);
  const [shownGroupAdd, setShouwnGroupAdd] = useState<boolean>(false);
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [group, setGroup] = useState<IGroup>({
    idGroup: null,
    name: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [usersOptions, setUsersOptions] = useState<TOptions[]>([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [field, setField] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any & IEventsSphere) => {
    // subj?.sSubjObjs.
    setLoading(true);
    console.log(values);
    let idGroop = null;
    if (values.group) {
      idGroop = values.group;
    } else {
      const usersGroup: [] = values.users.map((userUid: number) => {
        const userIndex = users.findIndex((user: { uid: number }) => user.uid == userUid);
        const currentUser = users[userIndex];
        return {
          uid: currentUser.uid,
          org: 1,
          typeUser: null,
        };
      });

      const group: IGroup = {
        org: 1,
        name: values.groupName,
        idDept: selectedDept.idDept as number,
        uid: null,
        users: usersGroup,
      };
    }
    console.log('create ggroup', group);

    // createGroup(group);
    const eventOrder: IEventOrder = {
      idEvent: values.idEvent,
      idUnit_4: values.idUnit_4,
      idGroup: 1,
      dateBegin: values.dateBegin.format('YYYY-MM-DD'),
      dateEnd: values.dateEnd.format('YYYY-MM-DD'),
      status: values.status,
      technical: values.technical,
      uidBoss: values.uidBoss,
      fioPostTitle: values.fioPostTitle,
      dateBeginFact: values.dateBeginFact ? values.dateBeginFact.format('YYYY-MM-DD') : values.dateBeginFact,
      dateEndFact: values.dateEndFact ? values.dateEndFact.format('YYYY-MM-DD') : values.dateEndFact,
      postAgent: values.postAgent,
      nameAgent: values.nameAgent,
      idDept: parseInt(selectedDept.idDept as string),
      idDeptIss: parseInt(selectedDept.idDeptIss as string),
      idSubj: parseInt(subj?.idSubj as unknown as string),
      idUnit_3: values.idUnit_3,
      org: 1,
    };
    if (values.idEventsPlan) {
      eventOrder.idEventsPlan = values.idEventsPlan;
    }
    const eventOrderSheras: IEventsSphere[] = values.sphera.map((spher: IEventsSphere) => ({
      org: 1,
      idUnit_0: spher,
    }));
    eventOrder.eventOrderSpheras = eventOrderSheras;
    console.log('eventOrder', eventOrder);
    console.log('save', submitForm);

    // submitForm(eventOrder);
    // save(eventOrder);
    createEventsWithsSphere(eventOrder).then((event) => {
      console.log(event);
      setLoading(false);
      getNewEvent(event);
    });
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
        const types: TOptions[] = currentTypes.map((type) => ({
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
              const opt: TOptions[] = [];
              responce.forEach((element) => opt.push({ value: element.idObj, label: element.nameObj || '' }));
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
    // getAllGroups();
    // if (selectedDept) {
    //   getAllGroupsByIdDept(selectedDept).then(groups);
    // }
    // return new Promise<IGroup[]>((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([
    //       {
    //         idGroup: 1,
    //         org: 1,
    //         name: 'группа_п',
    //         dateRecord: '501	1	02.11.2022',
    //         uid: null,
    //       },
    //       {
    //         idGroup: 2,
    //         org: 1,
    //         name: 'группа_п2',
    //         dateRecord: '501	1	02.11.2022',
    //         uid: null,
    //       },
    //     ]);
    //   }, 500);
    // })
    getAllGroups().then((res) => {
      console.log(res);

      const gropupsOptions = res.map((group) => ({
        label: group.name,
        value: group.idGroup || null,
      }));
      setGroupOptions(gropupsOptions);
      setGroupLoading(false);
    });
  };

  const createGroupEvent = (group: IGroup) => {
    createGroup(group);
  };

  const getUsers = () => {
    getAllUsers().then((users) => {
      setUsers(users);
      const options = users.map((user) => ({
        label: `${user.fName} ${user.lName}`,
        value: user.uid,
      }));
      console.log(options);

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

      const kinds: TOptions[] = currentKinds.map((type) => ({
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
      console.log(subj);
      if (subj?.unp) {
        getAllEventPlansByUnpSubj(subj.unp).then((res) => {
          // const res = [
          //   {
          //     idEventPlan: 1629,
          //     idEvent: 64,
          //     idDept: 501,
          //     numOrder: 145,
          //     nameDept:
          //       'Департамент по надзору за безопасным ведением работ в промышленности Министерства по чрезвычайным ситуациям Республики Беларусь',
          //     monthEvent: 'февраль',
          //     halfYaerEvent: 1,
          //     dateRecord: '03.04.2023 13:55:08',
          //     telUser: '80165627140',
          //     status: 'wait',
          //     yearPlan: 2023,
          //   },
          // ];
          const optionsPlans = res.map((plan: { idEventPlan: any }) => ({
            label: plan.idEventPlan,
            value: plan.idEventPlan,
          }));
          setPlans(res);
          setPlansOptions(optionsPlans);
        });
      }
    } else {
      setPlansOptions([]);
      setPlan({
        idEvent: null,
        idSubj: null,
      });
    }
    // const res = [
    //   {
    //     idEventPlan: 1629,
    //     idEvent: 64,
    //     idDept: 501,
    //     numOrder: 145,
    //     nameDept:
    //       'Департамент по надзору за безопасным ведением работ в промышленности Министерства по чрезвычайным ситуациям Республики Беларусь',
    //     monthEvent: 'февраль',
    //     halfYaerEvent: 1,
    //     dateRecord: '03.04.2023 13:55:08',
    //     telUser: '80165627140',
    //     status: 'wait',
    //     yearPlan: 2023,
    //   },
    // ];
  };
  const onSelectKind = (selected: string | unknown) => {
    setKind(String(selected));
    chekPlans(selected);
  };

  const departmentsOptionsTree = useMemo(() => {
    if (plan.idEvent) {
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
    console.log('plan', plan.idEvent, plan);

    return departments;
  }, [plan, departments, plans]);

  const onDepartmentSelect = (selected: any, node: SDeptNode) => {
    console.log(selected, node);
    setSelectedDept({
      idDept: node.idDept,
      idDeptIss: node.idParent,
    });
    //setSelectedDept(deps?.find(element=>element.active))
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
        const unitsCurrents = res.filter((unit) => unit.org == 1);
        setUnits(unitsCurrents);
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
            <BaseButtonsForm.Item label="Планы" name="idEventsPlan" rules={[{ required: true }]}>
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
                    setShouwnGroupAdd((prev) => !prev);
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
                <BaseButtonsForm.Item label="Название группы" name={groupName}>
                  <Input />
                </BaseButtonsForm.Item>

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
                          key={field.key}
                          //rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
                        >
                          <Row align="middle">
                            <Col span={22}>
                              <BaseButtonsForm.Item
                                {...field}
                                label={'Исполнитель:'}
                                key={field.key}
                                //rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
                              >
                                <Select
                                  options={usersOptions}
                                  filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                  }
                                  showSearch
                                />
                              </BaseButtonsForm.Item>
                            </Col>
                            <Col offset={1} span={1}>
                              {fields.length > 1 ? <MinusCircleOutlined onClick={() => remove(field.name)} /> : null}
                            </Col>
                          </Row>
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

          <BaseButtonsForm.Item label="Сфера мероприятия" name="sphera" rules={[{ required: true }]}>
            <Select mode="multiple">
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
              <BaseButtonsForm.Item label="Дата начала надзора" name="dateBegin" rules={[{ required: true }]}>
                <DatePicker format={formatDate} />
              </BaseButtonsForm.Item>
            </Col>
            <Col span={8} offset={2}>
              <BaseButtonsForm.Item label="Дата окончания надзора" name="dateEnd" rules={[{ required: true }]}>
                <DatePicker format={formatDate} />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <BaseButtonsForm.Item label="Статус" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value="1" label="не спланирована">
                не спланирована
              </Option>
              <Option value="2" label="в работе">
                в работе
              </Option>
              <Option value="3" label="завершена">
                завершена
              </Option>
              <Option value="4" label="просрочена">
                просрочена
              </Option>
            </Select>
          </BaseButtonsForm.Item>

          <BaseButtonsForm.Item label="Применяемые научно-технические средства" name="technical">
            <Input />
          </BaseButtonsForm.Item>

          <Row>
            <Col span={8} offset={2}>
              <BaseButtonsForm.Item
                label="Фактическая дата начала надзорно-профилактического мероприятия"
                name="dateBeginFact"
              >
                <DatePicker format={formatDate} />
              </BaseButtonsForm.Item>
            </Col>
            <Col span={8} offset={2}>
              <BaseButtonsForm.Item
                label="Фактическая дата окончания надзорно-профилактического мероприятия"
                name="dateEndFact"
              >
                <DatePicker format={formatDate} />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <UsersSelectWithPostAndTel
            labelPost="Должность лица, выдавшего предписание на проведение проверки"
            labelUser="Ф.И.О лица, выдавшего предписание на проведение проверки"
          />

          <BaseButtonsForm.Item label="Должность представителя субъекта" name="postAgent">
            <Input />
          </BaseButtonsForm.Item>

          <BaseButtonsForm.Item label="Ф.И.О представителя субъекта" name="nameAgent">
            <Input />
          </BaseButtonsForm.Item>

          <BaseButtonsForm.Item>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </BaseButtonsForm.Item>
        </BaseButtonsForm>
      </Spinner>
    </>
  );
};
