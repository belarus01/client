import { getObjById } from '@app/api/objects.api';
import { getAllUnits } from '@app/api/units.api';
import { Panel } from '@app/components/common/Collapse/Collapse';
import { Collapse } from '@app/components/common/Collapse/Collapse.styles';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IPogAuto, PogAutoTable } from '@app/components/pog/pogTables/PogAutoTable';
import { IUnits, SSubj, SSubjObj } from '@app/domain/interfaces';
import { getAllPogSubjAutosBySubjObjId } from '@app/api/pogAuto.api';

const CurrentObjectSupervisionPog: React.FC = () => {
  // const user = useAppSelector((state) => state.user.user);
  // need add user from store after auth

  const [, setObj] = useState<SSubjObj>({
    idObj: null,
    idSubj: null,
    unp: null,
    org: null,
  });

  const [units, setUnits] = useState<IUnits[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [autos, setAutos] = useState<IPogAuto[]>([]);

  const [, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: '',
  });
  const { state } = useLocation();

  useEffect(() => {
    setSubj(state);
  }, [state]);

  const { idObj } = useParams<{ idObj?: string }>();
  console.log(idObj);
  // 130 id obj
  const fetch = useCallback(() => {
    setLoading(true);
    if (idObj) {
      const promiseObj: Promise<SSubjObj> = getObjById(5);
      const promiseAuto: Promise<IPogAuto[]> = getAllPogSubjAutosBySubjObjId(5);
      // const promiseRw: Promise<IPooSubjPb[]> = getRwsbyObjId(5);
      // const promiseAvia: Promise<IPooSubjPb[]> = getAviasbyObjId(5);
      // const promiseWater: Promise<IUnits[]> = getWaterbyObjId(5);
      const promiseUnits: Promise<IUnits[]> = getAllUnits();
      Promise.all([promiseObj, promiseAuto, promiseUnits]).then((res) => {
        console.log(res);
        setObj(res[0]);
        setAutos(res[1]);
        setUnits(res[2]);
        setLoading(false);
      });
    }
  }, [idObj]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const unitsMemo = useMemo(() => {
    return units.filter(
      (unit) => unit.idUnit == 2611 || unit.idUnit == 2613 || unit.idUnit == 2615 || unit.idUnit == 2617,
    );
  }, [units]);

  return (
    <>
      <Spinner spinning={loading}>
        <Collapse defaultActiveKey={['1']}>
          {unitsMemo.map((unit) => (
            <Panel header={unit.name} key={String(unit.idUnit)}>
              <PogAutoTable data={autos} />
            </Panel>
          ))}
        </Collapse>
      </Spinner>
    </>
  );
};

export default CurrentObjectSupervisionPog;
