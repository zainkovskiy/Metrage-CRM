import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from './App';

import SuspenseApplication from "components/Application/SuspenseApplication";
import SuspenseSlideApplication from "components/Application/SuspenseSlideApplication";
import { loaderOpenSlide } from "components/Application/SuspenseSlideApplication";
import SuspenseNewApplication from "components/Application/SuspenseNewApplication";
import { newTaskLoader } from 'components/Application/SuspenseNewApplication';

import SuspenseObjects from "components/Objects/SuspenseObjects";
import SuspenseNewObjects from "components/Objects/New/SuspenseNewObjects";
import { loaderEditSlide } from 'components/Objects/New/SuspenseNewObjects';
import SuspenseSlideObjects from "components/Objects/Slide/SuspenseSlideObjects";
import { loaderObjectSlide } from 'components/Objects/Slide/SuspenseSlideObjects';

import TaskContent from "components/Task/TaskContent";
import SuspenceDeal from "components/Deal/SuspenceDeal";
import SuspenseNewDeal from "components/Deal/New/SuspenseNewDeal";
import SuspenseSlideDeal from "components/Deal/Slide/SuspenseSlideDeal";
import { loaderDealSlide } from 'components/Deal/Slide/SuspenseSlideDeal';

import SuspenceClient from "components/Client/SuspenceClient";
import SuspenseSlideClient from "components/Client/Slide/SuspenseSlideClient";

import SuspenceUser from "components/User/SuspenceUser";
import SuspenseSlideUser from "components/User/Slide/SuspenseSlideUser";


export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <SuspenseApplication />,
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
            element: <SuspenseSlideApplication />,
            loader: loaderOpenSlide,
          },
        ]
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
            element: <SuspenseNewObjects />
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
        ]
      },
      {
        path: 'deal',
        element: <SuspenceDeal />,
        children: [
          {
            path: 'new',
            element: <SuspenseNewDeal />
          },
          {
            path: ':dealId',
            element: <SuspenseSlideDeal />,
            loader: loaderDealSlide,
          },
        ]
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
            // loader: loaderDealSlide,
          },
        ]
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
