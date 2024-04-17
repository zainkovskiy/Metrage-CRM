import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const MortageContent = React.lazy(() =>
  import('components/Mortage/MortageContent')
);
const SuspenseMortage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MortageContent />
    </Suspense>
  );
};

export default SuspenseMortage;
