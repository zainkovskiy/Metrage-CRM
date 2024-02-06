import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';
const CalendarContent = React.lazy(() =>
  import('components/Calendar/CalendarContent')
);

const SuspenseCalendar = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CalendarContent />
    </Suspense>
  );
};

export default SuspenseCalendar;
