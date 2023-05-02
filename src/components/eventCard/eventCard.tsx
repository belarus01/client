import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Step1 } from './Steps/1';
import { Step2 } from './Steps/2';
import { Step3 } from './Steps/3';
import { Step4 } from './Steps/4';
import { notificationController } from '@app/controllers/notificationController';
import { mergeBy } from '@app/utils/utils';
import * as S from './eventCard.styles';
import { getFirst } from '@app/api/eventCard.api';
import { useMounted } from '@app/hooks/useMounted';



interface FormValues {
  [key: string]: string | undefined;
}

interface FieldData {
  name: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

export const EventCard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = BaseForm.useForm();
  const [data1, setData] = useState<any>();
  const [fields, setFields] = useState<FieldData[]>([

    // { name: 'confirmPassword', value: '123456' },
    // { name: 'salutation', value: 'mr' },
    // { name: 'gender', value: 'male' },
    // { name: 'firstName', value: 'John' },
    // { name: 'lastName', value: 'Black' },
    // { name: 'birthday', value: Dates.getDate(1576789200000) },
    // { name: 'phone', value: '298573124' },
    // { name: 'email', value: '' },
    // { name: 'address1', value: 'Slobodskay street' },
    // { name: 'address2', value: 'Nevski street' },
    // { name: 'zipCode', value: '435123' },
    // { name: 'city', value: 'Minsk' },
    // { name: 'country', value: 'Belarus' },
    // { name: 'prefix', value: '+7' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { isMounted } = useMounted();
  const { t } = useTranslation();



  useEffect(() => {
    getFirst().then((data) => {
      if (isMounted.current) {
        console.log(data);
        setData(data);
        setFields([
          { name: 'group', value: data['result1'][0].subj },
          { name: 'unp', value: data['result1'][0].unp },
          //{ name: 'date', value: data['result1'][0].date_reg_unp },
          { name: 'prin', value: data['result1'][0].ved },
          { name: 'ur_adress', value: data['result1'][0].addr_yur },
          { name: 'fak_adress', value: data['result1'][0].addr_fact },
          { name: 'fio', value: data['result1'][0].boss_name },
          { name: 'dolgnost', value: data['result1'][0].staff_boss },
          { name: 'sfera', value: data['result1'][0].name_oked },
          { name: 'col_zdani', value: data['result2'][0].num_zdan },
          { name: 'name_zdani', value: data['result2'][0].name_build },
          { name: 'col_sooryg', value: data['result2'][1].num_zdan },
          { name: 'name_sooryg', value: data['result2'][1].name_build },
          { name: 'name_nadz', value: data['result3'][0].departament },
          { name: 'unp_nadz', value: data['result3'][0].unp },
          { name: 'adress_nadz', value: data['result3'][0].address },
          { name: 'fio_nadz', value: data['result3'][0].fio_boss },
          { name: 'dolgn_nadz', value: data['result3'][0].dolzn_boss_nadz_org },
          { name: 'vid_meropr', value: data['result1'][0].type_check },
          { name: 'vid_proverki', value: data['result1'][0].type_order },
          { name: 'sfera_contolya', value: data['result1'][0].sphera },
          { name: 'osnovanie', value: data['result1'][0].reason },
          { name: 'dolg_lica', value: data['result1'][0].post_title },
          { name: 'fio_proverki', value: data['result1'][0].fio_post_title },
          { name: 'nomer', value: data['result1'][0].num_order },
          //{ name: 'date_vidaci', value: data['result1'][0].date_order },
          { name: 'sved_o_vneplan_proverki', value: data['result9'][0].num },
          //{ name: 'prov_period', value: data['result1'][0].period_check },
          //{ name: 'date_nachala_meropr', value: data['result1'][0].date_begin },
          //{ name: 'date_okonchaniya_meropr', value: data['result1'][0].date_end },
          { name: 'fac_date_nacala', value: data['result1'][0].date_begin_fact },
          { name: 'fac_date_oconchaniya', value: data['result1'][0].date_end_fact },
          //{ name: 'date_stop', value: data['result1'][0].date_stop },
          //{ name: 'date_vozobnovleniya', value: data['result1'][0].date_continue },
          { name: 'sved_o_prodlenii', value: data['result1'][0].fl_longer },
         // { name: 'date_prodlenii', value: data['result1'][0].date_to },
          { name: 'dolg_pred_subj', value: data['result1'][0].post_agent },
          { name: 'fio_pred_subj', value: data['result1'][0].name_agent },
          { name: 'itog_doc', value: data['result6'][0].num_last_doc },
          //{ name: 'date_itog_doc', value: data['result6'][0].date_doc },
          //{ name: 'date_vrucheniya_itog_doc', value: data['result6'][0].date_rec },
          { name: 'sved_o_vozrag', value: data['result6'][0].other_info },
          //30-31 вопросы
          //{ name: 'date_po_vozrag', value: data['result7'][0].date_po_vozrag },
          //{ name: 'reshenie_po_vozrag', value: data['result7'][0].reshenie_po_vozrag },
          { name: 'adm_force', value: data['result10'][0].adm_force },
          { name: 'adm_ban', value: data['result11'][0].adm_ban },
          //35-37 вопросы
          //{ name: 'sved_ob_ustr_narush', value: data['result12'][0].sved_ob_ustr_narush },
          //{ name: 'date_predpis', value: data['result12'][0].date_predpis },
          //{ name: 'date_vruch', value: data['result12'][0].date_vruch },
          { name: 'kol_viyavlenih_narush', value: data['result14'][0].num },
        ]);
      }



    }).catch((e) => {
      notificationController.error({ message: 'Ошибка' })
    })
  }, []);


  const formLabels: FormValues = {
    group: 'group',
    unp: 'unp',

    // confirmPassword: t('common.confirmPassword'),
    // salutation: t('forms.stepFormLabels.salutation'),
    // gender: t('forms.stepFormLabels.gender'),
    // firstName: t('common.firstName'),
    // lastName: t('common.lastName'),
    // birthday: t('forms.stepFormLabels.birthday'),
    // phone: t('common.phone'),
    // email: t('common.email'),
    // address1: `${t('common.address')} 1`,
    // address2: `${t('common.address')} 2`,
    // zipCode: t('common.zipcode'),
    // city: t('common.city'),
    // country: t('common.country'),
  };

  const formValues = fields
    .filter((item) => item.name !== 'prefix')
    .map((item) => ({
      name: formLabels[item.name],
      value: String(item.value),

    }));

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
    //setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = () =>
    form.validateFields().then(() => {
      setIsLoading(true);
      setTimeout(() => {
        notificationController.success({ message: t('common.success') });
        //console.log(form.getFieldsValue());
        console.log(fields);
        setIsLoading(false);
        setCurrent(0);
      }, 1500);
    });

  const steps = [
    {
      title: 'Данные по субъекту (объекту)',
    },
    {
      title: 'Данные по надзорному органу',
    },
    {
      title: 'Данные по надзорно-профилактическому мероприятию',
    },
    {
      title: 'Результаты',
    },
  ];

  

  const formFieldsUi = [
    <Step1 key="1" data={data1} />,
    <Step2 key="2" />,
    <Step3 key="3" data={data1} />,
    // <Step4 key="4" formValues={formValues} />,
    <Step4 key="4" data={data1} />,
  ];

  return (
    <BaseForm
      name="stepForm"
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        const currentFields = allFields.map((item) => ({
          name: Array.isArray(item.name) ? item.name[0] : '',
          value: item.value,
        }));
        const uniqueData = mergeBy(fields, currentFields, 'name');
        setFields(uniqueData);
      }}
      onFinish={onFinish}
    >
      <S.Steps labelPlacement="vertical" size="small" current={current} items={steps} />

      <div>{formFieldsUi[current]}</div>      
      <S.Row>
        {current > 0 && (
          <S.PrevButton type="default" onClick={() => prev()}>
            {'Предыдущий'}
          </S.PrevButton>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" style={{ marginLeft: "8px" }} onClick={() => next()}>
            {'Следующий'}
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onFinish} loading={isLoading}>
            {'Готово'}
          </Button>
        )}
      </S.Row>
    </BaseForm>
  );
};