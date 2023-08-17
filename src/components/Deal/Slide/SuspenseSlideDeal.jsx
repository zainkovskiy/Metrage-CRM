import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from "components/Main/SlideWindow";
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneDeal } from 'api/dealAPI';
const SlideDeal = React.lazy(() => import('components/Deal/Slide/SlideDeal'));

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const SuspenseNewObjects = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { deal } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/deal', { replace: true });
    }, 300)
    setOpen(false);
  }
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '70%';
  }
  return (
    <SlideWindow open={open} onClose={handleClose} width={getWidth()}>
      <Suspense fallback={<LoaderContainer><Loader fill='#fff' /></LoaderContainer>}>
        <Await resolve={deal}>
          <SlideDeal onCloseSlide={() => setOpen(false)} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderDealSlide = async ({ request, params }) => {
  const { dealId } = params;
  return { deal: getOneDeal(dealId) }
}

export default SuspenseNewObjects;