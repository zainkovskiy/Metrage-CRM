import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { useDispatch } from 'react-redux';
import { getClientsList } from '../../../store/clientsSlice';
const NewClient = React.lazy(() => import('components/Client/New/NewClient'));

const SuspenseNewClient = () => {
  const { deal } = useLoaderData() || {};
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const handleClose = () => {
    setTimeout(() => {
      dispatch(getClientsList());
      navigate('/client', { replace: true });
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
        <Await resolve={deal}>
          <NewClient onClose={handleClose} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};
export default SuspenseNewClient;
