import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneTask } from '../../../api/taskApi';
import { useDispatch } from 'react-redux';
const SlideTask = React.lazy(() => import('components/Task/Slide/SlideTask'));

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { task } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/task', { replace: true });
    }, 300);
    setOpen(false);
    closeSlide();
  };
  const closeSlide = () => {
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
        <Await resolve={task}>
          <SlideTask closeSlide={closeSlide} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderTaskSlide = async ({ request, params }) => {
  const { id } = params;
  return { task: getOneTask(id) };
};

export default SuspenseSlideTask;
