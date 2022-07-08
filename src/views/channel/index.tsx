import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from 'src/components/ErrorBoundary';
import Channel from './Channel';

interface Router {
  path: string;
  element: React.ReactNode;
}

const routes: Router[] = [
  {
    path: '/new',
    element: <Channel />,
  },
  {
    path: '/:id',
    element: <Channel />,
  },
];

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
