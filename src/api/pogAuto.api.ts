import { IPogAuto } from '@app/components/pog/pogTables/PogAutoTable';
import { httpApi } from './http.api';

// export const getPogAuto = () => httpApi.get<IPogAuto[]>('').then(({ data }) => data);

const generateAuto = () => {
  const numbers = Math.random() * 10;
  const autos = [];
  for (let i = 0; i <= numbers; i++) {
    autos.push({
      idLlist: 1,
      idDept: 2,
      idDeptDom: 3,
      idObl: 4,
      idSubjObj: 5,
      idNumRe: 6,
      numReg: 2,
      numGosnadz: 3,
      numOrder: 2345,
      dateRegPoo: 234,
      numRegPoo: 3,
      unp: 3,
      nameAddrOvnerPoo: 'string',
      idOblSubj: 1234,
      idRayonSubj: 1234,
      idCitySubj: 3234,
      idStreetSubj: 1235,
      numBuild: 1245,
      contacts: 125,
      idTypeTs: 2345,
      typeTs: 457,
      idTypeDopogTs: 67,
      typeDopogTs: 78,
      brendTs: 234,
      modelTs: 2365,
      vinTs: 2365,
      manufactNumTanc: 1234,
      manufactYearTs: 3245,
      manufactYearTanc: 22345,
      manufactTs: 23,
      numRegGai: 1245,
      idDangerClass: 4325345,
      dangerClass: 2542345,
      idStreetTs: 'number | string | null',
      streetTs: 'number | string | null',
      numBuildTs: 'number | string | null',
      dateControlTanc: 'number | string | null',
      idTypeControlTanc: 'number | null',
      typeControlTanc: 'number | string | null',
      preExploit: 'number | string | null',
      sizeTanc: 'number | string | null',
      numSections: 'number | string | null',
      tancCode: 'number | string | null',
      numOk: 'number | string | null',
      dateOk: 'number | string | null',
      docOk: 'number | string | null',
      dateDocOk: 'number | string | null',
      numDevice: 'number | string | null',
      numMembr: 'number | string | null',
      material: 'number | string | null',
      pressure: 'number | string | null',
      flIso: 'number | string | null',
      flScreen: 'number | string | null',
      binding: 'number | string | null',
      regInspector: 'number | string | null',
      fioStaff: 'number | string | null',
      dateUnreg: 'number | string | null',
      numUnreg: 'number | string | null',
      whyUnreg: 'number | string | null',
      unregInspector: 'number | string | null',
      org: 'number | string | null',
      dateRecord: 'number | string | null',
      active: 'number | string | null',
      uid: 'number | string | null',
    });
  }
  return autos;
};

export const getPogAuto = (): any[] => {
  return new Promise((resolve): unknown[] => {
    setTimeout(() => {
      resolve(generateAuto());
    }, 500);
  });
};
