import React, { useState } from 'react';
import styled from 'styled-components';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from 'ui/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import DialogManager from './DialogManager';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Plus } from 'images/plus.svg';
import SliderResidentialManager from './SliderResidentialManager';
import SlideResidentialBusinessObject from './SlideResidentialBusinessObject';
import DialogEditBusiness from './DialogEditBusiness';

const ResidentialBusiness = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const GridContaianer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
`;
const ManagerSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SlideResidentialBusiness = ({ building }) => {
  const [managerOpen, setManagerOpen] = useState(null);
  const [businessWindow, setBusinessWindow] = useState(false);
  const [isChange, setIsChange] = useState(false);

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
  const openBusinessWindow = () => {
    setBusinessWindow(true);
  };
  const closeBusinessWindow = () => {
    setBusinessWindow(false);
  };
  const updateBusiness = (newBusiness) => {
    for (let key in newBusiness) {
      building[key] = newBusiness[key];
    }
    closeBusinessWindow();
  };
  return (
    <ResidentialBusiness>
      <SliderTitle>
        Блок {building.name}
        <ButtonLink size={12} color='#787878' onClick={openBusinessWindow}>
          Редактировать
        </ButtonLink>
      </SliderTitle>
      <GridContaianer>
        <ManagerSide>
          <Box fullWidth jc='flex-start'>
            <TextSpanStyle>Собственники:</TextSpanStyle>
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
          <TextSpanStyle>
            Комиссия: {building?.notificationText || ''}
          </TextSpanStyle>
          <TextSpanStyle>
            Срок договора: {building?.reservationText || ''}
          </TextSpanStyle>
        </ManagerSide>
        <Box column ai='flex-start'>
          <TextSpanStyle>
            Корпус по ЦИАН: {building?.cianBid?.bcName}
          </TextSpanStyle>
          <TextSpanStyle>
            Запрет рекламы собственником: {building?.hasTaboo ? 'Да' : 'Нет'}
          </TextSpanStyle>
          <div>
            <TextSpanStyle size={12}>Примечания:</TextSpanStyle>
            <TextSpanStyle>{building?.addText || ''}</TextSpanStyle>
          </div>
        </Box>
      </GridContaianer>
      <TextSpanStyle>
        Текущие предложения: ({building?.businessObjects?.length || 0})
      </TextSpanStyle>
      <GridContaianer>
        {building?.businessObjects?.length > 0 &&
          building.businessObjects.map((object) => (
            <SlideResidentialBusinessObject key={object.UID} object={object} />
          ))}
      </GridContaianer>
      <DialogWindow onClose={closeWindowManager} open={Boolean(managerOpen)}>
        <DialogManager
          onClose={closeWindowManager}
          buildingUID={building.UID}
          manager={managerOpen}
          addNewManager={addNewManager}
          updateManager={updateManager}
        />
      </DialogWindow>
      <DialogWindow onClose={closeBusinessWindow} open={businessWindow}>
        <DialogEditBusiness
          onClose={closeBusinessWindow}
          building={building}
          updateBusiness={updateBusiness}
        />
      </DialogWindow>
    </ResidentialBusiness>
  );
};

export default SlideResidentialBusiness;
