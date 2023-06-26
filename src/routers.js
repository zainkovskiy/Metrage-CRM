import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from './App';
import NewTask, { newTaskLoader } from 'components/Application/NewTask';
const ApplicationContent = React.lazy(() => import('components/Application/ApplicationContent'));
// import Loader from "components/Main/Loader";
// import { Error403 } from "components/ErrorsComponents/Error403";
// import { Error404 } from "components/ErrorsComponents/Error404";
export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ApplicationContent />,
        children: [
          {
            path: '/new-app',
            element: <NewTask />,
            loader: newTaskLoader
          },
          {
            path: '/new-app/:chatId',
            element: <NewTask />,
            loader: newTaskLoader
          },
        ]
      },
      {
        path: 'home',
        element: <p>home</p>,
      },
      {
        path: '*',
        element: <p>page not found</p>
      }
    ]
  },
  // {
  //   path: 'engineer-works',
  //   element: <EngineeringWorks />
  // },
  // {
  //   path: '403',
  //   element: <Error403 />
  // },
  {
    path: '*',
    element: <p>page not found</p>
  },
])