import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from 'src/components/ErrorBoundary';
import { makeRoutes } from 'src/routes';
import ChannelUpdate from './ChannelUpdate';

const routes = makeRoutes([
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
