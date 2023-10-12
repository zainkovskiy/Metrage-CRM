import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const DashboardContent = React.lazy(() =>
  import('components/Dashboard/DashboardContent')
);

const SuspenceDashboard = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardContent />
    </Suspense>
  );
};

export default SuspenceDashboard;
