import React, { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from 'styles/styles';
import Loader from 'components/Main/Loader';
import Chat from 'components/Chat/Chat';
import ChatMobile from 'mobile/Chat/ChatMobile';
const Nav = React.lazy(() => import('components/Nav/Nav'));
const NavMobile = React.lazy(() => import('mobile/Nav/NavMobile'));
const PanelControl = React.lazy(() =>
  import('components/PanelControl/PanelControl')
);
import PanelControlDrag from 'components/PanelControl/PanelControlDrag';
import PanelControlDrag2 from 'components/PanelControl/PanelControlDrag2';
import DragExample from 'components/PanelControl/PanelControlDrag3';
import ReorderTest from 'components/PanelControl/ReorderTest';
import { useWindowSize } from './hooks/windowSize';
import { setWindowDevice } from './store/userSlice';
import axios from 'axios';

const App = () => {
  const isExternal = (globalUser && JSON.parse(globalUser).isExternal) || 1;
  const showChat = useSelector((state) => state.chat.show);
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // sendRequest();
    if (globalReferer && globalRefererId) {
      if (globalReferer === 'bid') {
        navigate(`application/${globalRefererId}`);
      } else {
        navigate(`${globalReferer}/${globalRefererId}`);
      }
    }
    dispatch({ type: 'socket/connect' });
    return () => {
      dispatch({ type: 'socket/disconnect' });
    };
  }, []);
  useEffect(() => {
    dispatch(setWindowDevice(windowSize));
  }, [windowSize]);
  const sendRequest = async () => {
    const res = await axios.post(
      'https://crm.metragegroup.com/react_back/server.js',
      {
        city: 'moscow',
      }
    );
    console.log(res.data);
  };
  return (
    <>
      {windowSize > 768 ? (
        <Suspense>
          <Nav />
        </Suspense>
      ) : (
        <Suspense>
          <NavMobile />
        </Suspense>
      )}
      <MainContainer $isExternal={isExternal === '1'}>
        {windowSize > 768 && isExternal !== '1' && (
          <Suspense>
            <PanelControl />
          </Suspense>
        )}
        {/* <PanelControlDrag /> */}
        {/* <PanelControlDrag2 /> */}
        {/* <DragExample /> */}
        {/* <ReorderTest /> */}
        <Outlet />
      </MainContainer>
      <AnimatePresence>
        {showChat && (
          <>
            {windowSize > 768 ? (
              <Suspense>
                <Chat />
              </Suspense>
            ) : (
              <Suspense>
                <ChatMobile />
              </Suspense>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
