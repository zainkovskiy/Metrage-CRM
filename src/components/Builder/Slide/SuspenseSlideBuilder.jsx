import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneBuilder } from 'api/builderAPI';
import { getBuilderMiniCard } from '../../../store/slices/builderSlice';
import { useDispatch } from 'react-redux';
const SliderBuilder = React.lazy(() =>
  import('components/Builder/Slide/SliderBuilder')
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideBuilder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { builder } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      if (params?.id) {
        dispatch(getBuilderMiniCard(params.id));
      }
      navigate('/builder', { replace: true });
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
        <Await resolve={builder}>
          <SliderBuilder onCloseSlide={() => setOpen(false)} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderBuilderSlide = async ({ request, params }) => {
  const { id } = params;
  return { builder: getOneBuilder(id) };
};

export default SuspenseSlideBuilder;
