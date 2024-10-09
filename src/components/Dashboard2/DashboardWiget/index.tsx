import React from 'react';
import { IDashboardComponentProps } from '../type';
import DashboardTrand from '../DashboardTrand';
import DashboardCounter from '../DashboardCounter';
import DashboardTable from '../DashboardTable';
import DashboardGraph from '../DashboardGraph';

const DashboardWiget = (props: IDashboardComponentProps) => {
  const { typeComponent } = props;
  const getDashboardWigetComponent = () => {
    if (typeComponent === 'trand') {
      return DashboardTrand;
    }
    if (typeComponent === 'counter') {
      return DashboardCounter;
    }
    if (typeComponent === 'table') {
      return DashboardTable;
    }
    if (typeComponent === 'graph') {
      return DashboardGraph;
    }
    return () => {
      return <></>;
    };
  };
  const DashboardWigetComponent = getDashboardWigetComponent();
  return <DashboardWigetComponent {...props} />;
};

export default DashboardWiget;
