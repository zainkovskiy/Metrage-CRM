import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import { IconButton } from '../../../ui/IconButton';
import { ReactComponent as Edit } from 'images/edit.svg';
import DialogWindow from 'components/Main/DialogWindow';
import DialogEditLogo from './DialogEditLogo';
import imgErrorUrl from 'images/img-error.svg';
import { useWindowSize } from 'hooks/windowSize';
import DialogEditComment from './DialogEditComment';
import DialogEditBuilder from './DialogEditBuilder';

const SliderInfoStyle = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const BuilderLogo = styled.img`
  object-fit: cover;
  width: 70px;
  height: 70px;
`;
const LogoContainer = styled(motion.div)`
  position: relative;
  display: flex;
`;
const ButtonEditContainer = styled(motion.div)`
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
`;
const TextDescription = styled(TextSpanStyle)`
  white-space: pre-wrap;
`;
const variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
};
const SliderInfo = () => {
  const [open, setOpen] = useState(false);
  const builder = useAsyncValue();
  const windowSize = useWindowSize();
  const openDialogWindow = (e) => {
    const id = e.target.id;
    setOpen(id || null);
  };
  const closeDialogWindow = () => {
    setOpen(null);
  };
  return (
    <SliderInfoStyle>
      {builder?.isEditor && (
        <Box jc='flex-end'>
          <ButtonLink
            size={12}
            color='#787878'
            id='dev'
            onClick={openDialogWindow}
          >
            Редактировать застройщика
          </ButtonLink>
          <ButtonLink
            size={12}
            color='#787878'
            id='comment'
            onClick={openDialogWindow}
          >
            Редактировать комментарий
          </ButtonLink>
        </Box>
      )}
      <Box jc='flex-start'>
        <LogoContainer
          initial={windowSize > 768 ? 'initial' : 'animate'}
          whileHover={windowSize > 768 && 'animate'}
        >
          <BuilderLogo src={builder?.logo || imgErrorUrl} />
          {builder?.isEditor && (
            <ButtonEditContainer variants={variants}>
              <IconButton onClick={openDialogWindow} id='logo'>
                <Edit />
              </IconButton>
            </ButtonEditContainer>
          )}
        </LogoContainer>
        <Box ai='flex-start' column gap='0'>
          <TextSpanStyle size={10} color='#787878'>
            {`${builder?.devType},` || ''} {`${builder?.region},` || ''} Год
            основания: {builder?.startDate}
          </TextSpanStyle>
          <TextSpanStyle size={20} lHeight={20}>
            Застройщик {builder?.name}
          </TextSpanStyle>
          <TextSpanStyle size={12} color='#787878'>
            Коммиссия от: {builder?.comissionSize || 0}%
          </TextSpanStyle>
        </Box>
      </Box>
      {builder.description && (
        <TextDescription>{builder.description}</TextDescription>
      )}
      <DialogWindow open={open === 'dev'} onClose={closeDialogWindow}>
        <DialogEditBuilder onClose={closeDialogWindow} />
      </DialogWindow>
      <DialogWindow open={open === 'comment'} onClose={closeDialogWindow}>
        <DialogEditComment onClose={closeDialogWindow} />
      </DialogWindow>
      <DialogWindow open={open === 'logo'} onClose={closeDialogWindow}>
        <DialogEditLogo onClose={closeDialogWindow} />
      </DialogWindow>
    </SliderInfoStyle>
  );
};

export default SliderInfo;
