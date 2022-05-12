import { lazy, Suspense } from 'react'
import Footer from 'src/components/common/Footer'
import Toast from 'src/components/common/Toast'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart } = useUI()

  return (
    <div id="layout">
      {/* Navbar had to be removed from this Layout file (and added to each page file). Sometimes, the Alert component (from CMS) needs to be displayed above Navbar, but this couldn't be handled in here */}

      <main>{children}</main>

      <Footer />

      <Toast />

      {displayMinicart && (
        <Suspense fallback={null}>
          <CartSidebar />
        </Suspense>
      )}
    </div>
  )
}

export default Layout
