import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const DDSContent = React.lazy(() => import('components/DDS/DDSContent'));

const SuspenseDDS = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DDSContent />
    </Suspense>
  );
};

export default SuspenseDDS;
