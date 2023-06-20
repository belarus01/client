import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseButtonsForm } from '../../../../../../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Button } from 'components/common/buttons/Button/Button';
import { IUnits, SSubjObj, SSubjObjSpecif } from '@app/domain/interfaces';
import SubjectObjectSpecifForm from './SubjectObjectSpecifForm';
import { getSubjById } from '@app/api/subjects.api';
import { Select } from '@app/components/common/selects/Select/Select';
import { getUnitsByTypeUnit } from '@app/api/units.api';
import AddresForm from '@app/components/subjects/forms/AddresForm';
import { createObject, createObjectWithObjSpecif, updateObjectAndSpecifByObjId } from '@app/api/objects.api';
import { notificationController } from '@app/controllers/notificationController';
import moment from 'moment';
import { DatePicker } from 'antd';

interface ISubjectObjectFormProps {
  objData?: SSubjObj;
  objSpecif?: SSubjObjSpecif;
  subj?: SSubjObj;
  idSubj: string;
  close?: () => void;
}

enum types {
  typeDanger = 1,
}

const SubjectObjectForm: React.FC<ISubjectObjectFormProps> = ({ objData, objSpecif, subj, idSubj, close }) => {
  const [user, setUser] = useState({
    org: 0,
  });
  const [unp, setUnp] = useState('');
  const [typesDanger, setTypesDanger] = useState<IUnits[]>([]);
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

  const getTypesDanger = () => {
    getUnitsByTypeUnit(types.typeDanger).then((types) => {
      setTypesDanger(types);
    });
  };

  const typesDangerOptions = useMemo(() => {
    if (typesDanger.length > 0) {
      return typesDanger.map((type) => {
        return {
          label: type.name,
          value: type.idUnit,
        };
      });
    }
  }, [typesDanger]);

  const setInitialValues = () => {
    if (objData) {
      objData.dateRegOpo = moment(objData.dateRegOpo) as unknown as Date;
      form.setFieldsValue(objData);
    }
  };

  useEffect(() => {
    getUnp();
    getTypesDanger();
    setInitialValues();
  }, []);

  // ONFINISH Func
  const onFinishSubjObj = (values: SSubjObj) => {
    subjObjValues.current = {
      subjObj: values,
    };
    const ouputResultSubjObj: SSubjObj = {
      ...values,
      uid: null,
      idSubj: (idSubj || subj?.idSubj) as number,
      unp: unp,
      org: user.org,
      dateRegOpo: moment(values.dateRegOpo).format('YYYY-MM-DD'),
      idStreet: values.idStreet || null,
      idReestr: values.idReestr || null,
    };

    if (user.org == 0) {
      if (objData && objData.idObj) {
        updateObjectAndSpecifByObjId(objData.idObj, { obj: ouputResultSubjObj })
          .then(() => {
            notificationController.success({ message: 'Объект Успешно обнавлен' });
            if (close) {
              close();
            }
          })
          .catch((e) => {
            notificationController.error({ message: 'Ошибка', description: 'Действие не было успешно завершено' });
          });
        return;
      }
      createObject(ouputResultSubjObj)
        .then(() => {
          notificationController.success({ message: 'Объект усепшно создан' });
          if (close) {
            close();
          }
        })
        .catch(() => {
          notificationController.error({ message: 'Ошибка', description: 'Объект не был создан!' });
        });
    }
    return ouputResultSubjObj;
  };

  const onFinishSpecif = async (values: SSubjObjSpecif) => {
    console.dir(buttonSubmit.current);
    if (buttonSubmit.current) {
      const resultSubjObj = onFinishSubjObj(form.getFieldsValue());

      const resultSpecif: SSubjObjSpecif = {
        ...values,
        dateReg: moment(values.dateReg).format('YYYY-MM-DD'),
        dateAnnul: moment(values.dateAnnul).format('YYYY-MM-DD'),
      };
      console.log({
        subjObj: resultSubjObj,
        specif: values,
      });
      if (resultSubjObj) {
        const outpudObj: { obj: SSubjObj; objSpecif: SSubjObjSpecif } = {
          obj: resultSubjObj,
          objSpecif: resultSpecif,
        };

        if (objData && objData.idObj) {
          const forUpdate: {
            obj: SSubjObj;
            objSpecif: SSubjObjSpecif;
          } = {
            obj: {
              ...objData,
              ...resultSubjObj,
            } as SSubjObj,
            objSpecif: resultSpecif,
          };
          updateObjectAndSpecifByObjId(objData.idObj, forUpdate)
            .then(() => {
              notificationController.success({ message: 'Объект Успешно обнавлен' });
              if (close) {
                close();
              }
            })
            .catch((e) => {
              notificationController.error({ message: 'Ошибка', description: 'Действие не было успешно завершено' });
            });
          return;
        }
        createObjectWithObjSpecif(outpudObj)
          .then(() => {
            notificationController.success({ message: 'Объект усепшно создан' });
            if (close) {
              close();
            }
          })
          .catch(() => {
            notificationController.error({ message: 'Ошибка', description: 'Объект не был создан!' });
          });
      }
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
        <AddresForm showCategs={true} labelCategs="Категории" formInstance={form} />
        <BaseButtonsForm.Item label="Инициалы, фамилия руководителя объекта" name="fioBoss">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Должность руководителя объекта" name="jobBoss">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Телефон руководителя объекта" name="telBoss">
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип опасности" name="idTypeDanger">
          <Select getPopupContainer={(trigger) => trigger} options={typesDangerOptions} />
        </BaseButtonsForm.Item>
        {!showSpecif ? (
          <>
            <BaseButtonsForm.Item label="Номер ОПО" name="numOpo">
              <Input />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Дата регистрации ОПО" name="dateRegOpo">
              <DatePicker getPopupContainer={(trigger) => trigger} />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item label="Номер регистрации" name="numReg">
              <Input />
            </BaseButtonsForm.Item>
          </>
        ) : null}
        <BaseButtonsForm.Item label="Примечание" name="note">
          <TextArea />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item style={hiddenButton}>
          {showSpecif ? (
            <Button style={hiddenButton} ref={buttonSubmit} htmlType="submit"></Button>
          ) : (
            <Button htmlType="submit">Сохранить</Button>
          )}
        </BaseButtonsForm.Item>
      </BaseButtonsForm>

      {showSpecif ? <SubjectObjectSpecifForm specifData={objData?.objSpecif} onFinish={onFinishSpecif} /> : null}
    </>
  );
};

export default SubjectObjectForm;
