module.exports = {
  "root"          : true,
  "parser"        : 'babel-eslint',
  "parserOptions" : {
    "sourceType"   : 'module',
    "ecmaVersion"  : 6,
    "ecmaFeatures" : {
      "jsx": false
    }
  },
  "env": {
    "browser" : true,
    "node"    : true,
    "es6"     : true
  },
  "extends" : ['airbnb-base', "eslint:recommended"],
  "globals" : {
    __static: true
  },
  "plugins" : [
    'html',
    'react'
  ],
  'rules': {
    // Note:
    // 0 - Disable the rule == off
    // 1 - Warn about the rule == warn
    // 2 - Throw error about the rule == \error

    'global-require'              : 0,
    'import/no-unresolved'        : 0,
    'no-param-reassign'           : 0,
    'no-shadow'                   : 0,
    'import/extensions'           : 0,
    'import/newline-after-import' : 0,
    'no-multi-assign'             : 0,
    "no-undef"                    : 1,
    "global-strict"               : 0,
    "no-extra-semi"               : 1,
    "no-underscore-dangle"        : 0,
    "no-unused-vars"              : 1,
    "no-trailing-spaces"          : [1, {
      "skipBlankLines": true
    }],
    "no-unreachable"       : 1,
    "no-alert"             : 0,
    "react/jsx-uses-react" : 1,
    "react/jsx-uses-vars"  : 1,

    "semi": ["error", "always", { "omitLastInOneLineBlock": true}],
    "eqeqeq": "warn",
    "quotes": ["error", "single"],

    // Enforce or disallow the use of braces around arrow function body.
    "arrow-body-style": ["warn", "as-needed"],

    // Because the unary ++ and -- operators are subject to automatic semicolon insertion,
    // differences in whitespace can change semantics of source code.
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],

    // disallows trailing commas
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",

      // functions should only be enabled when linting ECMAScript 2017 or higher.
      "functions": "ignore"
    }],

    // No space before comma/semi-colon, but space required after comma/semi-colon
    "comma-spacing": ["error", { "before": false, "after": true }],
    "semi-spacing": ["error", { "before": false, "after": true }],

    // Stroustrup style: else statements in an if-else construct, as well as catch and finally,
    // must be on its own line after the preceding closing brace
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],

    // disallows space between the function name and the opening parenthesis.
    "func-call-spacing": ["error", "never"],

    // configuration that forces brace-less if, else if, else, for, while, or do if their body
    // contains only one single-line statement. And forces braces in all other cases.
    "curly": ["warn", "multi-or-nest", "consistent"],
    // "curly": ["warn"],

    // enforce consistent spacing inside braces of object literals, destructuring assignments,
    // and import/export specifiers
    "object-curly-spacing": ["warn", "always", {
      "arraysInObjects": true,
      "objectsInObjects": true
    }],

    // enforce 2-space indentation
    "indent": ["error", 2, {
      "SwitchCase": 1, // default = 0; 2-space indentation
      "VariableDeclarator": { "var": 2, "let": 2, "const": 3 },
      "MemberExpression": 1, // indent the multi-line property chains with 2 spaces.
      "ArrayExpression": 1, // default = 1; enforces indentation level for elements in arrays
      "ObjectExpression": 1, // default = 1; enforces indentation level for properties in objects.
    }],

    // This rule is aimed at flagging variables that are declared using let keyword,
    // but never reassigned after the initial assignment.
    // "prefer-const": ["error", {
    //     "destructuring": "any",
    //     "ignoreReadBeforeAssign": false
    // }],

    // rule is aimed at discouraging the use of var and encouraging the use of const or let instead
    "no-var": "error",

    // enforces newlines between the operands of a ternary expression
    // if the expression spans multiple lines.
    "multiline-ternary": ["error", "always-multiline"],

    // This rule is aimed at ensuring there are spaces around infix operators.
    "space-infix-ops": ["error", {"int32Hint": false}],

    // enforces consistent spacing around keywords and keyword-like tokens;
    // rule is designed carefully not to conflict with other spacing rules
    "keyword-spacing": ["error", { "before": true, "after": true }],

    // Normalize style of spacing before/after an arrow function’s arrow(=>)
    "arrow-spacing": ["error", { "before": true, "after": true }],

    // Enforce consistency of spacing before blocks.
    // It is only applied on blocks that don’t begin on a new line
    "space-before-blocks": ["error", {
      "functions": "always",
      "keywords": "always",
      "classes": "always"
    }],

    // disallow multiple whitespace around logical expressions, conditional expressions,
    // declarations, array elements, object properties, sequences and function parameters
    "no-multi-spaces": ["error", {
      "ignoreEOLComments": true,
      "exceptions": {
        "Property"             : true,
        "VariableDeclarator"   : true,
        "ImportDeclaration"    : true,
        "ObjectPattern"        : true,
        "ExpressionStatement"  : true,
        "AssignmentExpression" : true,
        "ConditionalExpression": true,
        // "Identifier"           : true,
        // "MemberExpression"     : true
      }
    }],

    // enforces consistent empty line padding within blocks
    "padded-blocks": "error",

    "no-console": "off",

    // TODO: Rule causes linter to not work. Reevaluate what to do.
    // enforces consistent spacing between keys and values in object literal properties. In the
    // case of long lines, it is acceptable to add a new line wherever whitespace is allowed
    "key-spacing": ["warn", {
      // "align": {
      //   "beforeColon" : true,
      //   "afterColon"  : true,
      //   "on"          : "colon",
      //   "mode"        : "minimum"
      // },
      "singleLine": {
        "beforeColon" : false,
        "afterColon"  : true
      },
      "multiLine": {
          "beforeColon" : true,
          "afterColon"  : true,
          "align"       : "colon"
      }
    }],

    // allows mixed spaces and tabs when the latter are used for alignment
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],

    // Rule removed from eslint-config-airbnb=base
    // 'no-else-return': ['error', { allowElseIf: true }],


    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    "no-debugger": "off"
  }
};
