import React from 'react';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Close } from 'images/close.svg';
import { ReactComponent as Edit } from 'images/edit.svg';
import { removeManager } from '../../../api/builderAPI';
import { useAsyncValue } from 'react-router-dom';

const Manager = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  &:last-child {
    border-bottom: none;
  }
  &:not(:first-child) {
    padding-top: 0.5rem;
  }
`;

const SliderManager = ({ manager, openEditManager, isChange }) => {
  const builder = useAsyncValue();
  const setRemoveManager = () => {
    removeManager({
      UID: manager.UID,
    }).then(() => {
      builder.managers = builder.managers.filter(
        (curManager) => curManager.UID !== manager.UID
      );
      isChange();
    });
  };
  const editWindowManager = () => {
    openEditManager(manager);
  };
  return (
    <Manager>
      <Box column ai='flex-start' gap='0'>
        <Box ai='flex-start'>
          <TextSpanStyle>{manager.name}</TextSpanStyle>
          <TextSpanStyle>{manager.phone}</TextSpanStyle>
        </Box>
        <TextSpanStyle size={12}>{manager.email}</TextSpanStyle>
      </Box>
      <Box>
        <IconButton onClick={editWindowManager} color='info'>
          <Edit />
        </IconButton>
        <IconButton onClick={setRemoveManager} color='error'>
          <Close />
        </IconButton>
      </Box>
    </Manager>
  );
};

export default SliderManager;
