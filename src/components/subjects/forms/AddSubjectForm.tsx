import { getAllOked } from '@app/api/oked.api';
import { createSubj, updateSubj } from '@app/api/subjects.api';
import { Pagination } from '@app/api/users.api';
import { getAllVedomstvas } from '@app/api/vedomstava.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { notificationController } from '@app/controllers/notificationController';
import { SSubj } from '@app/domain/interfaces';
import { validatorCustom } from '@app/utils/validator';
import dayjs from 'dayjs';
import { Key, useCallback, useEffect, useRef, useState } from 'react';
import AddresForm from './AddresForm';
import { InputRef, message } from 'antd';

interface AddSubjectFormProps {
  onCancel: () => void;
  onTableChange: (pagination: Pagination) => void;
  data?: SSubj;

  updateTable: () => void;
}

const getPlaceDropDown = (): HTMLElement => document.querySelector('.ant-modal-body') || document.body;

export const AddSubjectForm: React.FC<AddSubjectFormProps> = ({ onCancel, onTableChange, data, updateTable }) => {
  const onFinish = (values: SSubj) => {
    if (!data) {
      console.log('createSubj', { ...values, dateRegOpo: null });
      setLoading(true);
      createSubj({ ...values, dateRegOpo: form.getFieldValue('dateRegOpo') || null })
        .then(() => {
          updateTable();
          onCancel();
        })
        .catch(() => {
          notificationController.error({ message: 'Запрос не завершен' });
        });
    }
    if (data && data.idSubj) {
      const updatedSubj = {
        ...data,
        ...values,
        dateRegOpo: form.getFieldValue('dateRegOpo') || null,
      };
      updateSubj(data.idSubj, updatedSubj)
        .then(() => {
          notificationController.success({ message: 'Объект Обновлен!' });
        })
        .catch((e) => {
          notificationController.error({ message: 'Запрос не завершен', description: e.message });
        });
    }
  };
  const [user, setUser] = useState({
    org: 1,
  });
  const [vedomstas, setVedomstas] = useState<React.ReactNode[]>([]);
  const [okeds, setOkeds] = useState<React.ReactNode[]>([]);
  const [date, setDate] = useState('');

  const [loading, setLoading] = useState(false);

  const setOptions = <T extends object>(
    setState: (value: React.ReactNode[]) => void,
    values: T[],
    key: keyof T,
    name: keyof T,
  ) => {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < values.length; i++) {
      children.push(
        <Option key={values[i][key] as Key} value={values[i][key]}>
          {values[i][name]}
        </Option>,
      );
    }
    setState(children);
  };

  const setInitialValues = useCallback(() => {
    if (data) {
      console.log('onfofof', data);

      form.setFieldsValue(data);
    }
  }, [data]);

  useEffect(() => {
    setInitialValues();
  }, [data, setInitialValues]);

  useEffect(() => {
    getAllVedomstvas().then((vedomstasRes) => {
      console.log(vedomstasRes);
      setOptions(setVedomstas, vedomstasRes, 'idVed', 'name');
      return vedomstasRes;
    });
    getAllOked().then((okeds) => {
      setOptions(setOkeds, okeds, 'idOked', 'nameOked');
    });
    if (unpInput.current) {
      unpInput.current.focus();
    }
  }, []);

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  const dateFormToday = 'YYYY-MM-DD';

  const [form] = BaseButtonsForm.useForm();
  const validateNumReg = validatorCustom.maxLength(15);
  const unpInput = useRef<InputRef>(null);
  return (
    <>
      <BaseButtonsForm loading={loading} form={form} layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
        <BaseButtonsForm.Item label="УНП" name="unp" rules={[{ validator: validatorCustom.unp }]}>
          <Input ref={unpInput} defaultValue={data?.unp || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Наименование субъекта промышленной беезопасности" name="subj">
          <Input defaultValue={data?.subj || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Краткое наименование субъекта" name="subj1">
          <Input defaultValue={data?.subj1 || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Ведомственная принадлежность" name="idVed">
          <Select defaultValue={data?.idVed}>{vedomstas}</Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Номер свидетельства о регистрации"
          name="numReg"
          rules={[{ validator: validateNumReg }]}
        >
          <Input defaultValue={data?.numReg || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Вид экономической деятельности" name="idOked">
          <Select
            showSearch
            filterOption={(input, option) => (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
            defaultValue={data?.idOked || ''}
          >
            {okeds}
          </Select>
        </BaseButtonsForm.Item>
        {user.org == 1 ? null : (
          <BaseButtonsForm.Item label="Дата регистрации ОПО" name="dateRegOpo">
            <DatePicker
              getPopupContainer={getPlaceDropDown}
              onChange={(e) => {
                console.log(e?.format('DD.MM.YYYY'));
                setDate(e?.format('DD.MM.YYYY') as string);
              }}
              defaultValue={dayjs(data?.dateRegOpo || today, dateFormToday)}
              format={'DD.MM.YYYY'}
            />
          </BaseButtonsForm.Item>
        )}
        <BaseButtonsForm.Item label="Ф.И.О руководителя субъекта" name="bossName">
          <Input defaultValue={data?.bossName || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Должность руководителя субъекта" name="staffBoss">
          <Input defaultValue={data?.staffBoss || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Телефон руководителя субъекта" name="bossTel">
          <Input defaultValue={data?.bossTel || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Ф.И.О главного бухгалтера" name="chiefName">
          <Input defaultValue={data?.chiefName || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Должность главного бухгалтера" name="staffChief">
          <Input defaultValue={data?.staffChief || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Телефоны главного бухгалтера" name="chiefTel">
          <Input defaultValue={data?.chiefTel || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Состояние плательщика" name="statusUnp">
          <Select
            options={[
              {
                label: 'Действующий',
                value: '1',
              },
              {
                label: 'В стадии ликвидации',
                value: 'M',
              },
              {
                label: 'Подготовлен к ликвидации',
                value: 'Z',
              },
            ]}
            defaultValue={data?.statusUnp || ''}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип плательщика" name="typeSubj">
          <Select
            options={[
              {
                label: 'Юридический',
                value: '0',
              },
              {
                label: 'Физический',
                value: '1',
              },
              {
                label: 'ИП',
                value: '2',
              },
            ]}
            defaultValue={data?.typeSubj || ''}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Контактные данные (телефон, факс, адрес электронной почты)" name="contactData">
          <Input defaultValue={data?.contactData || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Реквизиты текущего (расчетного) и иных счетов" name="bankRekv">
          <Input defaultValue={data?.bankRekv || ''} />
        </BaseButtonsForm.Item>

        {!data ? (
          <>
            <AddresForm
              nameObl="idOblYur"
              labelObl="Область(юр. адрес)"
              nameRayon="idRayonYur"
              labelRayon="Район(юр. адрес)"
              nameReestr="idReestrYur"
              labelReestr="Населенный пункт(юр. адрес)"
              nameStreet="idStreetYur"
              labelStreet="Улица(юр. адрес)"
              nameNumBuild="numBuildYur"
              labelNumBuild="Номер дома(юр. адрес)"
              nameNumOffice="numCorpYur"
              labelNumOffice="Корпус(юр. адрес)"
              labelAdrr="Юр. адрес"
              nameAddr="addrYur"
              formInstance={form}
            />
            <AddresForm
              nameObl="idOblFact"
              labelObl="Область(факт. адрес)"
              nameRayon="idRayonFact"
              labelRayon="Район(факт. адрес)"
              nameReestr="idReestrFact"
              labelReestr="Населенный пункт(факт. адрес)"
              nameStreet="idStreetFact"
              labelStreet="Улица(факт. адрес)"
              nameNumBuild="numBuildFact"
              labelNumBuild="Номер дома(факт. адрес)"
              nameNumOffice="numCorpFact"
              labelNumOffice="Помещение(факт. адрес)"
              labelAdrr="Факт. адрес"
              nameAddr="addrFact"
              formInstance={form}
            />
          </>
        ) : null}
        <BaseButtonsForm.Item>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
