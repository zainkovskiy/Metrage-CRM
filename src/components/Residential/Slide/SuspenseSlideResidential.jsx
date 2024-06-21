import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getSlideResidential } from 'api/residential';
import { useDispatch, useSelector } from 'react-redux';
import { getResidentialMiniCard } from '../../../store/slices/residentialSlice';
const SlideResidential = React.lazy(() =>
  import('components/Residential/Slide/SlideResidential')
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const SuspenseSlideResidential = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewCard = useSelector((state) => state.residential.viewCard);
  const params = useParams();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { residential } = useLoaderData() || {};
  const handleClose = () => {
    setTimeout(() => {
      if (viewCard === 'cards') {
        dispatch(getResidentialMiniCard(params.id));
      }
      navigate('/residential', { replace: true });
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
        <Await resolve={residential}>
          <SlideResidential onCloseSlide={() => setOpen(false)} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderResidentialSlide = async ({ request, params }) => {
  const { id } = params;
  return { residential: getSlideResidential(id) };
};

export default SuspenseSlideResidential;
