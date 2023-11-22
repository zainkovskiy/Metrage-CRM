import React, { useState } from 'react';
import { SlideBlockStyle } from '../ObjectsStyle';
import { SliderTitle } from '../../../styles/slider';
import SlideObjectAdItems from './SlideObjectAdItems';
import AreYouSure from '../AreYouSure';
import { ButtonLink } from 'ui/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import { useAsyncValue } from 'react-router-dom';
import { onRepublication } from '../../../api/objectAPI';
import { useSelector } from 'react-redux';

const SlideObjectAd = () => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [sure, setSure] = useState(false);
  const object = useAsyncValue();
  const handleClick = () => {
    setSure(!sure);
  };
  const sureAnswer = (answer) => {
    if (answer) {
      onRepublication({
        type: object?.typeEstate,
        UID: object?.UID,
      });
    }
    return;
  };
  return (
    <SlideBlockStyle $column gap='0'>
      <SliderTitle>
        Реклама
        {isAdmin === '1' && (
          <ButtonLink onClick={handleClick} size={12}>
            Перепубликовать
          </ButtonLink>
        )}
      </SliderTitle>
      <SlideObjectAdItems />
      {sure && (
        <DialogWindow open={sure} onClose={handleClick}>
          <AreYouSure cb={sureAnswer} onClose={handleClick} />
        </DialogWindow>
      )}
    </SlideBlockStyle>
  );
};

export default SlideObjectAd;
