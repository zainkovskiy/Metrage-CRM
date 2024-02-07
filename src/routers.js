import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

import SuspenseTask from 'components/Task/SuspenseTask';
import SuspenseSlideTask from 'components/Task/Slide/SuspenseSlideTask';
import { loaderTaskSlide } from 'components/Task/Slide/SuspenseSlideTask';
import SuspenseNewTask from 'components/Task/New/SuspenseNewTask';
import { loaderEditTask } from 'components/Task/New/SuspenseNewTask';

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
import SuspenseNewClient from 'components/Client/New/SuspenseNewClient';
import { loaderClientSlide } from 'components/Client/Slide/SuspenseSlideClient';

import SuspenceUser from 'components/User/SuspenceUser';
import SuspenseSlideUser from 'components/User/Slide/SuspenseSlideUser';
import SuspenseNewUser from './components/User/New/SuspenseNewUser';
import { loaderUserSlide } from 'components/User/Slide/SuspenseSlideUser';

import SuspenseNews from 'components/News/SuspenseNews';
import SuspenseSlideNews from 'components/News/Slide/SuspenseSlideNews';
import { loaderNewsSlide } from 'components/News/Slide/SuspenseSlideNews';
import SuspenseNewNews from './components/News/New/SuspenseNewNews';
import { loaderEditNewsSlide } from './components/News/New/SuspenseNewNews';

import SuspenseResidential from 'components/Residential/SuspenseResidential';
import SuspenseSlideResidential from './components/Residential/Slide/SuspenseSlideResidential';
import { loaderResidentialSlide } from './components/Residential/Slide/SuspenseSlideResidential';
import SuspenseNewResidential from './components/Residential/New/SuspenseNewResidential';

import SuspenceBuilder from 'components/Builder/SuspenceBuilder';
import SuspenseSlideBuilder from './components/Builder/Slide/SuspenseSlideBuilder';
import { loaderBuilderSlide } from './components/Builder/Slide/SuspenseSlideBuilder';
import SuspenseNewBuilder from './components/Builder/New/SuspenseNewBuilder';

import SuspensePlanning from 'components/Planning/SuspensePlanning';
import SuspenseSlidePlanning from 'components/Planning/Slide/SuspenseSlidePlanning';
import { loaderPlanSlide } from 'components/Planning/Slide/SuspenseSlidePlanning';
import SuspenseNewPlunning from './components/Planning/New/SuspenseNewPlunning';

// import SuspenseCalendar from 'components/Calendar/SuspenseCalendar';
// import SuspenseSlidePlanning from 'components/Planning/Slide/SuspenseSlidePlanning';
// import { loaderPlanSlide } from 'components/Planning/Slide/SuspenseSlidePlanning';
// import SuspenseNewPlunning from './components/Planning/New/SuspenseNewPlunning';

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
          {
            path: 'new',
            element: <SuspenseNewClient />,
          },
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
          {
            path: 'new',
            element: <SuspenseNewUser />,
          },
          {
            path: ':id',
            element: <SuspenseSlideUser />,
            loader: loaderUserSlide,
          },
        ],
      },
      {
        path: 'task',
        element: <SuspenseTask />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewTask />,
          },
          {
            path: ':id',
            element: <SuspenseSlideTask />,
            loader: loaderTaskSlide,
          },
          {
            path: 'edit/:id',
            element: <SuspenseNewTask />,
            loader: loaderEditTask,
          },
        ],
      },
      {
        path: 'news',
        element: <SuspenseNews />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewNews />,
          },
          {
            path: ':id',
            element: <SuspenseSlideNews />,
            loader: loaderNewsSlide,
          },
          {
            path: 'edit/:id',
            element: <SuspenseNewNews />,
            loader: loaderEditNewsSlide,
          },
        ],
      },
      {
        path: 'builder',
        element: <SuspenceBuilder />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewBuilder />,
          },
          {
            path: ':id',
            element: <SuspenseSlideBuilder />,
            loader: loaderBuilderSlide,
          },
          // {
          //   path: 'edit/:id',
          //   element: <SuspenseNewNews />,
          //   loader: loaderEditNewsSlide,
          // },
        ],
      },
      {
        path: 'residential',
        element: <SuspenseResidential />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewResidential />,
          },
          {
            path: ':id',
            element: <SuspenseSlideResidential />,
            loader: loaderResidentialSlide,
          },
          // {
          //   path: 'edit/:id',
          //   element: <SuspenseNewNews />,
          //   loader: loaderEditNewsSlide,
          // },
        ],
      },
      {
        path: 'planning',
        element: <SuspensePlanning />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewPlunning />,
          },
          {
            path: ':id',
            element: <SuspenseSlidePlanning />,
            loader: loaderPlanSlide,
          },
          // {
          //   path: 'edit/:id',
          //   element: <SuspenseNewNews />,
          //   loader: loaderEditNewsSlide,
          // },
        ],
      },
      // {
      //   path: 'calendar',
      //   element: <SuspenseCalendar />,
      //   children: [
      //     // {
      //     //   path: 'new',
      //     //   element: <SuspenseNewPlunning />,
      //     // },
      //     // {
      //     //   path: ':id',
      //     //   element: <SuspenseSlidePlanning />,
      //     //   loader: loaderPlanSlide,
      //     // },
      //     // {
      //     //   path: 'edit/:id',
      //     //   element: <SuspenseNewNews />,
      //     //   loader: loaderEditNewsSlide,
      //     // },
      //   ],
      // },
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
