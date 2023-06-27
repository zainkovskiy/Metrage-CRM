import React, { Suspense, useState } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Loader from "components/Main/Loader";
// import SlideWindow from "components/Main/SlideWindow";
// import TaskSlide from './TaskSlide';
const SlideWindow = React.lazy(() => import('components/Main/SlideWindow'));
const TaskSlide = React.lazy(() => import('./TaskSlide'));
import { getApplicationData } from 'api/application';
import { getTaskList } from 'store/taskSlice';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const ApplicationOpenSlide = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { application } = useLoaderData();

  const handleClose = () => {
    setTimeout(() => {
      navigate('/');
    }, 300)
    setOpen(false);
    dispatch(getTaskList());
  }
  return (
    <SlideWindow width='70%' onClose={handleClose} open={open}>
      <Suspense fallback={<LoaderContainer><Loader fill='#fff' /></LoaderContainer>}>
        <Await resolve={application}>
          <TaskSlide />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderOpenSlide = async ({ request, params }) => {
  const { appId } = params;
  return { application: getApplicationData(appId) }
}

export default ApplicationOpenSlide;