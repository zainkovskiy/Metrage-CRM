import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
const NewPlanning = React.lazy(() =>
  import('components/Planning/New/NewPlanning')
);
import { getOneNews } from 'api/newsApi';

const SuspenseNewPlunning = () => {
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const handleClose = (e, url) => {
    setTimeout(() => {
      // if (url) {
      //   navigate(url, { replace: true });
      // } else {
      //   navigate('/news', { replace: true });
      // }
      navigate('/planning', { replace: true });
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
      <NewPlanning />
    </SlideWindow>
  );
};

export default SuspenseNewPlunning;
