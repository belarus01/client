import { Cascader, Col, Row, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '../../common/inputs/Input/Input';
import { Spinner } from '../../common/Spinner/Spinner.styles';
import { getAllRucsAndDolzhnLicas } from '@app/api/group.api';
import { UserGroup } from '@app/domain/interfaces';

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

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Spinner spinning={users.loading}>
        <Row style={{ marginTop: '15px' }}>
          <Text>Фамилия, инициалы:</Text>

          <Col>
            <Cascader
              placeholder="выбор из списка"
              style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
              options={usersOptions}
              onChange={changeUser}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Text>Должность:</Text>

          <Col>
            <Input
              value={selectedUser?.uidGr2?.idDeptJob2?.job || ''}
              style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Text>Контактный телефон:</Text>

          <Col>
            <Input
              value={selectedUser?.uidGr2?.tel || ''}
              style={{ width: '100%', marginLeft: '15px', marginTop: '-10px' }}
            />
          </Col>
        </Row>
      </Spinner>
    </>
  );
};

export default FormFIO;
