import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import Inventory from './pages/Inventory'
import Cart from './pages/Cart'
import SalesHistory from './pages/SalesHistory'
import Purchases from './pages/Purchases'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'
import Refunds from './pages/Refunds'
import Exports from './pages/Exports'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/sales-history" element={<SalesHistory />} />
                    <Route path="/purchases" element={<Purchases />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/refunds" element={<Refunds />} />
                    <Route path="/exports" element={<Exports />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
