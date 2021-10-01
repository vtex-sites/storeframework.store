

/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */


// Operation related types
export type FullTextSearchQueryQueryVariables = Exact<{
  first: Scalars['Int'];
  after: Maybe<Scalars['String']>;
  sort: Maybe<StoreSort>;
  term: Scalars['String'];
  selectedFacets: Array<StoreSelectedFacet> | StoreSelectedFacet;
}>;


export type FullTextSearchQueryQuery = { search: { products: { pageInfo: { totalCount: number }, edges: Array<{ node: { slug: string, name: string, id: string, isVariantOf: { name: string }, image: Array<{ url: string, alternateName: string }>, offers: { lowPrice: number, offers: Array<{ price: number, listPrice: number, seller: { identifier: string } }> } } }> }, facets: Array<{ key: string, label: string, type: StoreFacetType, values: Array<{ label: string, value: string, selected: boolean, quantity: number }> }> } };


// Query Related Code

export const FullTextSearchQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query FullTextSearchQuery($first: Int!, $after: String, $sort: StoreSort, $term: String!, $selectedFacets: [StoreSelectedFacet!]!) {\n  search(\n    first: $first\n    after: $after\n    sort: $sort\n    term: $term\n    selectedFacets: $selectedFacets\n  ) {\n    products {\n      pageInfo {\n        totalCount\n      }\n      edges {\n        node {\n          id: productID\n          slug\n          name\n          isVariantOf {\n            name\n          }\n          image {\n            url\n            alternateName\n          }\n          offers {\n            lowPrice\n            offers {\n              price\n              listPrice\n              seller {\n                identifier\n              }\n            }\n          }\n        }\n      }\n    }\n    facets {\n      key\n      label\n      type\n      values {\n        label\n        value\n        selected\n        quantity\n      }\n    }\n  }\n}\n",
  sha256Hash: "5dc543ba7526e0afff1f4f093ab69b04a5f02900e07e5dde02b43941cf457f02",
  operationName: "FullTextSearchQuery",
}
