import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import LandingLayout from './layouts/LandingLayout'
import AdminLayout from './layouts/AdminLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ContactPage from './pages/ContactPage'
import MenuPage from './pages/menu/MenuPage'
import CartPage from './pages/cart/CartPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrderConfirmationPage from './pages/orders/OrderConfirmationPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminMenuManagementPage from './pages/admin/AdminMenuManagementPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="menu" element={<AdminMenuManagementPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
      </Route>

      <Route path="/" element={<LandingLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route path="menu" element={<MenuPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order/confirmation" element={<OrderConfirmationPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
