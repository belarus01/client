import { getCitiesByRayonId, getObl, getRayonsByOblId, getStreetsByCityId } from '@app/api/ate.api';
import { getSubjById } from '@app/api/subjects.api';
import { Pagination } from '@app/api/users.api';
import { Card } from '@app/components/common/Card/Card';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { AddSubjectForm } from '@app/components/subjects/forms/AddSubjectForm';
import { SSubj } from '@app/domain/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { setSubj } from '@app/store/slices/subjSlice';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface SubjectSettingsProps {
  subject: SSubj;
}

export const SubjectSettings: React.FC<SubjectSettingsProps> = ({ subject }) => {
  const user = useAppSelector((state) => state.user.user);

  const [subj, setSubj] = useState<SSubj>({} as SSubj);

  const { idSubj } = useParams();

  const getSubj = useCallback(() => {
    console.log(idSubj);

    if (idSubj) {
      getSubjById(idSubj).then((res) => {
        setSubj(res);
      });
    }
  }, [idSubj]);
  useEffect(() => {
    getSubj();
  }, [getSubj, idSubj]);

  return (
    <Card>
      <AddSubjectForm
        data={subj}
        onCancel={function (): void {
          throw new Error('Function not implemented.');
        }}
        onTableChange={function (pagination: Pagination): void {
          throw new Error('Function not implemented.');
        }}
        updateTable={getSubj}
      />
    </Card>
  );
};
