import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import UploderFiles from 'components/Main/UploderFiles';
import { useSelector } from 'react-redux';
import MortageLoaderFiles from './MortageLoaderFiles';

const variants = {
  open: {
    height: 'auto',
    opacity: 1,
    marginTop: '0.5rem',
  },
  close: {
    height: 0,
    opacity: 0,
    marginTop: 0,
  },
};
const variantsIcon = {
  open: {
    rotate: 180,
  },
  close: {
    rotate: 0,
  },
};
const MortageLoaderStyle = styled.div``;
const Header = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ArrowIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 12px;
    height: 12px;
  }
`;
const ContentContainer = styled(motion.div)`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(207px, 1fr));
  gap: 0.5rem;
`;
const MortageLoader = ({ files, raw, deleteFile, addFile }) => {
  const userId = useSelector((state) => state.user.UID);
  const [isActive, setActive] = useState(false);
  const fullRaw = {
    ...raw,
    author: userId,
  };
  return (
    <MortageLoaderStyle>
      <Header
        onClick={() => {
          setActive(!isActive);
        }}
      >
        <SliderTitle color='#000' size={14}>
          Документы ({files.length})
          <ArrowIcon
            variants={variantsIcon}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown />
          </ArrowIcon>
        </SliderTitle>
      </Header>
      <AnimatePresence>
        {isActive && (
          <ContentContainer
            variants={variants}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
          >
            <UploderFiles raw={fullRaw} callback={addFile} multiple />
            <MortageLoaderFiles files={files} deleteFile={deleteFile} />
          </ContentContainer>
        )}
      </AnimatePresence>
    </MortageLoaderStyle>
  );
};

export default MortageLoader;
