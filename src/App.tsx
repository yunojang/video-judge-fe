import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import RootProvider from './RootProvider';
import RootRouter from './routes';

const App = () => (
  <Router>
    <RootProvider>
      <GlobalStyles />
      <RootRouter />
    </RootProvider>
  </Router>
);

export default App;
