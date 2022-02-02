import type { API, ArrayExpression, FileInfo, Property } from 'jscodeshift'

// npx jscodeshift -t ./transform/TransformGatsbyConfig.ts --extensions=ts,js --parser=ts './gatsby-config.js' --print --dry
export default function transform(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift

  if (!fileInfo.source.includes('gatsby-source')) {
    throw new Error(
      `File ${fileInfo.source} is not a valid file. Pass gatsby-source.js`
    )
  }

  const root = j(fileInfo.source)
  let codeUpdated = false

  root.find(j.Identifier, { name: 'plugins' }).forEach((path) => {
    const pluginProp = path.parent
    const arrayExp: ArrayExpression = pluginProp.value.value

    const isCMSPluginDefined =
      j(arrayExp)
        .find(j.Literal, { value: '@vtex/gatsby-source-cms' })
        .size() >= 1

    j(arrayExp).forEach((p) => {
      p.get('elements').value.push(j.template.expression`x`)
    })

    codeUpdated = true
    // if (isCMSPluginDefined) {
    // codeUpdated = true
    // console.log(arrayExp, j(arrayExp))
    // }
  })

  // codeUpdated && root.toString()

  // const [pluginProperties] = (
  // (moduleExportAssignment.right as ObjectExpression)
  // .properties as ObjectProperty[]
  // ).filter((prop) => {
  // return prop.key.type === 'Identifier' && prop.key.name === 'plugins'
  // })
  //
  codeUpdated && root.toSource()
}
