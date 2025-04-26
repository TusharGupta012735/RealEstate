import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { PropertiesProvider } from './context/PropertiesContext';
import { NotificationsProvider } from './context/NotificationsContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SellPropertyPage from './pages/SellPropertyPage';
import DashboardPage from './pages/DashboardPage';
import NotificationsPage from './pages/NotificationsPage';
import WatchlistPage from './pages/WatchlistPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
      <WalletProvider>
        <PropertiesProvider>
          <NotificationsProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
                <Route path="/sell" element={
                  <ProtectedRoute>
                    <SellPropertyPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                } />
                <Route path="/watchlist" element={
                  <ProtectedRoute>
                    <WatchlistPage />
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          </NotificationsProvider>
        </PropertiesProvider>
      </WalletProvider>
  );
}

export default App;