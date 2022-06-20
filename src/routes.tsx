import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

import Home from './views/home';
import HomeEx2 from './views/home/HomeEx2';

const Canvas = lazy(() => import('./views/canvas'));

interface Router {
  path: string;
  element: React.ReactNode;
  fallback?: React.ReactNode;
}

export const paths = {
  home: '/',
  home2: '/home2',
  canvas: '/canvas',
};

const routes: Router[] = [
  {
    path: paths.home,
    element: <Home />,
  },
  {
    path: paths.home2,
    element: <HomeEx2 />,
  },
  {
    path: paths.canvas,
    element: <Canvas />,
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
