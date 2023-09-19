import React, { useState } from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'hooks/windowSize';

import { ButtonUI } from 'ui/ButtonUI';
import SlideApplicationMeta from './SlideApplicationMeta';
import SlideApplicationStatus from './SlideApplicationStatus';
import SlideApplicationClientInfo from './SlideApplicationClientInfo';
import SlideApplicationAgentInfo from './SlideApplicationAgentInfo';
import SlideApplicationObjectInfo from './SlideApplicationObjectInfo';
import BuySellEditForm from './BuySellEditForm';
import SlideApplicationCalls from './SlideApplicationCalls';
import SlideApplicationStory from './SlideApplicationStory';
import DialogApplicationChangeUser from './DialogApplicationChangeUser';
import DialogApplicationHandOver from './DialogApplicationHandOver';
import DialogWindow from 'components/Main/DialogWindow';
import { SliderStyle } from 'styles/slider';

const SlideCApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768) {
    min-width: 450px;
  }
`;

const SlideApplication = ({ closeSlide }) => {
  const application = useAsyncValue();
  const isExternal = useSelector((state) => state.user.isExternal);
  const [openChange, setOpenChange] = useState(false);
  const [openHandOver, setOpenHandOver] = useState(false);
  const windowSize = useWindowSize();

  const toggleOpenChange = () => {
    setOpenChange(!openChange);
  };
  const toggleOpenHandOver = () => {
    setOpenHandOver(!openHandOver);
  };
  return (
    <>
      <SliderStyle>
        <SlideCApplicationContentStyle>
          <SlideApplicationMeta
            UID={application?.UID}
            lostDate={application?.demand?.lostDate}
            created={application?.created}
            updated={application?.updated}
          />
          <SlideApplicationStatus
            status={application?.status?.UID}
            UID={application?.UID}
          />
          <SlideApplicationClientInfo
            client={application?.client}
            demand={application?.demand}
            UID={application?.UID}
          >
            {isExternal !== '1' && (
              <ButtonUI size='small' onClick={toggleOpenHandOver}>
                Передать клиента
              </ButtonUI>
            )}
          </SlideApplicationClientInfo>
          <SlideApplicationAgentInfo
            responsible={application?.responsible}
            recommender={application?.recommender}
          >
            {isExternal !== '1' && (
              <ButtonUI size='small' onClick={toggleOpenChange}>
                Сменить агента
              </ButtonUI>
            )}
          </SlideApplicationAgentInfo>
          {isExternal === '1' ? (
            <SlideApplicationObjectInfo />
          ) : (
            <BuySellEditForm />
          )}
          <SlideApplicationCalls calls={application?.calls} />
          {windowSize <= 768 && (
            <SlideApplicationStory
              UID={application?.UID}
              fullWidth
              height={500}
            />
          )}
        </SlideCApplicationContentStyle>
        {windowSize > 768 && <SlideApplicationStory UID={application?.UID} />}
      </SliderStyle>
      <DialogWindow open={openChange} onClose={toggleOpenChange}>
        <DialogApplicationChangeUser
          onClose={toggleOpenChange}
          UID={application?.UID}
        />
      </DialogWindow>
      <DialogWindow open={openHandOver} onClose={toggleOpenHandOver}>
        <DialogApplicationHandOver
          onClose={toggleOpenHandOver}
          closeSlide={closeSlide}
          UID={application?.UID}
        />
      </DialogWindow>
    </>
  );
};

export default SlideApplication;
