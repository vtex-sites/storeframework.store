import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import RenderCMS from 'src/components/RenderCMS'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import Navbar from 'src/components/common/Navbar'
import Alert from 'src/components/common/Alert'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { site, cmsHome, cmsGlobalAlert },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`

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
        {/* SEO */}
        <GatsbySeo
          title={title}
          description={site?.siteMetadata?.description ?? ''}
          titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
          language={locale}
          canonical={siteUrl}
          openGraph={{
            type: 'website',
            url: siteUrl,
            title: title ?? '',
            description: site?.siteMetadata?.description ?? '',
          }}
        />
        <JsonLd
          json={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: siteUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/s/?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }}
        />

        {/* CMS Sections */}
        <RenderCMS sections={cmsHome?.sections} />
      </main>
    </>
  )
}

export const querySSG = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }

    cmsHome {
      sections {
        data
        name
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
