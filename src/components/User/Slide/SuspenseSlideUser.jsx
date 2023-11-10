import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneUser } from '../../../api/usersApi';
import { useDispatch } from 'react-redux';
import { getSliceUserMiniCard } from '../../../store/usersSlice';
const SlideUser = React.lazy(() => import('components/User/Slide/SlideUser'));

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { user } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      dispatch(getSliceUserMiniCard(params.id));
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
