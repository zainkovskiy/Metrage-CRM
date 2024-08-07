import React from 'react';
import styled from 'styled-components';
import { Link, useMatch } from 'react-router-dom';
import * as IconSvg from './MenuIconSvg';

const MenuListButtonStyle = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family};
  ${({ $match }) => $match && 'background: #a86ab4;'};
  display: flex;
  flex-direction: column;
  /* gap: 0.5rem; */
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.5rem;
  border-radius: 20px;
`;
const MenuListButton = ({ title, icon, path, onClick }) => {
  const match = useMatch(path || '');
  return (
    <MenuListButtonStyle to={path} onClick={onClick} $match={match}>
      {icon && <MenuListIcon icon={icon} />}
      {title}
    </MenuListButtonStyle>
  );
};
const MenuListIconStyle = styled.div`
  /* height: 20px;
  width: 20px; */
  & > svg {
    height: 40px;
    width: 40px;
    fill: #fff;
  }
`;
const Stub = () => {
  return <></>;
};
const MenuListIcon = ({ icon }) => {
  const getIconComponent = () => {
    switch (icon) {
      case 'application':
        return IconSvg.Application;
      case 'objects':
        return IconSvg.Objects;
      case 'deal':
        return IconSvg.Deal;
      case 'compilation':
        return IconSvg.Compilation;
      case 'client':
        return IconSvg.Client;
      case 'users':
        return IconSvg.Users;
      case 'task':
        return IconSvg.Task;
      case 'news':
        return IconSvg.News;
      case 'residential':
        return IconSvg.Residential;
      case 'mortgage':
        return IconSvg.Mortgage;
      case 'fixation':
        return IconSvg.Fixation;
      case 'dds':
        return IconSvg.DDS;
      case 'calendar':
        return IconSvg.Calendar;
      case 'builder':
        return IconSvg.Builder;
      default:
        return Stub;
    }
  };
  const IconComponent = getIconComponent();
  return (
    <MenuListIconStyle>
      <IconComponent />
    </MenuListIconStyle>
  );
};

export default MenuListButton;
