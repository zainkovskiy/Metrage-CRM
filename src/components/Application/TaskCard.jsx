import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { motion } from 'framer-motion';
import { Box } from 'ui/Box';
import logoUrl, { ReactComponent as Logo } from 'images/logo_small.svg';
import doneUrl, { ReactComponent as Done } from 'images/done2.svg';

const TaskStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow .2s, transform .2s;
  height: 100%;
  @media (hover: hover){
    &:hover{
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0,0,0,0.75);
    }
  }
  @media (hover: none){
    &:active{
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0,0,0,0.75);
    }
  }
`
const TaskHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, $color }) => $color || theme.color.secondary};
  width: 100%;
  box-sizing: border-box;
`
const TaskSourceStyle = styled.img`
  width: 24px;
  height: 24px;
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
  border-radius: 40px 0;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
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
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`
const DoneIcon = styled(Done)`
  width: 24px;
  height: 24px;
  fill: green;  
`
const TextSpanEllipsis = styled(TextSpanStyle)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`
const TextHeaderContainer = styled.div`
  width: 50%;
  flex-grow: 1;
`
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0
  }
}
const Task = ({ task }) => {
  return (
    <LinkStyle to={`application/${task.UID}`}>
      <TaskStyle
        variants={variants}
        initial='hidden'
        animate='visible'
      >
        <TaskHeader $color={task?.color}>
          {
            task?.demand?.events !== 0 ? <TaskEvents size={12}>{task?.demand?.events}</TaskEvents> : <span></span>
          }
          <TextHeaderContainer>
            <TextSpanStyle align='end' color='#fff' size={10}>Клиент</TextSpanStyle>
            <TextSpanEllipsis align='end' color='#fff' size={12}>{task?.client?.title}</TextSpanEllipsis>
          </TextHeaderContainer>
        </TaskHeader>
        <TaskContent>
          <TextSpanStyle align='end' size={10}>Создано: {useDateFormat(task?.created)}</TextSpanStyle>
          <Box jc='space-between' ai='flex-start'>
            <TaskSourceStyle src={task?.source?.picture || logoUrl} alt="logo" />
            {
              task?.demand?.isChecked === '1' &&
              <DoneIcon />
            }
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
    </LinkStyle>
  );
};

export default Task;