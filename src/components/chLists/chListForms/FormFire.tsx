import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { IFireCardBuild, SUnits } from '@app/domain/interfaces';
import {
  getAllUnitBuildigAndNaruzhCategs,
  getAllUnitBuildingTypes,
  getAllUnitFunctionalClasses,
} from '@app/api/units.api';

export interface FireFormProps {
  data?: IFireCardBuild;
  close?: () => void;
}

const FireForm: React.FC<FireFormProps> = ({ data }) => {
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

  const [loadingFunctionalClasses, setLoadingFunctionalClasses] = useState(false);

  const getFunctionalClasses = () => {
    setLoadingFunctionalClasses(true);
    getAllUnitFunctionalClasses().then((options) => {
      const optionsFiltred = options.map((clas) => ({
        label: clas.type as string,
        value: clas.idUnit as number,
      }));

      setOptionsFunctionalClasses(optionsFiltred);
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

  const submit = () => {
    // post, body newCategory
    console.log('submit');
  };

  const onFinish = (values: unknown) => {
    console.log(values);
    console.log(data);
  };

  useEffect(() => {
    getFunctionalClasses();
    getTipClasses();
    getCategoryClasses();
  }, []);
  return (
    <>
      <BaseButtonsForm
        initialValues={{
          nameBuild: newCategory.nameBuild,
          area: newCategory.area,
          type: newCategory.idUnit_3?.idUnit,
          tip: newCategory.idUnit_2?.idUnit,
          category: newCategory.idUnit_17?.idUnit,
          numStaff: newCategory.numStaff,
          numPerson: newCategory.numPerson,
        }}
        layout="vertical"
        isFieldsChanged={false}
        onFinish={onFinish}
      >
        <BaseButtonsForm.Item label="Наименование сооружения" name="nameBuild">
          <Input
            defaultValue={newCategory.nameBuild || ''}
            onChange={(e) => setNewCategory({ ...newCategory, nameBuild: (newCategory.nameBuild = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Функциональное назначение" name="type">
          <Select
            loading={loadingFunctionalClasses}
            defaultValue={newCategory.idUnit_3?.type || ''}
            options={optionsFunctionalClasses}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Площадь, кв.м" name="area">
          <Input
            type="number"
            defaultValue={newCategory.area || ''}
            onChange={(e) => setNewCategory({ ...newCategory, area: (newCategory.area = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Тип" name="tip">
          <Select
            loading={loadingTipClasses}
            defaultValue={newCategory.idUnit_2?.name || ''}
            options={optionsTipClasses}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Категория" name="category">
          <Select
            disabled
            loading={loadingCategoryClasses}
            defaultValue={newCategory.idUnit_17?.type || ''}
            options={optionsCategorylClasses}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Численность работников (персонала)" name="numStaff">
          <Input
            type="number"
            defaultValue={newCategory.numStaff || ''}
            onChange={(e) => setNewCategory({ ...newCategory, numStaff: (newCategory.numStaff = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Расчетное количество посетителей" name="numPerson">
          <Input
            type="number"
            defaultValue={newCategory.numPerson || ''}
            onChange={(e) => setNewCategory({ ...newCategory, numPerson: (newCategory.numPerson = e.target.value) })}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button style={{ marginTop: '10px' }} htmlType="submit" type="primary">
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};

export default FireForm;
