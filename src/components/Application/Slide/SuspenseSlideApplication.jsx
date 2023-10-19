import React, { Suspense, useState } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useWindowSize } from 'hooks/windowSize';
import { setUpdateApplication } from 'store/applicationSlice';

import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
const SlideApplication = React.lazy(() => import('./SlideApplication'));
import { getApplicationData } from 'api/application';
import { useDispatch } from 'react-redux';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideApplication = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { application } = useLoaderData();
  const windowSize = useWindowSize();
  const handleClose = () => {
    setTimeout(() => {
      application.then((app) => {
        dispatch(setUpdateApplication(app.UID));
      });
      navigate('/application', { replace: true });
    }, 300);
    setOpen(false);
  };
  const getWidth = () => {
    if (windowSize < 768) {
      return '100%';
    }
    return '70%';
  };
  return (
    <SlideWindow width={getWidth()} onClose={handleClose} open={open}>
      <Suspense
        fallback={
          <LoaderContainer>
            <Loader fill='#fff' />
          </LoaderContainer>
        }
      >
        <Await resolve={application}>
          <SlideApplication closeSlide={handleClose} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderOpenSlide = async ({ request, params }) => {
  const { appId } = params;
  return { application: getApplicationData(appId) };
};

export default SuspenseSlideApplication;
