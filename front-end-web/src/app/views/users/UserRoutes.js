import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const ListUser = Loadable(lazy(() => import('./shared/ListUser')));
const UserCharts = Loadable(lazy(() => import('./shared/UserCharts')));
const userRoutes = [
  {
    path: '/user/list',
    element: <ListUser />,
  },
  {
    path: '/user/charts',
    element: <UserCharts />,
  },
];

export default userRoutes;
