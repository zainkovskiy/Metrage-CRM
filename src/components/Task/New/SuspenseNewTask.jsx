import React, { Suspense, useState } from 'react';
import Loader from 'components/Main/Loader';
import SlideWindow from 'components/Main/SlideWindow';
import { useLoaderData, useNavigate, Await } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { getOneTask } from '../../../api/taskApi';
import { useDispatch } from 'react-redux';
import { addNewTaskCard } from '../../../store/taskSlice';
const NewTask = React.lazy(() => import('components/Task/New/NewTask'));

const SuspenseNewTask = () => {
  const { task } = useLoaderData() || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const handleClose = (uid) => {
    if (uid && uid?.type !== 'click') {
      setTimeout(() => {
        dispatch(addNewTaskCard(uid));
        navigate(`/task/${uid}`, { replace: true });
      }, 300);
      setOpen(false);
      return;
    }
    setTimeout(() => {
      navigate('/task', { replace: true });
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
        <Await resolve={task}>
          <NewTask onClose={handleClose} />
        </Await>
      </Suspense>
    </SlideWindow>
  );
};
export const loaderEditTask = async ({ request, params }) => {
  const { id } = params;
  return { task: getOneTask(id) };
};
export default SuspenseNewTask;
