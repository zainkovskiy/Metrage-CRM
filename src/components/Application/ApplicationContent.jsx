import React, { Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Loader from "components/Main/Loader";
import Tasks from './Tasks';
import TaskFilter from './TaskFilter';
import { Await, Outlet, useLoaderData, useLocation, useMatch, useSubmit } from 'react-router-dom';
import { getApplicationsList } from 'api/application';

const ApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const ApplicationContent = () => {
  const pathRef = useRef(null);
  const firstMount = useRef(true);

  const { applications } = useLoaderData();

  const match = useMatch('/')
  const location = useLocation();
  const submit = useSubmit();

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      pathRef.current = match;
      return
    }
    if (!pathRef.current) {
      submit();
    }
    pathRef.current = match;
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
export const loaderApplications = async ({request, params}) => {
  return { applications: await getApplicationsList() }
}

export default ApplicationContent;