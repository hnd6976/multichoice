import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const ListDocument = Loadable(lazy(() => import('./shared/ListDocument')));
const AddDocument = Loadable(lazy(() => import('./shared/AddDocument')));
const EditDocument = Loadable(lazy(() => import('./shared/EditDocument')));
const DocumentCharts = Loadable(lazy(() => import('./DocumentCharts')));
const ListTransaction = Loadable(lazy(() => import('./shared/ListTransaction')));
const documentRoutes = [
  {
    path: '/document/list',
    element: <ListDocument />,
  },
  {
    path: '/document/add',
    element: <AddDocument />,
  },
  {
    path: '/document/edit',
    element: <EditDocument />,
  },
  {
    path: '/document/charts',
    element: <DocumentCharts />,
  },
  {
    path: '/document/listTransaction',
    element: <ListTransaction />,
  },
];

export default documentRoutes;
