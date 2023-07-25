import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from "components/Main/SlideWindow";
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
const SlideObject = React.lazy(() => import('components/Objects/Slide/SlideObject'));

const SuspenseNewObjects = () => {
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
        <SlideObject />
      </Suspense>
    </SlideWindow>
  );
};

export default SuspenseNewObjects;