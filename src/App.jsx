import React, { Suspense, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
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
  const showChat = useSelector((state) => state.chat.show);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [searchParams, setSearchParams ] = useSearchParams();
  // console.log(searchParams.get('bid'));

  useEffect(() => {
    if(globalReferer && globalRefererId){
      navigate(`application/${globalRefererId}`);
    }
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
