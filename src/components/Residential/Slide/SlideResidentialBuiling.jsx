import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Plus } from 'images/plus.svg';
import styled from 'styled-components';
import SlideResidentialAccordeon from './SlideResidentialAccordeon';

const ResidentialBuiling = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideResidentialBuiling = ({ building }) => {
  const [isActive, setIsActive] = useState([]);
  const onChangeIndex = (index) => {
    setIsActive((currentActiveIndex) => {
      if (currentActiveIndex.includes(index)) {
        return currentActiveIndex.filter((curIndex) => curIndex !== index);
      }
      return currentActiveIndex.concat(index);
    });
  };
  return (
    <ResidentialBuiling>
      <SliderTitle>
        <Box>
          Корпус {building.name}
          <TextSpanStyle size={12}>
            Сдача: {useDateFormat(building?.deadline, 'MMMM YYYY')}
          </TextSpanStyle>
        </Box>
        <ButtonLink size={12} color='#787878' onClick={() => {}}>
          Редактировать
        </ButtonLink>
      </SliderTitle>
      <div>
        <Box fullWidth jc='flex-start'>
          <TextSpanStyle>Менеджеры: </TextSpanStyle>
          <IconButton onClick={() => {}}>
            <Plus />
          </IconButton>
        </Box>
      </div>
      <TextSpanStyle>
        Предложений от застройщика: {building?.appartments?.length || 0}
      </TextSpanStyle>
      {building?.appartments.map((appartment, idx) => (
        <SlideResidentialAccordeon
          key={idx}
          idx={idx}
          appartment={appartment}
          isActive={isActive.includes(idx)}
          onChangeIndex={onChangeIndex}
        />
      ))}
    </ResidentialBuiling>
  );
};

export default SlideResidentialBuiling;
