# eslint rules documentation

> **auto-generated**: 2025-11-02
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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates for-direction
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following for-direction
// check documentation for specific details
```

---

### `no-async-promise-executor`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-async-promise-executor
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-async-promise-executor
// check documentation for specific details
```

---

### `no-case-declarations`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-case-declarations
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-case-declarations
// check documentation for specific details
```

---

### `no-compare-neg-zero`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-compare-neg-zero
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-compare-neg-zero
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-cond-assign
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-cond-assign
// check documentation for specific details
```

---

### `no-constant-binary-expression`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-constant-binary-expression
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-constant-binary-expression
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
if (true) {
  doSomething();
}
```

✅ **correct**:

```typescript
if (condition) {
  doSomething();
}
```

---

### `no-control-regex`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-control-regex
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-control-regex
// check documentation for specific details
```

---

### `no-debugger`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
debugger;
console.log('after');
```

✅ **correct**:

```typescript
console.log('use dev tools instead');
```

---

### `no-delete-var`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-delete-var
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-delete-var
// check documentation for specific details
```

---

### `no-dupe-else-if`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-dupe-else-if
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-dupe-else-if
// check documentation for specific details
```

---

### `no-duplicate-case`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-duplicate-case
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-duplicate-case
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
if (condition) {}
```

✅ **correct**:

```typescript
if (condition) {
  // todo: implement
}
```

---

### `no-empty-character-class`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-empty-character-class
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-empty-character-class
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-empty-pattern
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-empty-pattern
// check documentation for specific details
```

---

### `no-empty-static-block`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-empty-static-block
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-empty-static-block
// check documentation for specific details
```

---

### `no-ex-assign`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-ex-assign
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-ex-assign
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-extra-boolean-cast
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-extra-boolean-cast
// check documentation for specific details
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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-fallthrough
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-fallthrough
// check documentation for specific details
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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-global-assign
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-global-assign
// check documentation for specific details
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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-invalid-regexp
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-invalid-regexp
// check documentation for specific details
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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-irregular-whitespace
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-irregular-whitespace
// check documentation for specific details
```

---

### `no-loss-of-precision`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-loss-of-precision
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-loss-of-precision
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-misleading-character-class
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-misleading-character-class
// check documentation for specific details
```

---

### `no-nonoctal-decimal-escape`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-nonoctal-decimal-escape
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-nonoctal-decimal-escape
// check documentation for specific details
```

---

### `no-octal`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-octal
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-octal
// check documentation for specific details
```

---

### `no-prototype-builtins`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-prototype-builtins
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-prototype-builtins
// check documentation for specific details
```

---

### `no-regex-spaces`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-regex-spaces
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-regex-spaces
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-self-assign
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-self-assign
// check documentation for specific details
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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-shadow-restricted-names
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-shadow-restricted-names
// check documentation for specific details
```

---

### `no-sparse-arrays`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-sparse-arrays
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-sparse-arrays
// check documentation for specific details
```

---

### `no-unexpected-multiline`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-unexpected-multiline
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-unexpected-multiline
// check documentation for specific details
```

---

### `no-unsafe-finally`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-unsafe-finally
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-unsafe-finally
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-unsafe-optional-chaining
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-unsafe-optional-chaining
// check documentation for specific details
```

---

### `no-unused-labels`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-unused-labels
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-unused-labels
// check documentation for specific details
```

---

### `no-unused-private-class-members`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-unused-private-class-members
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-unused-private-class-members
// check documentation for specific details
```

---

### `no-useless-backreference`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-useless-backreference
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-useless-backreference
// check documentation for specific details
```

---

### `no-useless-catch`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
try {
  doSomething();
} catch (e) {
  throw e;
}
```

✅ **correct**:

```typescript
try {
  doSomething();
} catch (e) {
  logger.error(e);
  throw e;
}
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates no-useless-escape
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following no-useless-escape
// check documentation for specific details
```

---

### `no-var`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
var x = 5;
```

✅ **correct**:

```typescript
const x = 5;
```

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

**examples**:

❌ **incorrect**:

```typescript
let x = 5;
console.log(x);
```

✅ **correct**:

```typescript
const x = 5;
console.log(x);
```

---

### `prefer-rest-params`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b);
}
```

✅ **correct**:

```typescript
function sum(...args) {
  return args.reduce((a, b) => a + b);
}
```

---

### `prefer-spread`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
Math.max.apply(Math, numbers);
```

✅ **correct**:

```typescript
Math.max(...numbers);
```

---

### `require-yield`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates require-yield
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following require-yield
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates use-isnan
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following use-isnan
// check documentation for specific details
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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates valid-typeof
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following valid-typeof
// check documentation for specific details
```

---

## typescript

### `@typescript-eslint/ban-ts-comment`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// @ts-ignore
const x: string = 5;
```

✅ **correct**:

```typescript
// provide proper types instead
const x: number = 5;
```

---

### `@typescript-eslint/no-array-constructor`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
const arr = new Array(1, 2, 3);
```

✅ **correct**:

```typescript
const arr = [1, 2, 3];
```

---

### `@typescript-eslint/no-duplicate-enum-values`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-duplicate-enum-values
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-duplicate-enum-values
// check documentation for specific details
```

---

### `@typescript-eslint/no-empty-object-type`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-empty-object-type
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-empty-object-type
// check documentation for specific details
```

---

### `@typescript-eslint/no-explicit-any`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
function process(data: any) {
  return data.value;
}
```

✅ **correct**:

```typescript
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
```

---

### `@typescript-eslint/no-extra-non-null-assertion`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-extra-non-null-assertion
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-extra-non-null-assertion
// check documentation for specific details
```

---

### `@typescript-eslint/no-misused-new`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-misused-new
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-misused-new
// check documentation for specific details
```

---

### `@typescript-eslint/no-namespace`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-namespace
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-namespace
// check documentation for specific details
```

---

### `@typescript-eslint/no-non-null-asserted-optional-chain`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-non-null-asserted-optional-chain
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-non-null-asserted-optional-chain
// check documentation for specific details
```

---

### `@typescript-eslint/no-require-imports`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-require-imports
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-require-imports
// check documentation for specific details
```

---

### `@typescript-eslint/no-this-alias`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
class MyClass {
  method() {
    const self = this;
    setTimeout(function() { self.value = 1; });
  }
}
```

✅ **correct**:

```typescript
class MyClass {
  method() {
    setTimeout(() => { this.value = 1; });
  }
}
```

---

### `@typescript-eslint/no-unnecessary-type-constraint`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-unnecessary-type-constraint
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-unnecessary-type-constraint
// check documentation for specific details
```

---

### `@typescript-eslint/no-unsafe-declaration-merging`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-unsafe-declaration-merging
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-unsafe-declaration-merging
// check documentation for specific details
```

---

### `@typescript-eslint/no-unsafe-function-type`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-unsafe-function-type
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-unsafe-function-type
// check documentation for specific details
```

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

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-unused-expressions
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-unused-expressions
// check documentation for specific details
```

---

### `@typescript-eslint/no-unused-vars`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
function calculate(x: number, y: number) {
  return x;
}
```

✅ **correct**:

```typescript
function calculate(x: number, _y: number) {
  return x;
}
```

---

### `@typescript-eslint/no-wrapper-object-types`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/no-wrapper-object-types
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/no-wrapper-object-types
// check documentation for specific details
```

---

### `@typescript-eslint/prefer-as-const`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
const value = 'literal' as 'literal';
```

✅ **correct**:

```typescript
const value = 'literal' as const;
```

---

### `@typescript-eslint/prefer-namespace-keyword`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/prefer-namespace-keyword
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/prefer-namespace-keyword
// check documentation for specific details
```

---

### `@typescript-eslint/triple-slash-reference`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
// example code that violates @typescript-eslint/triple-slash-reference
// check documentation for specific details
```

✅ **correct**:

```typescript
// corrected code following @typescript-eslint/triple-slash-reference
// check documentation for specific details
```

---

## react hooks

### `react-hooks/exhaustive-deps`

**severity**: warn

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
useEffect(() => {
  doSomething(value);
}, []);
```

✅ **correct**:

```typescript
useEffect(() => {
  doSomething(value);
}, [value]);
```

---

### `react-hooks/rules-of-hooks`

**severity**: error

**description**: no description available.

**examples**:

❌ **incorrect**:

```typescript
function Component({ condition }) {
  if (condition) {
    const [state] = useState(0);
  }
  return <div />;
}
```

✅ **correct**:

```typescript
function Component({ condition }) {
  const [state] = useState(0);
  if (condition) {
    return <div>{state}</div>;
  }
  return <div />;
}
```

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

**examples**:

❌ **incorrect**:

```typescript
export const util = () => {};
export default function App() {
  return <div />;
}
```

✅ **correct**:

```typescript
const util = () => {};
export default function App() {
  return <div />;
}
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

**last generated**: 2025-11-02T21:29:04.712Z
