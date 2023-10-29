/* eslint-disable eqeqeq */
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const infor = {
    currentUser: useSelector((state) => state.auth.currentUser),
    currentJson: JSON.parse(localStorage.getItem('account')),
  };

  // eslint-disable-next-line react/prop-types, react/no-unstable-nested-components
  const RequireAuth = ({ children }) =>
    infor.currentUser === infor.currentJson ? children : <Navigate to="/login" />;

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <RequireAuth>
              <IndexPage />
            </RequireAuth>
          ),
          index: true,
        },
        {
          path: 'user',
          element: (
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          ),
          index: true,
        },
        {
          path: 'products',
          element: (
            <RequireAuth>
              <ProductsPage />
            </RequireAuth>
          ),
        },
        {
          path: 'blog',
          element: (
            <RequireAuth>
              <BlogPage />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
