import React, { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainContainer } from 'styles/styles';
import Nav from 'components/Nav/Nav';
const Chat = React.lazy(() => import('components/Chat/Chat'));
import PanelControl from 'components/PanelControl/PanelControl';
import PanelControlDrag from 'components/PanelControl/PanelControlDrag';
import PanelControlDrag2 from 'components/PanelControl/PanelControlDrag2';
import DragExample from 'components/PanelControl/PanelControlDrag3';
import ReorderTest from 'components/PanelControl/ReorderTest';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const isExternal = globalUser && JSON.parse(globalUser).isExternal || 1;
  const isGuest = globalUser && JSON.parse(globalUser).isGuest;
  const showChat = useSelector((state) => state.chat.show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // if (isGuest === 1) {
    //   console.log(isGuest);
    //   navigate('/application');
    // }
    dispatch({ type: 'socket/connect' });
    return () => {
      dispatch({ type: 'socket/disconnect' });
    }
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
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </MainContainer>
      <AnimatePresence>
        {
          showChat &&
          <Suspense fallback={<p>Loading...</p>}>
            <Chat />
          </Suspense>
        }
      </AnimatePresence>
    </>
  );
};

export default App;
