import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getSlideFixation } from '../../../api/fixationApi';
const SlideFixation = React.lazy(() =>
  import('components/Fixation/Slide/SlideFixation')
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideFixation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { fixation } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/clientFixation', { replace: true });
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
        <Await resolve={fixation}>
          <SlideFixation />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderFixationSlide = async ({ request, params }) => {
  const { id } = params;
  return { fixation: getSlideFixation(id) };
};

export default SuspenseSlideFixation;
