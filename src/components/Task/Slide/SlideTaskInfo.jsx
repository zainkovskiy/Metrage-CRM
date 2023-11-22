import React, { useEffect, useRef, useState } from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import { ButtonLink } from 'ui/ButtonLink';
import { useSelector } from 'react-redux';
import { device } from 'styles/device';

const SlideTaskInfoStyle = styled(SliderBlock)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TaskDescriptionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media ${device.tablet} {
    min-height: 200px;
  }
`;
const TaskDescription = styled.textarea`
  border-radius: 5px;
  width: 100%;
  ${({ $height }) => $height && `min-height: ${$height}px;`}
  overflow: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  resize: none;
  font-family: ${({ theme }) => theme.font.family};
  outline: none;
`;
const SlideTaskInfo = ({ closeSlide }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const task = useAsyncValue();
  const [heightArea, setHeightArea] = useState(null);
  const areaContainerRef = useRef(null);

  useEffect(() => {
    if (areaContainerRef.current) {
      setHeightArea(areaContainerRef.current.clientHeight || null);
    }
  }, []);

  const clickEdit = () => {
    setTimeout(() => {
      navigate(`/task/edit/${task?.UID}`, {
        replace: true,
      });
    }, 300);
    closeSlide();
  };
  const isShowButton = () => {
    if (task?.creatorId?.UID === user?.UID) {
      return true;
    } else {
      if (user?.isAdmin === '1') {
        return true;
      }
    }
    return false;
  };
  return (
    <SlideTaskInfoStyle>
      <SliderTitle>
        {task.title}
        {isShowButton() && (
          <ButtonLink color='#786464' size={12} onClick={clickEdit}>
            Редактировать
          </ButtonLink>
        )}
      </SliderTitle>
      <TaskDescriptionContainer ref={areaContainerRef}>
        <TaskDescription
          value={task.description || ''}
          readOnly
          $height={heightArea}
        />
      </TaskDescriptionContainer>
    </SlideTaskInfoStyle>
  );
};

export default SlideTaskInfo;
