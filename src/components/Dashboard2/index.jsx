import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';
const Dashboard = React.lazy(() => import('components/Dashboard2/Dashboard'));
const SuspenseDashboard2 = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Dashboard />
    </Suspense>
  );
};

export default SuspenseDashboard2;
