#!/bin/bash
# Update gatsby-config.js file

fastmod -m -d gatsby-config.js 'plugins: \[' 'plugins: [  { resolve: "@vtex/gatsby-source-cms", options: { tenant: config.api.storeId, workspace: "master", }, },';

# Update package.json file

fastmod -m -d package.json '"name": "base.store"' '"name": "storeframework.store"';
fastmod -m -d package.json '"@vtex/gatsby-plugin-thumbor": "\^(\d*.\d*.\d*)",' '"@vtex/gatsby-plugin-thumbor": "^${1}",
    "@vtex/gatsby-source-cms": "^0.2.4",';

# Update src/pages/index.tsx file

## Remove section imports
fastmod -d src/pages/index.tsx "import.*/sections/.*\n" "";

### https://regex101.com/r/JYjCWE/2
fastmod -d src/pages/index.tsx "(import\sReact)(,\s\{.+\})?(.*'react')$" "\${1}\${3}
import RenderCMS from 'src/components/RenderCMS'";

## Component
fastmod -d src/pages/index.tsx 'data: \{ (.*)(allStore.*)\}' 'data: { ${1} cmsHome }';
fastmod -d src/pages/index.tsx "const\s(product|haveProduct).*" "";
fastmod -m -d src/pages/index.tsx 'Sections:.*</>$' 'CMS Sections */}<RenderCMS sections={cmsHome?.sections} /></>';

## Query
fastmod -m -d src/pages/index.tsx "query\s(\w*)\s\{(.*)\}" "query \${1} {\${2}
  cmsHome {
    sections {
      data
      name
    }
  }
}";
