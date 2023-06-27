import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from './App';
const ApplicationContent = React.lazy(() => import('components/Application/ApplicationContent'));
const ApplicationOpenSlide = React.lazy(() => import('components/Application/ApplicationOpenSlide'));
import { loaderOpenSlide } from "components/Application/ApplicationOpenSlide";
const NewTask = React.lazy(() => import('components/Application/NewTask'));
import { newTaskLoader } from 'components/Application/NewTask';
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
          {
            path: '/application/:appId',
            element: <ApplicationOpenSlide />,
            loader: loaderOpenSlide
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