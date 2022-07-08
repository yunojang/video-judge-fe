import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorMsg from './components/ErrorMsg';
import Loading from './components/Loading';

import Home from './views/home';

const Settings = lazy(() => import('./views/settings'));
const Alert = lazy(() => import('./views/alert'));
const Channel = lazy(() => import('./views/channel'));

// test component
const CanvasTest = lazy(() => import('./canvas/TestRenderer'));
const RequestTest = lazy(() => import('./views/request'));

interface Router {
  path: string;
  element: React.ReactNode;
  fallback?: React.ReactNode;
}

export const paths = {
  home: '/',
  alert: '/alert',
  settings: '/settings',
  channels: '/channel',
  canvasSandbox: '/sandbox_canvas',
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
    path: paths.alert,
    element: <Alert />,
  },
  {
    path: `${paths.channels}/*`,
    element: <Channel />,
  },
  {
    path: paths.canvasSandbox,
    element: <CanvasTest />,
  },
  {
    path: '/sandbox_request',
    element: <RequestTest />,
  },
  {
    path: '*',
    element: <ErrorMsg msg="[404] NotFound" />,
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
