import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import SlideWindow from "components/Main/SlideWindow";
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneObject } from 'api/objectAPI';
const SlideObject = React.lazy(() => import('components/Objects/Slide/SlideObject'));

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const SuspenseNewObjects = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { object } = useLoaderData();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/objects', { replace: true });
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
        <Await resolve={object}>
          <SlideObject onCloseSlide={() => setOpen(false)} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderObjectSlide = async ({ request, params }) => {
  const { objectId, category } = params;
  // 435
  return { object: getOneObject(objectId, category) }
}

export default SuspenseNewObjects;