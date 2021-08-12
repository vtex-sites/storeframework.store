
/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */

// Base Types
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type Maybe<T> = T | null | undefined
type Scalars = {
  Boolean: boolean
  String: string
  Float: number
  Int: number
  ID: string
}

// Operation related types
export type CollectionPageQueryQueryVariables = Exact<{
  sort: Scalars['String'];
  itemsPerPage: Scalars['Int'];
  selectedFacets: Array<Vtex_SelectedFacetInput> | Vtex_SelectedFacetInput;
  id: Scalars['String'];
}>;


export type CollectionPageQueryQuery = { cmsSeo: Maybe<{ seo: Maybe<{ siteMetadata: Maybe<{ titleTemplate: Maybe<string>, title: Maybe<string>, description: Maybe<string> }> }> }>, storeCollection: Maybe<{ seo: { title: string, description: string }, fields: Maybe<{ plp: Maybe<{ sections: Array<{ name: string, props: any }> }> }> }>, vtex: { productSearch: Maybe<{ recordsFiltered: Maybe<number>, products: Maybe<Array<Maybe<{ productName: Maybe<string>, linkText: Maybe<string>, id: Maybe<string>, items: Maybe<Array<Maybe<{ itemId: Maybe<string>, images: Maybe<Array<Maybe<{ imageUrl: Maybe<string>, imageText: Maybe<string> }>>> }>>> }>>> }>, facets: Maybe<{ breadcrumb: Maybe<Array<Maybe<{ href: Maybe<string>, name: Maybe<string> }>>>, facets: Maybe<Array<Maybe<{ name: Maybe<string>, type: Maybe<Vtex_FilterType>, values: Maybe<Array<Maybe<{ key: Maybe<string>, name: Maybe<string>, value: Maybe<string>, selected: Maybe<boolean>, quantity: number, range: Maybe<{ from: Maybe<number>, to: Maybe<number> }> }>>> }>>> }> } };


// Query Related Code

export const CollectionPageQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query CollectionPageQuery($sort: String!, $itemsPerPage: Int!, $selectedFacets: [VTEX_SelectedFacetInput!]!, $id: String!) {\n  cmsSeo {\n    seo {\n      siteMetadata {\n        titleTemplate\n        title\n        description\n      }\n    }\n  }\n  storeCollection(id: {eq: $id}) {\n    seo {\n      title\n      description\n    }\n    fields {\n      plp {\n        sections {\n          name\n          props\n        }\n      }\n    }\n  }\n  vtex {\n    productSearch(\n      from: 0\n      orderBy: $sort\n      to: $itemsPerPage\n      selectedFacets: $selectedFacets\n      hideUnavailableItems: false\n      simulationBehavior: skip\n    ) {\n      products {\n        id: productId\n        productName\n        linkText\n        items {\n          itemId\n          images {\n            imageUrl\n            imageText\n          }\n        }\n      }\n      recordsFiltered\n    }\n    facets(\n      selectedFacets: $selectedFacets\n      operator: or\n      behavior: \"Static\"\n      removeHiddenFacets: true\n    ) {\n      breadcrumb {\n        href\n        name\n      }\n      facets {\n        name\n        type\n        values {\n          key\n          name\n          value\n          selected\n          quantity\n          range {\n            from\n            to\n          }\n        }\n      }\n    }\n  }\n}\n",
  sha256Hash: "6c96f5ea1c50eeec8deffbf690af0eb5c2a0f3632ea4a72adb8dec38d666df09",
  operationName: "CollectionPageQuery",
}
