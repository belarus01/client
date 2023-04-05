import { Input } from '@app/components/common/inputs/Input/Input';
import * as S from '../StepForm.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';

export const Step1: React.FC = () => {
    //const { t } = useTranslation();
    return (
        <S.FormContent>
            <BaseButtonsForm.Item
                name="group"
                label={'Наименование субъекта'}
                rules={[{ required: true, message: 'Введите наименование субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="unp"
                label={'УНП субъекта'}
                rules={[{ required: true, message: 'Введите УНП субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="date"
                label={'Дата государственной регистрации (присвоения УНП)'}
                rules={[{ required: true, message: 'Введите дату государственной регистрации' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="prin"
                label={'Ведомственная принадлежность субъекта'}
                rules={[{ required: true, message: 'Введите принадлежность субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="ur_adress"
                label={'Юридический адрес субъекта'}
                rules={[{ required: true, message: 'Введите юридический адрес субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="fak_adress"
                label={'Фактический адрес субъекта'}
                rules={[{ required: true, message: 'Введите фактический адрес субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="fio"
                label={'Ф.И.О руководителя субъекта'}
                rules={[{ required: true, message: 'Введите Ф.И.О руководителя субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="dolgnost"
                label={'Должность руководителя субъекта'}
                rules={[{ required: true, message: 'Введите должность руководителя субъекта' }]}
            >
                <Input />
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="sfera"
                label={'Сфера (вид) деятельности'}
                hasFeedback
                rules={[{ required: true, message: 'Введите сферу (вид) деятельности' }]}
            >
                <Select placeholder={('Сфера (вид) деятельности')}>
                    <Option value="Серый-машина">{('Серый-машина')}</Option>
                    <Option value="Серый-милашка">{('Серый-милашка')}</Option>
                    <Option value="Серый-красавчик">{('Серый-красавчик')}</Option>
                </Select>
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item label={'Количество отдельных зданий'}
            >
                <label>
                    <BaseButtonsForm.Item name="col_zdani" noStyle
                        hasFeedback
                        rules={[{ required: true, message: 'Введите количество отдельных зданий' }]}>
                        <InputNumber min={1} max={10} />
                    </BaseButtonsForm.Item>
                </label>
                <span> {'зданий'}</span>
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="name_zdani"
                label={'Наименование отдельных зданий'}
                hasFeedback
                rules={[{ required: true, message: 'Введите наименование отдельных зданий' }]}
            >
                <Select placeholder={('Наименование отдельных зданий')}>
                    <Option value="Серый-машина">{('Серый-машина')}</Option>
                    <Option value="Серый-милашка">{('Серый-милашка')}</Option>
                    <Option value="Серый-красавчик">{('Серый-красавчик')}</Option>
                </Select>
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item label={'Количество отдельных сооружений'}
            >
                <label>
                    <BaseButtonsForm.Item name="col_sooryg" noStyle
                        hasFeedback
                        rules={[{ required: true, message: 'Введите количество отдельных сооружений' }]}>
                        <InputNumber min={1} max={10} />
                    </BaseButtonsForm.Item>
                </label>
                <span> {'сооружений'}</span>
            </BaseButtonsForm.Item>

            <BaseButtonsForm.Item
                name="name_sooryg"
                label={'Наименование отдельных сооружений'}
                hasFeedback
                rules={[{ required: true, message: 'Введите наименование отдельных сооружений' }]}
            >
                <Select placeholder={('Наименование отдельных сооружений')}>
                    <Option value="Серый-машина">{('Серый-машина')}</Option>
                    <Option value="Серый-милашка">{('Серый-милашка')}</Option>
                    <Option value="Серый-красавчик">{('Серый-красавчик')}</Option>
                </Select>
            </BaseButtonsForm.Item>

        </S.FormContent>
    )
};
