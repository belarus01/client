import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Select } from '@app/components/common/selects/Select/Select';
import { IPogAuto } from '../pogTables/PogAutoTable';
import moment from 'moment';
import { DatePicker } from 'antd';
import { getObl, getOblById } from '@app/api/ate.api';
import { getAllSubjects, getSubjectByUnp } from '@app/api/subjects.api';
import { SSubj } from '@app/domain/interfaces';
import Search from 'antd/lib/transfer/search';
import { SearchInput } from '@app/components/common/inputs/SearchInput/SearchInput';
import React from 'react';
import axios from 'axios';

export interface ISopbFormProps {
  data?: IPogAuto;
}

export const PogAutoForm: React.FC<ISopbFormProps> = ({ data }) => {
  const [auto, setAuto] = useState<IPogAuto>({
    numGosnadz: null,
    idOblSubj: '',
  });

  const [unp, setUnp] = useState('');
  const [subject, setSubject] = useState<SSubj>({});
  const [id, setId] = useState('');
  const [todos, setTodos] = useState('');

  const loaderTodo = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((result) => {
      console.log(result.data);
      setTodos(result.data);
    });
  };

  const changeUnp = (e: ChangeEvent<HTMLInputElement>) => {
    setAuto({ ...auto, unp: e.target.value });
  };

  const loadSearchingUnp = (unp: string) => {
    getSubjectByUnp(unp).then((result) => {
      if (result) {
        // setSubject(result);
        setSubject({ idOblSubj: 'qdqfefqwef' });
        setId('qdqfefqwef');
      }
    });
  };

  const searchByUnp = (value: string) => {
    console.log(value);

    loadSearchingUnp(value);
    loaderTodo();
  };

  const [idOblSubj, setIdOblSubj] = useState<{ data: any[] | object; loading: boolean }>({
    data: [],
    loading: false,
  });

  const [subjects, setSubjects] = useState<{ data: SSubj[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const [searchSubject, setSearchSubject] = useState('');

  const getCurrentObl = (id: string | number) => {
    getOblById(id).then((result) => {
      console.log(result);
      setIdOblSubj({ data: result, loading: false });
    });
  };

  const getAllObl = () => {
    getObl().then((result) => {
      console.log(result);
      setIdOblSubj({ data: result, loading: false });
    });
  };

  const getSubjects = () => {
    setSubjects({ ...subjects, loading: true });
    getAllSubjects().then((result) => {
      console.log(result);
      setSubjects({ data: result, loading: false });
    });
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    console.log(auto);
  }, [auto]);
  const clickSelectObl = () => {
    setIdOblSubj({ ...idOblSubj, loading: true });
    if (auto.idOblSubj) {
      // getCurrentObl(auto.idOblSubj);
      setTimeout(() => {
        setIdOblSubj({
          data: [
            {
              nameObl: 'asdfasdfadf',
            },
            {
              nameObl: 'asdfasdfadf2222222',
            },
          ],
          loading: false,
        });
      }, 1000);
    } else {
      // getAllObl();
      setTimeout(() => {
        setIdOblSubj({
          data: {
            nameObl: 'asdfasdfadf',
          },

          loading: false,
        });
      }, 1000);
    }
  };

  const subjectsMemo = useMemo(() => {
    const keys: (string | null)[] = [];
    const newDataFiltred = subjects.data.filter((subject) => {
      if (!keys.includes(subject.unp)) {
        keys.push(subject.unp);
        return true;
      }
      return false;
    });
    return {
      ...subjects,
      data: newDataFiltred,
    };
  }, [subjects]);

  useEffect(() => {
    console.log(subjectsMemo);
  }, [subjectsMemo]);

  const idOblSubjData = useMemo(
    () => (Array.isArray(idOblSubj.data) ? idOblSubj.data : [idOblSubj.data]),
    [idOblSubj.data],
  );

  const selectSubject = (value) => {
    const subj = subjectsMemo.data.find((subj) => subj.unp == value);
    setSubject(subj);
  };

  useEffect(() => {
    console.log(id);
  }, [id]);
  const dateFormat = 'YYYY-MM-DD';

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');

  console.log(today);

  // const setDefaultValue = <T extends IPogAuto & SSubj, K extends keyof T>(field: K, defaultValue: T[K]): T[K] => {
  //   return auto[field] || subject[field] || defaultValue;
  // };

  return (
    <>
      <BaseButtonsForm
        isFieldsChanged={false}
        initialValues={{
          ['dateRegPoo']: moment(auto.dateRegPoo || today, dateFormat),
        }}
      >
        <BaseButtonsForm.Item label="УНП" name="subjectsMemo">
          {data ? (
            <Input defaultValue={auto.unp || ''} onChange={changeUnp} />
          ) : (
            <SearchInput
              value={unp}
              placeholder="Введите УНП"
              onChange={(e) => {
                setId(e.target.value);
              }}
              onSearch={searchByUnp}
            />
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
        <BaseButtonsForm.Item
          label="Наименование организации, фамилия, собственное имя, отчество (если таковое имеется) индивидуального предпринимателя"
          name="id"
        >
          {/* <Select
              options={idOblSubjData}
              loading={idOblSubj.loading}
              onClick={clickSelectObl}
              onChange={(value) => {
                console.log(value);
              }}
            /> */}
          <Input
            defaultValue={id}
            key={id}
            onChange={(e) => {
              console.log(e.target.value);
              setSubject({ ...subject, idOblSubj: e.target.value });
            }}
            disabled
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="todos" name="todos">
          <Input
            defaultValue={todos.title}
            key={todos}
            onChange={(e) => {
              console.log(e.target.value);
              setTodos(e.target.value);
            }}
            disabled
          />
        </BaseButtonsForm.Item>
        {/* <BaseButtonsForm.Item label="Область местонахождения субъекта" name="idOblSubj">
          <Input
            defaultValue={auto.idOblSubj || ''}
            key={unp}
            onChange={(e) => {
              setAuto({ ...auto, idOblSubj: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Район местонахождения субъекта" name="idOblSubj">
          <Input
            defaultValue={auto.idRayonSubj || ''}
            onChange={(e) => {
              setAuto({ ...auto, idRayonSubj: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Город местонахождения субъекта" name="idCitySubj">
          <Input
            defaultValue={auto.idCitySubj || ''}
            onChange={(e) => {
              setAuto({ ...auto, idCitySubj: e.target.value });
            }}
          />
        </BaseButtonsForm.Item> */}
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
        <BaseButtonsForm.Item
          label="Улица, № дома (офиса, строения и т.д.) индекс, местонахождения субъекта"
          name="idStreetSubj"
        >
          <Input
            defaultValue={auto.idStreetSubj || ''}
            onChange={(e) => {
              setAuto({ ...auto, idStreetSubj: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Контактные данные" name="contacts">
          <Input
            defaultValue={auto.contacts || ''}
            onChange={(e) => {
              setAuto({ ...auto, contacts: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип транспортного средства" name="typeTs">
          <Input
            defaultValue={auto.typeTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, typeTs: e.target.value });
            }}
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
          <Input
            defaultValue={auto.manufactYearTs || ''}
            onChange={(e) => {
              setAuto({ ...auto, manufactYearTs: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Год изготовления цистерны (если известно)" name="manufactYearTanc">
          <Input
            defaultValue={auto.manufactYearTanc || ''}
            onChange={(e) => {
              setAuto({ ...auto, manufactYearTanc: e.target.value });
            }}
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
          <Input
            defaultValue={auto.dateControlTanc || ''}
            onChange={(e) => {
              setAuto({ ...auto, dateControlTanc: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Вид проведенной проверки цистерны" name="typeControlTanc">
          <Input
            defaultValue={auto.typeControlTanc || ''}
            onChange={(e) => {
              setAuto({ ...auto, typeControlTanc: e.target.value });
            }}
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
        {/*
  
      `id_dept` int unsigned DEFAULT NULL COMMENT 'Департамент, владелец записи',
  `id_dept_dom` int unsigned DEFAULT NULL COMMENT 'Индекс структурного подразделения, зарегистрировавшего ПОГ',
  `id_obl` int unsigned DEFAULT '1' COMMENT 'Область департамента',
  `id_subj_obj` bigint unsigned DEFAULT NULL,
  `id_num_reg` int unsigned DEFAULT '1100' COMMENT 'ид.журнала о регистрации ПОГ doc.s_poo_docs',
  `num_reg` int unsigned DEFAULT '1100' COMMENT '№ журнала регистра-ции ПОГ',
  `num_gosnadz` int unsigned DEFAULT NULL COMMENT 'Регистрационный № ПОГ',
  `num_order` varchar(85) DEFAULT NULL COMMENT 'Порядковый номер в журнале регистрации ПОГ',
  `date_reg_poo` date DEFAULT NULL COMMENT 'Дата регистрации заявления о регистрации трасп.средства ПОГ',
  `num_reg_poo` varchar(85) DEFAULT NULL COMMENT '№ регистрации заявления о регистрации трасп.средства ПОГ',
  `unp` varchar(30) DEFAULT NULL COMMENT 'УНП субъекта',
  `name_addr_ovner_poo` varchar(250) DEFAULT NULL COMMENT 'Наименование организации субъекта, ФИО ИП владельца ПОГ',
  `id_obl_subj` int unsigned DEFAULT NULL COMMENT 'Область субъекта владельца ПОГ mchs.s_ate_obl',
  `id_rayon_subj` int unsigned DEFAULT NULL COMMENT 'Район субъекта владельца ПОГ mchs.s_ate_rayon',
  `id_city_subj` int unsigned DEFAULT NULL COMMENT 'Город субъекта владельца ПОГ mchs.s_ate_street.name_reestr',
  `id_street_subj` int unsigned DEFAULT NULL COMMENT 'Улица субъекта владельца ПОГ mchs.s_ate_street.name_rus',
  `num_build` varchar(150) DEFAULT NULL COMMENT 'Номер дома,корп.,индекс субъекта владельца ПОГ',
  `contacts` varchar(150) DEFAULT NULL COMMENT 'Контактные данные субъекта владельца ПОГ',
  `id_type_ts` bigint unsigned DEFAULT NULL COMMENT 'Класс опасности  из s_units.type из doc.s_units.type_unit=12',
  `type_ts` varchar(60) DEFAULT NULL COMMENT 'Тип транспортного средства s_units.type из doc.s_units.type_unit=12',
  `id_type_dopog_ts` bigint unsigned DEFAULT NULL COMMENT 'Тип транспортного средства по DOPOG из doc.s_units.type_unit=13',
  `type_dopog_ts` varchar(60) DEFAULT NULL COMMENT 'Тип транспортного средства по DOPOG doc.s_units.type из doc.s_units.type_unit=13',
  `brend_ts` varchar(60) DEFAULT NULL COMMENT 'Марка транспортного средства ',
  `model_ts` varchar(60) DEFAULT NULL COMMENT 'Модель транспортного средства ',
  `vin_ts` varchar(60) DEFAULT NULL COMMENT 'Номер шасси транспортного средства ',
  `manufact_num_tanc` varchar(150) DEFAULT NULL COMMENT 'Заводской номер цистерны',
  `manufact_year_ts` varchar(150) DEFAULT NULL COMMENT 'Год выпуска ТС',
  `manufact_year_tanc` varchar(150) DEFAULT NULL COMMENT 'Год выпуска цистерны',
  `manufact_ts` varchar(150) DEFAULT NULL COMMENT 'Завод-изготовитель ТС',
  `num_reg_gai` varchar(55) DEFAULT NULL COMMENT 'Регистрационный знак',
  `id_danger_class` bigint unsigned DEFAULT NULL COMMENT 'Класс опасности  из doc.s_units.type_unit=5',
  `danger_class` varchar(85) DEFAULT NULL COMMENT 'Класс опасности doc.s_units.type_unit=5 doc.s_units.type+doc.s_units.name',
  `id_street_ts` int unsigned DEFAULT NULL COMMENT 'СОАТО код места стоянки mchs.s_ate_street.soato_code',
  `street_ts` int unsigned DEFAULT NULL COMMENT 'Улица  места стоянки mchs.s_ate_street.name_rus',
  `num_build_ts` varchar(150) DEFAULT NULL COMMENT 'Номер дома места стоянки ТС',
  `date_control_tanc` date DEFAULT NULL COMMENT 'Дата проведенной проверки цистерны',
  `id_type_control_tanc` int unsigned DEFAULT NULL COMMENT 'Тип проведенной проверки цистерны из doc.s_units.type_unit=14',
  `type_control_tanc` varchar(150) DEFAULT NULL COMMENT 'Тип проведенной проверки цистерны  doc.s_units.type из doc.s_units.type_unit=14',
  `pre_exploit` tinyint unsigned DEFAULT NULL COMMENT 'Предэксплуатационная проверка (1-да,0-нет)',
  `size_tanc` decimal(10,0) DEFAULT NULL COMMENT 'Объем цистерны м3',
  `num_sections` tinyint unsigned DEFAULT NULL COMMENT 'Количество секций',
  `tanc_code` varchar(25) DEFAULT NULL COMMENT 'Код цистерны',
  `num_ok` varchar(25) DEFAULT NULL COMMENT 'Номер официального утверждения типа',
  `date_ok` date DEFAULT NULL COMMENT 'Дата официального утверждения типа',
  `doc_ok` varchar(25) DEFAULT NULL COMMENT 'Официальное утверждение типа (№документа,подтверждающего соотв.требованиям ТР ТС)',
  `date_doc_ok` date DEFAULT NULL COMMENT 'Дата документа,подтверждающего соотв.требованиям ТР ТС',
  `num_device` varchar(255) DEFAULT NULL COMMENT 'Колич.и тип устройств безопасности и (ДУ или ПК, или ВК) цистерны',
  `num_membr` tinyint unsigned DEFAULT NULL COMMENT 'Наличие разрывной мембраны (количество) цистерны',
  `material` varchar(125) DEFAULT NULL COMMENT 'Материал цистерны',
  `pressure` decimal(10,0) DEFAULT NULL COMMENT 'Расчетное давление Pa (цистерны)',
  `fl_iso` tinyint unsigned DEFAULT NULL COMMENT 'Наличие изоляции (цистерны) 0-нет,1-да',
  `fl_screen` tinyint unsigned DEFAULT NULL COMMENT 'Наличие солнцезащитного экрана (цистерны) 0-нет,1-да',
  `binding` varchar(85) DEFAULT NULL COMMENT 'Вид крепления волнорезов (сварка/резьбовое) цистерны',
  `reg_inspector` varchar(185) DEFAULT NULL COMMENT 'Фамилия, инициалы инспетора, зарегистрировавшего ТС',
  `fio_staff` varchar(185) DEFAULT NULL COMMENT 'Фамилия, имя, отчество лица, получившего регистрационную карточку ТС',
  `date_unreg` date DEFAULT NULL COMMENT 'Дата регистрации заявления о снятии с учета ТС',
  `num_unreg` varchar(55) DEFAULT NULL COMMENT 'Номер заявления о снятии с учета ТС',
  `why_unreg` varchar(85) DEFAULT NULL COMMENT 'Причина снятия с учета ТС',
  `unreg_inspector` varchar(185) DEFAULT NULL COMMENT 'Фамилия, инициалы инспетора, снявшего с учета ТС',
  `org` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '0-Госнадзор, 1-пожарники,2-другие',
  `date_record` date DEFAULT (now()) COMMENT 'Дата изменения записи',
  `active` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '0-удалено, 1-активно',
  `uid` int unsigned DEFAULT NULL COMMENT 'Пользователь, изменивший запись',
  PRIMARY KEY (`id_list`),
    */}
        {/* <BaseButtonsForm.Item label="Наименование СОПБиП" name="name">
          <Input name="name" onChange={(e) => setSopb({ ...sopb, name: e.target.value })} defaultValue={sopb.name} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Оценка соответствия средств обеспечения пожарной безопасности и пожаротушения проводится в форме сертификации"
          name={'conditions'}
        >
          <Input
            name="conditions"
            onChange={(e) => setSopb({ ...sopb, name: e.target.value })}
            defaultValue={sopb.name}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Статус" name={'active'}>
          <Select
            defaultValue={sopb.active || 1}
            onChange={(value) => changeStatus(value as number)}
            options={[
              { value: 1, label: 'активно' },
              {
                value: 0,
                label: 'удалено',
              },
            ]}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button type="primary">Сохранить</Button>
        </BaseButtonsForm.Item> */}
      </BaseButtonsForm>
    </>
  );
};
