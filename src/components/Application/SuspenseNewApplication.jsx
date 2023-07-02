import React, { Suspense, useState } from 'react';
import { useNavigate, useLoaderData, Await } from 'react-router-dom';
import styled from 'styled-components';
import { getDetailForNewApp } from 'api/application';

import SlideWindow from "components/Main/SlideWindow";
import Loader from 'components/Main/Loader';
const NewTask = React.lazy(() => import('components/Application/NewTask'));

const LoaderContainer = styled.div`
  display: flex;
  height: 100%;
`

const SuspenseNewApplication = () => {
  const { detailData } = useLoaderData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 300)
    setOpen(false);
  }
  return (
    <SlideWindow open={open} onClose={handleClose} width='30%'>
      <Suspense fallback={<LoaderContainer><Loader fill='#fff' /></LoaderContainer>}>
        <Await resolve={detailData}>
          <NewTask slideClose={handleClose}/>
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const newTaskLoader = async ({ request, params }) => {
  const { chatId } = params;
  if (!chatId) {
    return { detailData: null }
  }
  return { detailData: getDetailForNewApp(chatId) }
}

export default SuspenseNewApplication;