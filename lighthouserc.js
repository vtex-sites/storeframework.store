const VTEXLHConfig = require('@vtex/lighthouse-config').default

const urls = ['', '/women/', '/organza-sleeve-top/p']

module.exports = VTEXLHConfig({ urls, server: process.env.BASE_SITE_URL })
