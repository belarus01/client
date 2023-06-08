import {
  getAllReestr,
  getCitiesByRayonId,
  getObl,
  getOblById,
  getRayonsByOblId,
  getStreetsByCityId,
} from '@app/api/ate.api';
import { getAllOked } from '@app/api/oked.api';
import { createSubj } from '@app/api/subjects.api';
import { Pagination } from '@app/api/users.api';
import { getAllVedomstvas } from '@app/api/vedomstava.api';
import { IAteReestr } from '@app/components/ate/ateTable/AteReestrTable';
import { Modal } from '@app/components/common/Modal/Modal';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { notificationController } from '@app/controllers/notificationController';
import { IVesomstvo, SSubj, ateObl } from '@app/domain/interfaces';
import { validatorCustom } from '@app/utils/validator';
import dayjs from 'dayjs';
import { Key, useEffect, useState } from 'react';

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
      console.log('createSubj', { ...values, dateRegOpo: date });
      setLoading(true);
      createSubj({ ...values, dateRegOpo: date })
        .then(() => {
          updateTable();
          onCancel();
        })
        .catch(() => {
          notificationController.error({ message: 'Запрос не завершен' });
        });
    }
  };
  const [obl, setObl] = useState<React.ReactNode[]>([]);
  const [rayon, setRayon] = useState<React.ReactNode[]>([]);
  const [city, setCity] = useState<React.ReactNode[]>([]);
  const [street, setStreet] = useState<React.ReactNode[]>([]);
  const [rayonFact, setRayonFact] = useState<React.ReactNode[]>([]);
  const [cityFact, setCityFact] = useState<React.ReactNode[]>([]);
  const [streetFact, setStreetFact] = useState<React.ReactNode[]>([]);
  const [vedomstas, setVedomstas] = useState<React.ReactNode[]>([]);
  const [okeds, setOkeds] = useState<React.ReactNode[]>([]);
  const [date, setDate] = useState('');
  const [currentAddres, setCurrentAddres] = useState({
    obl: {},
    rayon: {},
    city: {},
    street: {},
    oblFact: {},
    rayonFact: {},
    cityFact: {},
    streetFact: {},
  });
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

  const handleOblSelect = (selected: any) => {
    setLoading(true);
    getRayonsByOblId(selected).then((res) => {
      setOptions(setRayon, res, 'idRayon', 'nameRayon');
      setLoading(false);
    });
  };

  const handleRayonSelect = (selected: any) => {
    setLoading(true);
    getCitiesByRayonId(selected).then((res) => {
      setOptions(setCity, res, 'idReestr', 'nameReestr');
      setLoading(false);
    });
  };

  const handleCitySelect = (selected: any) => {
    setLoading(true);

    getStreetsByCityId(selected).then((res) => {
      setOptions(setStreet, res, 'idStreet', 'nameRus');
      setLoading(false);
    });
  };

  const handleOblSelectFact = (selected: any) => {
    setLoading(true);
    getRayonsByOblId(selected).then((res) => {
      setOptions(setRayonFact, res, 'idRayon', 'nameRayon');
      setLoading(false);
    });
  };

  const handleRayonSelectFact = (selected: any) => {
    setLoading(true);
    getCitiesByRayonId(selected).then((res) => {
      setOptions(setCityFact, res, 'idReestr', 'nameReestr');
      setLoading(false);
    });
  };

  const handleCitySelectFact = (selected: any) => {
    setLoading(true);

    getStreetsByCityId(selected).then((res) => {
      setOptions(setStreetFact, res, 'idStreet', 'nameRus');
      setLoading(false);
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
      return res;
    });

    getAllVedomstvas().then((vedomstasRes) => {
      console.log(vedomstasRes);
      setOptions(setVedomstas, vedomstasRes, 'idVed', 'name');
      return vedomstasRes;
    });
    getAllOked().then((okeds) => {
      setOptions(setOkeds, okeds, 'idOked', 'nameOked');
    });
  }, []);

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  const dateFormToday = 'YYYY-MM-DD';

  return (
    <>
      <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
        <BaseButtonsForm.Item label="УНП" name="unp" rules={[{ validator: validatorCustom.unp }]}>
          <Input defaultValue={data?.unp || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Наименование субъекта промышленной беезопасности" name="subj">
          <Input defaultValue={data?.subj || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Ведомственная принадлежность" name="idVed">
          <Select defaultValue={data?.idVed}>{vedomstas}</Select>
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер свидетельства о регистрации" name="numReg">
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
          <Input defaultValue={data?.statusUnp || ''} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип плательщика" name="typeSubj">
          <Input defaultValue={data?.typeSubj || ''} />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Реквизиты текущего (расчетного) и иных счетов" name="bankRekv">
          <Input defaultValue={data?.bankRekv || ''} />
        </BaseButtonsForm.Item>

        {!data ? (
          <>
            {' '}
            <BaseButtonsForm.Item label="Область(юр. адрес)" name="idOblYur">
              <Select onSelect={handleOblSelect} loading={loading}>
                {obl}
              </Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Район(юр. адрес)" name="idRayonYur">
              <Select onSelect={handleRayonSelect} loading={loading}>
                {rayon}
              </Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Город(юр. адрес)" name="idReestrYur">
              <Select onSelect={handleCitySelect} loading={loading}>
                {city}
              </Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Улица(юр. адрес)" name="idStreetYur">
              <Select>{street}</Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Номер дома(юр. адрес)" name="numBuildYur">
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Корпус(юр. адрес)" name="numCorpYur">
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Область(факт. адрес)" name="idOblFact">
              <Select onSelect={handleOblSelectFact} loading={loading}>
                {obl}
              </Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Район(факт. адрес)" name="idRayonFact">
              <Select onSelect={handleRayonSelectFact} loading={loading}>
                {rayonFact}
              </Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Город(факт. адрес)" name="idReestrFact">
              <Select onSelect={handleCitySelectFact} loading={loading}>
                {cityFact}
              </Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Улица(факт. адрес)" name="idStreetFact">
              <Select loading={loading}>{streetFact}</Select>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Номер дома(факт. адрес)" name="numBuildFact">
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Корпус(факт. адрес)" name="numCorpFact">
              <Input />
            </BaseButtonsForm.Item>
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
