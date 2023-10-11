import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneClient } from '../../../api/clientAPI';
const SlideClient = React.lazy(() =>
  import('components/Client/Slide/SlideClient')
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideClient = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { client } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/client', { replace: true });
    }, 300);
    setOpen(false);
  };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '70%';
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
        <Await resolve={client}>
          <SlideClient />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderClientSlide = async ({ request, params }) => {
  // const { id } = params;
  const id = 13320;
  return { client: getOneClient(id) };
};

export default SuspenseSlideClient;
