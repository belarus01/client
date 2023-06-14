import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseButtonsForm } from '../../../../../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Button } from 'components/common/buttons/Button/Button';
import { SSoato, SSubjObj, SSubjObjSpecif } from '@app/domain/interfaces';
import SubjectObjectSpecifForm from './SubjectObjectSpecifForm';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { getSubjById } from '@app/api/subjects.api';
import { Select } from '@app/components/common/selects/Select/Select';
import { getAllSoato } from '@app/api/soato.api';

interface ISubjectObjectFormProps {
  objData?: SSubjObj;
  objSpecif?: SSubjObjSpecif;
  subj?: SSubjObj;
  idSubj: string;
}

const SubjectObjectForm: React.FC<ISubjectObjectFormProps> = ({ objData, objSpecif, subj, idSubj }) => {
  const [user, setUser] = useState({
    org: 1,
  });
  const [unp, setUnp] = useState('');
  const [soatos, setSoatos] = useState<SSoato[]>([]);

  const [form] = BaseButtonsForm.useForm();
  const buttonSubmit = useRef<HTMLButtonElement>(null);
  const subjObjValues = useRef<null | { subjObj: SSubjObj }>(null);

  //SETINITIAL VALUES IN FOR SUBJOBJ
  const getUnp = () => {
    const idSubject = subj?.idSubj || idSubj;
    if (subj?.unp) {
      setUnp(subj.unp);
      return;
    }
    if (idSubject) {
      getSubjById(idSubject).then((subj) => setUnp(subj?.unp || ''));
    }
  };

  const getSoato = () => {
    getAllSoato().then((soatosFetched) => {
      setSoatos(soatosFetched);
    });
  };

  const setInitialValuesSubjObj = () => {
    console.log(subj);
  };

  const soatoOptions = useMemo(() => {
    if (soatos.length > 0) {
      return soatos.map((soato) => {
        return {
          label: `${soato.soato}, ${soato.name}`,
          value: soato.soato,
        };
      });
    }
    return [];
  }, [soatos]);

  useEffect(() => {
    getUnp();
    getSoato();
  }, []);

  // ONFINISH Func
  const onFinishSubjObj = (values: SSubjObj) => {
    subjObjValues.current = {
      subjObj: values,
    };
    return values;
  };

  const onFinishSpecif = async (values: SSubjObjSpecif) => {
    console.dir(buttonSubmit.current);
    if (buttonSubmit.current) {
      const resultSubjObj = onFinishSubjObj(form.getFieldsValue());

      console.log({
        subjObj: resultSubjObj,
        specif: values,
      });
    }
  };

  // show form specif if org == 1
  const showSpecif = user.org == 1 ? true : false;
  const hiddenButton = {
    width: user.org == 1 ? '0px' : 'auto',
    height: user.org == 1 ? '0px' : 'auto',
    transform: 'translateX(0)',
    margin: 0,
  };

  return (
    <>
      <button
        onClick={() =>
          setUser((prev) => ({
            org: prev.org == 1 ? 0 : 1,
          }))
        }
      >
        change
      </button>
      <BaseButtonsForm form={form} isFieldsChanged={false} onFinish={onFinishSubjObj}>
        <BaseButtonsForm.Item label="Наименование объекта" name="nameObj">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип опасности" name="idTypeDanger">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Примечание" name="note">
          <TextArea />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Место нахождения oбъекта проверяемого субъекта (промышленной безопасности)"
          name="addrObj"
        >
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Место осуществления деятельности (уточнение)" name="addrDescr">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Местонахождения  объекта" name="soatoCode">
          <Select
            showSearch
            optionFilterProp="children"
            options={soatoOptions}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Местонахождения  объекта" name="idStreet">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Инициалы, фамилия руководителя объекта" name="fioFireman">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Инициалы, фамилия руководителя объекта" name="jobBoss">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Инициалы, фамилия руководителя объекта" name="telBoss">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер ОПО" name="numOpo">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата регистрации ОПО" name="dateRegOpo">
          <DatePicker />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Инициалы, фамилия руководителя объекта" name="numReg">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item style={hiddenButton}>
          {showSpecif ? (
            <Button style={hiddenButton} ref={buttonSubmit} htmlType="submit"></Button>
          ) : (
            <Button htmlType="submit">first</Button>
          )}
        </BaseButtonsForm.Item>
      </BaseButtonsForm>

      {showSpecif ? <SubjectObjectSpecifForm specifData={objSpecif} onFinish={onFinishSpecif} /> : null}
    </>
  );
};

export default SubjectObjectForm;

// + unp varchar(25) DEFAULT NULL COMMENT 'УНП',
// soato_code bigint UNSIGNED DEFAULT NULL COMMENT 'местонахождения  объекта s_ate_reestr',
// id_reestr int UNSIGNED DEFAULT NULL COMMENT 'Уникальный идентификатор объекта (город, деревня…) Реестр АТЕ и ТЕ',
// id_street bigint UNSIGNED DEFAULT NULL COMMENT 'поле id_street таблицы s_ate_street',
// name_obj varchar(50) DEFAULT NULL COMMENT 'наименование объекта',
// fio_fireman varchar(850) DEFAULT NULL COMMENT 'Инициалы, фамилия руководителя объекта',
// job_boss varchar(85) DEFAULT NULL COMMENT 'должностного лица, руководителя объекта',
// tel_boss varchar(85) DEFAULT NULL COMMENT 'телефон должностного лица, руководителя объекта',
// org tinyint UNSIGNED DEFAULT 0 COMMENT '0-госпромнадзор,1-пожарники',
// num_opo varchar(85) DEFAULT NULL COMMENT 'Номер ОПО (для надзорников, org=0)',
// date_reg_opo date DEFAULT NULL COMMENT 'Дата регистрации ОПО',
// num_reg varchar(15) DEFAULT NULL,
