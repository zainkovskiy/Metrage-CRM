import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SlideWindow from "components/Main/SlideWindow";
import Loader from 'components/Main/Loader';
const NewTask = React.lazy(() => import('components/Application/NewTask'));

const SuspenseNewApplication = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 300)
    setOpen(false);
  }
  return (
    <SlideWindow open={open} onClose={handleClose} width='30%'>
      <Suspense fallback={<Loader fill='#fff'/>}>
        <NewTask />
      </Suspense>
    </SlideWindow>
  );
};

export default SuspenseNewApplication;