import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import React, { useMemo } from 'react';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import * as S from '../eventCard.styles';
import { H4 } from '@app/components/common/typography/H4/H4';
import { useState } from 'preact/hooks';
import { List } from 'antd';

// interface Field {
//   name?: string;
//   value: string;
// }

// interface Step4Props {
//   formValues: Field[];
// }
interface eventCount {
  name: string;
  count: number;
}
interface cardResult {
  name: string;
  count: number;
  names1?: eventCount[],
  names2?: eventCount[],

}

export const Step4: React.FC<any> = ({ data }) => {
  // const [res1, setRes1] = useState<cardResult>({name:'11111', count:12});

  // const items_col = useMemo(() => {
  //   if (data) {
  //     return data.result13.filter((item: { num: string; }) => item.num != null)
  //   }
  //   return []
  // }, [data]);
  //console.log(items_col);

  const items_col = useMemo(() => {
    if (data) {
      const col = data.result13.filter((item: { num: number; }) => item.num != null)
      return col.reduce((acc: number, item: { num: string }) => {
        return acc + Number(item.num)
      }, 0)
    }
    return []
  }, [data]);

  const items_vidi = useMemo(() => {
    return data.result13
  }, [data]);

  const items_np_meropri = useMemo(() => {
    return data.result15
  }, [data]);

  const items_sfer_control = useMemo(() => {
    return data.result16
  }, [data]);

  const items_adm_prin = useMemo(() => {
    return data.result17
  }, [data]);

  const items_adm_pres = useMemo(() => {
    return data.result18
  }, [data]);

  return (
    //<S.Details key="4">
    <S.FormContent>

      <BaseButtonsForm.Item
        label={'Количество надзорно-профилактических мероприятий (всего и по каждому виду в отдельности)'}
      >
        <BaseButtonsForm.Item
          label={'Всего'}
          name="kol_meropri_vsego"
        //hasFeedback
        //rules={[{ required: true, message: 'Введите количество надзорно-профилактических мероприятий ' }]}
        >
          <Input style={{ width: "100px", textAlign: "center" }} defaultValue={items_col} key={items_col} />

        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name="vidi_meropri"
          label={'Виды мероприятий'}
        //rules={[{ required: true, message: 'Введите виды мероприятий' }]}
        >
          {data ? <List
            bordered
            dataSource={items_vidi}
            renderItem={(item: { name: string; num: string }) => (

              <List.Item>
                {[item.name, "  -  ", item.num]}
              </List.Item>
            )}
          /> : <p></p>
          }
        </BaseButtonsForm.Item>

      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_viyavlenih_narush"
        label={'Количество выявленных нарушений'}
      //rules={[{ required: true, message: 'Введите количество выявленных нарушений' }]}
      >
        <Input style={{ width: "100px", textAlign: "center" }} />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        //name="kol_np_mer_po_vidam"
        label={'Количество надзорно-профилактических мероприятий по видам итогового документа по их результатам'}
      //rules={[{ required: true, message: 'Введите количество надзорно-профилактических мероприятий по видам итогового документа по их результатам' }]}
      >
        <BaseButtonsForm.Item
          name="kol_np_mer_po_vidam"
        //rules={[{ required: true, message: 'Введите виды мероприятий' }]}
        >
          {data ? <List
            bordered
            dataSource={items_np_meropri}
            renderItem={(item: { vid_doc: string; sum_exit_docs: string; sum_events: string; }) => (

              <List.Item>
                {[item.vid_doc, "  -  ", item.sum_exit_docs, "  -  ", item.sum_events]}
              </List.Item>
            )}
          /> : <p></p>
          }
        </BaseButtonsForm.Item>

      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_np_meropri"
        label={'Количество надзорно-профилактических мероприятий по сферам контроля (надзора)'}
      //rules={[{ required: true, message: 'Введите количество надзорно-профилактических мероприятий по сферам контроля' }]}
      >
        {data ? <List
          bordered
          dataSource={items_sfer_control}
          renderItem={(item: { name: string; ss: string }) => (

            <List.Item>
              {[item.name, "  -  ", item.ss]}
            </List.Item>
          )}
        /> : <p></p>
        }
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_i_vid_mer_prin"
        label={'Количество и вид принятых мер административного принуждения'}
      // rules={[{ required: true, message: 'Введите количество и вид принятых мер административного принуждения' }]}
      >
        {data ? <List
          bordered
          dataSource={items_adm_prin}
          renderItem={(item: { adm_force: string }) => (

            <List.Item>
              {[item.adm_force]}
            </List.Item>
          )}
        /> : <p></p>
        }
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_i_vid_mer_presech"
        label={'Количество и вид принятых мер административного пресечения'}
      // rules={[{ required: true, message: 'Введите количество и вид принятых мер административного пресечения' }]}
      >
        {data ? <List
          bordered
          dataSource={items_adm_pres}
          renderItem={(item: { adm_ban: string }) => (

            <List.Item>
              {[item.adm_ban]}
            </List.Item>
          )}
        /> : <p></p>
        }
      </BaseButtonsForm.Item>

    </S.FormContent>

    //</S.Details>
  );
};




// import React, { useEffect, useState, useCallback } from 'react';
// import { Col, Row, Space, TablePaginationConfig } from 'antd';
// import { BasicTableRow, getBasicTableData, Pagination, Tag } from 'api/table.api';
// import { Table } from 'components/common/Table/Table';
// import { ColumnsType } from 'antd/es/table';
// import { Button } from 'components/common/buttons/Button/Button';
// import { useTranslation } from 'react-i18next';
// import { defineColorByPriority } from '@app/utils/utils';
// import { notificationController } from 'controllers/notificationController';
// import { Status } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentHistory/Status/Status';
// import { useMounted } from '@app/hooks/useMounted';

// const initialPagination: Pagination = {
//   current: 1,
//   pageSize: 1,
// };

// export const Step4: React.FC = () => {
//   const [tableData, setTableData] = useState<{ data: BasicTableRow[]; pagination: Pagination; loading: boolean }>({
//     data: [],
//     pagination: initialPagination,
//     loading: false,
//   });
//   const { t } = useTranslation();
//   const { isMounted } = useMounted();

//   const fetch = useCallback(
//     (pagination: Pagination) => {
//       setTableData((tableData) => ({ ...tableData, loading: true }));
//       getBasicTableData(pagination).then((res) => {
//         if (isMounted.current) {
//           setTableData({ data: res.data, pagination: res.pagination, loading: false });
//         }
//       });
//     },
//     [isMounted],
//   );

//   useEffect(() => {
//     fetch(initialPagination);
//   }, [fetch]);

//   const handleTableChange = (pagination: TablePaginationConfig) => {
//     fetch(pagination);
//   };

//   // const handleDeleteRow = (rowId: number) => {
//   //   setTableData({
//   //     ...tableData,
//   //     data: tableData.data.filter((item) => item.key !== rowId),
//   //     pagination: {
//   //       ...tableData.pagination,
//   //       total: tableData.pagination.total ? tableData.pagination.total - 1 : tableData.pagination.total,
//   //     },
//   //   });
//   // };

//   const columns: ColumnsType<BasicTableRow> = [
//     {
//       title: 'Количество надзорно-профилактических мероприятий',
//       dataIndex: 'name',
//       render: (text: string) => <span>{text}</span>,
//       //filterMode: 'tree',
//       //filterSearch: true,
//       // filters: [
//       //   {
//       //     text: t('common.firstName'),
//       //     value: 'firstName',
//       //     children: [
//       //       {
//       //         text: 'Joe',
//       //         value: 'Joe',
//       //       },
//       //       {
//       //         text: 'Pavel',
//       //         value: 'Pavel',
//       //       },
//       //       {
//       //         text: 'Jim',
//       //         value: 'Jim',
//       //       },
//       //       {
//       //         text: 'Josh',
//       //         value: 'Josh',
//       //       },
//       //     ],
//       //   },
//       //   {
//       //     text: t('common.lastName'),
//       //     value: 'lastName',
//       //     children: [
//       //       {
//       //         text: 'Green',
//       //         value: 'Green',
//       //       },
//       //       {
//       //         text: 'Black',
//       //         value: 'Black',
//       //       },
//       //       {
//       //         text: 'Brown',
//       //         value: 'Brown',
//       //       },
//       //     ],
//       //   },
//       // ],
//       onFilter: (value: string | number | boolean, record: BasicTableRow) => record.name.includes(value.toString()),
//     },
//     {
//       title: 'Количество выявленных нарушений',
//       dataIndex: 'age',
//       // sorter: (a: BasicTableRow, b: BasicTableRow) => a.age - b.age,
//       // showSorterTooltip: false,
//     },
//     {
//       title: 'Количество надзорно-профилактических мероприятий по видам итогового документа по их результатам',
//       dataIndex: 'address',
//     },
//     {
//       title: 'Количество надзорно-профилактических мероприятий по сферам контроля (надзора)',
//       dataIndex: 'col',
//     },
//     {
//       title: 'Меры административного принужения',
//       dataIndex: 'meri_prin',
//     },
//     {
//       title: 'Меры административного пресечения',
//       dataIndex: 'meri_pres',
//     },

//     // {
//     //   title: t('common.tags'),
//     //   key: 'tags',
//     //   dataIndex: 'tags',
//     //   render: (tags: Tag[]) => (
//     //     <Row gutter={[10, 10]}>
//     //       {tags.map((tag: Tag) => {
//     //         return (
//     //           <Col key={tag.value}>
//     //             <Status color={defineColorByPriority(tag.priority)} text={tag.value.toUpperCase()} />
//     //           </Col>
//     //         );
//     //       })}
//     //     </Row>
//     //   ),
//     // },
//     // {
//     //   title: t('tables.actions'),
//     //   dataIndex: 'actions',
//     //   width: '15%',
//     //   render: (text: string, record: { name: string; key: number }) => {
//     //     return (
//     //       <Space>
//     //         <Button
//     //           type="ghost"
//     //           onClick={() => {
//     //             notificationController.info({ message: t('tables.inviteMessage', { name: record.name }) });
//     //           }}
//     //         >
//     //           {t('tables.invite')}
//     //         </Button>
//     //         {/* <Button type="default" danger onClick={() => handleDeleteRow(record.key)}>
//     //           {t('tables.delete')}
//     //         </Button> */}
//     //       </Space>
//     //     );
//     //   },
//     // },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={tableData.data}
//       pagination={tableData.pagination}
//       loading={tableData.loading}
//       onChange={handleTableChange}
//       scroll={{ x: 800 }}
//       bordered
//     />
//   );
// };
