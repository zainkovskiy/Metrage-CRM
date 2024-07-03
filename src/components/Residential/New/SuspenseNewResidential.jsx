import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
const NewResidential = React.lazy(() =>
  import('components/Residential/New/NewResidential')
);

const SuspenseNewResidential = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const handleClose = (newResidential) => {
    setTimeout(() => {
      if (newResidential?.UID) {
        navigate(`/residential/${newResidential.UID}`, { replace: true });
        return;
      }
      navigate('/residential', { replace: true });
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
        <NewResidential onClose={handleClose} />
      </Suspense>
    </SlideWindow>
  );
};
export default SuspenseNewResidential;
