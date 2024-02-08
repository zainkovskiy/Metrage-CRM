import React, { useState } from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'hooks/windowSize';

import { ButtonLink } from 'ui/ButtonLink';
import SlideApplicationMeta from './SlideApplicationMeta';
import SlideApplicationStatus from './SlideApplicationStatus';
import SlideApplicationClientInfo from './SlideApplicationClientInfo';
import SlideApplicationAgentInfo from './SlideApplicationAgentInfo';
//удалить?
// import SlideApplicationObjectInfo from './SlideApplicationObjectInfo';
import SlideApplicationStory from './SlideApplicationStory';
import DialogApplicationChangeUser from './DialogApplicationChangeUser';
import DialogApplicationHandOver from './DialogApplicationHandOver';
import DialogWindow from 'components/Main/DialogWindow';
import { SliderStyle } from 'styles/slider';
import SlideApplicationInfo from './SlideApplicationInfo';
import SlideApplicationNote from './SlideApplicationNote';
import SlideApplicationFeature from './SlideApplicationFeature';
import SlideApplicationSimilar from './SlideApplicationSimilar';
import SlideApplicationSelection from './SlideApplicationSelection';
import SlideApplicationNewSelection from './SlideApplicationNewSelection';
import { AnimatePresence } from 'framer-motion';
import { addToCompilation, newCompilation } from '../../../api/application';

const SlideApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768) {
    min-width: 450px;
  }
`;
const SlideApplicationgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(49%, 1fr));
  gap: 0.5rem;
`;
//TODO: побробывать переделать на useContext
const SlideApplication = ({ closeSlide }) => {
  const application = useAsyncValue();
  const isExternal = useSelector((state) => state.user.isExternal);
  const [openChange, setOpenChange] = useState(false);
  const [openHandOver, setOpenHandOver] = useState(false);
  const [newSelectList, setNewSelectList] = useState([]);
  const windowSize = useWindowSize();
  const toggleOpenChange = () => {
    setOpenChange(!openChange);
  };
  const toggleOpenHandOver = () => {
    setOpenHandOver(!openHandOver);
  };
  const moveToNewSelectList = (selectItem) => {
    const find = newSelectList.find(
      (object) => object.objUID === selectItem.objUID
    );
    if (find) {
      setNewSelectList((prevState) =>
        prevState.filter((object) => object.objUID !== selectItem.objUID)
      );
      return;
    }
    setNewSelectList((prevState) => [...prevState, selectItem]);
  };
  const setNewCompilation = () => {
    newCompilation(application.UID, newSelectList).then((newSelect) => {
      application.selections = [...application.selections, newSelect];
      setNewSelectList([]);
    });
  };
  const setChangeCompilation = (compilationUid) => {
    addToCompilation(application.UID, compilationUid, newSelectList).then(
      (selection) => {
        console.log(selection);
        const find = application.selections.find(
          (item) => item.UID === selection.UID
        );
        if (find) {
          application.selections.splice(
            application.selections.indexOf(find),
            1,
            selection
          );
        }
        setNewSelectList([]);
      }
    );
  };
  return (
    <>
      <SliderStyle>
        <SlideApplicationContentStyle>
          <SlideApplicationMeta />
          <SlideApplicationStatus />
          <SlideApplicationgGrid>
            <SlideApplicationClientInfo />
            <SlideApplicationAgentInfo
              responsible={application?.responsible}
              recommender={application?.recommender}
            >
              {isExternal !== '1' && (
                <ButtonLink
                  size={12}
                  color='#84019e'
                  onClick={toggleOpenChange}
                >
                  Сменить
                </ButtonLink>
              )}
            </SlideApplicationAgentInfo>
            <SlideApplicationInfo />
            <SlideApplicationNote />
          </SlideApplicationgGrid>
          <SlideApplicationFeature />
          <SlideApplicationSimilar
            moveToNewSelectList={moveToNewSelectList}
            selectList={newSelectList}
          />
          <AnimatePresence>
            {newSelectList.length > 0 && (
              <SlideApplicationNewSelection
                moveToNewSelectList={moveToNewSelectList}
                selectList={newSelectList}
                setNewCompilation={setNewCompilation}
                setChangeCompilation={setChangeCompilation}
              />
            )}
          </AnimatePresence>
          {application?.selections?.length > 0 && <SlideApplicationSelection />}
          {windowSize <= 768 && (
            <SlideApplicationStory
              UID={application?.UID}
              fullWidth
              height={500}
            />
          )}
        </SlideApplicationContentStyle>
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
