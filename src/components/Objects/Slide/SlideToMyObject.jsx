import React, { useState } from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderBlock } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import { addToMyObject } from '../../../api/objectAPI';
const SlideToMyObject = () => {
  const object = useAsyncValue();
  const [showButton, setShowButton] = useState(true);
  const handleClick = () => {
    addToMyObject({
      UID: object?.UID,
      type: object?.subtypeEstate,
    }).then((answer) => {
      if (answer === 'OK') {
        setShowButton(false);
      }
    });
  };
  return (
    <SliderBlock>
      <Box jc='space-between' fullWidth>
        <Box column gap='0' ai='flex-start'>
          <TextSpanStyle size={12}>
            Брокер: {object?.broker || ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Телефон: {object?.phoneExternal || ''}
          </TextSpanStyle>
        </Box>
        {showButton ? (
          <ButtonUI onClick={handleClick} size='small'>
            В мои объекты
          </ButtonUI>
        ) : (
          <TextSpanStyle size={12}>Объект добавлен</TextSpanStyle>
        )}
      </Box>
    </SliderBlock>
  );
};

export default SlideToMyObject;
