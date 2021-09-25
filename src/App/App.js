import React from 'react';
// import type { Element } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Breadcrumb, Menu, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { startCase } from 'lodash/fp';
import Info from '../Screens/Info';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import NotFound from '../Screens/NotFound';
import PrivateRoute from '../Components/PrivateRoute';
import HtmlTitle from '../Components/HtmlTitle';
import { hasAccess, hasPermission } from '../Util/PermissionsHelper';
import { AppRoutes } from './AppRoutes';
import SidebarDrawer from './SidebarDrawer';

const { Header, Content, Footer } = Layout;

// the | ... | means exact type. look up flow exact type for more information
type RouteItem = {
  path: string,
  component: React$ComponentType<{}>
};

type Props = {
  isLoggedIn: boolean,
  currentUser?: {
    email?: ?string,
    firstName?: ?string,
    lastName?: ?string,
    roles?: Array<{ type: string, permissions: Array<string> }>
  },
  logout: () => void,
  redirect: string => void,
  pathname: string
};

type SubMenuProps = {
  route: string,
  title: string,
  menus: Array<?React$Element<any>>
};

type MenuItemProps = {
  route: string,
  title: string,
  disabled?: boolean
};

const privateRoutes: Array<RouteItem> = AppRoutes;

const routes = (
  <Switch>
    <Route path="/info" component={Info} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    {privateRoutes.map((props: RouteItem) => (
      <PrivateRoute
        key={props.path}
        exact
        {...(props: $Rest<Object, RouteItem>)}
      />
    ))}
    <Route component={NotFound} />
  </Switch>
);

/**
 * The base of the application. Defines the basic layout
 */
const App = ({
  isLoggedIn,
  currentUser,
  logout,
  redirect,
  pathname
}: Props): React$Element<any> => {
  const loggedInMenuItem = () => {
    const { email, firstName, lastName } = currentUser || {};

    const displayName: string =
      firstName && lastName ? [firstName, lastName].join(' ') : email || '';

    return [
      <Menu.Item key="/user">
        {displayName} <UserOutlined />
      </Menu.Item>,
      <Menu.Item key="/logout">Logout</Menu.Item>
    ];
  };

  const loggedOutMenuItem = () => [
    <Menu.Item key="/login">Login</Menu.Item>,
    <Menu.Item key="/signup">Sign Up</Menu.Item>
  ];

  const restrictedSubMenu = ({
    route,
    title,
    menus,
    ...rest
  }: SubMenuProps) => {
    const restProps = { ...(rest: $Rest<Object, SubMenuProps>) };
    if (
      isLoggedIn &&
      hasPermission(currentUser, route) &&
      hasAccess(currentUser, route)
    ) {
      return (
        <Menu.SubMenu
          title={title}
          key={`/${route}`}
          onTitleClick={() => redirect(`/${route}`)}
          {...restProps}
        >
          {menus}
        </Menu.SubMenu>
      );
    }
    return null;
  };

  const restrictedMenuItem = ({ route, title, ...rest }: MenuItemProps) => {
    const restProps = { ...(rest: $Rest<Object, MenuItemProps>) };
    if (
      isLoggedIn &&
      hasPermission(currentUser, route) &&
      hasAccess(currentUser, route)
    ) {
      return (
        <Menu.Item key={`/${route}`} {...restProps}>
          {title}
        </Menu.Item>
      );
    }
    return null;
  };

  const paths: Array<string> = pathname.split('/').filter((i: string) => i);

  const breadcrumbItems: Array<React$Element<any>> = paths.map(
    (item: string, index: number) => {
      const url: string = `/${paths.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{startCase(item)}</Link>
        </Breadcrumb.Item>
      );
    }
  );

  /* Drawer */

  return (
    <div>
      {/* Always fall back to default htmltitle if screen does not specify its own */}
      <HtmlTitle />
      <Layout>
        <Header className="app-header">
          <Link to="/" className="logo" />
          <SidebarDrawer
            restrictedMenuItem={restrictedMenuItem}
            restrictedSubMenu={restrictedSubMenu}
            loggedInMenuItem={loggedInMenuItem}
            loggedOutMenuItem={loggedOutMenuItem}
          />
          <Menu
            className="app-header-menu"
            theme="light"
            mode="horizontal"
            onClick={({ key }) => redirect(key)}
          >
            {restrictedSubMenu({
              route: 'admin',
              title: 'Admin',
              menus: [
                restrictedMenuItem({
                  route: 'admin/companies',
                  title: 'Companies'
                }),
                restrictedMenuItem({
                  route: 'admin/sessions',
                  title: 'Student Session'
                }),
                restrictedMenuItem({
                  route: 'admin/categories',
                  title: 'Categories'
                }),
                restrictedMenuItem({
                  route: 'admin/roles',
                  title: 'Roles'
                }),
                restrictedMenuItem({
                  route: 'admin/users',
                  title: 'Users'
                }),
                restrictedMenuItem({
                  route: 'admin/programmes',
                  title: 'Programmes'
                }),
                restrictedMenuItem({
                  route: 'admin/mailtemplates',
                  title: 'Mailtemplates'
                }),
                restrictedMenuItem({
                  route: 'admin/deadlines',
                  title: 'Deadlines'
                }),
                restrictedMenuItem({
                  route: 'admin/statistics',
                  title: 'Statistics'
                })
              ]
            })}
            {restrictedSubMenu({
              route: 'session',
              title: 'Student Session',
              menus: [
                restrictedMenuItem({
                  route: 'session/application',
                  title: 'Apply',
                  disabled:
                    process.env.REACT_APP_STUDENT_SESSION_ENABLED !== 'true'
                }),
                restrictedMenuItem({
                  route: 'session/applications',
                  title: 'View Applications'
                }),
                restrictedMenuItem({
                  route: 'session/companies',
                  title: 'View Companies'
                }),
                restrictedMenuItem({
                  route: 'session/approved',
                  title: 'View Approved Applications'
                })
              ]
            })}
            {restrictedSubMenu({
              route: 'company',
              title: 'Your Company',
              menus: [
                restrictedMenuItem({
                  route: 'company/profile',
                  title: 'Company Profile'
                }),
                restrictedMenuItem({
                  route: 'company/applications',
                  title: 'Applications'
                }),
                restrictedMenuItem({
                  route: 'company/timeslots',
                  title: 'Time Slots'
                }),
                restrictedMenuItem({
                  route: 'company/scans',
                  title: 'Student Scans'
                })
              ]
            })}
            {isLoggedIn ? loggedInMenuItem() : loggedOutMenuItem()}
          </Menu>
        </Header>
        <Content className="app-content">
          <Breadcrumb className="app-breadcrumb">
            <Breadcrumb.Item key="home">
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {breadcrumbItems}
          </Breadcrumb>
          <Layout className="app-inner">
            <Content>{routes}</Content>
          </Layout>
        </Content>
        <Footer />
      </Layout>
    </div>
  );
};

export default App;
