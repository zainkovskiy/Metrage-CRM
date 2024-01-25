import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
// import { getOneObject } from 'api/objectAPI';
const NewBuilder = React.lazy(() =>
  import('components/Builder/New/NewBuilder')
);

const SuspenseNewBuilder = () => {
  // const { deal } = useLoaderData() || {};
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const handleClose = (newBuilder) => {
    console.log(newBuilder);
    setTimeout(() => {
      if (newBuilder?.UID) {
        navigate(`/builder/${newBuilder.UID}`, { replace: true });
        return;
      }
      navigate('/builder', { replace: true });
    }, 300);
    setOpen(false);
  };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  return (
    <SlideWindow open={open} onClose={handleClose} width={getWidth()}>
      <Suspense fallback={<Loader />}>
        <NewBuilder onClose={handleClose} />
      </Suspense>
    </SlideWindow>
  );
};
// export const loaderEditSlide = async ({ request, params }) => {
//   const { objectId, category } = params;
//   return { object: getOneObject(objectId, category, true) }
// }
export default SuspenseNewBuilder;
