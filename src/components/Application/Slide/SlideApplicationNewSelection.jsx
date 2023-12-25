import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from '../../../styles/styles';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import DialogApplicationChoiceCompilation from './DialogApplicationChoiceCompilation';

const NewSelectionList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const NewSelectItem = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const SlideApplicationNewSelection = ({
  selectList,
  moveToNewSelectList,
  setNewCompilation,
  setChangeCompilation,
}) => {
  const [open, setOpen] = useState();
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SliderBlock>
        <SliderTitle>
          Новая подборка
          <ButtonLink size={12} color='#6c6c6c' onClick={setNewCompilation}>
            Создать
          </ButtonLink>
        </SliderTitle>
        <NewSelectionList layout>
          <AnimatePresence layout>
            {selectList.map((item) => (
              <NewSelectItem
                key={item.objUID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TextSpanStyle size={12}>{item.objaddrStr}</TextSpanStyle>
                <ButtonLink
                  onClick={() => {
                    moveToNewSelectList(item);
                  }}
                  size={12}
                >
                  Удалить
                </ButtonLink>
              </NewSelectItem>
            ))}
          </AnimatePresence>
        </NewSelectionList>
        <ButtonLink size={12} color='#6c6c6c' onClick={toggleOpen}>
          Добавить в подборку
        </ButtonLink>
      </SliderBlock>
      <DialogWindow open={open} onClose={toggleOpen}>
        <DialogApplicationChoiceCompilation
          setChangeCompilation={setChangeCompilation}
          onClose={toggleOpen}
        />
      </DialogWindow>
    </motion.div>
  );
};

export default SlideApplicationNewSelection;
