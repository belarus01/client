import { generateDoc1 } from '@app/api/doc.api';
import { createDoc, getFormReportMaxIdList } from '@app/api/form.api';
import { getAllRucsAndDolzhnLicas } from '@app/api/groups.api';
import { getSubjById } from '@app/api/subjects.api';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { IEventOrder, IFormReport, UserGroup } from '@app/domain/interfaces';
import { DatePicker, Input } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

interface EventFormCreateDoc1000Props {
  event: IEventOrder;
}

const EventFormCreateDoc1000: React.FC<EventFormCreateDoc1000Props> = ({ event }) => {
  const [boss, setBoss] = useState<{
    label: string;
    value: string | number | null;
  }>({
    label: '',
    value: '',
  });
  const [bosses, setBosses] = useState<UserGroup[]>([]);
  const [bossPost, setBossPost] = useState('');
  const [loadingBosses, setLoadingBosses] = useState<boolean>(false);
  const [unp, setUnp] = useState('');

  const { idEventOrder } = useParams();

  const getUnp = (idSubj: string) => {
    getSubjById(idSubj).then((subj) => setUnp(subj.unp as string));
  };

  const getBoss = (uidBoss: number | string) => {
    const bossCurrent = bosses.find((boss) => {
      return boss.idUserGroup == uidBoss;
    });
    if (bossCurrent) {
      const boss = {
        label: bossCurrent.uidGr2?.fio || '',
        value: bossCurrent.uidGr2?.uid || null,
      };
      setBoss(boss);
      setBossPost(bossCurrent?.uidGr2?.idDeptJob2?.job as string);
    }
  };

  const getAllBoss = () => {
    setLoadingBosses(true);
    getUnp(event.idSubj?.toString() || '');
    getAllRucsAndDolzhnLicas().then((bosses) => {
      console.log(bosses);
      setBosses(bosses);
      setLoadingBosses(false);
    });
  };

  const optionsBosses = useMemo(() => {
    return bosses.map((boss) => ({
      label: boss?.uidGr2?.fio,
      value: boss.idUserGroup,
    }));
  }, [bosses]);

  const changePost = (value: unknown) => {
    console.log(value);
    const currentBoss = bosses.find((boss) => {
      return boss.uidGr2?.uid == value;
    });
    setBossPost(currentBoss?.uidGr2?.idDeptJob2.job as string);
  };

  const onFinishCreateDocUved = (values: IFormReport) => {
    console.log(values);

    if (values.dateDoc) {
      values.dateDoc = new Date(values.dateDoc).toLocaleDateString();
    }
    const field = {
      ...values,
      idForm: 1000,
      idEventOrder: idEventOrder,
      org: 1,
      dateDoc: values.dateDoc,
    };

    console.log(field);

    createDoc(field).then(() => {
      if (idEventOrder) {
        getFormReportMaxIdList(1000, idEventOrder).then(({ idList }) => {
          generateDoc1({
            id_list: idList,
            id_event_order: idEventOrder,
            unp: unp, //'100297103',
          });
        });
      }
    });
  };

  const options = [
    {
      label: 'руки',
      value: 0,
    },
    {
      label: 'почтой',
      value: 1,
    },
  ];

  const flbooks = [
    {
      label: 'не предсвталена',
      value: 0,
    },
    {
      label: 'предсвталена',
      value: 1,
    },
  ];

  useEffect(() => {
    if (event) {
      console.log(event);

      getAllBoss();
      if (event.uidBoss) {
        getBoss(event.uidBoss);
      }
    }
  }, [event]);

  return (
    <Spinner spinning={loadingBosses}>
      <BaseButtonsForm layout="horizontal" onFinish={onFinishCreateDocUved} isFieldsChanged={false}>
        <BaseButtonsForm.Item name="numDoc" label={'Номер документа'} rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="dateDoc" label={'Дата документа'} rules={[{ required: true }]}>
          <DatePicker />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="addrRecord" label={'Место составления документа'} rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="uidBoss" label={'ФИО'}>
          <Select options={optionsBosses} onChange={changePost} value={boss} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label={'Должжность'}>
          <Input value={bossPost} disabled readOnly />
        </BaseButtonsForm.Item>
        {/* <BaseButtonsForm.Item name={'nameAegent'} label={'ФИО'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'PostAegent'} label={'Должжность'}>
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name={'telAegent'} label={'Телефон'}>
          <Input />
        </BaseButtonsForm.Item> */}

        {/* <BaseButtonsForm.Item name="comm" label={'Замечания'}>
          <TextArea />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="otherInfo" label={'Комментарий инспектора'}>
          <TextArea />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="receiver" label={'Вручено'} rules={[{ required: true }]}>
          <Input />
        </BaseButtonsForm.Item> */}
        {/* <BaseButtonsForm.Item name="flRec" label={'Передача'} rules={[{ required: true }]}>
          <Select options={options} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="flBook" label={'Представлена книга учета'} rules={[{ required: true }]}>
          <Select options={flbooks} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          name="numBook"
          label={'Номер записи в книге учета проверок у субъекта'}
          rules={[{ required: true }]}
        >
          <Input />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          name="dateBook"
          label={'Дата записи в книге учета проверок у субъекта'}
          rules={[{ required: true }]}
        >
          <DatePicker />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item name="dateRec" label={'Дата вручения'} rules={[{ required: true }]}>
          <DatePicker />
        </BaseButtonsForm.Item> */}

        <BaseButtonsForm.Item>
          <Button htmlType="submit" type="primary">
            Создать документ в формате Word
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </Spinner>
  );
};

export default EventFormCreateDoc1000;
