import TheTable from '@app/components/tables/TheTable';
import React, { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal as Alert } from 'antd';
import FireForm from '../chListForms/FormFire';
import { getAllFireCardBuildsBySubjId } from '@app/api/fire.api';
import { IFireCardBuild, SUnits } from '@app/domain/interfaces';

interface FireTableProps {
  data: { data: IFireCardBuild[]; loading: boolean };
  update: () => void;
}

const FireTable: React.FC<FireTableProps> = ({ data, update }) => {
  const [openAddingForm, setOpenAddingForm] = useState(false);
  const [openEddingForm, setOpenEddingForm] = useState(false);
  const [selected, setSelected] = useState<IFireCardBuild>({
    nameBuild: null,
    idSubjObj: null,
    idUnit_3: { idUnit: null },
    idList: null,
  });
  const [search, setSearch] = useState('');

  const toggleModalAdding = (isOpen = true) => {
    setOpenAddingForm(isOpen);
  };

  const toggleModalEdding = (isOpen = true) => {
    setOpenEddingForm(isOpen);
  };

  const deleteCategory = (category: IFireCardBuild) => {
    // const newData = tableData.data.filter((item) => item.idList !== category.idList);
    // setTableData({ ...tableData, data: newData });
  };

  const toggleModal = () => {
    setOpenAddingForm(false);
    setOpenEddingForm(false);
    update();
  };

  const columns = [
    {
      key: 1,
      title: 'Наименование сооружения',
      dataIndex: 'nameBuild',
    },
    {
      key: 2,
      title: ' Функциональное назначение',
      dataIndex: 'type',
      render: (_: unknown, { idUnit_3 }: { idUnit_3: SUnits }) => <span>{idUnit_3.type}</span>,
    },
    {
      key: 3,
      title: 'Площадь, кв.м',
      dataIndex: 'area',
    },
    {
      key: 4,
      title: 'Действия',
      align: 'center',
      render: (itemSelected: IFireCardBuild) => {
        function onDeleteDep() {
          Alert.confirm({
            title: 'Вы действительно хотите удалить?',
            okText: 'Удалить',
            cancelText: 'Отмена',
            closable: true,
            onCancel: () => false,
            onOk: () => {
              deleteCategory(itemSelected);
            },
          });
        }

        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelected(itemSelected);
                toggleModalEdding(true);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteDep();
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <TheTable
        // onRow={onRow}
        search={search}
        FormComponent={(props) => <FireForm data={props.data} close={toggleModal} />}
        //searchFunc={searchCategories}
        selected={selected}
        //setSearchFunc={searchFunc}
        dataTable={data}
        columns={columns}
        titleMoadlEditing={'Редактирование'}
        titleModalAdding={'Создание'}
        toggleModalAdding={toggleModalAdding}
        toggleModalEditing={toggleModalEdding}
        openAddingForm={openAddingForm}
        openEditingForm={openEddingForm}
      />
    </>
  );
};

export default FireTable;
