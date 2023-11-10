import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
const NewUser = React.lazy(() => import('components/User/New/NewUser'));

const SuspenseNewUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/users', { replace: true });
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
        <NewUser onClose={handleClose} />
      </Suspense>
    </SlideWindow>
  );
};
export default SuspenseNewUser;
