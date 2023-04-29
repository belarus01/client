import { IVesomstvo, SSubj } from '@app/domain/interfaces';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { getSubjById } from '@app/api/subjects.api';
import { getVedomstvoById } from '@app/api/vedomstava.api';
import { getPogSubjAutoById } from '@app/api/pogAuto.api';
import PogAutoTransportTable, { ColumnProp } from '../pogTables/PogAutoTransportTable';
import * as P from './PogMapSubj.style';
import { TextArea } from '@app/components/common/inputs/Input/Input';

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

  const printDoc = () => {
    window.print();
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
  interface rw {
    text: string;
    numReg: number;
  }
  const rw: rw[] = [
    { text: 'asdfasdfasdfsd a', numReg: 1 },
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro delectus ipsum, inventore dolorem officia qui exercitationem a soluta at laudantium pariatur tempore distinctio cumque eligendi voluptatem eius eveniet! Animi, ipsa!',
      numReg: 3,
    },
    {
      text: 'lorem  asdfasdfa fads fas f da adf f qwuqwu  whuwheqriu qhruqher qwerqwegrqwegrqweghweg   qw  hqwergqwhegrqw ehqwhjr',
      numReg: 123,
    },
  ];

  const columnsRW: ColumnProp[] = [
    {
      key: '1',
      title: 'text',
      dataIndex: 'text',
    },
    {
      key: '2',
      title: 'numReg',
      dataIndex: 'numReg',
      width: '20%',
    },
  ];
  interface itog {
    text: string;
    numReg: number;
    a: string;
    b: string;
    c: string;
    v: string;
  }
  const itog: itog[] = [
    { text: 'asdfasdfasdfsd a', numReg: 1, a: 'string', b: 'string', c: 'string', v: 'string' },
    {
      text: 'Lorem ipsum dolor, sit amet consecistinctio cumque eligendi voluptatem eius eveniet! Animi, ipsa!',
      numReg: 3,
      a: 'string',
      b: 'string',
      c: 'string',
      v: 'string',
    },
    {
      text: 'lorem  asdfasdfa fads fas f da adf f qwuqwu',
      numReg: 123,
      a: 'string',
      b: 'string',
      c: 'string',
      v: 'string',
    },
  ];

  const columnsItog: ColumnProp[] = [
    {
      key: '1',
      title: 'text',
      dataIndex: 'text',
    },
    {
      key: '2',
      title: 'numReg',
      dataIndex: 'numReg',
      width: '20%',
    },
    {
      key: 'ch',
      title: 'ch',
      children: [
        {
          key: '3',
          title: 'a',
          dataIndex: 'a',
        },
        {
          key: '4',
          title: 'b',
          dataIndex: 'b',
        },
        {
          key: '5',
          title: 'c',
          dataIndex: 'c',
        },
      ],
    },
    {
      key: '6',
      title: 'v',
      dataIndex: 'v',
    },
  ];
  return (
    <>
      <Spin spinning={loading}>
        <P.TitleMap>КАРТА УЧЕТА СУБЪЕКТА ПЕРЕВОЗКИ ОПАСНЫХ ГРУЗОВ</P.TitleMap>
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
          titleNumbered="№ п/п"
        />
        <PogAutoTransportTable data={rw} columns={columnsRW} showHeader={false} title="Железнодорожный транспорт" />
        <PogAutoTransportTable
          data={data}
          columns={columns}
          title="Воздушный транспорт"
          numbered
          titleNumbered="№ п/п"
        />
        <PogAutoTransportTable
          data={data}
          columns={columns}
          title="Внутренний водный транспорт"
          numbered
          titleNumbered="№ п/п"
        />
        <P.Text>Аварии:</P.Text>
        <PogAutoTransportTable data={data} columns={columns} numbered titleNumbered="№ п/п" />
        <P.Text>Инциденты:</P.Text>
        <PogAutoTransportTable data={data} columns={columns} numbered titleNumbered="№ п/п" />
        <P.Text>Информация о проведенных выборочных проверках:</P.Text>
        <PogAutoTransportTable finaly data={itog} columns={columnsItog} numbered titleNumbered="№ п/п" />
        <P.Text>Информация о проведенных внеплановых проверках:</P.Text>
        <PogAutoTransportTable finaly data={itog} columns={columnsItog} numbered titleNumbered="№ п/п" />
        <P.Text>Информация о проведенных мониторингах:</P.Text>
        <PogAutoTransportTable finaly data={itog} columns={columnsItog} numbered titleNumbered="№ п/п" />
        <P.Text>Информация о проведенных мероприятиях технического (технологического, поверочного) характера:</P.Text>
        <PogAutoTransportTable finaly data={itog} columns={columnsItog} numbered titleNumbered="№ п/п" />
        <P.Text>Сведения о проблемных вопросах:</P.Text>
        <TextArea />
        <P.PrintDocButton clickEvent={printDoc} />
      </Spin>
    </>
  );
};

export default PogMapSubj;
