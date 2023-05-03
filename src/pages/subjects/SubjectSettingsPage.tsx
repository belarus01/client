import React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalInfo } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/PersonalInfo';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { SubjectSettings } from '../../components/subjects/subjectPage/subjectCard/subjectFormNav/settings/SubjectSeettings';
import { useLocation } from 'react-router-dom';

const SubjectSettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <>
      <PageTitle>{t('profile.nav.personalInfo.title')}</PageTitle>
      <SubjectSettings subject={location.state} />
    </>
  );
};

export default SubjectSettingsPage;
