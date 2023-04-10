import { SSubj } from "@app/domain/interfaces";
import * as S from "./SubjectInfo.styles";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { useEffect } from "react";
interface SubjectInfoProps {
    profileData: SSubj|undefined;
  }
  
  export const SubjectProfileInfo: React.FC<SubjectInfoProps> = ({ profileData }) => {
    const user = useAppSelector((state) => state.user.user);
    const subj = useAppSelector((state) => state.subj.subj);
    useEffect(()=>{
      console.log(subj);
    });
    return profileData ? (
      <S.Wrapper>
        
        <S.Title>{profileData?.subj}</S.Title>
        <S.Subtitle>{'УНП ' + profileData?.unp}</S.Subtitle>
        <S.Subtitle>{'Юр. адрес - ' + profileData?.addrYur}</S.Subtitle>
        <S.Subtitle>{'Факт. адрес - ' + profileData?.addrFact}</S.Subtitle>

      </S.Wrapper>
    ) : null;
  };