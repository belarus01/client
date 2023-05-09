import { getAllFireCardBuildsBySubjObjId } from '@app/api/fire.api';
import { getAllObjSpecifs, getObjById } from '@app/api/objects.api';
import { notificationController } from '@app/controllers/notificationController';
import { IFireCardBuild, ISubjObjSpecif, SSubj, SSubjObj } from '@app/domain/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import GroopedTables from './GroopedTables';
import { Space } from '@app/components/common/inputs/SearchInput/SearchInput.styles';
import { Button } from '@app/components/common/buttons/Button/Button.styles';

const CurrentObjectFireSupervision: React.FC = () => {
  const [user, setUser] = useState({
    org: 0,
  });

  const [, setObj] = useState<SSubjObj>({
    idObj: null,
    idSubj: null,
    unp: null,
    org: null,
  });

  const [specif, setSpecif] = useState<ISubjObjSpecif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cardBuild, setCardBuild] = useState<IFireCardBuild[]>([]);

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
      const promiseObj: Promise<SSubjObj> = getObjById(133);
      const promiseBuilds: Promise<IFireCardBuild[]> = getAllFireCardBuildsBySubjObjId(133);
      const promiseSpecifs: Promise<ISubjObjSpecif[]> = getAllObjSpecifs();
      Promise.all([promiseObj, promiseBuilds, promiseSpecifs]).then((res) => {
        console.log(res);
        setObj(res[0]);
        setCardBuild(res[1]);
        setSpecif(res[2]);
        setLoading(false);
      });
    }
  }, [idObj]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const columns = [
    // id_unit_6 bigint UNSIGNED DEFAULT NULL COMMENT 'Класс функциональной пожарной опасности doc.s_units.type_unit=6  type',
    // idUnit_17_37 bigint UNSIGNED DEFAULT NULL COMMENT 'Категория здания (наружной установки)  по взрывопожарной, пожарной опасности doc.s_units.type_unit=17,37  type',
    // idUnit_21 bigint UNSIGNED DEFAULT NULL COMMENT 'степень огнестойкости зданий',
    // area_6 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории Б',
    // areaB2 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории В2',
    // areaB3 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории В3',
    // areaB4 decimal(10, 3) DEFAULT 0.000 COMMENT 'Площадь помещений, м2 категории В4',
    // active tinyint UNSIGNED NOT NULL DEFAULT 1 COMMENT '0-удалено, 1-актино',
    // uid int UNSIGNED DEFAULT NULL COMMENT 'Пользователь, внесший изменения',
    {
      key: '1',
      title: 'Наименование отдельного объекта',
      dataIndex: 'nameBuild',
    },
    {
      key: '2',
      title: 'Адрес',
      dataIndex: 'addr',
    },
    {
      key: '3',
      title: 'Колич.работников',
      dataIndex: 'numStaff',
    },
    {
      key: '4',
      title: 'Максимальное количество единовременно находящихся  людей (чел.)',
      dataIndex: 'numPerson',
    },
    {
      key: '5',
      title: 'Этажность, степень огнестойкости',
      dataIndex: 'levelBuild',
    },
    {
      key: '6',
      title: 'Общий строительный объем, м3',
      dataIndex: 'space',
    },
    {
      key: '7',
      title: 'Поэтажная площадь, м2',
      dataIndex: 'area',
    },
    {
      key: '8',
      title: 'Площадь помещений, м2 категории А',
      dataIndex: 'areaA',
    },
    {
      key: '9',
      title: 'Площадь помещений, м2 категории В1',
      dataIndex: 'areaB1',
    },
    {
      key: '10',
      title: 'доп.инфо',
      dataIndex: 'info',
    },
    {
      key: '11',
      title: 'Дата составления (изменения)',
      dataIndex: 'dateRecord',
    },
    {
      key: '12',
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
      <GroopedTables
        objects={cardBuild}
        types={specif}
        keyObj={'idUnit_6'}
        keyType={'idUnit_6'}
        titleType={'nameBuild'}
        columns={columns}
        loadingProps={loading}
      />
    </>
  );
};

export default CurrentObjectFireSupervision;
