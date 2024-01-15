import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOnePlan } from 'api/planApi';
import { useDispatch } from 'react-redux';
import { getPlanMiniCard } from '../../../store/slices/plansSlice';
const SlidePlan = React.lazy(() =>
  import('components/Planning/Slide/SlidePlan')
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlidePlanning = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { plan } = useLoaderData() || {};
  const handleClose = () => {
    setTimeout(() => {
      dispatch(getPlanMiniCard(params.id));
      navigate('/planning', { replace: true });
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
        <Await resolve={plan}>
          <SlidePlan onCloseSlide={() => setOpen(false)} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};
export const loaderPlanSlide = async ({ request, params }) => {
  const { id } = params;
  return { plan: getOnePlan(id) };
};

export default SuspenseSlidePlanning;
