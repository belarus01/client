import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { ChangeEvent, useEffect, useState } from 'react';
import { IPogAuto } from '../pogTables/PogAutoTable';
import moment from 'moment';
import { DatePicker } from 'antd';
import { getSubjectByUnp } from '@app/api/subjects.api';
import { SSubj, SSubjObj, ateObl } from '@app/domain/interfaces';
import { SearchInput } from '@app/components/common/inputs/SearchInput/SearchInput';
import React from 'react';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { IPogWater } from '../pogTables/PogWaterTable';

export interface IPogWaterFormProps {
  data?: IPogAuto;
  close: () => void;
}

export const PogWaterForm: React.FC<IPogWaterFormProps> = ({ data, close }) => {
  const [Water, setWater] = useState<IPogWater>({
    idDept: null,
    idOblSubj: '',
    ...data,
  });

  const [unp, setUnp] = useState('');
  const [subject, setSubject] = useState({});

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // ADD NEW INFO IN AUTO OBJ
  const changeInfoAuto = (subj: SSubj) => {
    const newWater: IPogWater = {
      ...Water,
      unp: subj.unp,
    };
    // change place after fix tables

    // getCurrentStreet(newAuto.idStreetSubj);
    setWater({ ...newWater });
    setLoading(false);
    setDisabled(true);
  };

  const changeUnp = (e: ChangeEvent<HTMLInputElement>) => {
    setWater({ ...Water, unp: e.target.value });
  };

  const loadSearchingUnp = (unp: string) => {
    getSubjectByUnp(unp).then((result) => {
      if (result) {
        setSubject(result);
        changeInfoAuto(result);
        //100071274
        console.log(result);
        console.log(result.idSubj);
        // getCurrentObl(result.idObl);
        // getCurrentRayon(result.idRayon);
        // getCurrentCity(result.idCity);
        // getCurrentStreet(result.idStreet);
      }
    });
  };

  const searchByUnp = (value: string) => {
    console.log(value);
    setLoading(true);

    loadSearchingUnp(value);
  };

  //DATE
  const dateFormat = 'YYYY-MM-DD';

  const dateFormatYaer = 'YYYY';

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');

  const yearToday = today.split('-')[0];
  // EDITABLE
  useEffect(() => {
    if (data) {
      setDisabled(false);
      searchByUnp(Water.unp as string);
    }
  }, []);

  useEffect(() => {
    console.log(Water);
  });
  // SUBMIT

  const submitCreate = () => {
    console.log(Water);
    // createPogSubjAuto(auto);
    close();
  };

  const submitChanges = () => {
    console.log(Water);
  };

  const submit = () => {
    if (data) {
      submitChanges();
    } else {
      submitCreate();
    }
  };
  return (
    <>
      <BaseButtonsForm
        isFieldsChanged={false}
        initialValues={{
          ['dateVipusk']: moment(Water.dateVipusk || yearToday, dateFormat),
          ['dateOsvid']: moment(Water.dateOsvid || today, dateFormatYaer),
        }}
      >
        <BaseButtonsForm.Item label="УНП" name="subjectsMemo">
          {data ? (
            <Input defaultValue={Water.unp || ''} onChange={changeUnp} />
          ) : (
            <SearchInput value={unp} placeholder="Введите УНП" onSearch={searchByUnp} />
          )}
        </BaseButtonsForm.Item>
        <Spinner spinning={loading}>
          <BaseButtonsForm.Item
            label="УНП (регистрационный номер в Едином государственном регистре юридических лиц и индивидуальных предпринимателей)"
            name="unp"
          >
            <Input defaultValue={Water.unp || ''} key={Water.unp} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Наименование организации, фамилия, собственное имя, отчество (если таковое имеется) индивидуального предпринимателя"
            name="nameAddrOvnerPoo"
          >
            <Input defaultValue={Water.nameAddrOvnerPoo} key={Water.nameAddrOvnerPoo} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Наименование судна" name="nameSud">
            <Input defaultValue={Water.nameSud || ''} key={Water.nameSud} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Грузоподъемность" name="gruz">
            <Input defaultValue={Water.gruz || ''} key={Water.gruz} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Год выпуска" name="dateVipusk">
            <DatePicker
              format={dateFormat}
              onChange={(value) => {
                setWater({ ...Water, dateVipusk: value?.format(dateFormat) });
              }}
              disabled={disabled}
            />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Дата последнего освидетельствования" name="dateOsvid">
            <Input defaultValue={Water.dateOsvid || ''} key={Water.dateOsvid} disabled={disabled} />
            {/* <DatePicker
              format={dateFormat}
              onChange={(value) => {
                setWater({ ...Water, dateEnd: value?.format(dateFormat) });
              }}
              disabled={disabled}
            />
            <DatePicker
              format={dateFormat}
              onChange={(value) => {
                setWater({ ...Water, dateEnd: value?.format(dateFormat) });
              }}
              disabled={disabled}
            /> */}
          </BaseButtonsForm.Item>
        </Spinner>

        <BaseButtonsForm.Item>
          <Button type="primary" onClick={submit}>
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
