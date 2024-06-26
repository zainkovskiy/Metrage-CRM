import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Plus } from 'images/plus.svg';
import styled from 'styled-components';
import SlideResidentialAccordeon from './SlideResidentialAccordeon';
import DialogWindow from 'components/Main/DialogWindow';
import DialogManager from './DialogManager';
import DialogEditBuilding from './DialogEditBuilding';
import SliderResidentialManager from './SliderResidentialManager';

const ResidentialBuiling = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
`;
const ManagerSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideResidentialBuiling = ({ building }) => {
  const [isActive, setIsActive] = useState([]);
  const [managerOpen, setManagerOpen] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [buildingWindow, setBuildingWindow] = useState(false);
  const openNewManager = () => {
    setManagerOpen('new');
  };
  const openEditManager = (manager) => {
    setManagerOpen(manager);
  };
  const closeWindowManager = () => {
    setManagerOpen(null);
  };
  const addNewManager = (newManager) => {
    building.managers = [...building.managers, newManager];
    closeWindowManager();
  };
  const removeManager = (manager) => {
    building.managers = building.managers.filter(
      (item) => item.UID !== manager.UID
    );
    setIsChange(!isChange);
  };
  const updateManager = (manager) => {
    building.managers = building.managers.map((item) => {
      if (item.UID === manager.UID) {
        return manager;
      }
      return item;
    });
    closeWindowManager();
  };
  const onChangeIndex = (index) => {
    setIsActive((currentActiveIndex) => {
      if (currentActiveIndex.includes(index)) {
        return currentActiveIndex.filter((curIndex) => curIndex !== index);
      }
      return currentActiveIndex.concat(index);
    });
  };
  const openBuildingWundow = () => {
    setBuildingWindow(true);
  };
  const closeBuildingWundow = () => {
    setBuildingWindow(false);
  };
  const updateBuilding = (newBuilding) => {
    for (let key in newBuilding) {
      building[key] = newBuilding[key];
    }
    closeBuildingWundow();
  };
  return (
    <ResidentialBuiling>
      <SliderTitle>
        <Box>
          Корпус {building.name}
          <TextSpanStyle size={12}>
            Сдача: {useDateFormat(building?.deadline, 'MMMM YYYY')}
          </TextSpanStyle>
        </Box>
        <ButtonLink size={12} color='#787878' onClick={openBuildingWundow}>
          Редактировать
        </ButtonLink>
      </SliderTitle>
      <Info>
        <ManagerSide>
          <Box fullWidth jc='flex-start'>
            <TextSpanStyle>Менеджеры: </TextSpanStyle>
            <IconButton onClick={openNewManager}>
              <Plus />
            </IconButton>
          </Box>
          {building?.managers?.length > 0 && (
            <div>
              {building.managers.map((item) => (
                <SliderResidentialManager
                  manager={item}
                  key={item.UID}
                  openEditManager={openEditManager}
                  removeManager={removeManager}
                />
              ))}
            </div>
          )}
        </ManagerSide>
        <div style={{ overflow: 'hidden' }}>
          {building?.notificationExp && (
            <TextSpanStyle>
              Действие уведомлений до: {building?.notificationExp} дней
            </TextSpanStyle>
          )}
          {building?.notificationText && (
            <TextSpanStyle size={10}>
              {building?.notificationText}
            </TextSpanStyle>
          )}
          {building?.reservationExp && (
            <TextSpanStyle>
              Действие брони до: {building?.reservationExp} дней
            </TextSpanStyle>
          )}
          {building?.reservationText && (
            <TextSpanStyle size={10}>{building?.reservationText}</TextSpanStyle>
          )}
          {building?.hasSubsidy && (
            <TextSpanStyle size={12} bold>
              Субсидированная ипотека
            </TextSpanStyle>
          )}
          {building?.hasTransh && (
            <TextSpanStyle size={12} bold>
              Траншевая ипотека
            </TextSpanStyle>
          )}
        </div>
      </Info>
      <TextSpanStyle>
        Предложений от застройщика: {building?.appartments?.length || 0}
      </TextSpanStyle>
      {building?.appartments.map((appartment, idx) => (
        <SlideResidentialAccordeon
          key={idx}
          idx={idx}
          appartment={appartment}
          isActive={isActive.includes(idx)}
          onChangeIndex={onChangeIndex}
        />
      ))}
      <DialogWindow onClose={closeWindowManager} open={Boolean(managerOpen)}>
        <DialogManager
          onClose={closeWindowManager}
          buildingUID={building.UID}
          manager={managerOpen}
          addNewManager={addNewManager}
          updateManager={updateManager}
        />
      </DialogWindow>
      <DialogWindow onClose={closeBuildingWundow} open={buildingWindow}>
        <DialogEditBuilding
          onClose={closeBuildingWundow}
          building={building}
          updateBuilding={updateBuilding}
        />
      </DialogWindow>
    </ResidentialBuiling>
  );
};

export default SlideResidentialBuiling;
