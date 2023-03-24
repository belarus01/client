import React from 'react';
import { DropdownCollapse } from '@app/components/header/Header.styles';
import { useTranslation } from 'react-i18next';
import { ThemePicker } from '../ThemePicker/ThemePicker';
import { Button } from '@app/components/common/buttons/Button/Button';
import { useAppSelector } from '@app/hooks/reduxHooks';
import * as S from './SettingsOverlay.styles';

export const SettingsOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();

  const { isPWASupported, event } = useAppSelector((state) => state.pwa);

  return (
    <S.SettingsOverlayMenu {...props}>
      <DropdownCollapse bordered={false} expandIconPosition="end" ghost defaultActiveKey="themePicker">
        
        <DropdownCollapse.Panel header={t('header.changeTheme')} key="themePicker">
          <ThemePicker />
        </DropdownCollapse.Panel>
        
      </DropdownCollapse>
      {isPWASupported && (
        <S.PwaInstallWrapper>
          <Button block type="primary" onClick={() => event && (event as BeforeInstallPromptEvent).prompt()}>
            {t('common.pwa')}
          </Button>
        </S.PwaInstallWrapper>
      )}
    </S.SettingsOverlayMenu>
  );
};
