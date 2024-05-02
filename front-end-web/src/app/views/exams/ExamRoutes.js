import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const ListExam = Loadable(lazy(() => import('./shared/ListExam')));
const AddQuestion = Loadable(lazy(() => import('./shared/AddQuestion')));
const AddQuestionLittle = Loadable(lazy(() => import('./shared/AddQuestionLittle')));
const AddExam = Loadable(lazy(() => import('./shared/AddExam')));
const EditExam = Loadable(lazy(() => import('./shared/EditExam')));
const EditQuestion = Loadable(lazy(() => import('./shared/EditQuestion')));
const ListQuestion = Loadable(lazy(() => import('./shared/ListQuestion')));
const Test = Loadable(lazy(() => import('./shared/Test')));
const ExamCharts = Loadable(lazy(() => import('./shared/ExamCharts')));
const ListExamCompleted = Loadable(lazy(() => import('./shared/ListExamCompleted')));
const AddMultipleExam = Loadable(lazy(() => import('./shared/AddMultipleExam')));
const examRoutes = [
  {
    path: '/exam/test',
    element: <Test />,
  },
  {
    path: '/exam/list',
    element: <ListExam />,
  },
  {
    path: '/exam/addExam',
    element: <AddExam />,
  },
  {
    path: '/exam/editExam',
    element: <EditExam />,
  },
  {
    path: '/exam/addQuestion',
    element: <AddQuestion />,
  },
  {
    path: '/exam/addQuestionLittle',
    element: <AddQuestionLittle />,
  },
  {
    path: '/exam/editQuestion',
    element: <EditQuestion />,
  },
  {
    path: '/exam/listQuestion',
    element: <ListQuestion />,
  },
  {
    path: '/exam/charts',
    element: <ExamCharts />,
  },
  {
    path: '/exam/examCompleted',
    element: <ListExamCompleted />,
  },
  {
    path: '/exam/addMultipleExam',
    element: <AddMultipleExam />,
  },
];

export default examRoutes;
