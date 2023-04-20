import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { ChangeEvent, useMemo, useState } from 'react';
import { Select } from '@app/components/common/selects/Select/Select';
import { IPogAuto } from '../pogTables/PogAutoTable';
import moment from 'moment';
import { DatePicker } from 'antd';
import { getObl, getOblById } from '@app/api/ate.api';

export interface ISopbFormProps {
  data?: IPogAuto;
}

export const PogAutoForm: React.FC<ISopbFormProps> = ({ data }) => {
  const [auto, setAuto] = useState<IPogAuto>({
    numGosnadz: null,
  });

  const [idOblSubj, setIdOblSubj] = useState<{ data: any[] | object; loading: boolean }>({
    data: [],
    loading: false,
  });
  const getCurrentObl = (id: string | number) => {
    getOblById(id).then((result) => {
      console.log(result);
      setIdOblSubj({ data: result, loading: false });
    });
  };

  const getAllObl = () => {
    getObl().then((result) => {
      console.log(result);
      setIdOblSubj({ data: result, loading: false });
    });
  };

  const clickSelectObl = () => {
    setIdOblSubj({ ...idOblSubj, loading: true });
    if (auto.idOblSubj) {
      // getCurrentObl(auto.idOblSubj);
      setTimeout(() => {
        setIdOblSubj({
          data: [
            {
              nameObl: 'asdfasdfadf',
            },
            {
              nameObl: 'asdfasdfadf2222222',
            },
          ],
          loading: false,
        });
      }, 1000);
    } else {
      // getAllObl();
      setTimeout(() => {
        setIdOblSubj({
          data: {
            nameObl: 'asdfasdfadf',
          },

          loading: false,
        });
      }, 1000);
    }
  };

  const idOblSubjData = useMemo(
    () => (Array.isArray(idOblSubj.data) ? idOblSubj.data : [idOblSubj.data]),
    [idOblSubj.data],
  );
  const dateFormat = 'YYYY-MM-DD';

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');

  console.log(today);

  return (
    <>
      <BaseButtonsForm
        isFieldsChanged={false}
        initialValues={{
          ['dateRegPoo']: moment(auto.dateRegPoo || today, dateFormat),
        }}
      >
        <BaseButtonsForm.Item label="Регистрационный номер" name="numGosnadz">
          <Input
            defaultValue={auto.numGosnadz || ''}
            onChange={(e) => {
              setAuto({ ...auto, numGosnadz: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Дата регистрации заявления о регистрации транспортного средства" name="dateRegPoo">
          <DatePicker
            format={dateFormat}
            onChange={(value) => {
              setAuto({ ...auto, dateRegPoo: value?.format(dateFormat) });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Номер регистрации заявления о регистрации транспортного средства" name="numRegPoo">
          <Input
            defaultValue={auto.numRegPoo || ''}
            onChange={(e) => {
              setAuto({ ...auto, numRegPoo: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Область местонахождения субъекта" name="idOblSubj">
          <Select
            options={idOblSubjData}
            loading={idOblSubj.loading}
            onClick={clickSelectObl}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Область местонахождения субъекта" name="idOblSubj">
          <Input
            defaultValue={auto.idOblSubj || ''}
            onChange={(e) => {
              setAuto({ ...auto, idOblSubj: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Район местонахождения субъекта" name="idOblSubj">
          <Input
            defaultValue={auto.idRayonSubj || ''}
            onChange={(e) => {
              setAuto({ ...auto, idRayonSubj: e.target.value });
            }}
          />
        </BaseButtonsForm.Item>
        {/* 


    {
      key: '7',
      title: 'Район местонахождения субъекта ',
      dataIndex: 'idRayonSubj',
    },
    {
      key: '8',
      title: 'Город местонахождения субъекта ',
      dataIndex: 'idCitySubj',
    },
    {
      key: '9',
      title: 'Индекс ',
      dataIndex: '',
    },
    {
      key: '10',
      title: 'Улица, № дома (офиса, строения и т.д.) индекс, местонахождения субъекта ',
      dataIndex: 'idStreetSubj',
    },
    {
      key: '11',
      title: 'Контактные данные',
      dataIndex: 'contacts',
    },
    {
      key: '12',
      title: 'Тип транспортного средства',
      dataIndex: 'typeTs',
    },
    {
      key: '12',
      title: 'Тип транспортного средства',
      dataIndex: 'typeTs',
    },
    {
      key: '12',
      title: 'Тип транспортного средства по ДОПОГ',
      dataIndex: 'idTypeDopogTs',
    },
    {
      key: '13',
      title: 'Марка транспортного средства',
      dataIndex: 'brendTs',
    },
    {
      key: '14',
      title: 'Номер шасси транспортного средства',
      dataIndex: 'vinTs',
    },
    {
      key: '15',
      title: 'Заводской номер цистерны',
      dataIndex: 'manufactNumTanc',
    },
    {
      key: '16',
      title: 'Год выпуска транспортного средства',
      dataIndex: 'manufactYearTs',
    },
    {
      key: '17',
      title: 'Год выпуска транспортного средства',
      dataIndex: 'manufactYearTs',
    },
    {
      key: '18',
      title: 'Год изготовления цистерны (если известно)',
      dataIndex: 'manufactYearTanc',
    },
    {
      key: '19',
      title: 'Завод изготовитель транспортного средства',
      dataIndex: 'manufactTs',
    },
    {
      key: '20',
      title: 'Регистрационный знак',
      dataIndex: 'numRegGai',
    },
    {
      key: '21',
      title: 'Регистрационный знак',
      dataIndex: 'numRegGai',
    },
    {
      key: '22',
      title: 'Класс опасного груза',
      dataIndex: 'dangerClass',
    },
    {
      key: '23',
      title: 'Место стоянки',
      dataIndex: 'streetTs',
    },
    {
      key: '24',
      title: 'Место стоянки',
      dataIndex: 'streetTs',
    },
    {
      key: '25',
      title: 'Дата проведенной проверки цистерны',
      dataIndex: 'dateControlTanc',
    },
    {
      key: '26',
      title: 'Вид проведенной проверки цистерны',
      dataIndex: 'typeControlTanc',
    },
    {
      key: '27',
      title: 'Предэксплуатационная проверка',
      dataIndex: 'preExploit',
    },
    {
      key: '28',
      title: 'Объем цистерны',
      dataIndex: 'sizeTanc',
    },
    {
      key: '29',
      title: 'Количество секций',
      dataIndex: 'numSections',
    },
    {
      key: '30',
      title: 'Код цистерны',
      dataIndex: 'tancCode',
    },
    {
      key: '31',
      title: 'Номер, дата официального утверждения типа',
      dataIndex: 'numOk',
    },
    {
      key: '32',
      title: 'Количество и тип устройств безопасности (ДУ или ПК, или ВК)',
      dataIndex: 'numDevice',
    },
    {
      key: '33',
      title: 'Наличие разрывной мембраны (количество)',
      dataIndex: 'numMembr',
    },
    {
      key: '34',
      title: 'Материал цистерны',
      dataIndex: 'material',
    },
    {
      key: '35',
      title: 'Расчетное давление',
      dataIndex: 'pressure',
    },
    {
      key: '36',
      title: 'Наличие теплоизоляции',
      dataIndex: 'flIso',
    },
    {
      key: '37',
      title: 'Наличие солнцезащитных экранов',
      dataIndex: 'flScreen',
    },
    {
      key: '38',
      title: 'Вид крепления волнорезов (сварка/резьбовое)',
      dataIndex: 'binding',
    },
    {
      key: '39',
      title: 'Фамилия, инициалы  государственного инспектора, зарегистрировавшего транспортное средство',
      dataIndex: 'regInspector',
    },
    {
      key: '40',
      title: 'Фамилия, собственное имя, отчество (если таковое имеется) лица, получившего регистрационную карточку',
      dataIndex: 'fioStaff',
    },
    {
      key: '41',
      title: 'Дата и номер регистрации заявления о снятии с учета транспортного средства',
      dataIndex: 'dateUnreg',
    },
    {
      key: '42',
      title: 'Фамилия, инициалы государственного инспектора, снявшего с учета транспортное средство',
      dataIndex: 'unregInspector',
    }, */}
        {/* <BaseButtonsForm.Item label="Наименование СОПБиП" name="name">
          <Input name="name" onChange={(e) => setSopb({ ...sopb, name: e.target.value })} defaultValue={sopb.name} />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item
          label="Оценка соответствия средств обеспечения пожарной безопасности и пожаротушения проводится в форме сертификации"
          name={'conditions'}
        >
          <Input
            name="conditions"
            onChange={(e) => setSopb({ ...sopb, name: e.target.value })}
            defaultValue={sopb.name}
          />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Статус" name={'active'}>
          <Select
            defaultValue={sopb.active || 1}
            onChange={(value) => changeStatus(value as number)}
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
        </BaseButtonsForm.Item> */}
      </BaseButtonsForm>
    </>
  );
};
