import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Dashboard from '@/pages/Dashboard'
import Accounts from '@/pages/Accounts'
import AccountDetail from '@/pages/AccountDetail'
import Analytics from '@/pages/Analytics'
import Settings from '@/pages/Settings'
import AboutMe from '@/pages/AboutMe'
import MockSalesforce from '@/pages/MockSalesforce'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="accounts/:accountId" element={<AccountDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="salesforce" element={<MockSalesforce />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
