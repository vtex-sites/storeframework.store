fastmod -m -d gatsby-config.js 'plugins: \[' 'plugins: [  { resolve: "@vtex/gatsby-source-cms", options: { tenant: config.api.storeId, workspace: "master", }, },';
fastmod -m -d package.json '"name": "base.store"' '"name": "base-cms.store"';
fastmod -m -d package.json '"@vtex/gatsby-plugin-thumbor": "\^(\d*.\d*.\d*)",' '"@vtex/gatsby-plugin-thumbor": "^${1}",
    "@vtex/gatsby-plugin-cms": "^${1}"';
