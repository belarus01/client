import { IVesomstvo, SSubj } from '@app/domain/interfaces';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Spin } from 'antd';
import { getSubjById } from '@app/api/subjects.api';
import { getVedomstvoById } from '@app/api/vedomstava.api';
import { getPogSubjAutoById } from '@app/api/pogAuto.api';
import PogAutoTransportTable, { ColumnProp } from '../pogTables/PogAutoTransportTable';
import * as P from './PogMapSubj.style';

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

  const getCurrentSubject = (idSubj?: string) => {
    setLoading(true);
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
    getCurrentSubject(idSubj);
    getCurrentVedomstvo(1);
    getCurrentPogsByUnp('1');
  }, []);

  //del
  useEffect(() => {
    console.log(subj);
  }, [subj]);

  const data: IAutoTransport[] = [
    { idList: 0, numReg: 1, regZnak: 123, type: 'ert' },
    { idList: 1, numReg: 3, regZnak: 4123, type: 'wettw' },
    { idList: 2, numReg: 123, regZnak: 54345, type: 'sfdgsf' },
  ];

  const columns: ColumnProp[] = [
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
      key: '4',
      title: 'asdf',
      dataIndex: 'adsfasd',
    },
  ];
  return (
    <>
      <Spin spinning={loading}>
        <P.HeadDoc />
        <P.BlockMapPogInput value={subj.subj || ''} readOnly>
          (Полное или сокращенное наименование субъекта перевозки опасных грузов)
        </P.BlockMapPogInput>
        <P.BlockMapPogInput value={subj.unp || ''} readOnly>
          (УНП)
        </P.BlockMapPogInput>
        <P.BlockMapPogInput value={vedomstvo.name} readOnly>
          (Ведомственная принаджлежнасть)
        </P.BlockMapPogInput>
        <P.BlockMapPogInput value={subj.bossName || ''} readOnly>
          (Ф.И.О. руководителя субъекта)
        </P.BlockMapPogInput>
        <P.BlockMapPogInput value={`${subj.chiefName} ${subj.chiefTel}`} readOnly>
          (Ф.И.О. и должность лица, ответственного по вопросам безопасности перевозки опасных грузов, номера телефонов)
        </P.BlockMapPogInput>
        <P.BlockMapPogInput value={subj.bossName || ''} readOnly>
          (краткое описание деятельности субъекта: перевозчик, грузоотправитель, грузополучатель, изготовитель,
          международные перевозки, республиканские перевозки и т.д.)
        </P.BlockMapPogInput>
        <P.Text>
          Количество зарегистрированных механических транспортных средств, прицепов или полуприцепов к ним, используемых
          при перевозке опасных грузов:
        </P.Text>
        <P.InputLine />
        <P.Text>Перечень объектов перевозки:</P.Text>
        <PogAutoTransportTable
          data={data}
          columns={columns}
          title="Автомобильный транспорт"
          numbered
          titleNumbered="№ п.п"
        />
      </Spin>
    </>
  );
};

export default PogMapSubj;
