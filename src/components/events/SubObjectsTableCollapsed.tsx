import { getAllObjectsBySubjectId, getSubjObjSpecifByIdSubjObj } from '@app/api/objects.api';
import { notificationController } from '@app/controllers/notificationController';
import { SSubjObj, SSubjObjSpecif } from '@app/domain/interfaces';
import { useMounted } from '@app/hooks/useMounted';
import React, { useCallback, useEffect, useState } from 'react';
import { Table } from '../common/Table/Table';
import { Collapse, TableColumnsType } from 'antd';
import { Panel } from '../common/Collapse/Collapse';
import { TableRowSelection } from 'antd/lib/table/interface';

interface ExpandedDataType {
  key: React.Key;
}

export const SubObjectTableCollapsed: React.FC = () => {
  const [objects, setObjects] = useState<SSubjObj[]>([]);
  const [objSpecif, setObjSpecif] = useState<SSubjObjSpecif[]>([]);
  const [objSpecifMap, setObjSpecifMap] = useState<Map<number, SSubjObjSpecif[]>>(new Map());
  const [selectedSpecif, setSelectedSpecif] = useState<number[]>([]);
  const [selectedObj, setSelectedObj] = useState<number[]>([]);
  const { isMounted } = useMounted();

  const columns = [
    {
      key: '1',
      title: 'УНП',
      dataIndex: 'unp',
    },
    {
      key: '2',
      title: 'Наименование объекта',
      dataIndex: 'nameObj',
    },
    {
      key: '3',
      title: 'Место нахождения объекта',
      dataIndex: 'addrObj',
    },
    {
      key: '4',
      title: 'Место осуществления деятельности',
      dataIndex: 'addrDescr',
    },
    {
      key: '5',
      title: 'Ответственное лицо',
      dataIndex: 'fioFireman',
    },
  ];
  const fetch1 = useCallback(
    (idObj: number) => {
      getSubjObjSpecifByIdSubjObj(idObj).then((res) => {
        if (isMounted.current) {
          console.log(res);
          setObjSpecifMap((map) => new Map(objSpecifMap?.set(idObj, res)));
        }
      });
    },
    [isMounted],
  );

  const fetch = useCallback(() => {
    getAllObjectsBySubjectId(1460)
      .then((res) => {
        if (isMounted.current) {
          setObjects(res);
        }
      })
      .catch((e) => notificationController.error({ message: 'Произошла ошибка при загрузке данных' }));
  }, [isMounted]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const rowSelection: TableRowSelection<SSubjObj> = {
    selectedRowKeys: selectedObj,
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        setSelectedObj((current) => [...current, record.idObj]);
      } else {
        setSelectedObj((prevState) => prevState.filter((prevItem) => prevItem !== record.idObj));
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //setSelectedObj(current=>[...current, record.idObj]);
    },
  };

  const rowSelectionSpecif: TableRowSelection<SSubjObjSpecif> = {
    selectedRowKeys: selectedSpecif,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        setSelectedSpecif((current) => [...current, record.idSpecif]);
      } else {
        setSelectedObj((prevState) => prevState.filter((prevItem) => prevItem !== record.idSpecif));
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
      if (selected) {
        setSelectedSpecif((prev) => [...prev, ...selectedRows.map((element) => element.idSpecif)]);
      } else {
        setSelectedObj((prevState) => prevState.filter((prevItem) => prevItem !== selectedRows[0].idSubjObj));
      }
    },
  };

  const onExpandRowSpecif = (expendable: boolean, record: any) => {
    if (!objSpecifMap.has(record.idObj)) {
      fetch1(record.idObj);
    }
  };

  const expandedRowRender = (record: any) => {
    const data1: SSubjObjSpecif[] = [];
    const data2: SSubjObjSpecif[] = [];
    const data3: SSubjObjSpecif[] = [];
    const columns = [
      {
        key: '1',
        title: 'Наименование сооружения',
        dataIndex: 'nameBuild',
      },
      {
        key: '2',
        title: 'Площадь',
        dataIndex: 'area',
      },
      {
        key: '3',
        title: 'Дата регистрации',
        dataIndex: 'dateReg',
      },
      {
        key: '4',
        title: 'ФИО представителя',
        dataIndex: 'nameAgent',
      },
      {
        key: '5',
        title: 'Телефон представителя',
        dataIndex: 'telAgent',
      },
    ];
    console.log(objSpecifMap);
    objSpecifMap.get(record.idObj)?.forEach((element) => {
      if (element.idUnit_41 == 4000) data1.push(element);
      else if (element.idUnit_41 == 4001) data2.push(element);
      else if (element.idUnit_41 == 4003) data3.push(element);
    });
    console.log(data1);
    return (
      <Collapse>
        <Panel header="Здания" key="1">
          <Table
            dataSource={data1}
            columns={columns}
            rowSelection={{ ...rowSelectionSpecif }}
            rowKey={(record) => record.idSpecif}
          ></Table>
        </Panel>
        <Panel header="Сооружения" key="2">
          <Table
            dataSource={data2}
            columns={columns}
            rowSelection={{ ...rowSelectionSpecif }}
            rowKey={(record) => record.idSpecif}
          ></Table>
        </Panel>
        <Panel header="Наружные установки" key="3">
          <Table
            dataSource={data3}
            columns={columns}
            rowSelection={{ ...rowSelectionSpecif }}
            rowKey={(record) => record.idSpecif}
          ></Table>
        </Panel>
      </Collapse>
    );
  };

  return (
    <>
      <Table
        rowKey={(record) => record.idObj}
        columns={columns}
        expandable={{
          expandedRowRender,
          onExpand(expanded, record) {
            onExpandRowSpecif(expanded, record);
          },
        }}
        dataSource={objects}
        rowSelection={{ ...rowSelection }}
      />
    </>
  );
};
