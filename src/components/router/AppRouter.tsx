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

import pogMapSubjPage from '@app/pages/pog/pogMapSubjPage';

const PersonalInfoPage = React.lazy(() => import('@app/pages/test/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('@app/pages/test/SecuritySettingsPage'));
const NotificationsPage = React.lazy(() => import('@app/pages/test/NotificationsPage'));
const PaymentsPage = React.lazy(() => import('@app/pages/test/PaymentsPage'));

const Logout = React.lazy(() => import('./Logout'));
const PlanningPage = React.lazy(() => import('@app/pages/PlanningPage'));

//const PlanningPage = React.lazy(() => import('@app/pages/PlanningPage'));
const UserManagmentPage = React.lazy(() => import('@app/pages/handbooks/UsersManagmentPage'));
const SubjectsPage = React.lazy(() => import('@app/pages/handbooks/SubjectsPage'));
const SubjectSettingsPage = React.lazy(() => import('@app/pages/subjects/SubjectSettingsPage'));
const SubjectEventsPage = React.lazy(() => import('@app/pages/subjects/SubjectEventsPage'));

const AteOblPage = React.lazy(() => import('@app/pages/handbooks/AteOblPage'));
const DepartamentsPage = React.lazy(() => import('@app/pages/handbooks/DepartmentsPage'));

const SopbPage = React.lazy(() => import('@app/pages/sopbs/SopbsPage'));
const SopbCardsPage = React.lazy(() => import('@app/pages/sopbs/SopbsCardsPage'));
const PogPageTabs = React.lazy(() => import('@app/pages/pog/pogPage'));
const PogMapSubjPage = React.lazy(() => import('@app/pages/pog/pogMapSubjPage'));
const SStatePage = React.lazy(() => import('@app/pages/handbooks/StatesPage'));
const SOonPage = React.lazy(() => import('@app/pages/handbooks/OonPage'));
const SPooPage = React.lazy(() => import('@app/pages/handbooks/PooPage'));
const SEventsPage = React.lazy(() => import('@app/pages/handbooks/EventsPage'));
const SQuestionPage = React.lazy(() => import('@app/pages/handbooks/QuestionPage'));
const STnpaPage = React.lazy(() => import('@app/pages/handbooks/TnpaPage'));
const SDeptJobPage = React.lazy(() => import('@app/pages/handbooks/DeptJobPage'));
const SDeptUnitsPage = React.lazy(() => import('@app/pages/handbooks/DeptUnitsPage'));
const STypeTestPage = React.lazy(() => import('@app/pages/handbooks/TypeTestPage'));
const SVedomstvaPage = React.lazy(() => import('@app/pages/handbooks/VedomstvaPage'));

const SubjectObjectsPage = React.lazy(() => import('@app/pages/subjects/SubjectObjectsPage'));
const CurrenObjectPage = React.lazy(() => import('@app/pages/subjects/CurrentObjectPage'));
const ServerStatisticsPage = React.lazy(() => import('@app/pages/ServerStatisticsPage'));
const EventsPage = React.lazy(() => import('@app/pages/events/EventsPage'));
const Testpage = React.lazy(() => import('@app/pages/test'));
const EventsCardPage = React.lazy(() => import('@app/pages/EventCartPage'));
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
const SecuritySubjectSettings = withLoading(SecuritySettingsPage);
const SubjectSettings = withLoading(SubjectSettingsPage);
const SubjectEvents = withLoading(SubjectEventsPage);
const SubjectObjects = withLoading(SubjectObjectsPage);
const ServerStatistics = withLoading(ServerStatisticsPage);
const AteObl = withLoading(AteOblPage);
const Departaments = withLoading(DepartamentsPage);

const Sopb = withLoading(SopbPage);
const SopbCards = withLoading(SopbCardsPage);
const PogPage = withLoading(PogPageTabs);
const PogMapSubj = withLoading(PogMapSubjPage);
const StatePage = withLoading(SStatePage);
const OonPage = withLoading(SOonPage);
const PooPage = withLoading(SPooPage);
const SpisEventsPage = withLoading(SEventsPage);
const QuestionPage = withLoading(SQuestionPage);
const TnpaPage = withLoading(STnpaPage);
const DeptJobPage = withLoading(SDeptJobPage);
const DeptUnitsPage = withLoading(SDeptUnitsPage);
const VedomstvaPage = withLoading(SVedomstvaPage);
const Events = withLoading(EventsPage);
const TypeTestPage = withLoading(STypeTestPage);
const Test = withLoading(Testpage);
const CurrenObject = withLoading(CurrenObjectPage);

const EventCard = withLoading(EventsCardPage);
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
          <Route path="test" element={<Test />} />
          <Route path="common">
            <Route path="subjects" element={<Subjects />} />
            <Route path="subject/:idSubj" element={<SubjectProfileLayout />}>
              <Route path="events" element={<SubjectEvents />} />
              <Route path="objects" element={<SubjectObjects />} />
              <Route path="objects/:idObj" element={<CurrenObject />} />
              <Route path="settings" element={<SubjectSettings />} />
            </Route>

            {/* <Route path='objects' element={}/> */}
            {/* <Route path='npm' element={}/> */}
            <Route path="pog">
              <Route path="" element={<PogPage />} />
              <Route path=":idSubj" element={<PogMapSubj />} />
            </Route>
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
            <Route index path="events" element={<Events />} />
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
            <Route path="departments" element={<Departaments />} />
            {/* <Route path='soato' element={}/> */}
            {/* <Route path='ate' element={}/> */}
            {/* <Route path='oked' element={}/> */}
            {/* <Route path='events' element={}/> */}
            <Route path="tnpanpa" element={<TnpaPage />} />
            {/* <Route path='tnpastrelem' element={}/> */}
            <Route path="jobs" element={<DeptJobPage />} />
            <Route path="deptunits" element={<DeptUnitsPage />} />
            {/* <Route path='questions' element={}/> */}
            {/* <Route path='eventquestions' element={}/> */}
            {/* <Route path='defections' element={}/> */}

            {/* <Route path='eventsdefections' element={}/> */}
            {/* <Route path='sopbcard' element={}/> */}
            <Route path="question" element={<QuestionPage />} />
            <Route path="spisEvents" element={<SpisEventsPage />} />
            <Route path="state" element={<StatePage />} />
            <Route path="oon" element={<OonPage />} />
            <Route path="poo" element={<PooPage />} />
            {/* <Route path='opo' element={}/> */}
            {/* <Route path='admban' element={}/> */}
            {/* <Route path='admforce' element={}/> */}
            <Route path="typebuild" element={<TypeTestPage />} />
            {/* <Route path='docsform' element={}/> */}
            <Route path="vedomstva" element={<VedomstvaPage />} />
          </Route>
          <Route path="tnpa">
            {/* <Route path='tnpanpa' element={}/> */}
            {/* <Route path='defections' element={}/> */}
          </Route>
          <Route path="journals">
            {/* <Route path='tnpanpa' element={}/> */}
            {/* <Route path='defections' element={}/> */}
          </Route>

          <Route path="event-card">
            <Route path="" element={<EventCard />} />
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

          <Route path="*" element={<Error404 />} />

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
          <Route path="subject" element={<SubjectProfileLayout />}>
            <Route path="events" element={<SubjectEventsPage />} />
            {/* <Route path='objects' element={}/> */}
            <Route path="settings" element={<SubjectSettings />} />
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
