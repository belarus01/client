import { Panel } from '@app/components/common/Collapse/Collapse';
import { Collapse } from '@app/components/common/Collapse/Collapse.styles';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import TheTable from '@app/components/tables/TheTable';
import React, { useMemo, useState } from 'react';

interface GroopedTablesProps<T, K> {
  objects: T[]; //объекты которые будем группировать
  types: K[]; // типы по которым будем групировать
  keyObj: keyof T; // ключ объекта который ссылкается на тип
  keyType: keyof K; //
  titleType: keyof K; // ключ типа еоторый выведет название группы
  columns: object[]; // колонки для одинаковых таблиц
  loadingProps: boolean; // загрузка таблицы
}
function GroopedTables<T extends object, K extends object>({
  objects,
  types,
  keyObj,
  keyType,
  titleType,
  columns,
  loadingProps,
}: GroopedTablesProps<T, K>) {
  const [loading, setLoading] = useState<boolean>();
  const currentUnits = useMemo(() => {
    setLoading(true);
    const currentTypes = objects.map((item) => item[keyObj]).filter((item) => item);
    const objectsGrooped: { [key: string]: T[] } = {};
    currentTypes.forEach((item) => {
      objectsGrooped[`${item}`] = objects.filter((poo) => item == poo[keyObj]);
    });
    objectsGrooped.unsorted = objects.filter((poo) => poo[keyObj] == null);
    const groops = types.filter((item) => (currentTypes as unknown as K[keyof K][]).includes(item[keyType]));
    setLoading(false);
    return {
      groops,
      objectsGrooped,
    };
  }, [keyObj, keyType, objects, types]);
  return (
    <Spinner spinning={loading}>
      <Collapse defaultActiveKey={['1']}>
        {currentUnits.groops.map((groop) => {
          return (
            <Panel header={groop[titleType]} key={String(groop[keyType])}>
              <TheTable
                pagination={false}
                dataTable={{ data: currentUnits.objectsGrooped[`${groop[keyType]}`], loading: loadingProps }}
                columns={columns}
              />
            </Panel>
          );
        })}
        <Panel header={'Несортированные'} key="unsorted">
          <TheTable
            pagination={false}
            dataTable={{ data: currentUnits.objectsGrooped.unsorted, loading: loadingProps }}
            columns={columns}
          />
        </Panel>
      </Collapse>
    </Spinner>
  );
}

export default GroopedTables;
