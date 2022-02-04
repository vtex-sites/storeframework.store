import type {
  API,
  ArrayExpression,
  FileInfo,
  ObjectExpression,
  Property,
} from 'jscodeshift'

type Codeshift = API['jscodeshift']
type Kind = 'init' | 'get' | 'set'

const createObjectPropertyWithAny = (
  j: Codeshift,
  {
    kind,
    property,
    value,
  }: {
    kind: Kind
    property: string
    value: Property['value']
  }
): Property => {
  return j.property(kind, j.identifier(property), value)
}

const createObjectPropertyWithString = (
  j: Codeshift,
  {
    kind,
    property,
    value,
  }: {
    kind: Kind
    property: string
    value: string
  }
): Property => {
  return createObjectPropertyWithAny(j, {
    kind,
    property,
    value: j.stringLiteral(value),
  })
}

const createCmsPluginEntry = (j: API['jscodeshift']): ObjectExpression => {
  return j.objectExpression([
    // add the resolve prop
    createObjectPropertyWithString(j, {
      kind: 'init',
      property: 'resolve',
      value: '@vtex/gatsby-source-cms',
    }),

    // add the options prop
    createObjectPropertyWithAny(j, {
      kind: 'init',
      property: 'options',
      value: j.objectExpression([
        // creating tenant prop
        createObjectPropertyWithAny(j, {
          kind: 'init',
          property: 'tenant',
          value: j.memberExpression(
            // creating config.api
            j.memberExpression(j.identifier('config'), j.identifier('api')),
            j.identifier('storeId')
          ),
        }),

        // creating workspace prop
        createObjectPropertyWithString(j, {
          kind: 'init',
          property: 'workspace',
          value: 'master',
        }),
      ]),
    }),
  ])
}

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

    if (!isCMSPluginDefined) {
      codeUpdated = true
      arrayExp.elements.unshift(createCmsPluginEntry(j))
    }
  })

  if (!codeUpdated) {
    return
  }

  return root.toSource()
}
