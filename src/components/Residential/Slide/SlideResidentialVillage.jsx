import React, { useState } from 'react';
import styled from 'styled-components';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import SliderResidentialManager from './SliderResidentialManager';
import DialogWindow from 'components/Main/DialogWindow';
import DialogManager from './DialogManager';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Plus } from 'images/plus.svg';
import DialogEditVillage from './DialogEditVillage';

const ResidentialVillage = styled(SliderBlock)`
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
const SlideResidentialVillage = ({ building }) => {
  const [managerOpen, setManagerOpen] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [villageWindow, setVillageWindow] = useState(false);

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
  const getComission = () => {
    if (building?.suburbanParams?.comissionStart) {
      return `От ${building?.suburbanParams?.comissionStart}`;
    }
    if (building?.suburbanParams?.comissionEnd) {
      return `До ${building?.suburbanParams?.comissionEnd}`;
    }
    return '';
  };
  const openVillageWindow = () => {
    setVillageWindow(true);
  };
  const closeVillageWindow = () => {
    setVillageWindow(false);
  };
  const updateVillage = (newBuildingParams) => {
    building.suburbanParams = newBuildingParams;
    closeVillageWindow();
  };
  return (
    <ResidentialVillage>
      <SliderTitle>
        Коттеджный посёлок
        <ButtonLink size={12} color='#787878' onClick={openVillageWindow}>
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
          {building?.suburbanParams?.hasLands && (
            <TextSpanStyle bold>
              Есть участки в наличии:{' '}
              {building?.suburbanParams?.hasLands ? 'Да' : 'Нет'}
            </TextSpanStyle>
          )}
          {building?.suburbanParams?.hasHouses && (
            <TextSpanStyle bold>
              Есть дома в наличии:{' '}
              {building?.suburbanParams?.hasHouses ? 'Да' : 'Нет'}
            </TextSpanStyle>
          )}
          {building?.suburbanParams?.landCategory && (
            <TextSpanStyle>
              Категория земель: {building?.suburbanParams?.landCategory}
            </TextSpanStyle>
          )}
          {building?.suburbanParams?.onLandHas?.length > 0 && (
            <Box jc='flex-start' wrap gap='0.3rem'>
              <TextSpanStyle>На участке: </TextSpanStyle>
              {building.suburbanParams.onLandHas.map((item, idx) => {
                const length = building.suburbanParams.onLandHas.length - 1;
                return (
                  <TextSpanStyle key={item} bold>
                    {item}
                    {idx < length && ', '}
                  </TextSpanStyle>
                );
              })}
            </Box>
          )}
        </div>
      </Info>
      <div>
        {building?.suburbanParams?.includeAccreditation?.length > 0 && (
          <Box jc='flex-start' wrap gap='0.3rem'>
            <TextSpanStyle bold>Аккредитация: </TextSpanStyle>
            {building.suburbanParams.includeAccreditation.map((item, idx) => {
              const length =
                building.suburbanParams.includeAccreditation.length - 1;

              return (
                <TextSpanStyle key={item}>
                  {item}
                  {idx < length && ', '}
                </TextSpanStyle>
              );
            })}
          </Box>
        )}
        {building?.suburbanParams?.excludeAccreditation?.length > 0 && (
          <Box jc='flex-start' wrap gap='0.3rem'>
            <TextSpanStyle bold>Аккредитация: </TextSpanStyle>
            {building.suburbanParams.excludeAccreditation.map((item, idx) => {
              const length =
                building.suburbanParams.excludeAccreditation.length - 1;

              return (
                <TextSpanStyle key={item}>
                  {item}
                  {idx < length && ', '}
                </TextSpanStyle>
              );
            })}
          </Box>
        )}
        <TextSpanStyle>
          Выступить застройщиком может:{' '}
          {building?.suburbanParams?.whoDeveloper || ''}
        </TextSpanStyle>
        <TextSpanStyle>Комиссия: {getComission()}</TextSpanStyle>
        <TextSpanStyle>
          Срок оплаты: {building?.suburbanParams?.comissionDate || ''}
        </TextSpanStyle>
      </div>
      <DialogWindow onClose={closeWindowManager} open={Boolean(managerOpen)}>
        <DialogManager
          onClose={closeWindowManager}
          buildingUID={building.UID}
          manager={managerOpen}
          addNewManager={addNewManager}
          updateManager={updateManager}
        />
      </DialogWindow>
      <DialogWindow open={villageWindow} onClose={closeVillageWindow}>
        <DialogEditVillage
          onClose={closeVillageWindow}
          building={building}
          updateVillage={updateVillage}
        />
      </DialogWindow>
    </ResidentialVillage>
  );
};

export default SlideResidentialVillage;
