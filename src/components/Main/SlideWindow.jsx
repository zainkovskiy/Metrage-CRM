import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';
import styled from 'styled-components';
const CloseCircleButtonUI = React.lazy(() =>
  import('ui/CloseCircleButtonUI/CloseCircleButtonUI')
);
const ButtonBack = React.lazy(() => import('ui/ButtonBack/ButtonBack'));
import { useWindowSize } from 'hooks/windowSize';
import { device } from 'styles/device';

const SlideWindowStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #00000066;
  display: flex;
  justify-content: flex-end;
  z-index: 999;
  overflow: hidden;
  @media ${device.tablet} {
    height: ${document.documentElement.clientHeight - 42}px;
  }
`;
const SlideWindowContainer = styled(motion.div)`
  ${({ $mobile }) => $mobile && 'flex-direction: column;'};
  display: flex;
  width: ${({ width }) => width || '100%'};
  @media (min-width: 768px) {
    min-width: 350px;
  }
`;
const SlideWindowContent = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 0.5rem;
  overflow: auto;
  box-sizing: border-box;
  flex-grow: 1;
`;
const ButtonContainer = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 0.5rem 0.5rem 0px;
`;
const variantsBack = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  close: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
const variantsContent = {
  open: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  close: {
    x: 1000,
    transition: {
      duration: 0.3,
    },
  },
};

const SlideWindow = ({ children, width, onClose, open }) => {
  const windowSize = useWindowSize();
  //FIXME: при закрытии слайда открывает фильтр))
  // useEffect(() => {
  //   const body = document.body;
  //   body.addEventListener('keydown', handleClose);
  //   return () => {
  //     body.removeEventListener('keydown', handleClose);
  //   };
  // }, []);
  const handleClose = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  return (
    <AnimatePresence mode='wait'>
      {open && (
        <SlideWindowStyle
          variants={variantsBack}
          initial='close'
          animate='open'
          exit='close'
          // onClick={onClose}
        >
          <SlideWindowContainer
            variants={variantsContent}
            initial='close'
            animate='open'
            exit='close'
            width={width}
            onClick={(e) => e.stopPropagation()}
            $mobile={windowSize <= 425}
          >
            {windowSize > 425 ? (
              <Suspense>
                <CloseCircleButtonUI onClose={onClose} />
              </Suspense>
            ) : (
              <Suspense>
                <ButtonContainer>
                  <ButtonBack color='#fff' onClick={onClose} />
                </ButtonContainer>
              </Suspense>
            )}
            <SlideWindowContent>{children}</SlideWindowContent>
          </SlideWindowContainer>
        </SlideWindowStyle>
      )}
    </AnimatePresence>
  );
};

export default SlideWindow;
