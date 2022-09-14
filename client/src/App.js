import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.js';
import './theme/fonts.css';
import Navigation from './components/Navigation.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import ScrollToTop from './components/ScrollToTop.js';
import Home from './pages/Home.js';
import Shows from './pages/Shows.js';
import ShowDetail from './pages/ShowDetail.js';
import Venues from './pages/Venues.js';
import VenueDetail from './pages/VenueDetail.js';
import Songs from './pages/Songs.js';
import SongDetail from './pages/SongDetail.js';
import About from './pages/About.js';
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

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider client={authClient}>
            <Navigation />
            <Main>
              <ScrollToTop />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/shows" element={<Shows />} />
                <Route path="/shows/:id" element={<ShowDetail />} />
                <Route exact path="/venues" element={<Venues />} />
                <Route path="/venues/:id" element={<VenueDetail />} />
                <Route exact path="/songs" element={<Songs />} />
                <Route path="/songs/:id" element={<SongDetail />} />
                <Route exact path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />}>
                  <Route index element={<Navigate to="profile" replace />} />
                  <Route path="profile" element={<ProfileSettings />} />
                  <Route path="account" element={<AccountSettings />} />
                  <Route path="appearance" element={<AppearanceSettings />} />
                </Route>
                <Route path="/users/:id" element={<UserDetail />} />
                <Route exact path="/auth/login" element={<Login />} />
                <Route exact path="/auth/register" element={<Register />} />
                <Route exact path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route exact path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Main>
            <Footer />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </Router>
  );
};

export default App;
