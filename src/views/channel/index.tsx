import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from 'src/components/ErrorBoundary';
import { makeRoutes } from 'src/routes';
import ChannelList from './ChannelList';
import ChannelUpdate from './ChannelUpdate';

const routes = makeRoutes([
  {
    path: '/',
    element: <ChannelList />,
  },
  {
    path: '/new',
    element: <ChannelUpdate />,
  },
  {
    path: '/:id',
    element: <ChannelUpdate />,
  },
]);

const ChannelRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ErrorBoundary>{element}</ErrorBoundary>}
        />
      ))}
    </Routes>
  );
};

export default ChannelRouter;
