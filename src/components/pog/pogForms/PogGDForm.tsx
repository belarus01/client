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
import { IPogGD } from '../pogTables/PogGDTable';

export interface IPogGDFormProps {
  data?: IPogAuto;
  close: () => void;
}

export const PogGDForm: React.FC<IPogGDFormProps> = ({ data, close }) => {
  const [GD, setGD] = useState<IPogGD>({
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
    const newGD: IPogGD = {
      ...GD,
      unp: subj.unp,
    };
    // change place after fix tables

    // getCurrentStreet(newAuto.idStreetSubj);
    setGD({ ...newGD });
    setLoading(false);
    setDisabled(true);
  };

  const changeUnp = (e: ChangeEvent<HTMLInputElement>) => {
    setGD({ ...GD, unp: e.target.value });
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
      searchByUnp(GD.unp as string);
    }
  }, []);

  useEffect(() => {
    console.log(GD);
  });
  // SUBMIT

  const submitCreate = () => {
    console.log(GD);
    // createPogSubjAuto(auto);
    close();
  };

  const submitChanges = () => {
    console.log(GD);
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
        // initialValues={{
        //   ['manufactYear']: moment(GD.manufactYear || yearToday, dateFormat),
        //   ['dateEnd']: moment(GD.dateEnd || today, dateFormatYaer),
        // }}
      >
        <BaseButtonsForm.Item label="УНП" name="subjectsMemo">
          {data ? (
            <Input defaultValue={GD.unp || ''} onChange={changeUnp} />
          ) : (
            <SearchInput value={unp} placeholder="Введите УНП" onSearch={searchByUnp} />
          )}
        </BaseButtonsForm.Item>
        <Spinner spinning={loading}>
          <BaseButtonsForm.Item
            label="УНП (регистрационный номер в Едином государственном регистре юридических лиц и индивидуальных предпринимателей)"
            name="unp"
          >
            <Input defaultValue={GD.unp || ''} key={GD.unp} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Наименование организации, фамилия, собственное имя, отчество (если таковое имеется) индивидуального предпринимателя"
            name="nameAddrOvnerPoo"
          >
            <Input defaultValue={GD.nameAddrOvnerPoo} key={GD.nameAddrOvnerPoo} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Количество вагонов-цистерн, предназначенных для перевозки опасных грузов"
            name="colGD"
          >
            <Input defaultValue={GD.colGD || ''} key={GD.colGD} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Количество вагонов-цистерн, предназначенных для перевозки опасных грузов, отработавших нормативный срок службы"
            name="numRegGai"
          >
            <Input defaultValue={GD.colGDOtrab || ''} key={GD.colGDOtrab} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Количество локомотивов, занятых перевозкой опасных грузов" name="colLoc">
            {/* <DatePicker
              format={dateFormat}
              onChange={(value) => {
                setGD({ ...GD, manufactYear: value?.format(dateFormat) });
              }}
              disabled={disabled}
            /> */}
            <Input defaultValue={GD.colLoc || ''} key={GD.colLoc} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Количество локомотивов, занятых перевозкой опасных грузов, отработавших нормативный срок службы"
            name="colLocOtrab"
          >
            <Input defaultValue={GD.colLocOtrab || ''} key={GD.colLocOtrab} disabled={disabled} />
            {/* <Input defaultValue={GD.dateEnd || ''} key={GD.dateEnd} disabled={disabled} /> */}
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
