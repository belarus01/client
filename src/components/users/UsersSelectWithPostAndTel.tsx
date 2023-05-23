import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseButtonsForm } from '../common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input, Select } from 'antd';
import { UserGroup } from '@app/domain/interfaces';
import { getAllRucsAndDolzhnLicas } from '@app/api/groups.api';

interface UsersSelectWithPostAndTelProps {
  uidBoss?: number | string;
  shownTel?: boolean;
  shownPost?: boolean;
  labelUser?: string;
  labelPost?: string;
  labelTel?: string;
}

const UsersSelectWithPostAndTel: React.FC<UsersSelectWithPostAndTelProps> = ({
  uidBoss,
  shownTel,
  shownPost,
  labelUser,
  labelPost,
  labelTel,
}) => {
  const [boss, setBoss] = useState<{
    label: string;
    value: string | number | null;
  }>({
    label: '',
    value: '',
  });
  const [bosses, setBosses] = useState<UserGroup[]>([]);
  const [bossPost, setBossPost] = useState('');
  const [bossTell, setBossTell] = useState('');
  const [loadingBosses, setLoadingBosses] = useState<boolean>(false);

  const getBoss = useCallback(
    (uidBoss: number | string) => () => {
      const bossCurrent = bosses.find((boss) => {
        return boss.idUserGroup == uidBoss;
      });
      if (bossCurrent) {
        const boss = {
          label: bossCurrent.uidGr2?.fio || '',
          value: bossCurrent.uidGr2?.uid || null,
        };
        setBoss(boss);
        setBossPost(bossCurrent?.uidGr2?.idDeptJob2?.job || '');
        setBossTell(bossCurrent?.uidGr2?.tel || '');
      }
    },
    [bosses],
  );

  const getAllBoss = () => {
    setLoadingBosses(true);
    getAllRucsAndDolzhnLicas().then((bosses) => {
      console.log(bosses);
      setLoadingBosses(false);
      setBosses(bosses);
    });
  };

  const changePost = (value: unknown) => {
    const currentBoss = bosses.find((boss) => {
      // why in users isn`t uid in uidGr2
      return boss.idUserGroup == value;
    });
    setBossPost(currentBoss?.uidGr2?.idDeptJob2.job as string);
    setBossTell(currentBoss?.uidGr2?.tel as string);
  };

  const optionsBosses = useMemo(() => {
    return bosses.map((boss) => ({
      label: boss?.uidGr2?.fio,
      value: boss.idUserGroup,
    }));
  }, [bosses]);

  useEffect(() => {
    console.log('first render');
    getAllBoss();
  }, []);
  useEffect(() => {
    if (uidBoss) {
      getBoss(uidBoss);
    }
  }, [getBoss, uidBoss]);
  return (
    <>
      <BaseButtonsForm.Item name="uidBoss" label={labelUser || 'ФИО'}>
        <Select loading={loadingBosses} options={optionsBosses} onChange={changePost} value={boss} />
      </BaseButtonsForm.Item>
      {shownPost && (
        <BaseButtonsForm.Item label={labelPost || 'Должжность'}>
          <Input value={bossPost} disabled readOnly />
        </BaseButtonsForm.Item>
      )}
      {shownTel && (
        <BaseButtonsForm.Item label={labelTel || 'Телефон'}>
          <Input value={bossTell} disabled readOnly />
        </BaseButtonsForm.Item>
      )}
    </>
  );
};

UsersSelectWithPostAndTel.defaultProps = {
  shownTel: true,
  shownPost: true,
};

export default UsersSelectWithPostAndTel;
