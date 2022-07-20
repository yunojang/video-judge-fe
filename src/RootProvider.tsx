import { ThemeProvider, defaultTheme } from '@wizrnd/nx-ui';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import getStore from './store';

const store = getStore();

const RootProvider: FC = ({ children }) => (
  <Provider store={store}>
    <QueryParamProvider>
      <ThemeProvider theme={defaultTheme({})}>
        <>{children}</>
      </ThemeProvider>
    </QueryParamProvider>
  </Provider>
);

export default RootProvider;
