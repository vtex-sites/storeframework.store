import { useMemo } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Navbar from 'src/components/common/Navbar'
import type { PageProps } from 'gatsby'

type Props = PageProps

const useErrorState = (location: Location) =>
  useMemo(() => {
    const params = new URLSearchParams(location.search)
    const fromUrl = decodeURI(params.get('from') ?? location.pathname)

    return {
      fromUrl,
    }
  }, [location.pathname, location.search])

function Page({ location }: Props) {
  const { fromUrl } = useErrorState(location)

  return (
    <>
      <Navbar />
      <GatsbySeo noindex nofollow />

      <h1>Not Found: 404</h1>
      <div>This app could not find url {fromUrl}</div>
    </>
  )
}

export default Page
