import React from 'react';
import {useWindowSize} from 'hooks/windowSize';
const ObjectsFilterDesktop = React.lazy(() => import('components/Objects/ObjectsFilterDesktop'));
const ObjectsFilterMobile = React.lazy(() => import('components/Objects/ObjectsFilterMobile'));

const ObjectsFilter = ({ getList }) => {
  const windowSize = useWindowSize();
  return (
    <>
      {
        windowSize > 768 ?
        <ObjectsFilterDesktop getList={getList}/> :
        <ObjectsFilterMobile getList={getList}/>
      }
    </>
  );
};

export default ObjectsFilter;