import React from 'react';
import { useSelector } from 'react-redux';
import { Circle, YMaps, Map } from 'react-yandex-maps';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { TaskSlideTitleStyle } from './TaskStyle';

const TaskObjectInfoStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const TaskObjectInfo = () => {
  const demand = useSelector((state) => state?.task?.openTask?.demand);
  return (
    <TaskObjectInfoStyle>
      <TaskSlideTitleStyle>Потребность</TaskSlideTitleStyle>
      <TextSpanStyle>{demand?.typePlace}</TextSpanStyle>
      {
        demand?.address?.value &&
        <TextSpanStyle>{demand?.address?.value}</TextSpanStyle>
      }
      {
        demand?.cords &&
        <YMaps >
          <Map
            defaultState={{ center: demand.cords[0], zoom: 12 }}
            width={'100%'}
            height={250}
          >
            <Circle geometry={demand?.cords} />
          </Map>
        </YMaps>
      }
    </TaskObjectInfoStyle>
  );
};

export default TaskObjectInfo;