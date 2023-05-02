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
import { IPogAvia } from '@app/components/pog/pogTables/PogAviaTable';

export interface IPogAviaFormProps {
  data?: IPogAuto;
  close: () => void;
}

export const PogAviaForm: React.FC<IPogAviaFormProps> = ({ data, close }) => {
  const [avia, setAvia] = useState<IPogAvia>({
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
    const newAvia: IPogAvia = {
      ...avia,
      unp: subj.unp,
    };
    // change place after fix tables

    // getCurrentStreet(newAuto.idStreetSubj);
    setAvia({ ...newAvia });
    setLoading(false);
    setDisabled(true);
  };

  const changeUnp = (e: ChangeEvent<HTMLInputElement>) => {
    setAvia({ ...avia, unp: e.target.value });
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
      searchByUnp(avia.unp as string);
    }
  }, []);

  useEffect(() => {
    console.log(avia);
  });
  // SUBMIT

  const submitCreate = () => {
    console.log(avia);
    // createPogSubjAuto(auto);
    close();
  };

  const submitChanges = () => {
    console.log(avia);
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
          ['manufactYear']: moment(avia.manufactYear || yearToday, dateFormat),
          ['dateEnd']: moment(avia.dateEnd || today, dateFormatYaer),
        }}
      >
        <BaseButtonsForm.Item label="УНП" name="subjectsMemo">
          {data ? (
            <Input defaultValue={avia.unp || ''} onChange={changeUnp} />
          ) : (
            <SearchInput value={unp} placeholder="Введите УНП" onSearch={searchByUnp} />
          )}
        </BaseButtonsForm.Item>
        <Spinner spinning={loading}>
          <BaseButtonsForm.Item
            label="УНП (регистрационный номер в Едином государственном регистре юридических лиц и индивидуальных предпринимателей)"
            name="unp"
          >
            <Input defaultValue={avia.unp || ''} key={avia.unp} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Наименование организации, фамилия, собственное имя, отчество (если таковое имеется) индивидуального предпринимателя"
            name="nameAddrOvnerPoo"
          >
            <Input defaultValue={avia.nameAddrOvnerPoo} key={avia.nameAddrOvnerPoo} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Тип воздушного судна" name="typeAvia">
            <Input defaultValue={avia.typeAvia || ''} key={avia.typeAvia} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Государственный регистрационный знак" name="numRegGai">
            <Input defaultValue={avia.numRegGai || ''} key={avia.numRegGai} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Год выпуска" name="manufactYear">
            <DatePicker
              format={dateFormat}
              onChange={(value) => {
                setAvia({ ...avia, manufactYear: value?.format(dateFormat) });
              }}
              disabled={disabled}
            />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Срок действия сертификата летной годности или назначенного ресурса"
            name="dateEnd"
          >
            <Input defaultValue={avia.dateEnd || ''} key={avia.dateEnd} disabled={disabled} />
            {/* <DatePicker
              format={dateFormat}
              onChange={(value) => {
                setAvia({ ...avia, dateEnd: value?.format(dateFormat) });
              }}
              disabled={disabled}
            />
            <DatePicker
              format={dateFormat}
              onChange={(value) => {
                setAvia({ ...avia, dateEnd: value?.format(dateFormat) });
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
