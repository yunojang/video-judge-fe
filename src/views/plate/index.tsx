import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from 'src/components/ErrorBoundary';
import { makeRoutes } from 'src/routes';
import PlateList from './PlateList';
import PlateUpdate from './PlateUpdate';

const routes = makeRoutes([
  {
    path: '/',
    element: <PlateList />,
  },
  {
    path: '/new',
    element: <PlateUpdate />,
  },
  {
    path: '/:id',
    element: <PlateUpdate />,
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
