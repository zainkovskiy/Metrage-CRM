import React from 'react';
import { ResponsiveContainer, Sankey } from 'recharts';
import DefaultChartComponent from './DefaultChartComponent';

const ChartSankey = ({ chart }) => {
  if (Array.isArray(chart)) {
    return <DefaultChartComponent />;
  }
  if (JSON.stringify(chart) === '{}') {
    return <DefaultChartComponent />;
  }
  if (!chart) {
    return <DefaultChartComponent />;
  }
  return (
    <ResponsiveContainer width='100%' height={250}>
      <Sankey
        data={chart}
        nodePadding={50}
        // link={{ stroke: '#77c878' }}
        link={<CustomLink />}
        node={<CustomNode />}
        margin={{
          right: 100,
          bottom: 20,
          top: 20,
        }}
      ></Sankey>
    </ResponsiveContainer>
  );
};
const CustomLink = (props) => {
  return (
    <g className='recharts-layer'>
      <path
        className='recharts-sankey-link'
        d={`M${props.sourceX},${props.sourceY} 
        C${props.sourceControlX},${props.sourceY} 
        ${props.targetControlX},${props.targetY} 
        ${props.targetX},${props.targetY}`}
        fill='none'
        stroke={props?.payload?.target?.isLoss ? 'red' : '#77c878'}
        strokeWidth={props.linkWidth}
        strokeOpacity='0.2'
      ></path>
    </g>
  );
};
const CustomNode = (props) => {
  return (
    <g className='recharts-layer'>
      <path
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        radius='0'
        className='recharts-rectangle recharts-sankey-node'
        fill='#5192ca'
        fillOpacity='0.8'
        role='img'
        d={`M ${props.x},${props.y} h ${props.payload.dx} v ${props.payload.dy} h -10 Z`}
      ></path>
      <text
        textAnchor='start'
        x={props.x + 15}
        y={props.y + props.height / 2}
        fontSize='12'
        stroke='#727272'
        fontFamily='CeraCY, sans-serif'
      >
        {props.payload.name}
      </text>
      <text
        textAnchor='start'
        x={props.x + 15}
        y={props.y + props.height / 2 + 14}
        fontSize='10'
        stroke='#727272'
        fontFamily='CeraCY, sans-serif'
      >
        {props.payload.value}
      </text>
    </g>
  );
};
const data = {
  nodes: [
    {
      name: 'Visit',
    },
    {
      name: 'Direct-Favourite',
    },
    {
      name: 'Page-Click',
    },
    {
      name: 'Detail-Favourite',
    },
    {
      name: 'Lost',
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
      value: 57,
    },
    {
      source: 0,
      target: 2,
      value: 1,
    },
    {
      source: 2,
      target: 3,
      value: 62429,
    },
    {
      source: 2,
      target: 4,
      value: 291741,
    },
  ],
};
export default ChartSankey;
