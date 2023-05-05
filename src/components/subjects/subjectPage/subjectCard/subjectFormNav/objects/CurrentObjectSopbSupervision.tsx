import { getAllFireCardBuildsBySubjObjId } from '@app/api/fire.api';
import { getAllObjSpecifs, getAllObjectsBySubjectId, getObjById } from '@app/api/objects.api';
import { notificationController } from '@app/controllers/notificationController';
import { IFireCardBuild, ISopbCardSubj, ISopbList, ISubjObjSpecif, SSubj, SSubjObj } from '@app/domain/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import GroopedTables from './GroopedTables';
import { Space } from '@app/components/common/inputs/SearchInput/SearchInput.styles';
import { Button } from '@app/components/common/buttons/Button/Button.styles';
import { Table } from '@app/components/common/Table/Table.styles';
import { ISopbCard } from '@app/components/sopbap/sopbTables/SopbCardTable';
import {
  getAllSopbCardSubjLists,
  getAllSopbCardSubjListsBySopbCardSubjId,
  getAllSopbCardSubjsBySubjObjId,
} from '@app/api/sopb.api';

const CurrentObjectSopbSupervision: React.FC = () => {
  const [user, setUser] = useState({
    org: 0,
  });

  const [, setObj] = useState<SSubjObj>({
    idObj: null,
    idSubj: null,
    unp: null,
    org: null,
  });

  const [lists, setList] = useState<ISopbList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<ISopbCardSubj[]>([]);

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

  const getSubjList = (cardsSubj: ISopbCardSubj[]) => {
    const promises = [];
    for (let i = 0; i < cardsSubj.length; i++) {
      console.log('iddata', cardsSubj[i].idData);

      const promise = getAllSopbCardSubjListsBySopbCardSubjId(cardsSubj[i].idData);
      promises.push(promise);
    }
    return Promise.all(promises);
  };

  const fetch = useCallback(() => {
    setLoading(true);
    if (idObj) {
      getAllSopbCardSubjsBySubjObjId(248)
        .then((cardsSubj) => {
          console.log('getAllSopbCardSubjsBySubjObjId', cardsSubj);
          setCards(cardsSubj);
        })
        .then(() => {
          console.log(cards);
          getSubjList(cards).then((lists) => {
            const data = {};
            console.log(lists);
            console.log(cards);

            cards.forEach((card) => {
              console.log('card', card);
              console.log(lists);

              const currentArray = lists.find((items) => {
                console.log('item', items);

                return items[0].idSubjSopb == card.idSubjObj;
              });
              data[`${card.idSubjObj}`] = currentArray;
            });
            console.log(data);
          });
        });
      // const promiseBuilds: Promise<IFireCardBuild[]> = getAllSopbCardSubjListsBySopbCardSubjId();
      // const promiseSpecifs: Promise<ISubjObjSpecif[]> = Promise.all([promiseObj, promiseBuilds, promiseSpecifs]).then(
      //   (res) => {
      //     console.log(res);
      //     setObj(res[0]);
      //     setCardBuild(res[1]);
      //     setSpecif(res[2]);
      //     setLoading(false);
      //   },
      // );
    }
  }, [idObj]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const dataInTable = [
    {
      idList: 125,
      idSubjObj: 2,
      idCard: 1,
      name: 'VG1',
      brend: 'YAMAHA',
      model: '12',
      flMnfExp: 1,
      flDocumMade: 1,
      flDocumNlich: '33/PK',
      numDocu: '29.03.2021',
    },
    {
      idList: 125,
      idSubjObj: 2,
      idCard: 1,
      name: 'VG1',
      brend: 'YAMAHA',
      model: '12',
      flMnfExp: 1,
      flDocumMade: 1,
      flDocumNlich: '33/PK',
      numDocu: '29.03.2021',
    },
    {
      idList: 125,
      idSubjObj: 2,
      idCard: 1,
      name: 'VG1',
      brend: 'YAMAHA',
      model: '12',
      flMnfExp: 1,
      flDocumMade: 1,
      flDocumNlich: '33/PK',
      numDocu: '29.03.2021',
    },
  ];
  const data = [
    // id_data bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    // id_subj bigint UNSIGNED NOT NULL,
    // id_subj_obj bigint DEFAULT NULL COMMENT 'Если это поле NULL, то объектов нет и все относится к субъекту (УНП)',
    // fl_proizv tinyint UNSIGNED DEFAULT NULL COMMENT '1.6 Осуществл.виды деят. в отношении СОПБ.Производство 1-да,0-нет',
    // fl_rozn tinyint UNSIGNED DEFAULT NULL COMMENT '1.6 Осуществл.виды деят. в отношении СОПБ.Розничная торговля 1-да,0-нет',
    // fl_opt tinyint UNSIGNED DEFAULT NULL COMMENT '1.6 Осуществл.виды деят. в отношении СОПБ.Оптовая торговля 1-да,0-нет',
    // date_record datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата изменения записи',
    // uid int UNSIGNED DEFAULT NULL COMMENT 'Ид.пользователя, внесшего изменения',
    // active tinyint UNSIGNED NOT NULL DEFAULT 1 COMMENT '1-активная запись,2 - удалено',
    // name_agent varchar(255) DEFAULT NULL COMMENT 'ФИО представителя (от субъекта)',
    // job_agent varchar(255) DEFAULT NULL COMMENT 'Должность представителя суъекта',
    // tel_agent varchar(55) DEFAULT NULL COMMENT 'Телефон представителя субъекта',
    // addr_agent va
    {
      idData: 2,
      idSubj: 1460,
      idSubjObj: 247,
      flProisv: 1,
      flRozn: 1,
      flOpt: 1,
      dateRecord: '28.03.2023',
      uid: '0:00:00',
      active: null,
      nameAgent: 1,
      jobAgent: null,
      telAgent: null,
      addrAgent: null,
    },
    {
      idData: 2,
      idSubj: 1460,
      idSubjObj: 247,
      flProisv: 1,
      flRozn: 1,
      flOpt: 1,
      dateRecord: '28.03.2023',
      uid: '0:00:00',
      active: null,
      nameAgent: 1,
      jobAgent: null,
      telAgent: null,
      addrAgent: null,
    },
  ];
  const columns = [
    {
      key: '1',
      title: ' Осуществл.виды деят. в отношении СОПБ. Производство',
      dataIndex: 'flProisv',
      render: (item: null | 0 | 1) => <span>{item == 0 ? '-' : 'да'}</span>,
    },
    {
      key: '2',
      title: 'Осуществл.виды деят. в отношении СОПБ. Розничная торговля',
      dataIndex: 'flRozn',
      render: (item: null | 0 | 1) => <span>{item == 0 ? '-' : 'да'}</span>,
    },
    {
      key: '3',
      title: 'Осуществл.виды деят. в отношении СОПБ. Оптовая торговля',
      dataIndex: 'flOpt',
      render: (item: null | 0 | 1) => <span>{item == 0 ? '-' : 'да'}</span>,
    },
    {
      key: '4',
      title: 'Дата изменения записи',
      dataIndex: 'dateRecord',
    },
    {
      key: '5',
      title: 'Ид.пользователя, внесшего изменения',
      dataIndex: 'uid',
    },
    {
      key: '6',
      title: 'ФИО представителя (от субъекта)',
      dataIndex: 'nameAgent',
    },
    {
      key: '7',
      title: 'Должность представителя суъекта',
      dataIndex: 'jobAgent',
    },
    {
      key: '8',
      title: 'Телефон представителя субъекта',
      dataIndex: 'telAgent',
    },
    {
      key: '9',
      title: 'Адрес службы/ответственного',
      dataIndex: 'addrAgent',
    },
    {
      key: '10',
      title: 'Действия',
      width: '15%',
      render: (obj: SSubjObj) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                //navigate('/subject', {state:subj})
                // navigate(obj.idObj);
                console.log(obj.idObj);

                notificationController.info({
                  description: 'переход',
                  message: 'переход в подобъект',
                });
              }}
            >
              Открыть
            </Button>
          </Space>
        );
      },
    },
  ];
  const columnsInTable = [
    // id_unit_6 bigint UNSIGNED DEFAULT NULL COMMENT 'Класс функциональной пожарной опасности doc.s_units.type_unit=6  type',
    // idUnit_17_37 bigint UNSIGNED DEFAULT NULL COMMENT 'Категория здания (наружной установки)  по взрывопожарной, пожарной опасности doc.s_units.type_unit=17,37  type',
    // idUnit_21 bigint UNSIGNED DEFAULT NULL COMMENT 'степень огнестойкости зданий',
    // area_6 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории Б',
    // areaB2 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории В2',
    // areaB3 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории В3',
    // areaB4 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории В4',
    // active tinyint UNSIGNED NOT NULL DEFAULT 1 COMMENT '0-удалено, 1-актино',
    // uid int UNSIGNED DEFAULT NULL COMMENT 'Пользователь, внесший изменения',
    // поля которые я не включил
    {
      key: '1',
      title: 'Наименование продукции, указанное в документе об оценке соответствия',
      dataIndex: 'name',
    },
    {
      key: '2',
      title: 'Марка СОПБиП',
      dataIndex: 'brend',
    },
    {
      key: '3',
      title: 'Модель СОПБиП',
      dataIndex: 'model',
    },
    {
      key: '4',
      title: '1-производитель(1.10),0 - импортер',
      dataIndex: 'flMnfExp',
    },
    {
      key: '5',
      title: 'Наличие документов об оценке соответствия требова для изготавл.',
      dataIndex: 'flDocumMade',
    },
    {
      key: '6',
      title: 'Наличие товаропроизводительных документов, обеспечивающих прослеживание реализуемых СОПБ',
      dataIndex: 'flDocumNlich',
    },
    {
      key: '7',
      title: 'Наличие документов об оценке соответствия требова для реализуемых СОПБ',
      dataIndex: 'flDocumSale',
    },
    {
      key: '8',
      title: 'Дата изменения записи',
      dataIndex: 'dateRecord',
    },
    {
      key: '9',
      title: 'Действия',
      width: '15%',
      render: (obj: SSubjObj) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                //navigate('/subject', {state:subj})
                // navigate(obj.idObj);
                console.log(obj.idObj);

                notificationController.info({
                  description: 'переход',
                  message: 'переход в подобъект',
                });
              }}
            >
              Открыть
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <Table bordered pagination={false} dataSource={dataInTable} columns={columnsInTable} />
          ),
        }}
        dataSource={data}
      />
    </>
  );
};

export default CurrentObjectSopbSupervision;
