import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneDeal } from 'api/dealAPI';
import { useDispatch } from 'react-redux';
import { getDealList } from '../../../store/dealSlice';
const SlideDeal = React.lazy(() => import('components/Deal/Slide/SlideDeal'));

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseNewDeal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { deal } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      // dispatch(getDealList());
      navigate('/deal', { replace: true });
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
        <Await resolve={deal}>
          <SlideDeal onCloseSlide={() => setOpen(false)} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderDealSlide = async ({ request, params }) => {
  const { dealId } = params;
  return { deal: getOneDeal(dealId) };
};

export default SuspenseNewDeal;
