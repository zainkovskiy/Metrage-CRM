import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getDefaultDDS, getSlidetDDS } from '../../../api/ddsApi';
import SlideDDS from './SlideDDS';

const SuspenseNewDDS = () => {
  const { dds } = useLoaderData() || {};
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/dds', { replace: true });
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
        <Await resolve={dds}>
          <SlideDDS onClose={handleClose} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};
export const loaderDDSSlide = async ({ request, params }) => {
  const { id } = params;
  return { dds: id ? getSlidetDDS(id) : getDefaultDDS() };
};
export default SuspenseNewDDS;
