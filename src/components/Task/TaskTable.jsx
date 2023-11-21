import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from 'components/Main/Loader';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { Box } from 'ui/Box';
import { getMoreApplication } from 'store/applicationSlice';
import { useDateFormat } from 'hooks/DateFormat';

const TaskTableStyle = styled.div`
  height: 100%;
  overflow: auto;
`;
const TableStyle = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  position: relative;
`;
const TableHeader = styled.thead`
  font-family: ${({ theme }) => theme.font.familyBold};
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  & > tr > th {
    padding: 0.3rem;
  }
`;
const TableLine = styled(motion.tr)`
  ${({ $deadline }) => $deadline && 'background: #eda4a4;'};
  cursor: pointer;
  transition: background 0.3s;
  &: hover {
    background: #e6b2f0;
  }
  & > td {
    padding: 0.3rem;
  }
`;
const IconAvatar = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 40px;
`;
const NotifyCount = styled(motion.span)`
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0bc60b;
  color: #fff;
  padding: 0 0.2rem;
  box-sizing: border-box;
  border-radius: 40px;
  font-size: 10px;
`;
const NotifyCountZero = styled(motion.span)`
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 0.2rem;
  box-sizing: border-box;
  border-radius: 40px;
  font-size: 10px;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const TaskTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isButtonMore, setIsButtonMore] = useState(true);
  // const applications = useSelector((state) => state.application.applications);
  const loading = useSelector((state) => state.task.loadingList);
  const tasks = useSelector((state) => state.task.taskData?.tasks || []);
  // const loadingMore = useSelector((state) => state.application.loadingMore);

  const more = () => {
    dispatch(getMoreApplication())
      .unwrap()
      .then((data) => {
        if (data?.length < 30) {
          setIsButtonMore(false);
        }
      });
  };
  const navigateTo = (uid) => {
    navigate(`${uid}`);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <TaskTableStyle>
      <TableStyle>
        <TableHeader>
          <tr>
            <th>Название</th>
            <th>Стадия</th>
            <th>Активность</th>
            <th>Крайний срок</th>
            <th>Постановщик</th>
            <th>Ответственный</th>
          </tr>
        </TableHeader>
        <tbody>
          <AnimatePresence>
            {tasks.map((task) => (
              <TableLine
                key={task.UID}
                onClick={() => {
                  navigateTo(task.UID);
                }}
                variants={variants}
                initial='hidden'
                animate='visible'
                $deadline={task?.isOverdue || false}
              >
                <td>{task?.title}</td>
                <td>{task?.importance}</td>
                <td>
                  <Box jc='flex-start'>
                    {useDateFormat(task?.activity, 'DD.MM.YY')}
                    <AnimatePresence>
                      {task?.notify > 0 ? (
                        <NotifyCount
                          variants={variants}
                          exit='hidden'
                          initial='hidden'
                          animate='visible'
                        >
                          {task?.notify}
                        </NotifyCount>
                      ) : (
                        <NotifyCountZero />
                      )}
                    </AnimatePresence>
                  </Box>
                </td>
                <td>{useDateFormat(task?.duedate, 'DD.MM.YY')}</td>
                <td>
                  <Box jc='flex-start'>
                    <IconAvatar src={task?.creator?.avatar} />
                    {task?.creator?.lastName || ''}{' '}
                    {task?.creator?.firstName || ''}
                  </Box>
                </td>
                <td>
                  <Box jc='flex-start'>
                    <IconAvatar src={task?.responsible?.avatar} />
                    {task?.responsible?.lastName || ''}{' '}
                    {task?.responsible?.firstName || ''}
                  </Box>
                </td>
              </TableLine>
            ))}
          </AnimatePresence>
        </tbody>
      </TableStyle>
      {/* <AnimatePresence>
        {isButtonMore && (
          <ButtonLoader onClick={more} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence> */}
    </TaskTableStyle>
  );
};

export default TaskTable;
