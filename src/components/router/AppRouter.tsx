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
import Error404Page from '@app/pages/Error404Page';

const PersonalInfoPage = React.lazy(() => import('@app/pages/test/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('@app/pages/test/SecuritySettingsPage'));
const NotificationsPage = React.lazy(() => import('@app/pages/test/NotificationsPage'));
const PaymentsPage = React.lazy(() => import('@app/pages/test/PaymentsPage'));

const Logout = React.lazy(() => import('./Logout'));

const PlanningPage = React.lazy(() => import('@app/pages/PlanningPage'));
const UserManagmentPage = React.lazy(() => import('@app/pages/handbooks/UsersManagmentPage'));
const SubjectsPage = React.lazy(() => import('@app/pages/handbooks/SubjectsPage'));
const SubjectSettingsPage = React.lazy(() => import('@app/pages/subjects/SubjectSettingsPage'));
const SubjectEventsPage = React.lazy(() => import('@app/pages/subjects/SubjectEventsPage'));
const SubjectObjectsPage = React.lazy(() => import('@app/pages/subjects/SubjectObjectsPage'));
const ServerStatisticsPage = React.lazy(() => import('@app/pages/ServerStatisticsPage'));
const AteOblPage = React.lazy(() => import('@app/pages/handbooks/AteOblPage'));
const DepartamentsPage = React.lazy(() => import('@app/pages/handbooks/DepartmentsPage'));

const SopbPage = React.lazy(() => import('@app/pages/sopbs/SopbsPage'));
const SopbCardsPage = React.lazy(() => import('@app/pages/sopbs/SopbsCardsPage'));
const PogPageTabs = React.lazy(() => import('@app/pages/pog/pogPage'));

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
const SubjectObjects = withLoading(SubjectObjectsPage);
const ServerStatistics = withLoading(ServerStatisticsPage);
const AteObl = withLoading(AteOblPage);
const Departaments = withLoading(DepartamentsPage);

const Sopb = withLoading(SopbPage);
const SopbCards = withLoading(SopbCardsPage);
const PogPage = withLoading(PogPageTabs);

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
          <Route path="common">
            <Route path="subjects" element={<Subjects />}>
              <Route path="subject" element={<SubjectProfileLayout />}>
                <Route path="events" element={<SubjectEvents />} />
                <Route path="objects" element={<SubjectObjects />} />
                <Route path="settings" element={<SubjectSettings />} />
              </Route>
            </Route>
            {/* <Route path='objects' element={}/> */}
            {/* <Route path='npm' element={}/> */}
            <Route path="pog" element={<PogPage />} />
            {/* <Route path='pb' element={}/> */}
            {/* <Route path='ptc' element={}/> */}
            {/* <Route path='auto' element={}/> */}
            {/* <Route path='railway' element={}/> */}
            {/* <Route path='water' element={}/> */}
            {/* <Route path='air' element={}/> */}
            {/* <Route path='sopb' element={}/> */}
            {/* <Route path='npm' element={}/> */}
            <Route path="sopb">
              <Route path="" element={<Sopb />} />
              <Route path=":idSopb" element={<SopbCards />} />
            </Route>
          </Route>
          <Route path="planning">
            <Route path="calendar" element={<Planning />} />
            {/* <Route index path="events" element={< />} /> */}
            {/* <Route path="groups" element={< />} /> */}
          </Route>
          <Route path="admin">
            <Route path="users" element={<UsersManagment />} />
            <Route path="server-statistics" element={<ServerStatistics />} />
            {/* <Route path="geo" element={</>}/> */}
            {/* <Route path="arhiv" element={</>}/> */}
          </Route>
          <Route path="handbooks">
            <Route path="ate" element={<AteObl />} />
            <Route path="departaments" element={<Departaments />} />
            {/* <Route path='soato' element={}/> */}
            {/* <Route path='ate' element={}/> */}
            {/* <Route path='oked' element={}/> */}
            {/* <Route path='events' element={}/> */}
            {/* <Route path='tnpanpa' element={}/> */}
            {/* <Route path='tnpastrelem' element={}/> */}
            {/* <Route path='jobs' element={}/> */}
            {/* <Route path='deptunits' element={}/> */}
            {/* <Route path='questions' element={}/> */}
            {/* <Route path='eventquestions' element={}/> */}
            {/* <Route path='defections' element={}/> */}

            {/* <Route path='eventsdefections' element={}/> */}
            {/* <Route path='sopbcard' element={}/> */}
            {/* <Route path='state' element={}/> */}
            {/* <Route path='spoo' element={}/> */}
            {/* <Route path='opo' element={}/> */}
            {/* <Route path='admban' element={}/> */}
            {/* <Route path='admforce' element={}/> */}
            {/* <Route path='typebuild' element={}/> */}
            {/* <Route path='docsform' element={}/> */}
          </Route>
          <Route path="tnpa">
            {/* <Route path='tnpanpa' element={}/> */}
            {/* <Route path='defections' element={}/> */}
          </Route>
          <Route path="journals">
            {/* <Route path='tnpanpa' element={}/> */}
            {/* <Route path='defections' element={}/> */}
          </Route>

          <Route path="documents">
            {/* <Route path='chlist1' element={}/> */}
            {/* <Route path='chlist2' element={}/> */}
            {/* <Route path='chlist3' element={}/> */}
            {/* <Route path='chlist4' element={}/> */}
            {/* <Route path='chlist5' element={}/> */}
            {/* <Route path='chlist6' element={}/> */}
            {/* <Route path='chlist7' element={}/> */}
            {/* <Route path='chlist8' element={}/> */}
            {/* <Route path='chlist9' element={}/> */}
            {/* <Route path='chlist10' element={}/> */}
            {/* <Route path='chlist11' element={}/> */}
          </Route>
          <Route path="server-error" element={<ServerError />} />

          <Route path="404" element={<Error404 />} />

          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="payments" element={<Payments />} />
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
