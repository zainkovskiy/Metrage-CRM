import React, { useState } from 'react';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { SlideBlockStyle } from '../ObjectsStyle';
import { copyObjects, sendPhotoToTg } from '../../../api/objectAPI';

const SlideObjectButtons = ({ onCloseSlide }) => {
  const object = useAsyncValue();
  const navigate = useNavigate();
  const [disPhoto, setDisPhoto] = useState(false);
  const [disCopy, setDisCopy] = useState(false);
  const clickEdit = () => {
    setTimeout(() => {
      navigate(`/objects/edit/${object?.typeEstate}/${object?.UID}`, {
        replace: true,
      });
    }, 300);
    onCloseSlide();
  };
  const getPhoto = () => {
    setDisPhoto(true);
    sendPhotoToTg({
      UID: object.UID,
      type: object.subTypeEstate,
    });
  };
  const copyObj = () => {
    setDisCopy(true);
    copyObjects({
      UID: object.UID,
      type: object.subTypeEstate,
    });
  };
  return (
    <SlideBlockStyle>
      <Box jc='space-between' fullWidth>
        <Box jc='flex-start' fullWidth>
          {(object?.subTypeEstate === 'live' ||
            object?.subTypeEstate === 'Business') && (
            <>
              {object?.isExclusive && (
                <>
                  <ButtonLink
                    size={12}
                    color='#000'
                    onClick={getPhoto}
                    disabled={disPhoto}
                  >
                    Получить фото
                  </ButtonLink>
                  <ButtonLink
                    size={12}
                    color='#000'
                    onClick={copyObj}
                    disabled={disCopy}
                  >
                    Копировать
                  </ButtonLink>
                </>
              )}
            </>
          )}
        </Box>
        <ButtonLink size={12} color='#000' onClick={clickEdit}>
          Редактировать
        </ButtonLink>
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideObjectButtons;
