import React from 'react';
import * as S from './style';
import { IGraph, IGraphDoughnut } from '../type';
import { Chart as ChartJS, registerables } from 'chart.js/auto';

import { Doughnut } from 'react-chartjs-2';

const DashboardGraphDoughnut = (props: IGraph<IGraphDoughnut>) => {
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
      <Doughnut
        data={{
          labels: labels,
          datasets: dataset && Array.isArray(dataset) ? dataset : [],
        }}
        options={{
          plugins: {
            legend: {
              position: 'right',
            },
          },
          aspectRatio: 2,
        }}
      />
    </div>
  );
};

export default DashboardGraphDoughnut;
