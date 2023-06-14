import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { motion } from 'framer-motion';
import { Box } from 'ui/Box';
import logoUrl, { ReactComponent as Logo } from 'images/logo_small.svg';

const TaskStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow .2s, transform .2s;
  &:hover{
    transform: scale(1.03);
    box-shadow: 7px 8px 14px -6px rgba(0,0,0,0.75);
  }
`
const TaskHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, $color }) => $color || theme.color.secondary};
`
const TaskSourceStyle = styled.img`
  width: 25px;
  height: 25px;
  object-fit: contain;
`
const TaskContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #F5F5F5;
`
const TaskEvents = styled(TextSpanStyle)`
  border-radius: 40px;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  color: red;
`
const TextListStyle = styled.p`
  font-family: ${({ theme }) => theme.font.familyBold};
  font-size: 10px;
  display: flex;
  gap: 0.2rem;
  margin: 0;
  & > span {
    font-family: ${({ theme }) => theme.font.family};
  }
`
const TaskComment = styled(TextSpanStyle)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const TaskFooter = styled.div`
  background-color: #D9D9D9;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
`
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0
  }
}
const Task = ({ task, openTask }) => {
  const handleClick = () => {
    openTask(task.UID)
  }
  return (
    <TaskStyle
      onClick={handleClick}
      variants={variants}
      initial='hidden'
      animate='visible'
    >
      <TaskHeader $color={task?.color}>
        {
          task?.demand?.events !== 0 ? <TaskEvents size={12}>{task?.demand?.events}</TaskEvents> : <span></span>
        }
        <Box column gap='0' ai='flex-end'>
          <TextSpanStyle color='#fff' size={10}>Клиент</TextSpanStyle>
          <TextSpanStyle color='#fff' size={12}>{task?.client?.title}</TextSpanStyle>
        </Box>
      </TaskHeader>
      <TaskContent>
        <Box jc='space-between' ai='flex-start'>
          <TaskSourceStyle src={task?.source?.picture || logoUrl} alt="logo" />
          <TextSpanStyle size={10}>Создано: {useDateFormat(task?.created)}</TextSpanStyle>
        </Box>
        <TextListStyle>Источник: <span>{task?.source?.name}</span></TextListStyle>
        <TextListStyle>Статус: <span>{task?.status?.title}</span></TextListStyle>
        <TextListStyle>Потребность: <span>{task?.demand?.title}</span></TextListStyle>
        <TextListStyle>Тип: <span>{task?.demand?.typePlace}</span></TextListStyle>
        <TextListStyle>Примечание:</TextListStyle>
        <TaskComment size={10}>{task?.demand?.comment}</TaskComment>
      </TaskContent>
      <TaskFooter>
        <TextSpanStyle size={10}>Агент:</TextSpanStyle>
        <TextSpanStyle size={12}>{task?.responsible?.title}</TextSpanStyle>
      </TaskFooter>
    </TaskStyle>
  );
};

export default Task;