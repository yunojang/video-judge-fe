import { ThemeProvider, defaultTheme } from '@wizrnd/nx-ui';
import { FC } from 'react';
import { Provider } from 'react-redux';
import getStore from './store';

const store = getStore();

const RootProvider: FC = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme({})}>
      <>{children}</>
    </ThemeProvider>
  </Provider>
);

export default RootProvider;
