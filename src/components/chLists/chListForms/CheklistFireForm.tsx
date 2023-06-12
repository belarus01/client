import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IFireCardBuild, SUnits } from '@app/domain/interfaces';
import {
  getAllUnitBuildigAndNaruzhCategs,
  getAllUnitBuildingTypes,
  getAllUnitFunctionalClasses,
} from '@app/api/units.api';
import { createFire, updateFireCardBuild } from '@app/api/fire.api';
import { notificationController } from '@app/controllers/notificationController';
import { useParams } from 'react-router-dom';
import { validatorCustom } from '@app/utils/validator';
import { Select } from '@app/components/common/selects/Select/Select';

export interface CheklistFireFormProps {
  data?: IFireCardBuild;
  close?: () => void;
}

const CheklistFireForm: React.FC<CheklistFireFormProps> = ({ data, close }) => {
  const [newCategory, setNewCategory] = useState<IFireCardBuild>({
    nameBuild: null,
    idSubjObj: null,
    idList: null,
    ...data,
  });

  const [optionsFunctionalClasses, setOptionsFunctionalClasses] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const [, setFunctionalsClass] = useState<SUnits[]>([]);
  const [shownClasses, setShownClasses] = useState(true);

  const [form] = BaseButtonsForm.useForm();

  const resetField = () => {
    const obj = newCategory.idUnit_17;
    if (obj) {
      obj.type = null;
      obj.idUnit = null;
    }
    setNewCategory({ ...newCategory, idUnit_17_37: null, idUnit_17: obj });
    form.setFieldValue('idUnit_17_37', null);
  };

  const changeFunctionales = (value: number) => {
    if (value >= 2340) {
      setShownClasses(false);
    } else {
      setShownClasses(true);
      resetField();
    }
  };

  const [loadingFunctionalClasses, setLoadingFunctionalClasses] = useState(false);

  const getFunctionalClasses = () => {
    setLoadingFunctionalClasses(true);
    getAllUnitFunctionalClasses().then((options) => {
      const optionsFiltred = options.map((clas) => ({
        label: clas.type as string,
        value: clas.idUnit as number,
      }));
      setOptionsFunctionalClasses(optionsFiltred);
      setFunctionalsClass(options);
      setLoadingFunctionalClasses(false);
    });
  };

  const [optionsTipClasses, setOptionsTipClasses] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  const [loadingTipClasses, setLoadingTipClasses] = useState(false);

  const [shownN, setShown] = useState(false);

  const changeType = (value: number) => {
    if (value == 4002) {
      setShown(true);
    } else {
      setShown(false);
    }
  };

  const getTipClasses = () => {
    setLoadingTipClasses(true);
    getAllUnitBuildingTypes().then((typs) => {
      const optionTypes = typs.map((type) => ({
        label: type.name as string,
        value: type.idUnit as number,
      }));
      setOptionsTipClasses(optionTypes);
      setLoadingTipClasses(false);
    });
  };

  const [optionsCategorylClasses, setOptionsCategoryClasses] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  const optionsClasses = useMemo(() => {
    return optionsCategorylClasses.filter((category) => {
      if (shownN) {
        return category.value >= 2441;
      }
      return category.value < 2441;
    });
  }, [optionsCategorylClasses, shownN]);

  const [loadingCategoryClasses, setLoadingCategoryClasses] = useState(false);

  const getCategoryClasses = () => {
    setLoadingCategoryClasses(true);
    getAllUnitBuildigAndNaruzhCategs().then((category) => {
      const optionsFiltred = category.map((clas) => ({
        label: clas.type as string,
        value: clas.idUnit as number,
      }));

      setOptionsCategoryClasses(optionsFiltred);
      setLoadingCategoryClasses(false);
    });
  };

  const { idSubj } = useParams();

  const onFinish = (values: IFireCardBuild) => {
    setLoading(true);
    if (data) {
      if (data.idList) {
        Object.keys(values).forEach((item) => {
          if (values[item]?.value) {
            values[item] = values[item].value;
          }
        });
        updateFireCardBuild(data.idList, values).then(() => {
          setLoading(false);
          if (close) {
            close();
          }
          notificationController.success({ message: 'Данные обновлены' });
        });
      }
    } else {
      createFire({ ...values, idSubj: Number(idSubj) }).then(() => {
        setLoading(false);
        if (close) {
          close();
        }
        notificationController.success({ message: 'Запись создана' });
      });
    }
  };

  useEffect(() => {
    getFunctionalClasses();
    getTipClasses();
    getCategoryClasses();
  }, []);

  useEffect(() => {
    if (data && data.idUnit_6) {
      changeFunctionales(data.idUnit_6);
    }
  }, [data]);

  return (
    <div>
      <BaseButtonsForm
        form={form}
        initialValues={{
          nameBuild: newCategory.nameBuild,
          area: newCategory.area,
          idUnit_41: {
            label: newCategory.idUnit_2?.name,
            value: newCategory.idUnit_2?.idUnit,
          },
          idUnit_6: {
            label: newCategory.idUnit_3?.type,
            value: newCategory.idUnit_3?.idUnit,
          },
          idUnit_17_37: { label: newCategory.idUnit_17?.type, value: newCategory.idUnit_17?.idUnit },
          numStaff: newCategory.numStaff,
          numPerson: newCategory.numPerson,
        }}
        layout="vertical"
        isFieldsChanged={false}
        onFinish={onFinish}
        loading={loading}
      >
        <BaseButtonsForm.Item label="Наименование сооружения" name="nameBuild">
          <Input
            defaultValue={newCategory.nameBuild || ''}
            onChange={(e) => setNewCategory({ ...newCategory, nameBuild: (newCategory.nameBuild = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Функциональное назначение" name="idUnit_6">
          <Select
            loading={loadingFunctionalClasses}
            defaultValue={(newCategory.idUnit_3?.type as unknown as number) || null}
            options={optionsFunctionalClasses}
            onSelect={(value) => changeFunctionales(value as number)}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Площадь, кв.м"
          name="area"
          rules={[{ validator: validatorCustom.cannotBeLessThanZero }]}
        >
          <Input
            type="number"
            defaultValue={newCategory.area || ''}
            onChange={(e) => setNewCategory({ ...newCategory, area: (newCategory.area = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип" name="idUnit_41">
          <Select
            loading={loadingTipClasses}
            defaultValue={(newCategory.idUnit_2?.name as unknown as number) || null}
            options={optionsTipClasses}
            onSelect={(value) => changeType(value as number)}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Категория" name="idUnit_17_37">
          <Select
            disabled={shownClasses}
            loading={loadingCategoryClasses}
            value={newCategory.idUnit_17?.type || ''}
            key={`${newCategory.idUnit_17?.type}`}
            options={optionsClasses}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Численность работников (персонала)"
          name="numStaff"
          rules={[{ validator: validatorCustom.cannotBeLessThanZero }]}
        >
          <Input
            type="number"
            defaultValue={newCategory.numStaff || ''}
            onChange={(e) => setNewCategory({ ...newCategory, numStaff: (newCategory.numStaff = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Расчетное количество посетителей"
          name="numPerson"
          rules={[{ validator: validatorCustom.cannotBeLessThanZero }]}
        >
          <Input
            type="number"
            defaultValue={newCategory.numPerson || ''}
            onChange={(e) => setNewCategory({ ...newCategory, numPerson: (newCategory.numPerson = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button loading={loading} style={{ marginTop: '10px' }} htmlType="submit" type="primary">
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </div>
  );
};

export default CheklistFireForm;
