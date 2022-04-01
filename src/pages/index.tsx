import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React from 'react'
import RenderCMS from 'src/components/RenderCMS'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'

export type Props = PageProps<HomePageQueryQuery>

/**
 * Do not use this approach in production:
 *
 * Sometimes people delete content from the CMS on our test account, breaking our CI.
 * Since publishing new content depends on the CI, we get enter a deadlock. This prevents this deadlock
 */
const fallbackContent = [
  {
    data: {
      title: 'New Products Available',
      subtitle:
        'At FastStore you can shop the best tech of 2022. Enjoy and get 10% off on your first purchase.',
      linkText: 'See all',
      link: '/',
      imageSrc:
        'https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg',
      imageAlt: 'Quest 2 Controller on a table',
    },
    name: 'Hero',
  },
]

function Page(props: Props) {
  const {
    data: { site, cmsHome },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`

  return (
    <>
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
      <RenderCMS sections={cmsHome?.sections ?? fallbackContent} />
    </>
  )
}

export const query = graphql`
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
  }
`

Page.displayName = 'Page'
export default mark(Page)
