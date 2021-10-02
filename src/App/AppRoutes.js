import Home from '../Screens/Home';
import AdminHome from '../Screens/Admin/AdminHome';
import Categories from '../Screens/Admin/Categories';
import Category from '../Screens/Admin/Category';
import Mailtemplates from '../Screens/Admin/Mailtemplates';
import Mailtemplate from '../Screens/Admin/Mailtemplate';
import Deadlines from '../Screens/Admin/Deadlines';
import Deadline from '../Screens/Admin/Deadline';
import Roles from '../Screens/Admin/Roles';
import { RoleNew, RoleShow, RoleEdit } from '../Screens/Admin/Role';
import Users from '../Screens/Admin/Users';
import { UserShow, UserEdit } from '../Screens/Admin/User';
import Programmes from '../Screens/Admin/Programmes';
import Programme from '../Screens/Admin/Programme';
import Statistics from '../Screens/Admin/Statistics';
import CurrentUser from '../Screens/CurrentUser';
import Companies from '../Screens/Admin/Companies';
import StudentSessions from '../Screens/Admin/StudentSessions';
import { CompanyNew, CompanyEdit, CompanyShow } from '../Screens/Admin/Company';
import YourCompanyHome from '../Screens/YourCompany/YourCompanyHome';
import {
  YourCompanyProfileShow,
  YourCompanyProfileEdit
} from '../Screens/YourCompany/YourCompanyProfile';
import YourCompanyApplications from '../Screens/YourCompany/YourCompanyApplications';
import YourCompanyTimeSlots from '../Screens/YourCompany/YourCompanyTimeSlots';
import YourCompanyScans from '../Screens/YourCompany/YourCompanyScans';
import SessionHome from '../Screens/Session/SessionHome';
import SessionApplication from '../Screens/Session/SessionApplication';
import SessionApplications from '../Screens/Session/SessionApplications';
import SessionCompanies from '../Screens/Session/SessionCompanies';
import SessionsApproved from '../Screens/Session/SessionsApproved';
import Logout from '../Screens/Auth/Logout';

type RouteItem = {
  path: string,
  component: React$ComponentType<{}>
};

export const AppRoutes: Array<RouteItem> = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminHome },
  { path: '/admin/categories', component: Categories },
  { path: '/admin/categories/:id', component: Category },
  { path: '/admin/programmes', component: Programmes },
  { path: '/admin/programmes/new', component: Programme },
  { path: '/admin/programmes/:id', component: Programme },
  { path: '/admin/companies', component: Companies },
  { path: '/admin/sessions', component: StudentSessions },
  { path: '/admin/companies/new', component: CompanyNew },
  { path: '/admin/companies/:id', component: CompanyShow },
  { path: '/admin/companies/:id/edit', component: CompanyEdit },
  { path: '/admin/mailtemplates', component: Mailtemplates },
  { path: '/admin/mailtemplates/new', component: Mailtemplate },
  { path: '/admin/mailtemplates/:id', component: Mailtemplate },
  { path: '/admin/deadlines', component: Deadlines },
  { path: '/admin/deadlines/new', component: Deadline },
  { path: '/admin/deadlines/:id', component: Deadline },
  { path: '/admin/users', component: Users },
  { path: '/admin/users/:id', component: UserShow },
  { path: '/admin/users/:id/edit', component: UserEdit },
  { path: '/admin/roles', component: Roles },
  { path: '/admin/roles/new', component: RoleNew },
  { path: '/admin/roles/:id', component: RoleShow },
  { path: '/admin/roles/:id/edit', component: RoleEdit },
  { path: '/admin/statistics', component: Statistics },
  { path: '/user', component: CurrentUser },
  { path: '/logout', component: Logout },
  { path: '/session', component: SessionHome },
  { path: '/session/application', component: SessionApplication },
  { path: '/session/applications', component: SessionApplications },
  { path: '/session/companies', component: SessionCompanies },
  { path: '/session/approved', component: SessionsApproved },
  { path: '/company', component: YourCompanyHome },
  { path: '/company/profile', component: YourCompanyProfileShow },
  { path: '/company/profile/edit', component: YourCompanyProfileEdit },
  { path: '/company/applications', component: YourCompanyApplications },
  { path: '/company/timeslots', component: YourCompanyTimeSlots },
  { path: '/company/scans', component: YourCompanyScans }
];
