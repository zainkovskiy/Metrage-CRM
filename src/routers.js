import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from './App';

import SuspenseApplication from "./components/Application/SuspenseApplication";
import { loaderApplications } from "components/Application/ApplicationContent";
const ApplicationOpenSlide = React.lazy(() => import('components/Application/ApplicationOpenSlide'));
import { loaderOpenSlide } from "components/Application/ApplicationOpenSlide";
import SuspenseNewApplication from "./components/Application/SuspenseNewApplication";
import { newTaskLoader } from 'components/Application/NewTask';

import TaskContent from "./components/Task/TaskContent";

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <SuspenseApplication />,
        loader: loaderApplications,
        children: [
          {
            path: '/new-app',
            element: <SuspenseNewApplication />,
            loader: newTaskLoader
          },
          {
            path: '/new-app/:chatId',
            element: <SuspenseNewApplication />,
            loader: newTaskLoader
          },
          {
            path: '/application/:appId',
            element: <ApplicationOpenSlide />,
            loader: loaderOpenSlide
          },
        ]
      },
      {
        path: 'task',
        element: <TaskContent />,
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
