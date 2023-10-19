import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

import SuspenseApplication from 'components/Application/SuspenseApplication';
import SuspenseSlideApplication from 'components/Application/Slide/SuspenseSlideApplication';
import { loaderOpenSlide } from 'components/Application/Slide/SuspenseSlideApplication';
import SuspenseNewApplication from 'components/Application/New/SuspenseNewApplication';
import { newTaskLoader } from 'components/Application/New/SuspenseNewApplication';

import SuspenseObjects from 'components/Objects/SuspenseObjects';
import SuspenseNewObjects from 'components/Objects/New/SuspenseNewObjects';
import { loaderEditSlide } from 'components/Objects/New/SuspenseNewObjects';
import SuspenseSlideObjects from 'components/Objects/Slide/SuspenseSlideObjects';
import { loaderObjectSlide } from 'components/Objects/Slide/SuspenseSlideObjects';

import TaskContent from 'components/Task/TaskContent';
import SuspenceDeal from 'components/Deal/SuspenceDeal';
import SuspenseNewDeal from 'components/Deal/New/SuspenseNewDeal';
import SuspenseSlideDeal from 'components/Deal/Slide/SuspenseSlideDeal';
import { loaderDealSlide } from 'components/Deal/Slide/SuspenseSlideDeal';

import SuspenceCompilations from 'components/Compilations/SuspenceCompilations';
import SuspenseSlideCompilations from 'components/Compilations/Slide/SuspenseSlideCompilations';
import { loaderCompilationSlide } from 'components/Compilations/Slide/SuspenseSlideCompilations';

import SuspenceClient from 'components/Client/SuspenceClient';
import SuspenseSlideClient from 'components/Client/Slide/SuspenseSlideClient';
import { loaderClientSlide } from 'components/Client/Slide/SuspenseSlideClient';

import SuspenceUser from 'components/User/SuspenceUser';
import SuspenseSlideUser from 'components/User/Slide/SuspenseSlideUser';

import SuspenceDashboard from 'components/Dashboard/SuspenceDashboard';
// import SuspenseSlideUser from 'components/User/Slide/SuspenseSlideUser';

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <SuspenceDashboard />,
        children: [
          // {
          //   path: 'new',
          //   element: <SuspenseNewDeal />
          // },
          // {
          //   path: ':id',
          //   element: <SuspenseSlideUser />,
          //   // loader: loaderDealSlide,
          // },
        ],
      },
      {
        path: 'application',
        element: <SuspenseApplication />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewApplication />,
            loader: newTaskLoader,
          },
          {
            path: 'new/:chatId',
            element: <SuspenseNewApplication />,
            loader: newTaskLoader,
          },
          {
            path: ':appId',
            element: <SuspenseSlideApplication />,
            loader: loaderOpenSlide,
          },
        ],
      },
      {
        path: 'task',
        element: <TaskContent />,
      },
      {
        path: 'objects',
        element: <SuspenseObjects />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewObjects />,
          },
          {
            path: ':category/:objectId',
            element: <SuspenseSlideObjects />,
            loader: loaderObjectSlide,
          },
          {
            path: 'edit/:category/:objectId',
            element: <SuspenseNewObjects />,
            loader: loaderEditSlide,
          },
        ],
      },
      {
        path: 'deal',
        element: <SuspenceDeal />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewDeal />,
          },
          {
            path: ':dealId',
            element: <SuspenseSlideDeal />,
            loader: loaderDealSlide,
          },
        ],
      },
      {
        path: 'compilation',
        element: <SuspenceCompilations />,
        children: [
          {
            path: ':compilationId',
            element: <SuspenseSlideCompilations />,
            loader: loaderCompilationSlide,
          },
        ],
      },
      {
        path: 'client',
        element: <SuspenceClient />,
        children: [
          // {
          //   path: 'new',
          //   element: <SuspenseNewDeal />
          // },
          {
            path: ':id',
            element: <SuspenseSlideClient />,
            loader: loaderClientSlide,
          },
        ],
      },
      {
        path: 'users',
        element: <SuspenceUser />,
        children: [
          // {
          //   path: 'new',
          //   element: <SuspenseNewDeal />
          // },
          {
            path: ':id',
            element: <SuspenseSlideUser />,
            // loader: loaderDealSlide,
          },
        ],
      },
      {
        path: 'users',
        element: <SuspenceUser />,
        children: [
          // {
          //   path: 'new',
          //   element: <SuspenseNewDeal />
          // },
          {
            path: ':id',
            element: <SuspenseSlideUser />,
            // loader: loaderDealSlide,
          },
        ],
      },
      {
        path: 'home',
        element: <p>home</p>,
      },
      {
        path: '*',
        element: <p>page not found</p>,
      },
    ],
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
    element: <p>page not found</p>,
  },
]);
