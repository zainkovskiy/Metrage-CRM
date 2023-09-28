import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneCompilation } from 'api/compilationAPI';
const SlideCompilation = React.lazy(() =>
  import('components/Compilations/Slide/SlideCompilation')
);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const SuspenseNewDeal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { compilation } = useLoaderData();

  const handleClose = () => {
    setTimeout(() => {
      navigate('/compilation', { replace: true });
    }, 300);
    setOpen(false);
  };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '50%';
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
        <Await resolve={compilation}>
          <SlideCompilation
            onCloseSlide={() => setOpen(false)}
            onClose={handleClose}
          />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderCompilationSlide = async ({ request, params }) => {
  const { compilationId } = params;
  return { compilation: getOneCompilation(compilationId) };
};

export default SuspenseNewDeal;
