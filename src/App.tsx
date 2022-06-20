import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import RootProvider from './RootProvider';
import RootRouter, { isFrontendRoute } from './routes';

import Header from './views/home/components/Header';
import { menu, title } from './constant';

const App = () => (
  <Router>
    <RootProvider>
      <Header title={title} menu={menu} isFrontendRouter={isFrontendRoute} />
      <GlobalStyles />
      <RootRouter />
    </RootProvider>
  </Router>
);

export default App;
