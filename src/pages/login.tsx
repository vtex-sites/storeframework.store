import { useEffect } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Navbar from 'src/components/common/Navbar'

import storeConfig from '../../store.config'

function Page() {
  useEffect(() => {
    window.location.href = storeConfig.loginUrl
  }, [])

  return (
    <>
      <Navbar />
      <GatsbySeo noindex nofollow />

      <div>loading...</div>
    </>
  )
}

export default Page
