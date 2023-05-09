import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider as ThemeProvider } from '@chakra-ui/react';
import theme from './theme/theme.js';
import './theme/fonts.css';
import Layout from './components/Layout.js';
import Home from './pages/Home.js';
import Shows from './pages/Shows.js';
import ShowDetail from './pages/ShowDetail.js';
import Venues from './pages/Venues.js';
import VenueDetail from './pages/VenueDetail.js';
import Songs from './pages/Songs.js';
import SongDetail from './pages/SongDetail.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import UserDetail from './pages/UserDetail.js';
import NotFound from './pages/NotFound.js';
import Settings from './pages/Settings.js';
import { AuthProvider, AuthClient } from './lib/auth';
import {
  addToken,
  refreshToken,
  deleteToken
} from './services/auth-service.js';
import ProfileSettings from './pages/ProfileSettings.js';
import AccountSettings from './pages/AccountSettings.js';
import AppearanceSettings from './pages/AppearanceSettings.js';
import LandingPage from './pages/LandingPage.js';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 10000 // 10 sec
      }
    }
  });

  const authClient = new AuthClient({
    tokenLocalStorageKey: 'token',
    loginFn: addToken,
    refreshTokenFn: refreshToken,
    logoutFn: deleteToken
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          // element: <LandingPage />
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/shows',
          element: <Shows />
        },
        {
          path: '/shows/:id',
          element: <ShowDetail />
        },
        {
          path: '/songs',
          element: <Songs />
        },
        {
          path: '/songs/:id',
          element: <SongDetail />
        },
        {
          path: '/venues',
          element: <Venues />
        },
        {
          path: '/venues/:id',
          element: <VenueDetail />
        },
        {
          path: '/users/:id',
          element: <UserDetail />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/settings',
          element: <Settings />,
          children: [
            {
              index: true,
              element: <Navigate to="profile" replace />
            },
            {
              path: 'profile',
              element: <ProfileSettings />
            },
            {
              path: 'account',
              element: <AccountSettings />
            },
            {
              path: 'appearance',
              element: <AppearanceSettings />
            }
          ]
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },
    {
      path: '/auth/login',
      element: <Login />
    },
    {
      path: '/auth/register',
      element: <Register />
    },
    {
      path: '/auth/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/auth/reset-password',
      element: <ResetPassword />
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider client={authClient}>
          <RouterProvider router={router} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
