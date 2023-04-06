import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import React from 'react';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import * as S from '../eventCard.styles';

// interface Field {
//   name?: string;
//   value: string;
// }

// interface Step4Props {
//   formValues: Field[];
// }

export const Step4: React.FC = () => {
  return (
    //<S.Details key="4">
    <S.FormContent>
      <BaseButtonsForm.Item
        label={'Количество надзорно-профилактических мероприятий (всего и по каждому виду в отдельности) '}
      >
        <BaseButtonsForm.Item
          label={'Всего'}
          name="kol_meropri_vsego"
          hasFeedback
          rules={[{ required: true, message: 'Введите количество надзорно-профилактических мероприятий ' }]}
        >
          <Input />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          label={'Вид 1'}
          name="kol_meropei_vid_1"
          hasFeedback
          rules={[{ required: true, message: 'Введите количество надзорно-профилактических мероприятий (вид 1) ' }]}
        >
          <Input  />
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          label={'Вид 2'}
          name="kol_meropei_vid_2"
          hasFeedback
          rules={[{ required: true, message: 'Введите количество надзорно-профилактических мероприятий (вид 2) ' }]}
        >
          <Input  />
        </BaseButtonsForm.Item>

      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_viyavlenih_narush"
        label={'Количество выявленных нарушений'}
        rules={[{ required: true, message: 'Введите количество выявленных нарушений' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_np_meropri"
        label={'Количество надзорно-профилактических мероприятий по сферам контроля (надзора)'}
        rules={[{ required: true, message: 'Введите количество надзорно-профилактических мероприятий по сферам контроля' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_i_vid_mer_prin"
        label={'Количество и вид принятых мер административного принуждения'}
        rules={[{ required: true, message: 'Введите количество и вид принятых мер административного принуждения' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="kol_i_vid_mer_presech"
        label={'Количество и вид принятых мер административного пресечения'}
        rules={[{ required: true, message: 'Введите количество и вид принятых мер административного пресечения' }]}
      >
        <Input />
      </BaseButtonsForm.Item>
    </S.FormContent>

    //</S.Details>
  );
};


