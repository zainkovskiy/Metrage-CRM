import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routers';
import { ThemeProvider } from 'styled-components';
import { rootTheme, darkTheme, GlobalStyle } from 'styles/root';
import { Provider } from 'react-redux';
import { store } from './store';

const loader = document.getElementById('loader');
loader.remove();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={rootTheme}>
      <RouterProvider router={routers} />
      <GlobalStyle />
    </ThemeProvider>
  </Provider>
);
