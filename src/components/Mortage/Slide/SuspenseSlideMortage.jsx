import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneClient } from '../../../api/clientAPI';
import { getOneMortage } from '../../../api/mortageAPI';
const SlideMortage = React.lazy(() =>
  import('components/Mortage/Slide/SlideMortage')
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseSlideMortage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { mortage } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/mortage', { replace: true });
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
        <Await resolve={mortage}>
          <SlideMortage />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderMortageSlide = async ({ request, params }) => {
  const { id } = params;
  return { mortage: getOneMortage(id) };
};

export default SuspenseSlideMortage;
