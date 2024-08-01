import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import DDSInfo from './DDSInfo';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import DDSTable from './DDSTable';
import { clearDDS, getDDSData } from '../../store/slices/ddsSlice';
import { useWindowSize } from 'hooks/windowSize';
import DDSCards from './DDSCards';

const DDSContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DDS = () => {
  const dispatch = useDispatch();
  const { loadingList, ddsData } = useSelector((state) => state.dds);
  const windowSize = useWindowSize();
  useEffect(() => {
    getDDS();
    return () => {
      dispatch(clearDDS());
    };
  }, []);

  const getDDS = () => {
    dispatch(getDDSData());
  };
  if (loadingList) {
    return <Loader />;
  }
  return (
    <DDSContainer>
      <TextSpanStyle>
        Период с {useDateFormat(ddsData.periodFrom, 'DD.MM.YYYY')} по{' '}
        {useDateFormat(ddsData.periodTo, 'DD.MM.YYYY')}
      </TextSpanStyle>
      <DDSInfo />
      {windowSize > 768 ? <DDSTable /> : <DDSCards />}
    </DDSContainer>
  );
};

export default DDS;
