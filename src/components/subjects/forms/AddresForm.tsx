import { getCitiesByRayonId, getObl, getRayonsByOblId, getStreetsByCityId } from '@app/api/ate.api';
import React, { Key, useEffect, useState } from 'react';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

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
  data?: {
    obl?: string;
    rayon?: string;
    reestr?: string;
    street?: string;
  };
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
  data,
}) => {
  const [obl, setObl] = useState<React.ReactNode[]>([]);
  const [rayon, setRayon] = useState<React.ReactNode[]>([]);
  const [city, setCity] = useState<React.ReactNode[]>([]);
  const [street, setStreet] = useState<React.ReactNode[]>([]);
  const [loading, setLoading] = useState(false);

  const setOptions = <T extends object>(
    setState: (value: React.ReactNode[]) => void,
    values: T[],
    key: keyof T,
    name: keyof T,
  ) => {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < values.length; i++) {
      children.push(
        <Option key={values[i][key] as Key} value={values[i][key]}>
          {values[i][name]}
        </Option>,
      );
    }
    setState(children);
  };

  const handleOblSelect = (selected: any) => {
    setLoading(true);
    if (selected == 5) {
      //TODO: доделать
    }
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

  useEffect(() => {
    getObl().then((res) => {
      const childrenObl: React.ReactNode[] = [];
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        childrenObl.push(
          <Option key={res[i].idObl} value={res[i].idObl}>
            {res[i].nameObl}
          </Option>,
        );
      }
      setObl(childrenObl);
      return res;
    });
  }, []);

  const hiddenRayons = !hiddenRayon;
  const hiddenReestrs = hiddenRayons && !hiddenReestr;
  const hiddenStreets = hiddenReestrs && !hiddenStreet;
  return (
    <>
      <BaseButtonsForm.Item label={labelObl || 'Область'} name={nameObl || 'idObl'}>
        <Select onSelect={handleOblSelect} loading={loading} defaultValue={data?.obl || ''}>
          {obl}
        </Select>
      </BaseButtonsForm.Item>
      {hiddenRayons ? (
        <BaseButtonsForm.Item label={labelRayon || 'Район'} name={nameRayon || 'idRayon'}>
          <Select onSelect={handleRayonSelect} loading={loading} defaultValue={data?.rayon || ''}>
            {rayon}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {hiddenReestrs ? (
        <BaseButtonsForm.Item label={labelReestr || 'Город'} name={nameReestr || 'idReestr'}>
          <Select onSelect={handleCitySelect} loading={loading} defaultValue={data?.rayon || ''}>
            {city}
          </Select>
        </BaseButtonsForm.Item>
      ) : null}
      {hiddenStreets ? (
        <BaseButtonsForm.Item label={labelStreet || 'Улица'} name={nameStreet || 'idStreet'}>
          <Select defaultValue={data?.rayon || ''}>{street}</Select>
        </BaseButtonsForm.Item>
      ) : null}
    </>
  );
};

export default AddresForm;

AddresForm.defaultProps = {
  hiddenRayon: false,
  hiddenReestr: false,
  hiddenStreet: false,
};
