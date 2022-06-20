import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

import Home from './views/home';

const Canvas = lazy(() => import('./views/canvas/CanvasRenderer'));

const Settings = lazy(() => import('./views/settings'));
const Channel = lazy(() => import('./views/settings/channel'));

interface Router {
  path: string;
  element: React.ReactNode;
  fallback?: React.ReactNode;
}

export const paths = {
  home: '/',
  settings: '/settings',
  channels: '/channel',
  canvas: '/canvas',
};

const routes: Router[] = [
  {
    path: paths.home,
    element: <Home />,
  },
  {
    path: paths.settings,
    element: <Settings />,
  },
  {
    path: paths.canvas,
    element: <Canvas />,
  },
  {
    path: paths.channels + '/:id',
    element: <Channel />,
  },
];

const RootRouter: FC = () => (
  <Routes>
    {routes.map(({ path, element, fallback = <Loading /> }) => (
      <Route
        key={path}
        path={path}
        element={
          <Suspense fallback={fallback}>
            <ErrorBoundary>{element}</ErrorBoundary>
          </Suspense>
        }
      />
    ))}
  </Routes>
);

export default RootRouter;

export function isFrontendRoute(path?: string) {
  if (path) {
    const basePath = path.split(/[?#]/)[0]; // strip out query params and link bookmarks
    return routes.some(r => r.path === basePath);
  }

  return false;
}
