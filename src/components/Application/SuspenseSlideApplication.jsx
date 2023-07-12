import React, { Suspense, useState } from 'react';
import { Await, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import styled from 'styled-components';
import { useWindowSize } from 'hooks/windowSize';


import Loader from "components/Main/Loader";
import SlideWindow from "components/Main/SlideWindow";
const TaskSlide = React.lazy(() => import('./TaskSlide'));
import { getApplicationData } from 'api/application';
import { useDispatch } from 'react-redux';
import { editApplication } from 'store/applicationSlice';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const SuspenseSlideApplication = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { application } = useLoaderData();
  const windowSize = useWindowSize();
  const handleClose = () => {
    setTimeout(() => {
      application.then((app) => {
        dispatch(editApplication(app));
      })
      navigate('/', {replace: true});
    }, 300)
    setOpen(false);
  }
  const getWidth = () => {
    if (windowSize < 768) {
      return '100%';
    }
    return '70%';
  }
  return (
    <SlideWindow width={getWidth()} onClose={handleClose} open={open}>
      <Suspense fallback={<LoaderContainer><Loader fill='#fff' /></LoaderContainer>}>
        <Await resolve={application}>
          <TaskSlide closeSlide={handleClose}/>
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderOpenSlide = async ({ request, params }) => {
  const { appId } = params;
  return { application: getApplicationData(appId) }
}

export default SuspenseSlideApplication;