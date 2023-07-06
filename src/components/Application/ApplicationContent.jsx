import React, { Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Loader from "components/Main/Loader";
import Tasks from './Tasks';
import TaskFilter from './TaskFilter';
import { Await, Outlet, useLoaderData, useLocation, useMatch, useSubmit } from 'react-router-dom';
import { getApplicationsList } from 'api/application';
import { device } from 'styles/device';

const ApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet}{
    padding: 0;
    gap: 0;
  }
`
const ApplicationContent = () => {
  const locationRef = useRef(null);
  const firstMount = useRef(true);

  const { applications } = useLoaderData();

  const match = useMatch('/')
  const location = useLocation();
  const submit = useSubmit();

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      locationRef.current = location;
      return
    }
    if (locationRef.current.pathname === location.pathname) {
      return
    }
    locationRef.current = location;
    if (match) {
      submit();
    }
  }, [location])

  return (
    <ApplicationContentStyle>
      <TaskFilter />
      <Suspense fallback={<Loader />}>
        <Await resolve={applications}>
          <>
            <Tasks />
          </>
        </Await>
      </Suspense>
      <Outlet />
    </ApplicationContentStyle>
  );
};
export const loaderApplications = async ({ request, params }) => {
  // return []
  return { applications: await getApplicationsList() }
}

export default ApplicationContent;