import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import RootProvider from './RootProvider';
import RootRouter, { isFrontendRoute } from './routes';

import Header from './components/Header';
import { menu, title, header_height } from './constant/header';

const App = () => (
  <Router>
    <RootProvider>
      <Header
        title={title}
        menu={menu}
        height={header_height.wide}
        isFrontendRouter={isFrontendRoute}
      />
      <GlobalStyles />
      <RootRouter />
    </RootProvider>
  </Router>
);

export default App;
