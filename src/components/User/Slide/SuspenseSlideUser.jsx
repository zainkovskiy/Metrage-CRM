import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneUser } from '../../../api/usersApi';
const SlideUser = React.lazy(() => import('components/User/Slide/SlideUser'));

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { user } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/users', { replace: true });
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
        <Await resolve={user}>
          <SlideUser />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderUserSlide = async ({ request, params }) => {
  const { id } = params;
  return { user: getOneUser(id) };
};

export default SuspenseSlideUser;
