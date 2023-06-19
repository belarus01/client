import { getCitiesByRayonId, getObl, getRayonsByOblId, getStreetsByCityId } from '@app/api/ate.api';
import React, { Key, ReactElement, useCallback, useEffect, useState } from 'react';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { FormInstance } from 'antd';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';

interface AddresFormProps {
  labelObl?: string;
  nameObl?: string;
  labelRayon?: string;
  nameRayon?: string;
  labelReestr?: string;
  nameReestr?: string;
  labelStreet?: string;
  nameStreet?: string;
  hiddenRayon?: boolean;
  hiddenReestr?: boolean;
  hiddenStreet?: boolean;
  labelAdrr?: string;
  nameAddr?: string;
  hiddenAddr?: boolean;
  labelNumBuild?: string;
  labelNumOffice?: string;
  nameNumBuild?: string;
  nameNumOffice?: string;
  formInstance: FormInstance;
}

const AddresForm: React.FC<AddresFormProps> = ({
  labelObl,
  nameObl,
  labelRayon,
  nameRayon,
  labelReestr,
  nameReestr,
  labelStreet,
  nameStreet,
  hiddenRayon,
  hiddenReestr,
  hiddenStreet,
  formInstance,
  labelAdrr,
  nameAddr,
  hiddenAddr,
  labelNumBuild,
  labelNumOffice,
  nameNumBuild,
  nameNumOffice,
}) => {
  const [obl, setObl] = useState<ReactElement[]>([]);
  const [rayon, setRayon] = useState<ReactElement[]>([]);
  const [city, setCity] = useState<ReactElement[]>([]);
  const [street, setStreet] = useState<ReactElement[]>([]);
  const [loading, setLoading] = useState(false);
  const [oblRayon, setOblRayon] = useState(false);

  const setOptions = <T extends object>(
    setState: (value: ReactElement[]) => void,
    values: T[],
    key: keyof T,
    name: keyof T,
  ) => {
    const children: ReactElement[] = [];
    for (let i = 0; i < values.length; i++) {
      children.push(
        <Option key={values[i][key] as Key} value={values[i][key]}>
          {values[i][name]}
        </Option>,
      );
    }
    setState(children);
  };

  const resetField = (fieldName: string) => {
    formInstance.setFieldValue(fieldName, '');
  };

  const handleOblSelect = (selected: any) => {
    setLoading(true);
    if (selected == 5) {
      setOblRayon(true);
      handleRayonSelect(selected);
      return;
    }
    setOblRayon(false);
    getRayonsByOblId(selected).then((res) => {
      setOptions(setRayon, res, 'idRayon', 'nameRayon');
      setLoading(false);
    });
  };

  const handleRayonSelect = (selected: any) => {
    setLoading(true);
    getCitiesByRayonId(selected).then((res) => {
      setOptions(setCity, res, 'idReestr', 'nameReestr');
      setLoading(false);
    });
  };

  const handleCitySelect = (selected: any) => {
    setLoading(true);

    getStreetsByCityId(selected).then((res) => {
      setOptions(setStreet, res, 'idStreet', 'nameRus');
      setLoading(false);
    });
  };

  const getInitialValues = () => {
    if (nameObl) {
      if (formInstance.getFieldValue(nameObl)) {
        handleOblSelect(formInstance.getFieldValue(nameObl));
      }
    }
    if (nameRayon) {
      if (formInstance.getFieldValue(nameRayon)) {
        handleRayonSelect(formInstance.getFieldValue(nameRayon));
      }
    }
    if (nameReestr) {
      if (formInstance.getFieldValue(nameReestr)) {
        handleCitySelect(formInstance.getFieldValue(nameReestr));
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getObl().then((res) => {
      const childrenObl: ReactElement[] = [];
      for (let i = 0; i < res.length; i++) {
        childrenObl.push(
          <Option key={res[i].idObl} value={res[i].idObl}>
            {res[i].nameObl}
          </Option>,
        );
      }
      setObl(childrenObl);
      getInitialValues();
      setLoading(false);
      return res;
    });
  }, []);

  const setAddr = (nameField: string, fields: ReactElement[], index: number, callback: (string: string) => string) => {
    const instans = formInstance.getFieldValue(nameField || '');
    const obj = fields.find((current) => {
      return current?.props?.value == instans;
    });
    const strInstance = obj?.props?.children;
    const str = callback(strInstance);
    const currentStr = formInstance.getFieldValue(nameAddr || '');
    const arrayCurrentStr = currentStr ? currentStr.split(', ') : [];
    arrayCurrentStr.length = index + 1;
    arrayCurrentStr.splice(index, 1, str);
    formInstance.setFieldValue(nameAddr || '', arrayCurrentStr.join(', '));
  };

  const setNum = useCallback(
    (event, value, index) => {
      const numbuildStr = event.target.value;
      const str = numbuildStr == '' && numbuildStr ? '' : `${value}${numbuildStr}`;
      const currentStr = formInstance.getFieldValue(nameAddr || '').split(', ');
      currentStr.length = index + 1;
      currentStr.splice(index, 1, str);
      const newStr = currentStr.join(', ');
      formInstance.setFieldValue(nameAddr || '', newStr);
    },
    [formInstance, nameAddr],
  );

  const hiddenRayons = !hiddenRayon;
  const hiddenReestrs = hiddenRayons && !hiddenReestr;
  const hiddenStreets = hiddenReestrs && !hiddenStreet;
  return (
    <>
      <BaseButtonsForm.Item label={labelObl} name={nameObl}>
        <Select
          getPopupContainer={(trigger) => trigger}
          onSelect={handleOblSelect}
          onChange={() => {
            resetField(nameRayon || '');
            resetField(nameReestr || '');
            resetField(nameStreet || '');
            resetField(nameNumBuild || '');
            resetField(nameNumOffice || '');
            setAddr(nameObl || '', obl, 0, (str) => `${str} область`);
          }}
          loading={loading}
          disabled={loading}
        >
          {obl}
        </Select>
      </BaseButtonsForm.Item>
      {!oblRayon && hiddenRayons ? (
        <BaseButtonsForm.Item label={labelRayon} name={nameRayon}>
          <Select
            getPopupContainer={(trigger) => trigger}
            onSelect={handleRayonSelect}
            onChange={() => {
              resetField(nameReestr || '');
              resetField(nameStreet || '');
              resetField(nameNumBuild || '');
              resetField(nameNumOffice || '');
              setAddr(nameRayon || '', rayon, 1, (str) => `${str} район`);
            }}
            loading={loading}
            disabled={loading}
          >
            {rayon}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {hiddenReestrs ? (
        <BaseButtonsForm.Item label={labelReestr} name={nameReestr}>
          <Select
            getPopupContainer={(trigger) => trigger}
            onSelect={handleCitySelect}
            onChange={() => {
              resetField(nameStreet || '');
              resetField(nameNumBuild || '');
              resetField(nameNumOffice || '');
              setAddr(nameReestr || '', city, 2, (str) => `город ${str}`);
            }}
            loading={loading}
            disabled={loading}
          >
            {city}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {hiddenStreets ? (
        <BaseButtonsForm.Item label={labelStreet} name={nameStreet}>
          <Select
            getPopupContainer={(trigger) => trigger}
            onChange={() => {
              resetField(nameNumBuild || '');
              resetField(nameNumOffice || '');
            }}
            onSelect={() => setAddr(nameStreet || '', street, 3, (str) => `улица ${str}`)}
            disabled={loading}
          >
            {street}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {!hiddenAddr ? (
        <>
          <BaseButtonsForm.Item label={labelNumBuild} name={nameNumBuild}>
            <Input onChange={(e) => setNum(e, 'дом №', street.length == 0 ? 3 : 4)} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label={labelNumOffice} name={nameNumOffice}>
            <Input onChange={(e) => setNum(e, 'помещение №', street.length == 0 ? 4 : 5)} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label={labelAdrr} name={nameAddr}>
            <TextArea />
          </BaseButtonsForm.Item>
        </>
      ) : null}
    </>
  );
};

export default AddresForm;

AddresForm.defaultProps = {
  hiddenRayon: false,
  hiddenReestr: false,
  hiddenStreet: false,
  labelObl: 'Область',
  nameObl: 'idObl',
  labelRayon: 'Район',
  nameRayon: 'idRayon',
  labelReestr: 'Город',
  nameReestr: 'idReestr',
  labelStreet: 'Улица',
  nameStreet: 'idStreet',
  labelAdrr: 'Место нахождения oбъекта проверяемого субъекта (промышленной безопасности)',
  nameAddr: 'addrObj',
  hiddenAddr: false,
  labelNumBuild: 'Номер дома, номер корпуса',
  labelNumOffice: 'Номер помещения',
  nameNumBuild: 'numBuild',
  nameNumOffice: 'numOffice',
};
