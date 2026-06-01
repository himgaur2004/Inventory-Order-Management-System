import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Orders from './pages/Orders';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
      <Toaster position='top-right' />
    </QueryClientProvider>
  );
}
