import { notificationController } from '@app/controllers/notificationController';
import { ISopbCardSubj, ISopbList, SSubj, SSubjObj } from '@app/domain/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Space } from '@app/components/common/inputs/SearchInput/SearchInput.styles';
import { Button } from '@app/components/common/buttons/Button/Button.styles';
import { Table } from '@app/components/common/Table/Table.styles';
import { getAllSopbCardSubjListsBySopbCardSubjId, getAllSopbCardSubjsBySubjObjId } from '@app/api/sopb.api';

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
  const [dataTabales, setDataTebles] = useState<Record<string, ISopbList[]>>({});

  const [, setSubj] = useState<SSubj>({
    idSubj: null,
    unp: '',
  });
  const { state } = useLocation();
  const navigate = useNavigate();

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
          return cardsSubj;
        })
        .then((cards) => {
          console.log(cards);
          getSubjList(cards).then((lists) => {
            const data: Record<string, ISopbList[]> = {};
            console.log(lists);
            console.log(cards);

            cards.forEach((card) => {
              console.log('card', card);
              console.log(lists);

              const currentArray = lists.find((items) => {
                console.log('item', items);
                console.log(items[0].idSubjSopb == card.idData);

                return items[0].idSubjSopb == card.idData;
              });
              if (currentArray) {
                data[`${card.idData}`] = currentArray;
              }
            });
            setDataTebles(data);
            setLoading(false);
          });
        });
    }
  }, [idObj]);

  useEffect(() => {
    fetch();
  }, [fetch]);
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
                navigate('/common/sopb');
                // console.log(obj.idObj);

                // notificationController.info({
                //   description: 'переход',
                //   message: 'переход в подобъект',
                // });
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
                navigate('/common/sopb');
                // console.log(obj.idObj);

                // notificationController.info({
                //   description: 'переход',
                //   message: 'переход в подобъект',
                // });
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
        scroll={{ x: 800 }}
        expandable={{
          expandedRowRender: (record: unknown) => (
            <>
              <Table
                bordered
                pagination={false}
                dataSource={dataTabales[`${(record as ISopbCardSubj).idData}`]}
                columns={columnsInTable}
              />
            </>
          ),
        }}
        dataSource={cards}
        loading={loading}
      />
    </>
  );
};

export default CurrentObjectSopbSupervision;
