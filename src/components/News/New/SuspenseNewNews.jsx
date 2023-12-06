import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
const NewNews = React.lazy(() => import('components/News/New/NewNews'));

const SuspenseNewNews = () => {
  const { news } = useLoaderData() || {};
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();

  const handleClose = (e, url) => {
    setTimeout(() => {
      if (url) {
        navigate(url, { replace: true });
      } else {
        navigate('/news', { replace: true });
      }
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
      <Suspense fallback={<Loader />}>
        <Await resolve={news}>
          <NewNews onClose={handleClose} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};

export const loaderEditNewsSlide = async ({ request, params }) => {
  const { id } = params;
  // return { news: getOneObject(id) };
  return { news: {} };
};

export default SuspenseNewNews;
