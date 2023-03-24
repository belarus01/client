import { Table } from '@app/components/common/Table/Table';
import React, { useCallback, useEffect, useState } from 'react';
import { UserModel } from '../../../domain/UserModel';
import { Pagination, getBasicTableData } from '../../../api/table.api';
import { useMounted } from '@app/hooks/useMounted';
import { useTranslation } from 'react-i18next';
import { TablePaginationConfig } from 'antd';

const initialPagination: Pagination = {
    current: 1,
    pageSize: 15,
};

export const UsersTable: React.FC = () => {
    const [tableData, setTableData] = useState<{ data: UserModel[]; pagination: Pagination; loading: boolean }>({
        data: [],
        pagination: initialPagination,
        loading: false
    });

    const { t } = useTranslation();
    const { isMounted } = useMounted();

    const fetch = useCallback(
        (pagination: Pagination) => {
          setTableData((tableData) => ({ ...tableData, loading: true }));
          getBasicTableData(pagination).then((res) => {
            if (isMounted.current) {
              setTableData({ data: res.data, pagination: res.pagination, loading: false });
            }
          });
        },
        [isMounted],
      );
    
      useEffect(() => {
        fetch(initialPagination);
      }, [fetch]);
    
      const handleTableChange = (pagination: TablePaginationConfig) => {
        fetch(pagination);
      };
    
      const handleDeleteRow = (rowId: number) => {
        setTableData({
          ...tableData,
          data: tableData.data.filter((item) => item.key !== rowId),
          pagination: {
            ...tableData.pagination,
            total: tableData.pagination.total ? tableData.pagination.total - 1 : tableData.pagination.total,
          },
        });
      };

    return (
        <Table

        />
    )
}