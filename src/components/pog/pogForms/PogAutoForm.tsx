import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Select } from '@app/components/common/selects/Select/Select';
import { IPogAuto } from '../pogTables/PogAutoTable';
import moment from 'moment';
import { DatePicker } from 'antd';
import { getObl, getOblById, getRayonsByRayonId } from '@app/api/ate.api';
import { getAllSubjects, getSubjectByUnp } from '@app/api/subjects.api';
import { SSubj, SSubjObj, ateObl } from '@app/domain/interfaces';
import Search from 'antd/lib/transfer/search';
import { SearchInput } from '@app/components/common/inputs/SearchInput/SearchInput';
import React from 'react';
import { getAllObjectsBySubjectId } from '@app/api/objects.api';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { type } from './../../../types/generalTypes';
import { createPogSubjAuto } from '@app/api/pogAuto.api';

export interface ISopbFormProps {
  data?: IPogAuto;
  close: () => void;
}

export const PogAutoForm: React.FC<ISopbFormProps> = ({ data, close }) => {
  const [auto, setAuto] = useState<IPogAuto>({
    numGosnadz: null,
    idOblSubj: '',
    comm: '',
    ...data,
  });

  const [unp, setUnp] = useState('');
  const [subject, setSubject] = useState({});

  const [id, setId] = useState('');
  const [oblSubj, setOblSubj] = useState<ateObl>({
    nameObl: '',
    idObl: 0,
  });

  const [rayonSubj, setRayonSubj] = useState('');
  const [citySubj, setCitySubj] = useState('');
  const [streetSubj, setStreetSubj] = useState('');
  const [objSubj, setObjSubj] = useState<SSubjObj[]>([]);

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  //fetch for obl street rayon city
  const getCurrentObl = (id: string) => {
    getOblById(id).then((result) => {
      console.log('getCurrentObl', result);
      setOblSubj(result);
    });
  };

  const getCurrentRayon = (id: string) => {
    console.log(id);
    getRayonsByRayonId(id).then((result) => {
      console.log('getCurrentRayon', result);
      setRayonSubj(result);
    });
  };

  const getCurrentCity = (id: string) => {
    console.log(id);
    getRayonsByRayonId(id).then((result) => {
      console.log('getCurrentCity', result);
      setRayonSubj(result);
    });
  };

  const getCurrentStreet = (id: string) => {
    if (id) {
      return;
    }
    getRayonsByRayonId(id).then((result) => {
      console.log('getCurrentStreet', result);
      setStreetSubj(result);
    });
  };

  // ADD NEW INFO IN AUTO OBJ
  const changeInfoAuto = (subj: SSubj) => {
    const newAuto: IPogAuto = {
      ...auto,
      unp: subj.unp,
      contacts: subj.contactData,
      idCitySubj: subj?.idCity || 1,
      idOblSubj: subj?.idObl || 1,
      nameAddrOvnerPoo: subj.subj + ' ' + subj.bossName,
      idRayonSubj: subj?.idRayon || 1,
      idStreetSubj: subj.idStreetFact,
    };
    // change place after fix tables
    getCurrentObl(newAuto.idOblSubj as string);
    getCurrentRayon(newAuto.idRayonSubj as string);
    getCurrentCity(newAuto.idCitySubj as string);
    // getCurrentStreet(newAuto.idStreetSubj);
    setStreetSubj(subj.addrYur as string);
    setAuto({ ...newAuto });
    setLoading(false);
  };

  const getObjsSubj = (idSubj: string) => {
    getAllObjectsBySubjectId(parseFloat(idSubj)).then((result) => {
      console.log('getObjsSubj', result);
    });
  };

  const changeUnp = (e: ChangeEvent<HTMLInputElement>) => {
    setAuto({ ...auto, unp: e.target.value });
  };

  const loadSearchingUnp = (unp: string) => {
    getSubjectByUnp(unp).then((result) => {
      if (result) {
        setSubject(result);
        changeInfoAuto(result);
        //100071274
        console.log(result);
        console.log(result.idSubj);
        getObjsSubj(result.idSubj.toString());
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
      searchByUnp(auto.unp as string);
    }
  }, []);

  // SUBMIT

  const submitCreate = () => {
    console.log(auto);
    createPogSubjAuto(auto);
    close();
  };

  const submitChanges = () => {
    console.log(auto);
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
          ['dateRegPoo']: moment(auto.dateRegPoo || today, dateFormat),
          ['manufactYearTs']: moment(auto.manufactYearTs || yearToday, dateFormatYaer),
          ['manufactYearTanc']: moment(auto.manufactYearTanc || yearToday, dateFormatYaer),
          ['dateControlTanc']: moment(auto.dateControlTanc || today, dateFormat),
        }}
      >
        <BaseButtonsForm.Item label="УНП" name="subjectsMemo">
          {data ? (
            <Input defaultValue={auto.unp || ''} onChange={changeUnp} />
          ) : (
            <SearchInput value={unp} placeholder="Введите УНП" onSearch={searchByUnp} />
          )}

          {/* <Select
            options={subjectsMemo.data.map((d) => ({ value: d.unp, label: d.subj }))}
            loading={subjectsMemo.loading}
            showSearch
            searchValue={searchSubject}
            onSearch={(value) => {
              setSearchSubject(value);
            }}
            onChange={(value) => {
              console.log(value);
              selectSubject(value);
            }}
          /> */}
        </BaseButtonsForm.Item>
        <Spinner spinning={loading}>
          <BaseButtonsForm.Item
            label="Наименование организации, фамилия, собственное имя, отчество (если таковое имеется) индивидуального предпринимателя"
            name="nameAddrOvnerPoo"
          >
            <Input defaultValue={auto.nameAddrOvnerPoo} key={auto.nameAddrOvnerPoo} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Область местонахождения субъекта" name="oblSubj">
            <Input defaultValue={oblSubj.nameObl} key={oblSubj.nameObl} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Район местонахождения субъекта" name="rayonSubj">
            <Input defaultValue={rayonSubj} key={rayonSubj} disabled={disabled} />
            {rayonSubj}
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Город местонахождения субъекта" name="citySubj">
            <Input defaultValue={citySubj} key={citySubj} disabled={disabled} />
            {citySubj}
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item
            label="Улица, № дома (офиса, строения и т.д.) индекс, местонахождения субъекта"
            name="streetSubj"
          >
            <Input defaultValue={streetSubj} key={streetSubj} disabled={disabled} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label="Контактные данные" name="contacts">
            <Input defaultValue={auto.contacts as string} key={auto.contacts} disabled={disabled} />
          </BaseButtonsForm.Item>
        </Spinner>

        <BaseButtonsForm.Item label="Регистрационный номер" name="numGosnadz">
          <Input
            defaultValue={auto.numGosnadz || ''}
            onChange={(e) => {
              setAuto({ ...auto, numGosnadz: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата регистрации заявления о регистрации транспортного средства" name="dateRegPoo">
          <DatePicker
            format={dateFormat}
            onChange={(value) => {
              setAuto({ ...auto, dateRegPoo: value?.format(dateFormat) });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер регистрации заявления о регистрации транспортного средства" name="numRegPoo">
          <Input
            defaultValue={auto.numRegPoo || ''}
            onChange={(e) => {
              setAuto({ ...auto, numRegPoo: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Индекс" name="dataIndex">
          <Input
            defaultValue={auto.dataIndex || ''}
            onChange={(e) => {
              setAuto({ ...auto, dataIndex: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Тип транспортного средства" name="typeTs">
          <Input
            defaultValue={auto.typeTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, typeTs: e.target.value });
            }}
            type="number"
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип транспортного средства по ДОПОГ" name="idTypeDopogTs">
          <Input
            defaultValue={auto.idTypeDopogTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, idTypeDopogTs: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Марка транспортного средства" name="brendTs">
          <Input
            defaultValue={auto.brendTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, brendTs: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Номер шасси транспортного средства" name="vinTs">
          <Input
            defaultValue={auto.vinTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, vinTs: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Заводской номер цистерны" name="manufactNumTanc">
          <Input
            defaultValue={auto.manufactNumTanc || ''}
            onChange={(e) => {
              setAuto({ ...auto, manufactNumTanc: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Год выпуска транспортного средства" name="manufactYearTs">
          <DatePicker
            format={dateFormatYaer}
            onChange={(value) => {
              setAuto({ ...auto, manufactYearTs: value?.format(dateFormatYaer) });
            }}
            picker="year"
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Год изготовления цистерны (если известно)" name="manufactYearTanc">
          <DatePicker
            format={dateFormatYaer}
            onChange={(value) => {
              setAuto({ ...auto, manufactYearTanc: value?.format(dateFormatYaer) });
            }}
            picker="year"
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Завод изготовитель транспортного средства" name="manufactTs">
          <Input
            defaultValue={auto.manufactTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, manufactTs: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Регистрационный знак" name="numRegGai">
          <Input
            defaultValue={auto.numRegGai || ''}
            onChange={(e) => {
              setAuto({ ...auto, numRegGai: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Класс опасного груза" name="dangerClass">
          <Input
            defaultValue={auto.dangerClass || ''}
            onChange={(e) => {
              setAuto({ ...auto, dangerClass: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Место стоянки" name="streetTs">
          <Input
            defaultValue={auto.streetTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, streetTs: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Дата проведенной проверки цистерны" name="dateControlTanc">
          <DatePicker
            format={dateFormat}
            onChange={(value) => {
              setAuto({ ...auto, dateControlTanc: value?.format(dateFormat) });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Вид проведенной проверки цистерны" name="typeControlTanc">
          <Input
            defaultValue={auto.typeControlTanc || ''}
            onChange={(e) => {
              setAuto({ ...auto, typeControlTanc: e.target.value });
            }}
            type="number"
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Предэксплуатационная проверка" name="preExploit">
          <Input
            defaultValue={auto.preExploit || ''}
            onChange={(e) => {
              setAuto({ ...auto, preExploit: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Объем цистерны" name="sizeTanc">
          <Input
            defaultValue={auto.sizeTanc || ''}
            onChange={(e) => {
              setAuto({ ...auto, sizeTanc: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Количество секций" name="numSections">
          <Input
            defaultValue={auto.numSections || ''}
            onChange={(e) => {
              setAuto({ ...auto, numSections: e.target.value });
            }}
            type="number"
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Код цистерны" name="tancCode">
          <Input
            defaultValue={auto.tancCode || ''}
            onChange={(e) => {
              setAuto({ ...auto, tancCode: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Номер, дата официального утверждения типа" name="numOk">
          <Input
            defaultValue={auto.numOk || ''}
            onChange={(e) => {
              setAuto({ ...auto, numOk: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Количество и тип устройств безопасности (ДУ или ПК, или ВК)" name="numDevice">
          <Input
            defaultValue={auto.numDevice || ''}
            onChange={(e) => {
              setAuto({ ...auto, numDevice: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Наличие разрывной мембраны (количество)" name="numMembr">
          <Input
            defaultValue={auto.numMembr || ''}
            onChange={(e) => {
              setAuto({ ...auto, numMembr: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Материал цистерны" name="material">
          <Input
            defaultValue={auto.material || ''}
            onChange={(e) => {
              setAuto({ ...auto, material: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Расчетное давление" name="pressure">
          <Input
            defaultValue={auto.pressure || ''}
            onChange={(e) => {
              setAuto({ ...auto, pressure: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Наличие теплоизоляции" name="flIso">
          <Input
            defaultValue={auto.flIso || ''}
            onChange={(e) => {
              setAuto({ ...auto, flIso: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Наличие солнцезащитных экранов" name="flScreen">
          <Input
            defaultValue={auto.flScreen || ''}
            onChange={(e) => {
              setAuto({ ...auto, flScreen: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Вид крепления волнорезов (сварка/резьбовое)" name="binding">
          <Input
            defaultValue={auto.binding || ''}
            onChange={(e) => {
              setAuto({ ...auto, binding: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          label="Фамилия, инициалы  государственного инспектора, зарегистрировавшего транспортное средство"
          name="regInspector"
        >
          <Input
            defaultValue={auto.regInspector || ''}
            onChange={(e) => {
              setAuto({ ...auto, regInspector: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          label="Фамилия, собственное имя, отчество (если таковое имеется) лица, получившего регистрационную карточку"
          name="fioStaff"
        >
          <Input
            defaultValue={auto.fioStaff || ''}
            onChange={(e) => {
              setAuto({ ...auto, fioStaff: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          label="Дата и номер регистрации заявления о снятии с учета транспортного средства"
          name="dateUnreg"
        >
          <Input
            defaultValue={auto.dateUnreg || ''}
            onChange={(e) => {
              setAuto({ ...auto, dateUnreg: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          label="Фамилия, инициалы государственного инспектора, снявшего с учета транспортное средство"
          name="unregInspector"
        >
          <Input
            defaultValue={auto.unregInspector || ''}
            onChange={(e) => {
              setAuto({ ...auto, unregInspector: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item name={'comm'} label="Примечание">
          <TextArea defaultValue={auto.comm} onChange={(e) => setAuto({ ...auto, uid: e.target.value })} />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item>
          <Button type="primary" onClick={submit}>
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
