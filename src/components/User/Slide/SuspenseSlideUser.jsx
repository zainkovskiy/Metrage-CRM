import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
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
  // const { client } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/client', { replace: true });
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
        {/* <Await resolve={deal}> */}
        <SlideUser />
        {/* </Await> */}
      </Suspense>
    </SlideWindow>
  );
};

// export const loaderDealSlide = async ({ request, params }) => {
//   const { dealId } = params;
//   return { deal: getOneDeal(dealId) }
// }

export default SuspenseSlideUser;
