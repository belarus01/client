import { Button, Cascader, Col, DatePicker, Row, Select, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '../../common/inputs/Input/Input';
import { Spinner } from '../../common/Spinner/Spinner.styles';
import { getAllRucsAndDolzhnLicas } from '@app/api/group.api';
import { UserGroup } from '@app/domain/interfaces';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

interface FormFIO {
  fio: string;
  idDeptJob: string | number;
  tel: string;
  loading: boolean;
}

const { Text } = Typography;

const FormFIO: React.FC = () => {
  const [users, setUsers] = useState<{ data: UserGroup[]; loading: boolean }>({
    data: [],
    loading: false,
  });
  const [selectedUser, setSelectedUser] = useState<UserGroup>({
    idUserGroup: null,
    idGroup: null,
    uid: null,
    active: null,
    dateBegin: null,
    dateEnd: null,
    typeUser: null,
  });

  const usersOptions = useMemo(() => {
    return users.data.map((user) => {
      if (user.uidGr2) {
        return {
          label: user.uidGr2.fio,
          value: user.idUserGroup,
        };
      }
    });
  }, [users]);

  const changeUser = (value: number | string) => {
    const user = users.data.find((user) => user.idUserGroup == value);
    console.log(user);
    if (user) {
      setSelectedUser(user);
    }
  };

  const fetch = () => {
    setUsers({ ...users, loading: true });
    getAllRucsAndDolzhnLicas().then((res) => {
      console.log(res);

      setUsers({ data: res, loading: false });
    });
  };

  const onFinish = (values: unknown) => {
    console.log(values);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <BaseButtonsForm isFieldsChanged={false} onFinish={onFinish}>
        <Spinner spinning={users.loading}>
          <Text style={{ fontSize: '17px' }}>
            в сфере государственного пожарного надзора, надзора за соблюдением законодательства при осуществлении
            деятельности по обеспечению пожарной безопасности:
            <Row>
              <Text>Дата начала заполнения</Text>
              <Col>
                <BaseButtonsForm.Item name="data1">
                  <DatePicker style={{ marginLeft: '12px', marginTop: '-10px' }} />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
            <Row>
              <Text>Дата завершения зaполнения</Text>

              <Col>
                <BaseButtonsForm.Item name="data2">
                  <DatePicker style={{ marginLeft: '15px', marginTop: '-10px' }} />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
            <Row>
              <Text>Дата направления</Text>

              <Col>
                <BaseButtonsForm.Item name="data3">
                  <DatePicker style={{ marginLeft: '15px', marginTop: '-10px' }} />
                </BaseButtonsForm.Item>
              </Col>
            </Row>
          </Text>
          <Row>
            <Text>Контрольный список вопросов (чек-лист) заполняется в ходе</Text>
            <Col span={8}>
              <BaseButtonsForm.Item name="idEvent">
                <Select
                  placeholder="выбор из списка"
                  style={{ marginLeft: '15px', marginTop: '-10px' }}
                  options={[
                    {
                      value: '65',
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
              </BaseButtonsForm.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <Text>Должностное лицо, выполняющее проверку (направившее контрольный список вопросов):</Text>
          </Row>

          <Row style={{ marginTop: '15px' }}>
            <Text>Фамилия, инициалы:</Text>
            <Col>
              <BaseButtonsForm.Item name="uidBoss">
                <Select
                  placeholder="выбор из списка"
                  style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                  options={usersOptions}
                  onChange={changeUser}
                />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <Row>
            <Text>Должность:</Text>
            <Col>
              <BaseButtonsForm.Item>
                <Input
                  value={selectedUser?.uidGr2?.idDeptJob2?.job || ''}
                  style={{ width: '200%', marginLeft: '15px', marginTop: '-10px' }}
                />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <Row>
            <Text>Контактный телефон:</Text>
            <Col>
              <BaseButtonsForm.Item>
                <Input
                  value={selectedUser?.uidGr2?.tel || ''}
                  style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
                />
              </BaseButtonsForm.Item>
            </Col>
          </Row>

          <Row justify={'center'}>
            <BaseButtonsForm.Item>
              <Button
                htmlType="submit"
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
            </BaseButtonsForm.Item>
          </Row>
        </Spinner>
      </BaseButtonsForm>
    </>
  );
};

export default FormFIO;
