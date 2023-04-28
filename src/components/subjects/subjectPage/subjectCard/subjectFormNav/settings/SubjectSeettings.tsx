import { getCitiesByRayonId, getObl, getRayonsByOblId, getStreetsByCityId } from '@app/api/ate.api';
import { Card } from '@app/components/common/Card/Card';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { SSubj } from '@app/domain/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useEffect, useState } from 'react';

export interface SubjectSettingsProps {
  subject: SSubj;
}

export const SubjectSettings: React.FC<SubjectSettingsProps> = ({ subject }) => {
  const user = useAppSelector((state) => state.user.user);
  const subj = useAppSelector((state) => state.subj.subj);

  const [form] = BaseButtonsForm.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const [obl, setObl] = useState<React.ReactNode[]>([]);
  const [rayon, setRayon] = useState<React.ReactNode[]>([]);
  const [city, setCity] = useState<React.ReactNode[]>([]);
  const [street, setStreet] = useState<React.ReactNode[]>([]);

  const handleOblSelect = (selected: any) => {
    getRayonsByOblId(selected).then((res) => {
      const childrenRayon: React.ReactNode[] = [];
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        childrenRayon.push(
          <Option key={res[i].idRayon} value={res[i].idRayon}>
            {res[i].nameRayon}
          </Option>,
        );
      }
      setRayon(childrenRayon);
    });
  };

  const handleRayonSelect = (selected: any) => {
    getCitiesByRayonId(selected).then((res) => {
      const childrenCity: React.ReactNode[] = [];
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        childrenCity.push(
          <Option key={res[i].idReestr} value={res[i].idReestr}>
            {res[i].nameReestr}
          </Option>,
        );
      }
      setCity(childrenCity);
    });
  };

  const handleCitySelect = (selected: any) => {
    getStreetsByCityId(selected).then((res) => {
      const childrenStreet: React.ReactNode[] = [];
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        childrenStreet.push(
          <Option key={res[i].idStreet} value={res[i].idStreet}>
            {res[i].nameRus}
          </Option>,
        );
      }
      setStreet(childrenStreet);
    });
  };

  useEffect(() => {
    getObl().then((res) => {
      const childrenObl: React.ReactNode[] = [];
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        childrenObl.push(
          <Option key={res[i].idObl} value={res[i].idObl}>
            {res[i].nameObl}
          </Option>,
        );
      }
      setObl(childrenObl);
    });
  }, []);
  return (
    <Card>
      <BaseButtonsForm
        layout="vertical"
        onFinish={onFinish}
        isFieldsChanged={false}
        initialValues={subj ? subj : undefined}
      >
        <BaseButtonsForm.Item label="УНП" name="unp">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Наименование субъекта промышленной беезопасности" name="subj">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Ведомственная принадлежность" name="id_ved">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер свидетельства о регистрации" name="num_reg">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Вид экономической деятельности" name="id_ved">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата регистрации ОПО" name="date_reg_opo">
          <DatePicker />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Ф.И.О руководителя субъекта" name="boss_name">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Должность руководителя субъекта" name="staff_boss">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Телефон руководителя субъекта" name="boss_tel">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Ф.И.О главного бухгалтера" name="chief_name">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Должность главного бухгалтера" name="staff_chief">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Телефоны главного бухгалтера" name="chief_tel">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Состояние плательщика" name="status_unp">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип плательщика" name="type_subj">
          <Select />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Реквизиты текущего (расчетного) и иных счетов" name="bank_rekv">
          <Input />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Область(юр. адрес)" name="id_obl_yur">
          <Select onSelect={handleOblSelect}>{obl}</Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Район(юр. адрес)" name="id_rayon_yur">
          <Select onSelect={handleRayonSelect}>{rayon}</Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Город(юр. адрес)" name="id_reestr_yur">
          <Select onSelect={handleCitySelect}>{city}</Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Улица(юр. адрес)" name="id_street_yur">
          <Select>{street}</Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер дома(юр. адрес)" name="num_build_yur">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Корпус(юр. адрес)" name="num_corp_yur">
          <Input />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Область(факт. адрес)" name="id_obl_fact">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Район(факт. адрес)" name="id_rayon_fact">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Город(факт. адрес)" name="id_reestr_fact">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Улица(факт. адрес)" name="id_street_fact">
          <Select />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер дома(факт. адрес)" name="num_build_fact">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Корпус(факт. адрес)" name="num_corp_fact">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </Card>
  );
};
