import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { useEffect, useState } from 'react';
import { Select } from '@app/components/common/selects/Select/Select';
import { ISopbCard } from '../sopbTables/SopbCardTable';
import { DatePicker, Space } from 'antd';

import moment from 'moment';
import { useParams } from 'react-router';
import { getSopbById } from './../../../api/sopb.api';

export interface ISopbCardFormProps {
  data?: ISopbCard;
}

const dateFormat = 'YYYY-MM-DD';

export const SopbCardForm: React.FC<ISopbCardFormProps> = ({ data }) => {
  const [card, setCard] = useState<ISopbCard>({
    idCard: null,
    idDeptRequest: null,
    idSopb: null,
    statusDoc: '',
    submit: null,
    uid: null,
    name: '',
    dateTo: new Date().toLocaleDateString().split('.').reverse().join('-'),
    dateFrom: new Date().toLocaleDateString().split('.').reverse().join('-'),
    dateStatus: new Date().toLocaleDateString().split('.').reverse().join('-'),
    numDoc: '',
    ...data,
  });

  const [sopbName, setSopbName] = useState('');

  const { idSopb } = useParams();

  const getSopb = (idSopb: string | undefined) => {
    getSopbById(idSopb).then((result) => {
      setSopbName(result.name);
    });
  };

  useEffect(() => {
    getSopb(idSopb);
  }, []);

  const changeStatusDoc = (value: 1 | null | 0) => {
    setCard({ ...card, statusDoc: value });
  };

  const changeSubmit = (value: 1 | null | 0) => {
    setCard({ ...card, submit: value });
  };

  const changeSolution = (value: 1 | null | 0) => {
    setCard({ ...card, solution: value });
  };
  return (
    <>
      <BaseButtonsForm
        isFieldsChanged={false}
        initialValues={{
          ['dateFrom']: moment(card.dateFrom, dateFormat),
          ['dateTo']: moment(card.dateTo, dateFormat),
          ['dateStatus']: moment(card.dateStatus, dateFormat),
        }}
      >
        <BaseButtonsForm.Item name={'doc'} label="№ документа об оценке соответствия и период его действия:">
          <Space direction="horizontal">
            <BaseButtonsForm.Item name="numdoc">
              <Input
                onChange={(e) => setCard({ ...card, numDoc: e.target.value })}
                placeholder="№ документа"
                defaultValue={card.numDoc}
              />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="dateFrom">
              <DatePicker
                format={dateFormat}
                onChange={(value) => {
                  setCard({ ...card, dateFrom: value?.format(dateFormat) });
                }}
              />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="dateTo">
              <DatePicker
                format={dateFormat}
                onChange={(value) => {
                  setCard({ ...card, dateTo: value?.format(dateFormat) });
                }}
              />
            </BaseButtonsForm.Item>
          </Space>
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'sopbName'}
          label="Наименование продукции в соответствии с перечнем средств обеспечения пожарной безопасности и пожаротушения ТР ЕАЭС 043/2017"
        >
          <Input defaultValue={sopbName} key={sopbName} disabled />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'name'}
          label="Наименование продукции, указанное в документе об оценке соответствия"
        >
          <Input
            defaultValue={card.name}
            onChange={(e) => {
              setCard({ ...card, name: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'mnfData'}
          label="Информация об изготовителе, указанная в документе об оценке соответствия"
        >
          <Input
            defaultValue={card.mnfData}
            onChange={(e) => {
              setCard({ ...card, mnfData: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item name={'statusRate'} label="Статус документа об оценке соответствия, дата сверки статуса	 ">
          <Space direction="horizontal" size="large" style={{ width: '100%' }} align="baseline">
            <BaseButtonsForm.Item name={'statusDoc'} label="оценка соответствия" style={{ minWidth: '200px' }}>
              <Select
                defaultValue={card.statusDoc}
                onChange={(value) => changeStatusDoc(value as 1 | null)}
                options={[
                  { value: 1, label: 'Действующий' },
                  {
                    value: null || 0,
                    label: 'Не действующий',
                  },
                ]}
              />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item name={'dateStatus'} label="дата сверки статуса">
              <DatePicker
                format={dateFormat}
                onChange={(value) => {
                  setCard({ ...card, dateStatus: value?.format(dateFormat) });
                }}
              />
            </BaseButtonsForm.Item>
          </Space>
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'inf'}
          label="Информация о направлении запроса о представлении документов, послуживших основанием для выдачи сертификата, регистрации декларации (подразделение, дата и номер исх.)"
        >
          <TextArea
            defaultValue={card.numRequest}
            onChange={(e) => {
              setCard({ ...card, numRequest: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'submitInfo'}
          label="Сведения о представлении (непредставлении) запрошенных документов"
        >
          <Select
            defaultValue={card.submit}
            onChange={(value) => changeSubmit(value as 1 | null | 0)}
            options={[
              { value: 1, label: 'Предоставлены' },
              {
                value: null || 0,
                label: 'Не предоставлены',
              },
            ]}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'solution'}
          label="Результаты рассмотрения документа об оценке соответствия, а также документов, послуживших основанием для его выдачи (регистрации)"
        >
          <Select
            defaultValue={card.solution}
            onChange={(value) => changeSolution(value as 1 | null | 0)}
            options={[
              { value: 1, label: 'Одобрено' },
              {
                value: null || 0,
                label: 'Неодобренно',
              },
            ]}
          />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'fioStaf'}
          label="ФИО, должность и место работы работника, рассмотревшего документы"
        >
          <Input defaultValue={card.fioStaff} onChange={(e) => setCard({ ...card, fioStaff: e.target.value })} />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name={'fioUid'}
          label="ФИО, должность и место работы работников, вносивших корректировки в настоящие сведения"
        >
          <Input defaultValue={card.uid} onChange={(e) => setCard({ ...card, uid: e.target.value })} />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item name={'comm'} label="Примечание">
          <TextArea defaultValue={card.comm} onChange={(e) => setCard({ ...card, uid: e.target.value })} />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item>
          <Button type="primary">Сохранить</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
