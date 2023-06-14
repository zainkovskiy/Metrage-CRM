import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MainContainer } from 'styles/styles';
import Nav from 'components/Nav/Nav';
import Chat from 'components/Chat/Chat';
import PanelControl from 'components/PanelControl/PanelControl';
import PanelControlDrag from 'components/PanelControl/PanelControlDrag';
import PanelControlDrag2 from 'components/PanelControl/PanelControlDrag2';
import DragExample from 'components/PanelControl/PanelControlDrag3';
import ReorderTest from 'components/PanelControl/ReorderTest';
import { useGetCookie } from './hooks/hooks';

const App = () => {
  const isExternal = globalUser && JSON.parse(globalUser).isExternal || 1;
  useEffect(() => {
    // document.cookie = "metrage_id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL21ldHJhZ2Vncm91cC5jb20iLCJhdWQiOiJodHRwczovL21ldHJhZ2Vncm91cC5jb20iLCJpYXQiOiIxMzU2OTk5NTI0IiwibmJmIjoiMTM1NzAwMDAwMCIsImRhdGEiOnsiVUlEIjozLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6ImFudG9uLnphaW5rb3Zza2lpQGdtYWlsLmNvbSJ9fQ.c1FRkxL3pBDDN0enEmMpdYyB-t9-Yk4AFhfdsfp6ZN8"
    // console.log(useGetCookie('metrage_id'));
  }, [])

  return (
    <>
      <Nav />
      <MainContainer $isExternal={isExternal === '1'}>
        {
          isExternal !== '1' &&
          < PanelControl />
        }
        {/* <PanelControlDrag /> */}
        {/* <PanelControlDrag2 /> */}
        {/* <DragExample /> */}
        {/* <ReorderTest /> */}
        <Outlet />
      </MainContainer>
      <Chat />
    </>
  );
};

export default App;
