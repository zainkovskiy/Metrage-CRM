import React, { Suspense, useState } from 'react';
import { useNavigate, useLoaderData, Await } from 'react-router-dom';
import styled from 'styled-components';
import { getDetailForNewApp } from 'api/application';
import { useWindowSize } from 'hooks/windowSize';

import SlideWindow from 'components/Main/SlideWindow';
import Loader from 'components/Main/Loader';
const NewApplication = React.lazy(() =>
  import('components/Application/New/NewApplication')
);

const LoaderContainer = styled.div`
  display: flex;
  height: 100%;
`;

const SuspenseNewApplication = () => {
  const { detailData } = useLoaderData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 300);
    setOpen(false);
  };
  const getWidth = () => {
    if (windowSize < 768) {
      return '100%';
    }
    if (windowSize < 1024) {
      return '50%';
    }
    return '30%';
  };
  return (
    <SlideWindow open={open} onClose={handleClose} width={getWidth()}>
      <Suspense
        fallback={
          <LoaderContainer>
            <Loader fill='#fff' />
          </LoaderContainer>
        }
      >
        <Await resolve={detailData}>
          <NewApplication slideClose={handleClose} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const newTaskLoader = async ({ request, params }) => {
  const { chatId } = params;
  if (!chatId) {
    return { detailData: null };
  }
  return { detailData: getDetailForNewApp(chatId) };
};
export default SuspenseNewApplication;
