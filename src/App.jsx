import React, { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from 'styles/styles';
import Chat from 'components/Chat/Chat';
import ChatMobile from 'mobile/Chat/ChatMobile';
const Nav = React.lazy(() => import('components/Nav/Nav'));
const NavMobile = React.lazy(() => import('mobile/Nav/NavMobile'));
const NoticePopover = React.lazy(() =>
  import('components/NoticePopover/NoticePopover')
);
const PanelControl = React.lazy(() =>
  import('components/PanelControl/PanelControl')
);
const News = React.lazy(() => import('components/News/News'));
import { useWindowSize } from './hooks/windowSize';
import { setWindowDevice } from './store/userSlice';

const App = () => {
  const isExternal = (globalUser && JSON.parse(globalUser).isExternal) || 1;
  const showChat = useSelector((state) => state.chat.show);
  const { newsList } = useSelector((state) => state.news);
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (globalReferer && globalRefererId) {
      navigate(`${globalReferer}/${globalRefererId}`);
    }
    dispatch({ type: 'socket/connect' });
    return () => {
      dispatch({ type: 'socket/disconnect' });
    };
  }, []);
  useEffect(() => {
    dispatch(setWindowDevice(windowSize));
  }, [windowSize]);
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
      {windowSize > 768 && <NoticePopover />}
      {newsList?.length > 0 && <News />}
    </>
  );
};

export default App;
