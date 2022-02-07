import type { ExpressionKind } from 'ast-types/gen/kinds'
import type { JSCodeshift } from 'jscodeshift'

export const createMemberExpression = (
  j: JSCodeshift,
  expObject: ExpressionKind | string,
  property: string
) =>
  typeof expObject === 'string'
    ? j.memberExpression(j.identifier(expObject), j.identifier(property))
    : j.memberExpression(expObject, j.identifier(property))
