import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { getTelegramCode } from 'store/telegramSlice';
import { LinkUI } from 'ui/LinkUI';
import { ButtonUI } from 'ui/ButtonUI';
import { AnimatePresence, motion } from 'framer-motion';

const TelegramConectStyle = styled(motion.div)`
  border-radius: 5px;
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TelegramConect = ({ onClose }) => {
  const telegram = useSelector((state) => state.telegram);
  const userId = useSelector((state) => state.user.UID);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTelegramCode(userId));
  }, [])
  return (
    <>
      <AnimatePresence>
        {
          telegram.loading ?
            <TextSpanStyle color='#fff'>Loading...</TextSpanStyle> :

            <TelegramConectStyle onClick={e => e.stopPropagation()} initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <TextSpanStyle size={16}>
                Для подключения напишите {' '}
                <LinkUI size={16} target='_blank' href={'https://t.me/metrage_bot?start=' + telegram.code}>@metrage_bot</LinkUI> {' '}
                команду /active {telegram.code}
              </TextSpanStyle>
              <ButtonUI onClick={onClose}>Закрыть</ButtonUI>
            </TelegramConectStyle>
        }
      </AnimatePresence>
    </>
  );
};

export default TelegramConect;