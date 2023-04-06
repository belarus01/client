//import { useTranslation } from 'react-i18next';
import { Input } from '@app/components/common/inputs/Input/Input';
import * as S from '../eventCard.styles';
import React from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';


export const Step3: React.FC = () => {
  //const { t } = useTranslation();
  return (
    <S.FormContent>
      <BaseButtonsForm.Item
        name="vid_meropr"
        label={'Вид надзорно-профилактического мероприятия '}
        hasFeedback
        rules={[{ required: true, message: 'Введите вид надзорно-профилактического мероприятия ' }]}
      >
        <Select placeholder={('Вид надзорно-профилактического мероприятия ')}>
          <Option value="Проверка">{('Проверка')}</Option>
          <Option value="Мониторинг">{('Мониторинг')}</Option>
          <Option value="Обследование">{('Обследование')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="vid_proverki"
        label={'Вид проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите вид проверки ' }]}
      >
        <Select placeholder={('Вид проверки ')}>
          <Option value="Выборочная">{('Выборочная')}</Option>
          <Option value="Внеплановая">{('Внеплановая')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sfera_contolya"
        label={'Сфера контроля (надзора)'}
        rules={[{ required: true, message: 'Введите сфера контроля (надзора)' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="osnovanie"
        label={'Основание назначения надзорно-профилактического мероприятия'}
        rules={[{ required: true, message: 'Введите основание назначения надзорно-профилактического мероприятия' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_lica"
        label={'Должность лица, выдавшего предписание на проведение проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите должность лица, выдавшего предписание на проведение проверки ' }]}
      >
        <Select placeholder={('Должность лица, выдавшего предписание на проведение проверки ')}>
          <Option value="Директор">{('Директор')}</Option>
          <Option value="Программист">{('Программист')}</Option>
          <Option value="Инженер">{('Инженер')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_proverki"
        label={'Ф.И.О лица, выдавшего предписание на проведение проверки (решение на проведение мониторинга)'}
        rules={[{ required: true, message: 'Введите Ф.И.О лица, выдавшего предписание на проведение проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="nomer"
        label={'Номер предписания на проведение проверки (решения на проведение мониторинга)'}
        rules={[{ required: true, message: 'Введите номер предписания на проведение проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vidaci"
        label={'Дата выдачи предписания на проведение проверки (решения на проведение мониторинга)'}
        rules={[{ required: true, message: 'Введите дату выдачи предписания на проведение проверки' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_ruc_proverki"
        label={'Должность руководителя проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите должность руководителя проверки ' }]}
      >
        <Select placeholder={('Должность руководителя проверки ')}>
          <Option value="Директор">{('Директор')}</Option>
          <Option value="Программист">{('Программист')}</Option>
          <Option value="Инженер">{('Инженер')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_ruc_proverki"
        label={'Ф.И.О руководителя проверки'}
        rules={[{ required: true, message: 'Введите Ф.И.О руководителя проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_prov"
        label={'Должность проверяющего '}
        hasFeedback
        rules={[{ required: true, message: 'Введите должность проверяющего ' }]}
      >
        <Select placeholder={('Должность проверяющего ')}>
          <Option value="Директор">{('Директор')}</Option>
          <Option value="Программист">{('Программист')}</Option>
          <Option value="Инженер">{('Инженер')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_prov"
        label={'Ф.И.О проверяющего'}
        rules={[{ required: true, message: 'Введите Ф.И.О проверяющего' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="prov_period"
        label={'Проверяемый период'}
        rules={[{ required: true, message: 'Введите проверяемый период' }]}
      >
        <S.RangePicker />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_nachala_meropr"
        label={'Дата начала надзорно-профилактического мероприятия (по предписанию/решению))'}
        rules={[{ required: true, message: 'Введите дату начала надзорно-профилактического мероприятия' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_okonchaniya_meropr"
        label={'Дата окончания надзорно-профилактического мероприятия (по предписанию/решению))'}
        rules={[{ required: true, message: 'Введите дату окончания надзорно-профилактического мероприятия' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="per_voprosov"
        label={'Перечень вопросов проверки (мониторинга)'}
        rules={[{ required: true, message: 'Введите перечень вопросов проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_sredstvah"
        label={'Сведения о применении научно-технических средств (не применялись или указать какие средства применялись) '}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о применении научно-технических средств ' }]}
      >
        <Select placeholder={('Сведения о применении научно-технических средств ')}>
          <Option value="Не применялись">{('Не применялись')}</Option>
          <Option value="Средство 1">{('Средство 1')}</Option>
          <Option value="Средство 2">{('Средство 2')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fac_date_nacala"
        label={'Фактическая дата начала надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите фактическую дату начала надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fac_date_oconchaniya"
        label={'Фактическая дата окончания надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите фактическую дату окончания надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_stop"
        label={'Дата приостановления проведения надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите дату приостановления проведения надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vozobnovleniya"
        label={'Дата возобновления проведения надзорно-профилактического мероприятия '}
        rules={[{ required: true, message: 'Введите дату возобновления проведения надзорно-профилактического мероприятия ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_prodlenii"
        label={'Сведения о продлении срока проведения проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о продлении срока проведения проверки ' }]}
      >
        <Select placeholder={('Сведения о продлении срока проведения проверки ')}>
          <Option value="Да">{('Да')}</Option>
          <Option value="Нет">{('Нет')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_prodlenii"
        label={'Дата, до которой продлен срок проведения проверки '}
        rules={[{ required: true, message: 'Введите дату, до которой продлен срок проведения проверки ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="dolg_pred_subj"
        label={'Должность представителя субъекта '}
        hasFeedback
        rules={[{ required: true, message: 'Введите должность представителя субъекта ' }]}
      >
        <Select placeholder={('Должность представителя субъекта ')}>
          <Option value="Директор">{('Директор')}</Option>
          <Option value="Программист">{('Программист')}</Option>
          <Option value="Инженер">{('Инженер')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="fio_pred_subj"
        label={'Ф.И.О представителя субъекта'}
        rules={[{ required: true, message: 'Введите Ф.И.О представителя субъекта' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="itog_doc"
        label={'Итоговый документ '}
        hasFeedback
        rules={[{ required: true, message: 'Введите итоговый документ ' }]}
      >
        <Select placeholder={('Итоговый документ ')}>
          <Option value="Акт">{('Акт')}</Option>
          <Option value="Справка">{('Справка')}</Option>
          <Option value="Аналитическая записка">{('Аналитическая записка')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_itog_doc"
        label={'Дата итогового документа '}
        rules={[{ required: true, message: 'Введите дату итогового документа ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vrucheniya_itog_doc"
        label={'Дата вручения (направления) итогового документа '}
        rules={[{ required: true, message: 'Введите дату вручения итогового документа ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_vozrag"
        label={'Сведения о наличии возражений по акту проверки'}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о наличии возражений по акту проверки  ' }]}
      >
        <Select placeholder={('Сведения о наличии возражений по акту проверки')}>
          <Option value="Да">{('Да')}</Option>
          <Option value="Нет">{('Нет')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_po_vozrag"
        label={'Дата принятия решения по возражениям по акту проверки '}
        rules={[{ required: true, message: 'Введите дату принятия решения по возражениям по акту проверки ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="reshenie_po_vozrag"
        label={'Принятое решение по возражениям по акту проверки'}
        rules={[{ required: true, message: 'Введите принятое решение по возражениям по акту проверки' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="perechen_narush"
        label={'Перечень выявленных нарушений'}
        rules={[{ required: true, message: 'Введите перечень выявленных нарушений' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        label={'Сведения о принятых мерах административного принуждения '}
      >
        <BaseButtonsForm.Item
          name="sved_o_prin_merah_vid"
          hasFeedback
          rules={[{ required: true, message: 'Введите вид сведений о принятых мерах административного принуждения ' }]}
        >
          <Select placeholder={('Вид ')}
            style={{ width: 420 }}>
            <Option value="Вид 1">{('Вид 1')}</Option>
            <Option value="Вид 2">{('Вид 2')}</Option>
          </Select>
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
          name="sved_o_prin_merah_col"
          hasFeedback
          rules={[{ required: true, message: 'Введите количество сведений о принятых мерах административного принуждения ' }]}
        >
          <Select placeholder={('Количество ')}
            style={{ width: 420 }}>
            <Option value="12">{('12')}</Option>
            <Option value="23">{('23')}</Option>
            <Option value="34">{('34')}</Option>
          </Select>
        </BaseButtonsForm.Item>

      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        label={'Сведения о принятых мерах административного пресечения  '} 
      >
        <BaseButtonsForm.Item
        name="sved_o_prin_merah_presecheniya_vid"
        hasFeedback
        rules={[{ required: true, message: 'Введите вид сведений о принятых мерах административного пресечения ' }]}
        >
          <Select placeholder={('Вид ')}
            style={{ width: 420 }}>
            <Option value="Вид 1">{('Вид 1')}</Option>
            <Option value="Вид 2">{('Вид 2')}</Option>
          </Select>
        </BaseButtonsForm.Item>

        <BaseButtonsForm.Item
        name="sved_o_prin_merah_presecheniya_col"
        hasFeedback
        rules={[{ required: true, message: 'Введите количество сведений о принятых мерах административного пресечения ' }]}
        >
          <Select placeholder={('Количество ')}
            style={{ width: 420 }}>
            <Option value="12">{('12')}</Option>
            <Option value="23">{('23')}</Option>
            <Option value="34">{('34')}</Option>
          </Select>
        </BaseButtonsForm.Item>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_ob_ustr_narush"
        label={'Сведения о подготовке предписания (рекомендаций) об устранении нарушений '}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о подготовке предписания (рекомендаций) об устранении нарушений ' }]}
      >
        <Select placeholder={('Сведения о подготовке предписания об устранении нарушений ')}>
          <Option value="Да">{('Да')}</Option>
          <Option value="Нет">{('Нет')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_ob_ustr_narush"
        label={'Дата предписания (рекомендаций) об устранении нарушений '}
        rules={[{ required: true, message: 'Введите дату предписания об устранении нарушений ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_vruch_predpisaniya"
        label={'Дата вручения (направления) предписания (рекомендаций) об устранении нарушений '}
        rules={[{ required: true, message: 'Введите дату вручения предписания об устранении нарушений ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_ustranenie"
        label={'Дата (даты) устранения нарушений '}
        rules={[{ required: true, message: 'Введите дату (даты) устранения нарушений ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_ustranenie_info"
        label={'Дата (даты) информирования об устранении нарушений '}
        rules={[{ required: true, message: 'Введите дату (даты) информирования об устранении нарушений ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="date_proved_meropr"
        label={'Дата проведения мероприятия по контролю за устранением нарушений '}
        rules={[{ required: true, message: 'Введите дату проведения мероприятия по контролю за устранением нарушений ' }]}
      >
        <S.Picker format="YYYY-MM-DD" />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="result_narush"
        label={'Результат проведения мероприятия по контролю за устранением нарушений '}
        hasFeedback
        rules={[{ required: true, message: 'Введите результат проведения мероприятия по контролю за устранением нарушений ' }]}
      >
        <Select placeholder={('Результат проведения мероприятия по контролю за устранением нарушений ')}>
          <Option value="Нарушения устранены">{('Нарушения устранены')}</Option>
          <Option value="Нарушения устранены частично">{('Нарушения устранены частично')}</Option>
          <Option value="Нарушения не устранены">{('Нарушения не устранены')}</Option>
        </Select>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="perechen_narush_ne_ustr"
        label={'Перечень не устраненных (частично устраненных) нарушений'}
        rules={[{ required: true, message: 'Введите перечень не устраненных нарушений' }]}
      >
        <Input />
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="sved_o_vneplan_proverki"
        label={'Сведения о принятии решения о назначении внеплановой проверки '}
        hasFeedback
        rules={[{ required: true, message: 'Введите сведения о принятии решения о назначении внеплановой проверки' }]}
      >
        <Select placeholder={('Сведения о наличии возражений по акту проверки')}>
          <Option value="Да">{('Да')}</Option>
          <Option value="Нет">{('Нет')}</Option>
        </Select>
      </BaseButtonsForm.Item>
    </S.FormContent>
  );
};
