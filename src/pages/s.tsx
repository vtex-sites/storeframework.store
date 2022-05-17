import { parseSearchState, SearchProvider, useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { useEffect, useState } from 'react'
import Breadcrumb from 'src/components/sections/Breadcrumb'
import ProductGallery from 'src/components/sections/ProductGallery'
import SROnly from 'src/components/ui/SROnly'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import { mark } from 'src/sdk/tests/mark'
import type { SearchState } from '@faststore/sdk'
import type { PageProps } from 'gatsby'
import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from '@generated/graphql'
import Navbar from 'src/components/common/Navbar'
import Alert from 'src/components/common/Alert'

export type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables
>

const useSearchParams = ({ href }: Location) => {
  const [params, setParams] = useState<SearchState | null>(null)

  useEffect(() => {
    const url = new URL(href)

    setParams(parseSearchState(url))
  }, [href])

  return params
}

function Page(props: Props) {
  const {
    data: { site, cmsGlobalAlert },
  } = props

  const { locale } = useSession()
  const searchParams = useSearchParams(props.location)
  const title = 'Search Results | BaseStore'

  if (!searchParams) {
    return null
  }

  // TODO A future PR will be handling CMS data with a Provider and specific hooks
  const alertData = cmsGlobalAlert?.sections.find((section) => {
    return section.name === 'Alert'
  })?.data

  return (
    <>
      {alertData && (
        <Alert
          content={alertData.content}
          icon={alertData.icon}
          dismissible={alertData.dismissible}
          link={alertData.link}
        />
      )}

      <Navbar />
      <main>
        <SearchProvider
          onChange={applySearchState}
          itemsPerPage={ITEMS_PER_PAGE}
          {...searchParams}
        >
          {/* SEO */}
          <GatsbySeo
            noindex
            language={locale}
            title={title}
            description={site?.siteMetadata?.description ?? ''}
            titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
            openGraph={{
              type: 'website',
              title,
              description: site?.siteMetadata?.description ?? '',
            }}
          />

          <SROnly as="h1" text={title} />

          {/*
          WARNING: Do not import or render components from any
          other folder than '../components/sections' in here.

          This is necessary to keep the integration with the CMS
          easy and consistent, enabling the change and reorder
          of elements on this page.

          If needed, wrap your component in a <Section /> component
          (not the HTML tag) before rendering it here.
        */}
          <Breadcrumb name="All Products" />

          <ProductGallery
            title="Search Results"
            searchTerm={searchParams.term ?? undefined}
          />
        </SearchProvider>
      </main>
    </>
  )
}

export const querySSG = graphql`
  query SearchPageQuery {
    site {
      siteMetadata {
        titleTemplate
        title
        description
      }
    }

    cmsGlobalAlert {
      sections {
        data
        name
      }
    }
  }
`

Page.displayName = 'Page'

export default mark(Page)
