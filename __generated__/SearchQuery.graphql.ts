

/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */


// Operation related types
export type SearchQueryQueryVariables = Exact<{
  first: Scalars['Int'];
  after: Maybe<Scalars['String']>;
  sort: Maybe<StoreSort>;
  term: Maybe<Scalars['String']>;
  selectedFacets: Array<IStoreSelectedFacet> | IStoreSelectedFacet;
}>;


export type SearchQueryQuery = { search: { products: { pageInfo: { totalCount: number }, edges: Array<{ node: { slug: string, sku: string, name: string, gtin: string, id: string, isVariantOf: { productGroupID: string, name: string }, image: Array<{ url: string, alternateName: string }>, brand: { name: string }, offers: { lowPrice: number, offers: Array<{ price: number, listPrice: number, seller: { identifier: string } }> } } }> } } };


// Query Related Code

export const SearchQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query SearchQuery($first: Int!, $after: String, $sort: StoreSort, $term: String, $selectedFacets: [IStoreSelectedFacet!]!) {\n  search(\n    first: $first\n    after: $after\n    sort: $sort\n    term: $term\n    selectedFacets: $selectedFacets\n  ) {\n    products {\n      pageInfo {\n        totalCount\n      }\n      edges {\n        node {\n          id: productID\n          slug\n          sku\n          name\n          gtin\n          isVariantOf {\n            productGroupID\n            name\n          }\n          image {\n            url\n            alternateName\n          }\n          brand {\n            name\n          }\n          offers {\n            lowPrice\n            offers {\n              price\n              listPrice\n              seller {\n                identifier\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
  sha256Hash: "1f94007129de5106e211cf1cc86b8e3911c41c678603712d360f052a12d64d85",
  operationName: "SearchQuery",
}

