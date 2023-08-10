import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from "components/Main/SlideWindow";
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneObject } from 'api/objectAPI';
const NewObject = React.lazy(() => import('components/Objects/New/NewObject'));

const SuspenseNewObjects = () => {
  const { object } = useLoaderData() || {};
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
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
    return '50%';
  }
  return (
    <SlideWindow open={open} onClose={handleClose} width={getWidth()}>
      <Suspense fallback={<Loader />}>
        <Await resolve={object}>
          <NewObject onClose={handleClose}/>
        </Await>
      </Suspense>
    </SlideWindow>
  );
};
export const loaderEditSlide = async ({ request, params }) => {
  const { objectId, category } = params;
  return { object: getOneObject(objectId, category, true) }
}
export default SuspenseNewObjects;