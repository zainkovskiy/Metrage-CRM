import React, { Suspense, useState } from 'react';
import { Await, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import styled from 'styled-components';

import Loader from "components/Main/Loader";
import SlideWindow from "components/Main/SlideWindow";
const TaskSlide = React.lazy(() => import('./TaskSlide'));
import { getApplicationData } from 'api/application';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const SuspenseSlideApplication = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { application } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/', {replace: true});
    }, 300)
    setOpen(false);
  }
  return (
    <SlideWindow width='70%' onClose={handleClose} open={open}>
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