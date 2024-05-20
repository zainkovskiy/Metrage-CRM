import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Mortgage } from 'images/mortgage.svg';
import { ReactComponent as DealDinamics } from 'images/charts_icon/dealDinamics.svg';
import { ReactComponent as DemandDinamics } from 'images/charts_icon/demandDinamics.svg';
import { ReactComponent as DealsOffices } from 'images/charts_icon/dealsOffices.svg';
import { ReactComponent as RankDeals } from 'images/charts_icon/rankDeals.svg';
import { ReactComponent as AdvExponation } from 'images/charts_icon/advExponation.svg';
import { ReactComponent as Objects } from 'images/charts_icon/objects.svg';

const iconStyle = css`
  fill: #84019e;
  width: 16px;
  height: 16px;
`;
const IconObject = styled(Objects)`
  ${iconStyle}
`;
const IconMortgage = styled(Mortgage)`
  ${iconStyle}
`;
const IconDealDinamics = styled(DealDinamics)`
  ${iconStyle}
`;
const IconDemandDinamics = styled(DemandDinamics)`
  ${iconStyle}
`;
const IconDealsOffices = styled(DealsOffices)`
  ${iconStyle}
`;
const IconRankDeals = styled(RankDeals)`
  ${iconStyle}
`;
const IconAdvExponation = styled(AdvExponation)`
  ${iconStyle}
`;
const DefaultIcon = () => {
  return <React.Fragment />;
};
export const getChartIconComponent = (chartName) => {
  switch (chartName) {
    case 'dealDinamics':
      return IconDealDinamics;
    case 'demandDinamics':
      return IconDemandDinamics;
    case 'dealsOffices':
      return IconDealsOffices;
    case 'mortgage':
      return IconMortgage;
    case 'RankDeals':
      return IconRankDeals;
    case 'objects':
      return IconObject;
    case 'AdvExponation':
      return IconAdvExponation;
    case 'AdvStruct':
      return IconObject;

    default:
      return DefaultIcon;
  }
};
