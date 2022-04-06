#!/bin/bash
# Update gatsby-config.ts file

fastmod -m -d gatsby-config.ts 'plugins: \[' 'plugins: [  { resolve: "@vtex/gatsby-source-cms", options: { tenant: config.api.storeId, workspace: "master", }, },';

# Update package.json file

fastmod -m -d package.json '"name": "base.store"' '"name": "storeframework.store"';
fastmod -m -d package.json '"@vtex/graphql-utils": "\^(\d*.\d*.\d*)",' '"@vtex/graphql-utils": "^${1}",
    "@vtex/gatsby-source-cms": "^0.2.4",';

# Update src/pages/index.tsx file

## Remove section imports
fastmod -d src/pages/index.tsx "import.*/sections/.*\n" "";

### Prepend CMS renderer import
echo -e "import RenderCMS from 'src/components/RenderCMS'\n$(cat ./src/pages/index.tsx)" > src/pages/index.tsx

## Component
fastmod -d src/pages/index.tsx 'data: \{ (.*)(site.*)\}' 'data: { ${1}site, cmsHome }';
fastmod -d src/pages/index.tsx "const\s(product|haveProduct).*" "";
fastmod -m -d src/pages/index.tsx 'WARNING:.*</>$' 'CMS Sections */}<RenderCMS sections={cmsHome?.sections} /></>';

## Query
fastmod -m -d src/pages/index.tsx "query\s(\w*)\s\{(.*)\}" "query \${1} {\${2}
  cmsHome {
    sections {
      data
      name
    }
  }
}";
