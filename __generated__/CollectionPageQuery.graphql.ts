

/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */


// Operation related types
export type CollectionPageQueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CollectionPageQueryQuery = { site: Maybe<{ siteMetadata: Maybe<{ titleTemplate: Maybe<string>, title: Maybe<string>, description: Maybe<string> }> }>, storeCollection: Maybe<{ seo: { title: string, description: string }, breadcrumbList: { itemListElement: Array<{ item: string, name: string, position: number }> }, meta: { selectedFacets: Array<{ key: string, value: string }> } }> };


// Query Related Code

export const CollectionPageQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query CollectionPageQuery($id: String!) {\n  site {\n    siteMetadata {\n      titleTemplate\n      title\n      description\n    }\n  }\n  storeCollection(id: {eq: $id}) {\n    seo {\n      title\n      description\n    }\n    breadcrumbList {\n      itemListElement {\n        item\n        name\n        position\n      }\n    }\n    meta {\n      selectedFacets {\n        key\n        value\n      }\n    }\n  }\n}\n",
  sha256Hash: "a4c3e9dcf3be10b1d064ab5dfc5a4dcf40963f13c996c795a87b9ec44d047cf0",
  operationName: "CollectionPageQuery",
}
