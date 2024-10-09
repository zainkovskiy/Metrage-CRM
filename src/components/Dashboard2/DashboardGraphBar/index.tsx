import React from 'react';
import { IGraph, IGraphBar } from '../type';
import { Chart as ChartJS, registerables } from 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

const DashboardGraphBar = (props: IGraph<IGraphBar>) => {
  const { dataset, labels } = props;
  ChartJS.register(...registerables);
  return (
    <div
      className='chart-container'
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Bar
        data={{
          labels: labels,
          datasets: dataset && Array.isArray(dataset) ? dataset : [],
        }}
      />
    </div>
  );
};

export default DashboardGraphBar;
