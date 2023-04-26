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

  const getCurrentPogsByUnp = (id) => {
    getPogSubjAutoById(id).then((result) => {
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
    getCurrentPogsByUnp(1);
  }, []);

  //del
  useEffect(() => {
    console.log(subj);
  }, [subj]);

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
      </Spin>
    </>
  );
};

export default PogMapSubj;
