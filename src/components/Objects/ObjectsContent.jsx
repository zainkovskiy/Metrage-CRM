import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Objects from './Objects';
import ObjectsTable from './ObjectsTable';
import styled from 'styled-components';
import { device } from 'styles/device';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getObjectList, clearObjects } from 'store/objectSlice';
import ObjectsFilterDesktop from './ObjectsFilterDesktop';

const ObjectsContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;
const DefaultError = styled.div``;
const ObjectsContent = () => {
  const viewCard = useSelector((state) => state.objects.viewCard);
  const firstMount = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    return () => {
      dispatch(clearObjects());
    };
  }, []);
  const getList = () => {
    dispatch(getObjectList(location?.state))
      .unwrap()
      .finally(() => {
        if (location?.state) {
          navigate('.', { replace: true });
        }
      });
  };
  const getObjectsComponent = () => {
    switch (viewCard) {
      case 'cell':
        return Objects;
      case 'table':
        return ObjectsTable;
      default:
        return DefaultError;
    }
  };
  const ObkectsComponent = getObjectsComponent();
  return (
    <ObjectsContentStyle>
      <ObjectsFilterDesktop />
      <ObkectsComponent firstMount={firstMount.current} />
      {/* <Objects firstMount={firstMount.current} /> */}
      <Outlet />
    </ObjectsContentStyle>
  );
};
export default ObjectsContent;
