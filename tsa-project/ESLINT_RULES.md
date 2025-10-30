# eslint rules documentation

> **auto-generated**: 2025-10-30
> 
> this document is automatically generated from the eslint configuration.
> any manual changes will be overwritten on the next update.

## table of contents

- [javascript core (46 rules)](#javascript-core)
- [typescript (20 rules)](#typescript)
- [react hooks (2 rules)](#react-hooks)
- [react refresh (1 rules)](#react-refresh)

---

## configuration summary

- **total rules**: 69
- **error level**: 68
- **warning level**: 1
- **file patterns**: `**/*.ts`, `**/*.tsx`
- **ignored paths**: `dist`

---

## javascript core

### `for-direction`

**severity**: error

**description**: no description available.

---

### `no-async-promise-executor`

**severity**: error

**description**: no description available.

---

### `no-case-declarations`

**severity**: error

**description**: no description available.

---

### `no-compare-neg-zero`

**severity**: error

**description**: no description available.

---

### `no-cond-assign`

**severity**: error

**description**: no description available.

**options**:
```json
[
  "except-parens"
]
```

---

### `no-constant-binary-expression`

**severity**: error

**description**: no description available.

---

### `no-constant-condition`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "checkLoops": "allExceptWhileTrue"
  }
]
```

---

### `no-control-regex`

**severity**: error

**description**: no description available.

---

### `no-debugger`

**severity**: error

**description**: no description available.

---

### `no-delete-var`

**severity**: error

**description**: no description available.

---

### `no-dupe-else-if`

**severity**: error

**description**: no description available.

---

### `no-duplicate-case`

**severity**: error

**description**: no description available.

---

### `no-empty`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "allowEmptyCatch": false
  }
]
```

---

### `no-empty-character-class`

**severity**: error

**description**: no description available.

---

### `no-empty-pattern`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "allowObjectPatternsAsParameters": false
  }
]
```

---

### `no-empty-static-block`

**severity**: error

**description**: no description available.

---

### `no-ex-assign`

**severity**: error

**description**: no description available.

---

### `no-extra-boolean-cast`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {}
]
```

---

### `no-fallthrough`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "allowEmptyCase": false,
    "reportUnusedFallthroughComment": false
  }
]
```

---

### `no-global-assign`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "exceptions": []
  }
]
```

---

### `no-invalid-regexp`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {}
]
```

---

### `no-irregular-whitespace`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "skipComments": false,
    "skipJSXText": false,
    "skipRegExps": false,
    "skipStrings": true,
    "skipTemplates": false
  }
]
```

---

### `no-loss-of-precision`

**severity**: error

**description**: no description available.

---

### `no-misleading-character-class`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "allowEscape": false
  }
]
```

---

### `no-nonoctal-decimal-escape`

**severity**: error

**description**: no description available.

---

### `no-octal`

**severity**: error

**description**: no description available.

---

### `no-prototype-builtins`

**severity**: error

**description**: no description available.

---

### `no-regex-spaces`

**severity**: error

**description**: no description available.

---

### `no-self-assign`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "props": true
  }
]
```

---

### `no-shadow-restricted-names`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "reportGlobalThis": false
  }
]
```

---

### `no-sparse-arrays`

**severity**: error

**description**: no description available.

---

### `no-unexpected-multiline`

**severity**: error

**description**: no description available.

---

### `no-unsafe-finally`

**severity**: error

**description**: no description available.

---

### `no-unsafe-optional-chaining`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "disallowArithmeticOperators": false
  }
]
```

---

### `no-unused-labels`

**severity**: error

**description**: no description available.

---

### `no-unused-private-class-members`

**severity**: error

**description**: no description available.

---

### `no-useless-backreference`

**severity**: error

**description**: no description available.

---

### `no-useless-catch`

**severity**: error

**description**: no description available.

---

### `no-useless-escape`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "allowRegexCharacters": []
  }
]
```

---

### `no-var`

**severity**: error

**description**: no description available.

---

### `prefer-const`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "destructuring": "any",
    "ignoreReadBeforeAssign": false
  }
]
```

---

### `prefer-rest-params`

**severity**: error

**description**: no description available.

---

### `prefer-spread`

**severity**: error

**description**: no description available.

---

### `require-yield`

**severity**: error

**description**: no description available.

---

### `use-isnan`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "enforceForIndexOf": false,
    "enforceForSwitchCase": true
  }
]
```

---

### `valid-typeof`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "requireStringLiterals": false
  }
]
```

---

## typescript

### `@typescript-eslint/ban-ts-comment`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-array-constructor`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-duplicate-enum-values`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-empty-object-type`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-explicit-any`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-extra-non-null-assertion`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-misused-new`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-namespace`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-non-null-asserted-optional-chain`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-require-imports`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-this-alias`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-unnecessary-type-constraint`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-unsafe-declaration-merging`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-unsafe-function-type`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-unused-expressions`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "allowShortCircuit": false,
    "allowTaggedTemplates": false,
    "allowTernary": false
  }
]
```

---

### `@typescript-eslint/no-unused-vars`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/no-wrapper-object-types`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/prefer-as-const`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/prefer-namespace-keyword`

**severity**: error

**description**: no description available.

---

### `@typescript-eslint/triple-slash-reference`

**severity**: error

**description**: no description available.

---

## react hooks

### `react-hooks/exhaustive-deps`

**severity**: warn

**description**: no description available.

---

### `react-hooks/rules-of-hooks`

**severity**: error

**description**: no description available.

---

## react refresh

### `react-refresh/only-export-components`

**severity**: error

**description**: no description available.

**options**:
```json
[
  {
    "allowConstantExport": true
  }
]
```

---

## how to update this documentation

this file is automatically generated. to update:

1. **automatic**: runs on every push that changes `eslint.config.js` or `package.json`
2. **manual**: run `npm run generate-eslint-docs`
3. **manual (github actions)**: go to actions → "update eslint rules documentation" → run workflow

## resources

- [eslint documentation](https://eslint.org/docs/latest/)
- [typescript eslint](https://typescript-eslint.io/)
- [react hooks rules](https://react.dev/reference/rules/rules-of-hooks)
- [react fast refresh](https://github.com/facebook/react/tree/main/packages/react-refresh)

---

**last generated**: 2025-10-30T01:33:33.055Z
