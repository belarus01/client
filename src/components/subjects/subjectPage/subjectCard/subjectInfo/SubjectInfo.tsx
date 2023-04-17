import { SSubj } from "@app/domain/interfaces";
import * as S from "./SubjectInfo.styles";
interface SubjectInfoProps {
    profileData: SSubj|undefined;
  }
  
  export const SubjectProfileInfo: React.FC<SubjectInfoProps> = ({ profileData }) => {
    
    return profileData ? (
      <S.Wrapper>
        
        <S.Title>{profileData?.addrYur}</S.Title>
        <S.Subtitle>{profileData?.unp}</S.Subtitle>
      </S.Wrapper>
    ) : null;
  };