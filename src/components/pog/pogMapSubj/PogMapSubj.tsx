import { IVesomstvo, SSubj } from '@app/domain/interfaces';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { getSubjById } from '@app/api/subjects.api';

import BlockMapPogInput from './BlockMapPogInput';
import { getVedomstvoById } from '@app/api/vedomstava.api';
import Text from './Text';
import { InputLine } from './InputLine';
import { getPogSubjAutoById } from '@app/api/pogAuto.api';
import PogAutoTransportTable, { Column } from '../pogTables/PogAutoTransportTable';
import { ColumnsType } from 'antd/lib/table';

interface IAutoTransport {
  idList: number;
  numReg: number;
  regZnak: string | number;
  type: string | number;
}

const PogMapSubj: React.FC = () => {
  const [subj, setSubj] = useState<SSubj>({
    idSubj: null,
    subj: '',
    unp: '',
  });
  const [vedomstvo, setVedomstvo] = useState<IVesomstvo>({
    name: '',
    idVed: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { idSubj } = useParams();
  const { state } = useLocation();

  const getCurrentSubject = (idSubj?: string) => {
    if (idSubj) {
      getSubjById(idSubj).then((result) => {
        console.log(result);
        setSubj(result);
      });
    }
    setLoading(false);
  };

  const getCurrentVedomstvo = (idVed?: string | number | null) => {
    if (idVed) {
      setLoading(true);
      getVedomstvoById(idVed).then((result) => {
        console.log(result);
        setVedomstvo({ ...vedomstvo, ...result });
        setLoading(false);
      });
    }
  };

  const getCurrentPogsByUnp = (idList: string) => {
    getPogSubjAutoById(idList).then((result) => {
      console.log(result);
    });
  };

  useEffect(() => {
    console.log(vedomstvo);
  }, [vedomstvo]);

  useEffect(() => {
    setLoading(true);
    if (!state) {
      getCurrentSubject(idSubj);
    } else {
      setSubj(state);
      setLoading(false);
    }
    getCurrentVedomstvo(1);
    getCurrentPogsByUnp('1');
  }, []);

  //del
  useEffect(() => {
    console.log(subj);
  }, [subj]);

  const data: IAutoTransport[] = [
    { idList: 0, numReg: 1, regZnak: 2, type: 'asdf' },
    { idList: 0, numReg: 1, regZnak: 2, type: 'asdf' },
    { idList: 0, numReg: 1, regZnak: 2, type: 'asdf' },
  ];

  const columns: Column[] = [
    {
      key: '1',
      title: 'idList',
      dataIndex: 'idList',
    },
    {
      key: '2',
      title: 'numReg',
      dataIndex: 'numReg',
    },
    {
      key: '3',
      title: 'regZnak',
      dataIndex: 'regZnak',
    },
    {
      key: '1',
      title: 'asdf',
      dataIndex: 'adsfasd',
    },
  ];
  return (
    <>
      <Spin spinning={loading}>
        <BlockMapPogInput value={subj.subj || ''} readOnly>
          (Полное или сокращенное наименование субъекта перевозки опасных грузов)
        </BlockMapPogInput>
        <BlockMapPogInput value={subj.unp || ''} readOnly>
          (УНП)
        </BlockMapPogInput>
        <BlockMapPogInput value={vedomstvo.name} readOnly>
          (Ведомственная принаджлежнасть)
        </BlockMapPogInput>
        <BlockMapPogInput value={subj.bossName || ''} readOnly>
          (Ф.И.О. руководителя субъекта)
        </BlockMapPogInput>
        <BlockMapPogInput value={`${subj.chiefName} ${subj.chiefTel}`} readOnly>
          (Ф.И.О. и должность лица, ответственного по вопросам безопасности перевозки опасных грузов, номера телефонов)
        </BlockMapPogInput>
        <BlockMapPogInput value={subj.bossName || ''} readOnly>
          (краткое описание деятельности субъекта: перевозчик, грузоотправитель, грузополучатель, изготовитель,
          международные перевозки, республиканские перевозки и т.д.)
        </BlockMapPogInput>
        <Text>
          Количество зарегистрированных механических транспортных средств, прицепов или полуприцепов к ним, используемых
          при перевозке опасных грузов:
        </Text>
        <InputLine />
        <Text>Перечень объектов перевозки:</Text>
        <PogAutoTransportTable data={data} columns={columns} title="lslls" />
      </Spin>
    </>
  );
};

export default PogMapSubj;
