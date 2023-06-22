import { SSubj } from '@app/domain/interfaces';
import * as S from './SubjectInfo.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { getSubjById } from '@app/api/subjects.api';
import { useParams } from 'react-router-dom';
import { Spinner } from '@app/components/common/Spinner/Spinner.styles';
interface SubjectInfoProps {
  profileData: SSubj | undefined;
}

export const SubjectProfileInfo: React.FC<SubjectInfoProps> = ({ profileData }) => {
  const user = useAppSelector((state) => state.user.user);
  // const subj = useAppSelector((state) => state.subj.subj);
  useEffect(() => {
    console.log(subj);
  });
  const [subj, setSubj] = useState<SSubj>({} as SSubj);
  const [loading, setLoading] = useState(false);
  const { idSubj } = useParams();

  const getSubj = useCallback(() => {
    console.log(idSubj);
    setLoading(true);
    if (idSubj) {
      getSubjById(idSubj).then((res) => {
        setSubj(res);
        setLoading(false);
      });
    }
  }, [idSubj]);
  useEffect(() => {
    getSubj();
  }, [getSubj, idSubj]);
  return profileData ? (
    <Spinner spinning={loading}>
      <S.Wrapper>
        <S.Title>{subj?.subj}</S.Title>
        <S.Subtitle>{'УНП ' + subj?.unp}</S.Subtitle>
        <S.Subtitle>{'Юр. адрес - ' + subj?.addrYur}</S.Subtitle>
        <S.Subtitle>{'Факт. адрес - ' + subj?.addrFact}</S.Subtitle>
      </S.Wrapper>{' '}
    </Spinner>
  ) : null;
};
