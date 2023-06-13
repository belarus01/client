import React from 'react';
import { BaseButtonsForm } from '../../../../../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';

const SubjectObjectForm: React.FC = () => {
  return (
    <>
      <BaseButtonsForm isFieldsChanged={false}>
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
      </BaseButtonsForm>
    </>
  );
};

export default SubjectObjectForm;

// id_type_danger bigint UNSIGNED NOT NULL DEFAULT 1 COMMENT 'тип опасности s_units.type_unit=1 (Классы опасности)',
// note text DEFAULT NULL COMMENT 'Примечание',
// unp varchar(25) DEFAULT NULL COMMENT 'УНП',
// addr_obj varchar(550) DEFAULT NULL COMMENT 'Место нахождения oбъекта проверяемого субъекта (промышленной безопасности)',
// addr_descr varchar(254) DEFAULT NULL COMMENT 'Место осуществления деятельности (уточнение)',
// date_record date DEFAULT NULL COMMENT 'Дата изменения',
// active tinyint UNSIGNED NOT NULL DEFAULT 1 COMMENT '0-удалена,1-действует',
// uid int UNSIGNED DEFAULT NULL COMMENT 'Ид.пользователя,изменившего запись',
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
