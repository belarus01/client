import { getCitiesByRayonId, getObl, getRayonsByOblId, getStreetsByCityId } from '@app/api/ate.api';
import React, { Key, ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
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

  // const resetField = (fieldName: string) => {
  //   formInstance.setFieldValue(fieldName, '');
  // };

  const handleOblSelect = (selected: any) => {
    setLoading(true);
    if (selected == 5) {
      setOblRayon(true);
      handleRayonSelect(selected);
      return;
    }
    setOblRayon(false);
    // resetField(nameRayon || '');
    // resetField(nameReestr || '');
    // resetField(nameStreet || '');
    getRayonsByOblId(selected).then((res) => {
      setOptions(setRayon, res, 'idRayon', 'nameRayon');
      setLoading(false);
    });
  };

  const handleRayonSelect = (selected: any) => {
    setLoading(true);
    // resetField(nameReestr || '');
    // resetField(nameStreet || '');
    getCitiesByRayonId(selected).then((res) => {
      setOptions(setCity, res, 'idReestr', 'nameReestr');
      setLoading(false);
    });
  };

  const handleCitySelect = (selected: any) => {
    setLoading(true);
    // resetField(nameStreet || '');
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

  const setAdrrObl = useCallback(() => {
    const oblInstans = formInstance.getFieldValue(nameObl || '');
    const obj = obl.find((oblCurrnet) => {
      return oblCurrnet?.props?.value == oblInstans;
    });
    const oblStr = obj?.props?.children;
    const str = `${oblStr} область, `;
    formInstance.setFieldValue(nameAddr || '', str);
  }, [formInstance, nameAddr, nameObl, obl]);

  const setAdrrRayon = useCallback(() => {
    const rayonInstans = formInstance.getFieldValue(nameRayon || '');
    const obj = rayon.find((rayonCurrnet) => {
      return rayonCurrnet?.props?.value == rayonInstans;
    });
    const rayonStr = obj?.props?.children || '';
    const str = rayonStr == '' ? '' : `${rayonStr} район, `;
    const currentStr = formInstance.getFieldValue(nameAddr || '');
    formInstance.setFieldValue(nameAddr || '', currentStr + str);
  }, [formInstance, nameAddr, nameRayon, rayon]);

  const setAdrrReestr = useCallback(() => {
    const reestrInstans = formInstance.getFieldValue(nameReestr || '');
    const obj = city.find((reestrCurrnet) => {
      return reestrCurrnet?.props?.value == reestrInstans;
    });
    const reestrStr = obj?.props?.children || '';
    const str = reestrStr == '' ? '' : `город ${reestrStr}, `;
    const currentStr = formInstance.getFieldValue(nameAddr || '');
    formInstance.setFieldValue(nameAddr || '', currentStr + str);
  }, [city, formInstance, nameAddr, nameReestr]);

  const setAdrrStreet = useCallback(
    (streetInstans) => {
      //const streetInstans = formInstance.getFieldValue(nameStreet || '');
      const obj = street.find((StreetCurrnet) => {
        return StreetCurrnet?.props?.value == streetInstans;
      });
      const streetStr = obj?.props?.children || '';
      const str = streetStr == '' ? '' : `${streetStr} улица `;
      const currentStr = formInstance.getFieldValue(nameAddr || '');
      formInstance.setFieldValue(nameAddr || '', currentStr + str);
    },
    [formInstance, nameAddr, street],
  );
  const setNumBuild = useCallback(() => {
    //const streetInstans = formInstance.getFieldValue(nameStreet || '');

    const numbuildStr = formInstance.getFieldValue(nameNumBuild || '');
    const str = numbuildStr == '' && numbuildStr ? '' : `дом №${numbuildStr}, `;
    const currentStr = formInstance.getFieldValue(nameAddr || '');
    const newStr = currentStr
      ?.split(',')
      .filter((item: string) => {
        if (item.includes('дом')) {
          return false;
        }
        return true;
      })
      .join(',');
    formInstance.setFieldValue(nameAddr || '', newStr + str);
  }, [formInstance, nameAddr, nameNumBuild]);

  useEffect(() => {
    setAdrrObl();
    setAdrrRayon();
    setAdrrReestr();
    // setAdrrStreet();
  }, [
    formInstance,
    nameAddr,
    nameObl,
    obl,
    rayon,
    city,
    street,
    setAdrrRayon,
    setAdrrStreet,
    setAdrrObl,
    setAdrrReestr,
  ]);

  const hiddenRayons = !hiddenRayon;
  const hiddenReestrs = hiddenRayons && !hiddenReestr;
  const hiddenStreets = hiddenReestrs && !hiddenStreet;
  return (
    <>
      <BaseButtonsForm.Item label={labelObl} name={nameObl}>
        <Select onSelect={handleOblSelect} loading={loading} disabled={loading}>
          {obl}
        </Select>
      </BaseButtonsForm.Item>
      {!oblRayon && hiddenRayons ? (
        <BaseButtonsForm.Item label={labelRayon} name={nameRayon}>
          <Select onSelect={handleRayonSelect} loading={loading} disabled={loading}>
            {rayon}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {hiddenReestrs ? (
        <BaseButtonsForm.Item label={labelReestr} name={nameReestr}>
          <Select onSelect={handleCitySelect} loading={loading} disabled={loading}>
            {city}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {hiddenStreets ? (
        <BaseButtonsForm.Item label={labelStreet} name={nameStreet}>
          <Select onSelect={setAdrrStreet} disabled={loading}>
            {street}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {!hiddenAddr ? (
        <>
          <BaseButtonsForm.Item label={labelNumBuild} name={nameNumBuild}>
            <Input onBeforeInput={setNumBuild} />
          </BaseButtonsForm.Item>
          <BaseButtonsForm.Item label={labelNumOffice} name={nameNumOffice}>
            <Input />
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
