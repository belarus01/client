import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { useEffect, useMemo, useState } from 'react';
import { Select } from '@app/components/common/selects/Select/Select';
import { ISopbCard } from '../sopbTables/SopbCardTable';
import { Col, DatePicker, Row, Space } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';

export interface ISopbCardFormProps {
  data?: ISopbCard;
}

// dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

// const dateFormat = 'DD-MM-YYYY';
const dateFormat = 'YYYY-MM-DD';

interface ISopbCardForm extends ISopbCard {
  dateFrom: string;
  dateTo: string;
  numDoc: string;
}

export const SopbCardForm: React.FC<ISopbCardFormProps> = ({ data }) => {
  const [card, setCard] = useState<ISopbCardForm>({
    idCard: null,
    idDeptRequest: null,
    idSopb: null,
    statusDoc: '',
    submit: null,
    uid: null,
    name: '',
    dateTo: '',
    dateFrom: '',
    numDoc: '',
    ...data,
  });
  const [dataPick, setDataPick] = useState([]);
  console.log(card.dateTo, dayjs);

  useEffect(() => {
    console.log(dataPick);
    if (dataPick.length == 2 && dataPick[1]) {
      console.log(
        dataPick[0]._d.toLocaleDateString().split('.').join('-'),
        dataPick[1]._d.toLocaleDateString().split('.').join('-'),
      );
    }
  }, [dataPick]);

  const changeStatus = (value: 1 | 0) => {
    setCard({ ...card, active: value });
  };

  const setDates = (val: RangeValue<moment.Moment>, info: string[]) => {
    if (info.length == 2) {
      setCard({ ...card, dateFrom: info[0], dateTo: info[1] });
    }
  };

  console.log(data);

  const defaultDateRange = [new Date('2015-06-06'), new Date('2015-06-06')];
  const defaultDayjsRange = defaultDateRange.map((date) => dayjs(date));

  const dateCurrent = useMemo(() => {
    const currentDate = [card.dateFrom, card.dateTo];
    const res = currentDate.map((date) => {
      if (date) {
        return date.split('.').reverse().join('-');
      }
      return new Date().toLocaleDateString().split('.').reverse().join('-');
    });
    console.log(res);
    return res;
  }, [card]);
  return (
    <>
      <BaseButtonsForm isFieldsChanged={false}>
        <BaseButtonsForm.Item name={'doc'} label="№ документа об оценке соответствия и период его действия:">
          <Space direction="horizontal">
            <BaseButtonsForm.Item name="numdoc">
              <Input
                name="numdoc"
                onChange={(e) => setCard({ ...card, numdoc: e.target.value })}
                placeholder="№ документа"
                defaultValue={card.numDoc}
              />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="dateTo">
              <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item name="numdoc">
              <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
            </BaseButtonsForm.Item>
          </Space>
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item label="Наименование СОПБиП" name="name">
          <Input name="name" onChange={(e) => setCard({ ...card, name: e.target.value })} defaultValue={card.name} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Оценка соответствия средств обеспечения пожарной безопасности и пожаротушения проводится в форме сертификации"
          name={'conditions'}
        >
          <Input
            name="conditions"
            onChange={(e) => setCard({ ...card, name: e.target.value })}
            defaultValue={card.name}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Статус" name={'active'}>
          <Select
            defaultValue={card.active || 1}
            onChange={(value) => changeStatus(value as 1 | 0)}
            options={[
              { value: 1, label: 'активно' },
              {
                value: 0,
                label: 'удалено',
              },
            ]}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button type="primary">Сохранить</Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
