import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getApplicationFilterList } from '../../store/applicationSlice';

const ApplicationStage = styled.div`
  font-family: 'CeraCY', sans-serif;
  font-weight: 400;
  font-size: 14px;
  ${({ $color }) => $color && `background-color: ${$color}`};
  ${({ $color }) => $color && `color: #fff`};
  ${({ $isActive }) => $isActive && `cursor: pointer`};
  ${({ $isActive }) => !$isActive && `pointer-events: none`};
  border: 1px solid ${({ $color }) => ($color ? $color : '#000')};
  padding: 0.2rem 0.5rem;
  transition: opacity 0.3s;
  white-space: nowrap;
  user-select: none;
  position: relative;
  width: 100%;
  &:after,
  &:before {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    transform: translate(1px, -50%);
    border-left-color: ${({ $color }) => ($color ? $color : '#fff')};
    border-width: 20px;
  }
  &:before {
    transform: translate(0px, -50%);
    border-left-color: ${({ $color }) => ($color ? $color : '#000')};
    border-width: 22px;
  }
  &:hover {
    ${({ $isActive }) => $isActive && `opacity: 0.7`};
  }
  &:active {
    ${({ $isActive }) => $isActive && `opacity: 1`};
  }
`;
const BorderClear = styled.div`
  background-color: ${({ $color }) => ($color ? $color : '#fff')};
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -1px;
  z-index: 2;
`;

const ApplicationHopperItem = ({ hop }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.application);
  const setStageFilter = () => {
    localStorage.setItem(
      'filterApplication',
      JSON.stringify({ ...filter, ...hop.filter })
    );
    dispatch(getApplicationFilterList({ ...filter, ...hop.filter }));
  };
  return (
    <ApplicationStage
      $isActive={hop.isActive}
      $color={hop.color}
      onClick={setStageFilter}
    >
      {hop.name} - {hop.items}
      <BorderClear $color={hop.color} />
    </ApplicationStage>
  );
};

export default ApplicationHopperItem;
