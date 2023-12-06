import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneUser } from '../../../api/usersApi';
import { useDispatch } from 'react-redux';
import { getSliceUserMiniCard } from '../../../store/usersSlice';
const SlideNews = React.lazy(() => import('components/News/Slide/SlideNews'));

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideNews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { news } = useLoaderData() || {};
  const handleClose = () => {
    setTimeout(() => {
      // dispatch(getSliceUserMiniCard(params.id));
      navigate('/news', { replace: true });
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
        <Await resolve={news}>
          <SlideNews />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderNewsSlide = async ({ request, params }) => {
  const { id } = params;
  // return { user: getOneUser(id) };
  return { news: {} };
};

export default SuspenseSlideNews;
