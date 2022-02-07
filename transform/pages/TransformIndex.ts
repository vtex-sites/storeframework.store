import type {
  API,
  ASTPath,
  Collection,
  FileInfo,
  Identifier,
  ImportDeclaration,
  JSCodeshift,
  JSXElement,
  ObjectPattern,
  ObjectProperty,
  VariableDeclarator,
} from 'jscodeshift'

const findJSXElementByTag = (j: JSCodeshift, root: Collection, tag: string) =>
  root.find(j.JSXElement, {
    openingElement: {
      name: {
        name: tag,
      },
    },
  })

const recursiveRemoveUnusedReferences = (
  j: JSCodeshift,
  root: Collection,
  unusedReferences: Set<string>
) => {
  if (unusedReferences.size === 0) {
    return
  }

  const referencesSet: Set<string> = new Set([])

  const findReferencesUsedOnVariableInit = (
    path: ASTPath<VariableDeclarator>
  ) => {
    if (path.value.init) {
      j(path.value.init)
        .find(j.Identifier)
        .forEach((identifierPath) => {
          // TODO: Check if rereference is unused
          referencesSet.add(identifierPath.value.name)
        })
    }
  }

  const removeObjectDestructReference = (path: ASTPath<Identifier>) => {
    if (path.parentPath.value?.type === 'ObjectProperty') {
      j(path.parentPath).remove()
    }
  }

  unusedReferences.forEach((variableName) => {
    const declarations = root
      .findVariableDeclarators(variableName)
      .forEach(findReferencesUsedOnVariableInit)

    // Remove Destructor references
    if (!declarations.size()) {
      root
        .find(j.Identifier, {
          name: variableName,
        })
        .forEach(removeObjectDestructReference)
    }

    // Remove declarations references
    declarations.remove()
  })

  recursiveRemoveUnusedReferences(j, root, referencesSet)
}

const removeSectionCodeBlocks = (
  j: API['jscodeshift'],
  root: Collection
): void => {
  const leftExpressionsToBeRemoved: Set<string> = new Set([])

  const removeSectionJSXElements = (path: ASTPath<JSXElement>) => {
    /*
     * Remove JSXExpressionContainer, like:
     * {foo && <section><children /></section>}
     */
    if (path.parentPath.value.type === 'LogicalExpression') {
      const { left } = path.parentPath.value

      leftExpressionsToBeRemoved.add(left.name)

      j(path.parentPath.parentPath).remove()

      return
    }

    // Remove section itself
    j(path).remove()
  }

  findJSXElementByTag(j, root, 'section').forEach(removeSectionJSXElements)

  // TODO: Check if reference is unused
  recursiveRemoveUnusedReferences(j, root, leftExpressionsToBeRemoved)
}

const createImportRenderCMS = (j: JSCodeshift, root: Collection) => {
  const [importDeclarationRenderCMS] = j(
    "import RenderCMS from 'src/components/RenderCMS'"
  )
    .find(j.ImportDeclaration)
    .nodes()

  const filterIsReactImport = (path: ASTPath<ImportDeclaration>) => {
    return path.value.source.value === 'react'
  }

  // add import renderCMS Declaration
  root
    .find(j.ImportDeclaration)
    .filter(filterIsReactImport)
    .insertAfter(importDeclarationRenderCMS)
}

const addCmsHomeIdentifierInsideData = (j: JSCodeshift, root: Collection) => {
  const addCMSHomeReferenceInsideData = (path: ASTPath<Identifier>) => {
    const dataObject: ObjectPattern = (path.parentPath.value as ObjectProperty)
      .value as ObjectPattern

    const cmsHomeIdentifier = j.identifier('cmsHome')
    const cmsHomeObjectProperty = j.objectProperty(
      cmsHomeIdentifier,
      cmsHomeIdentifier
    )

    // cmsHomeObjectProperty.shorthand = true

    dataObject.properties.push(cmsHomeObjectProperty)
  }

  // cmsHome reference inside data object
  root
    .find(j.Identifier, { name: 'data' })
    .forEach(addCMSHomeReferenceInsideData)
}

const addRenderCMSInitialization = (j: JSCodeshift, root: Collection) => {
  const createRenderCMSComponent = () =>
    j.jsxElement(
      j.jsxOpeningElement(
        j.jsxIdentifier('RenderCMS'),
        // attributes
        [
          j.jsxAttribute(
            j.jsxIdentifier('sections'),
            j.jsxExpressionContainer(
              j.optionalMemberExpression(
                j.identifier('cmsHome'),
                j.identifier('sections'),
                false,
                true
              )
            )
          ),
        ],
        // self closing tag
        true
      )
    )

  root.find(j.JSXFragment).forEach((path) => {
    path.value.children?.push(createRenderCMSComponent())
  })
}

/**
 * This method add an import, cmsHome identifier, and RenderCMS component usage.
 *
 * E.g.: import RenderCMS from 'path-to-render-cms-component'
 * E.g.: data: { ..., cmsHome }
 * E.g.: <RenderCMS sections={cmsHome?.sections}
 */
const addRenderCMSComponent = (j: JSCodeshift, root: Collection): void => {
  createImportRenderCMS(j, root)

  addCmsHomeIdentifierInsideData(j, root)

  addRenderCMSInitialization(j, root)
}

// npx jscodeshift -t ./transform/pages/TransformIndex.ts --parser=tsx ./src/pages/index.tsx --print --dry
export default function transform(fileInfo: FileInfo, api: API) {
  if (!fileInfo.path.includes('pages/index')) {
    throw new Error(
      `File ${fileInfo.path} is not a valid file. Pass src/pages/index.tsx`
    )
  }

  const j = api.jscodeshift
  const root = j(fileInfo.source)

  removeSectionCodeBlocks(j, root)

  addRenderCMSComponent(j, root)

  return root.toSource()
}
