import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneEvent } from '../../../api/calendarApi';
const NewEvent = React.lazy(() => import('components/Calendar/New/NewEvent'));

const SuspenseNewEvent = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const handleClose = () => {
    setTimeout(() => {
      navigate('/calendar', { replace: true });
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
        <Await resolve={data?.event || null}>
          <NewEvent onClose={handleClose} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};
export const loaderCalendarSlide = async ({ request, params }) => {
  const { id } = params;
  return { event: getOneEvent(id) };
};
export default SuspenseNewEvent;
