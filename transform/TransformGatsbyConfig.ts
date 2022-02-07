import type { ExpressionKind, PatternKind } from 'ast-types/gen/kinds'
import type {
  API,
  ArrayExpression,
  FileInfo,
  ObjectExpression,
  Property,
  JSCodeshift,
} from 'jscodeshift'

import { createMemberExpression } from './utils'
import type { Kind } from './utils/types'

interface CreateObjectPropertyParams<V = ExpressionKind | PatternKind> {
  kind: Kind
  property: string
  value: V
}

const createObjectPropertyWithAny = (
  j: JSCodeshift,
  { kind, property, value }: CreateObjectPropertyParams<Property['value']>
): Property => {
  return j.property(kind, j.identifier(property), value)
}

const createObjectPropertyWithString = (
  j: JSCodeshift,
  { kind, property, value }: CreateObjectPropertyParams<string>
): Property => {
  return createObjectPropertyWithAny(j, {
    kind,
    property,
    value: j.stringLiteral(value),
  })
}

const createCmsPluginEntry = (j: JSCodeshift): ObjectExpression => {
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
          value: createMemberExpression(
            j,
            createMemberExpression(j, 'config', 'api'),
            'storeId'
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

  if (!fileInfo.path.includes('gatsby-source')) {
    throw new Error(
      `File ${fileInfo.path} is not a valid file. Pass gatsby-source.js`
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
