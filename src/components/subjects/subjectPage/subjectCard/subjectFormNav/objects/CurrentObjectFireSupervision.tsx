import { getAllFireCardBuildsBySubjObjId } from '@app/api/fire.api';
import { getAllObjSpecifs, getAllObjectsBySubjectId, getObjById } from '@app/api/objects.api';
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
    {
      key: '1',
      title: 'Основные технические характеристики ПОО',
      dataIndex: 'specificPoo',
    },
    {
      key: '2',
      title: 'Наименование организации – изготовителя ПОО',
      dataIndex: 'manufactName',
    },
    {
      key: '3',
      title: 'Расположение ПОО/ Адрес ПОО',
      dataIndex: 'addrPoo',
    },
    {
      key: '4',
      title: 'Наименование владельца ПОО, адрес, номер телефона',
      dataIndex: 'nameAddrOvnerPoo',
    },
    {
      key: '5',
      title: 'Тип (марка) ПОО',
      dataIndex: 'typePoo',
    },
    {
      key: '4',
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
                  description: 'safas',
                  message: 'asdfasdfadsfasdfasdf',
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

  // const currentUnits = useMemo(() => {
  //   setLoading(true);
  //   const currentTypes = pooSubjPbs.map((item) => item.idUnit_8).filter((item) => item);
  //   const pooSubjPbsGrooped: { [key: string]: IPooSubjPb[] } = {};
  //   currentTypes.forEach((item) => {
  //     pooSubjPbsGrooped[`${item}`] = pooSubjPbs.filter((poo) => item == poo.idUnit_8);
  //   });
  //   pooSubjPbsGrooped.unsorted = pooSubjPbs.filter((poo) => poo.idUnit_8 == null);
  //   const groops = units.filter((item) => currentTypes.includes(item.idUnit));
  //   setLoading(false);
  //   return {
  //     groops,
  //     pooSubjPbsGrooped,
  //   };
  // }, [pooSubjPbs, units]);

  return (
    <>
      <GroopedTables
        objects={cardBuild}
        types={specif}
        keyObj={'idUnit_8'}
        keyType={'idUnit'}
        titleType={'name'}
        columns={columns}
        loadingProps={loading}
      />
    </>
  );
};

export default CurrentObjectFireSupervision;
