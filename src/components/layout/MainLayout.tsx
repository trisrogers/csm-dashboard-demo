import { Outlet } from 'react-router-dom'
import Header from './Header'
import DismissableBanner from '@/components/ui/DismissableBanner'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DismissableBanner />
      <Header />
      <main className="container mx-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  )
}
