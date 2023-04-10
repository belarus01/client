import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));
import LoginPage from '@app/pages/LoginPage';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '@app/components/profile/ProfileLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import RequireRoles from '@app/components/router/RequireRoles';
import { withLoading } from '@app/hocs/withLoading.hoc';

import SubjectProfileLayout from '../subjects/subjectPage/SubjectEventsLayout';
import ServerErrorPage from '../../pages/ServerErrorPage';
import Error404Page from '@app/pages/Error404Page'



const PersonalInfoPage = React.lazy(() => import('@app/pages/test/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('@app/pages/test/SecuritySettingsPage'));
const NotificationsPage = React.lazy(() => import('@app/pages/test/NotificationsPage'));
const PaymentsPage = React.lazy(() => import('@app/pages/test/PaymentsPage'));

const Logout = React.lazy(() => import('./Logout'));

const PlanningPage = React.lazy(() => import('@app/pages/PlanningPage'));
const UserManagmentPage = React.lazy(() => import('@app/pages/handbooks/UsersManagmentPage'));
const SubjectsPage = React.lazy(() => import('@app/pages/handbooks/SubjectsPage'));
const SubjectSettingsPage = React.lazy(() => import('@app/pages/subjects/SubjectSettingsPage'))
const SubjectEventsPage = React.lazy(() => import('@app/pages/subjects/SubjectEventsPage'));

export const MAIN_PATH = '/';

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

// Profile
const PersonalInfo = withLoading(PersonalInfoPage);
const SecuritySettings = withLoading(SecuritySettingsPage);
const Notifications = withLoading(NotificationsPage);
const Payments = withLoading(PaymentsPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);


const Planning = withLoading(PlanningPage);
const UsersManagment = withLoading(UserManagmentPage);
const Subjects = withLoading(SubjectsPage);
const SubjectSettings = withLoading(SubjectSettingsPage);
const SubjectEvents = withLoading(SubjectEventsPage);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={MAIN_PATH} element={protectedLayout}>

          <Route index path="planning" element={<Planning />} />
          <Route path="server-error" element={<ServerError />} />

          <Route path="404" element={<Error404 />} />

          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="payments" element={<Payments />} />
          </Route>

          <Route path="handbooks">
            <Route path="users" element={<UsersManagment />} />
            <Route path="subjects" element={<Subjects />} />
          </Route>
          <Route path='subject' element={<SubjectProfileLayout />}>
            <Route path='events' element={<SubjectEventsPage />} />
            {/* <Route path='objects' element={}/> */}
            <Route path='settings' element={<SubjectSettings />} />

          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      </Routes>
    </BrowserRouter>
  );
};
