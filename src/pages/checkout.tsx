import { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Navbar from 'src/components/common/Navbar'

import storeConfig from '../../store.config'

function Page() {
  useEffect(() => {
    window.location.href = storeConfig.checkoutUrl
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <GatsbySeo noindex nofollow />

        <div>loading...</div>
      </main>
    </>
  )
}

export default Page
