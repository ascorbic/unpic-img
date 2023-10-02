/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
https://github.com/ericf/css-mediaquery
*/

// -----------------------------------------------------------------------------

export type MediaValues = Record<
  | "orientation"
  | "scan"
  | "width"
  | "height"
  | "device-width"
  | "device-height"
  | "resolution"
  | "aspect-ratio"
  | "device-aspect-ratio"
  | "grid"
  | "color"
  | "color-index"
  | "monochrome"
  | "prefers-color-scheme",
  unknown
>;

export type AST = QueryNode[];
export interface QueryNode {
  inverse: boolean;
  type: string;
  expressions: Expression[];
}
export interface Expression {
  modifier: string;
  feature: string;
  value: string;
}

const RE_MEDIA_QUERY =
  /^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^)]+\)))(?:\s*and\s*(.*))?$/i;
const RE_MQ_EXPRESSION = /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?::\s*([^)]+))?\s*\)$/;
const RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;

export function parse(mediaQuery: string): AST {
  return mediaQuery.split(",").map(function (query) {
    query = query.trim();

    const captures = query.match(RE_MEDIA_QUERY);

    // Media Query must be valid.
    if (!captures) {
      throw new SyntaxError('Invalid CSS media query: "' + query + '"');
    }

    const modifier = captures[1];

    const type = captures[2];
    const parsed: QueryNode = {
      inverse: !!modifier && modifier.toLowerCase() === "not",
      type: type ? type.toLowerCase() : "all",
      expressions: [],
    };

    const expressions = ((captures[3] || "") + (captures[4] || "")).trim();

    // Check for media query expressions.
    if (!expressions) {
      return parsed;
    }

    // Split expressions into a list.
    const expressionList = expressions.match(/\([^)]+\)/g);

    // Media Query must be valid.
    if (!expressionList) {
      throw new SyntaxError('Invalid CSS media query: "' + query + '"');
    }

    parsed.expressions = expressionList.map(function (expression): Expression {
      const captures = expression.match(RE_MQ_EXPRESSION);

      // Media Query must be valid.
      if (!captures) {
        throw new SyntaxError('Invalid CSS media query: "' + query + '"');
      }

      const feature = captures[1].toLowerCase().match(RE_MQ_FEATURE);

      return {
        modifier: feature?.[1] ?? "",
        feature: feature?.[2] ?? "",
        value: captures[2],
      };
    });

    return parsed;
  });
}
