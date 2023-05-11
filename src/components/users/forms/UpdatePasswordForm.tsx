import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ConfirmItemPassword } from '@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/passwordForm/ConfirmPasswordItem/ConfirmPasswordItem';
import { CurrentPasswordItem } from '@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/passwordForm/CurrentPasswordItem/CurrentPasswordItem';
import { NewPasswordItem } from '@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/passwordForm/NewPasswordItem/NewPasswordItem';
import { notificationController } from '@app/controllers/notificationController';
import * as S from './UserForms.styles';
import { Modal } from '@app/components/common/Modal/Modal';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { Button } from '@app/components/common/buttons/Button/Button';

export const UpdatePasswordForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);

  //todo: add validation and sending
  const onFinish = (values: []) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      notificationController.success({ message: 'Пароль обновлен' });
      console.log(values);
    }, 1000);
  };

  return (
    <>
      <BaseButtonsForm layout="vertical" onFinish={onFinish} isFieldsChanged={false}>
        <BaseButtonsForm.Item label="Новый пароль" name="pas1">
          <InputPassword />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item label="Повторите ввод пароля" name="pas2">
          <InputPassword />
        </BaseButtonsForm.Item>
        <BaseButtonsForm.Item>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </BaseButtonsForm.Item>
      </BaseButtonsForm>
    </>
  );
};
