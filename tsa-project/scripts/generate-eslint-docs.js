#!/usr/bin/env node
import { ESLint } from 'eslint';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const REPO_ROOT = path.join(PROJECT_ROOT, '..');
const OUTPUT_FILE = path.join(REPO_ROOT, 'docs', 'typescript', 'ESLINT_RULES.md');

/**
 * generate code examples for a rule
 */
function generateCodeExamples(ruleId, config) {
  const examples = {
    incorrect: [],
    correct: []
  };

  // typescript-eslint rules
  if (ruleId === '@typescript-eslint/no-explicit-any') {
    examples.incorrect.push(`function process(data: any) {\n  return data.value;\n}`);
    examples.correct.push(`function process(data: unknown) {\n  if (typeof data === 'object' && data !== null && 'value' in data) {\n    return (data as { value: string }).value;\n  }\n}`);
  } else if (ruleId === '@typescript-eslint/no-unused-vars') {
    examples.incorrect.push(`function calculate(x: number, y: number) {\n  return x;\n}`);
    examples.correct.push(`function calculate(x: number, _y: number) {\n  return x;\n}`);
  } else if (ruleId === '@typescript-eslint/explicit-function-return-type') {
    examples.incorrect.push(`function add(a: number, b: number) {\n  return a + b;\n}`);
    examples.correct.push(`function add(a: number, b: number): number {\n  return a + b;\n}`);
  } else if (ruleId === '@typescript-eslint/no-floating-promises') {
    examples.incorrect.push(`async function fetchData() {\n  fetch('/api/data');\n}`);
    examples.correct.push(`async function fetchData() {\n  await fetch('/api/data');\n}`);
  } else if (ruleId === '@typescript-eslint/no-misused-promises') {
    examples.incorrect.push(`if (Promise.resolve(true)) {\n  console.log('wrong');\n}`);
    examples.correct.push(`const result = await Promise.resolve(true);\nif (result) {\n  console.log('correct');\n}`);
  } else if (ruleId === '@typescript-eslint/await-thenable') {
    examples.incorrect.push(`const x = 5;\nawait x;`);
    examples.correct.push(`const promise = Promise.resolve(5);\nawait promise;`);
  } else if (ruleId === '@typescript-eslint/no-unnecessary-type-assertion') {
    examples.incorrect.push(`const num = 5 as number;`);
    examples.correct.push(`const num = 5;`);
  } else if (ruleId === '@typescript-eslint/prefer-nullish-coalescing') {
    examples.incorrect.push(`const value = input || 'default';`);
    examples.correct.push(`const value = input ?? 'default';`);
  } else if (ruleId === '@typescript-eslint/prefer-optional-chain') {
    examples.incorrect.push(`const value = obj && obj.prop && obj.prop.value;`);
    examples.correct.push(`const value = obj?.prop?.value;`);
  } else if (ruleId === '@typescript-eslint/no-non-null-assertion') {
    examples.incorrect.push(`const value = obj!.prop;`);
    examples.correct.push(`const value = obj?.prop;`);
  } else if (ruleId === '@typescript-eslint/consistent-type-imports') {
    examples.incorrect.push(`import { User } from './types';`);
    examples.correct.push(`import type { User } from './types';`);
  } else if (ruleId === '@typescript-eslint/no-unsafe-assignment') {
    examples.incorrect.push(`const data: any = fetchData();\nconst user = data.user;`);
    examples.correct.push(`const data: UserResponse = fetchData();\nconst user = data.user;`);
  } else if (ruleId === '@typescript-eslint/no-unsafe-member-access') {
    examples.incorrect.push(`function process(obj: any) {\n  return obj.property;\n}`);
    examples.correct.push(`function process(obj: { property: string }) {\n  return obj.property;\n}`);
  } else if (ruleId === '@typescript-eslint/no-unsafe-call') {
    examples.incorrect.push(`function execute(fn: any) {\n  fn();\n}`);
    examples.correct.push(`function execute(fn: () => void) {\n  fn();\n}`);
  } else if (ruleId === '@typescript-eslint/no-unsafe-return') {
    examples.incorrect.push(`function getData(obj: any): string {\n  return obj.data;\n}`);
    examples.correct.push(`function getData(obj: { data: string }): string {\n  return obj.data;\n}`);
  } else if (ruleId === '@typescript-eslint/restrict-template-expressions') {
    examples.incorrect.push(`const msg = \`value: \${obj}\`;\nconst num = \`count: \${null}\`;`);
    examples.correct.push(`const msg = \`value: \${String(obj)}\`;\nconst num = \`count: \${value ?? 0}\`;`);
  } else if (ruleId === '@typescript-eslint/no-base-to-string') {
    examples.incorrect.push(`const obj = { name: 'test' };\nconsole.log('obj: ' + obj);`);
    examples.correct.push(`const obj = { name: 'test' };\nconsole.log('obj: ' + JSON.stringify(obj));`);
  } else if (ruleId === '@typescript-eslint/require-await') {
    examples.incorrect.push(`async function process() {\n  return calculate();\n}`);
    examples.correct.push(`function process() {\n  return calculate();\n}\n// or\nasync function process() {\n  return await fetchData();\n}`);
  } else if (ruleId === '@typescript-eslint/no-implied-eval') {
    examples.incorrect.push(`setTimeout('alert("hi")', 100);`);
    examples.correct.push(`setTimeout(() => alert('hi'), 100);`);
  } else if (ruleId === '@typescript-eslint/no-for-in-array') {
    examples.incorrect.push(`const arr = [1, 2, 3];\nfor (const key in arr) {\n  console.log(arr[key]);\n}`);
    examples.correct.push(`const arr = [1, 2, 3];\nfor (const item of arr) {\n  console.log(item);\n}`);
  } else if (ruleId === '@typescript-eslint/prefer-as-const') {
    examples.incorrect.push(`const value = 'literal' as 'literal';`);
    examples.correct.push(`const value = 'literal' as const;`);
  } else if (ruleId === '@typescript-eslint/no-array-constructor') {
    examples.incorrect.push(`const arr = new Array(1, 2, 3);`);
    examples.correct.push(`const arr = [1, 2, 3];`);
  } else if (ruleId === '@typescript-eslint/ban-ts-comment') {
    examples.incorrect.push(`// @ts-ignore\nconst x: string = 5;`);
    examples.correct.push(`// provide proper types instead\nconst x: number = 5;`);
  } else if (ruleId === '@typescript-eslint/no-empty-function') {
    examples.incorrect.push(`function doNothing() {}`);
    examples.correct.push(`function doNothing() {\n  // intentionally empty\n}`);
  } else if (ruleId === '@typescript-eslint/no-this-alias') {
    examples.incorrect.push(`class MyClass {\n  method() {\n    const self = this;\n    setTimeout(function() { self.value = 1; });\n  }\n}`);
    examples.correct.push(`class MyClass {\n  method() {\n    setTimeout(() => { this.value = 1; });\n  }\n}`);
  }
  // react hooks rules
  else if (ruleId === 'react-hooks/rules-of-hooks') {
    examples.incorrect.push(`function Component({ condition }) {\n  if (condition) {\n    const [state] = useState(0);\n  }\n  return <div />;\n}`);
    examples.correct.push(`function Component({ condition }) {\n  const [state] = useState(0);\n  if (condition) {\n    return <div>{state}</div>;\n  }\n  return <div />;\n}`);
  } else if (ruleId === 'react-hooks/exhaustive-deps') {
    examples.incorrect.push(`useEffect(() => {\n  doSomething(value);\n}, []);`);
    examples.correct.push(`useEffect(() => {\n  doSomething(value);\n}, [value]);`);
  }
  // react refresh rules
  else if (ruleId === 'react-refresh/only-export-components') {
    examples.incorrect.push(`export const util = () => {};\nexport default function App() {\n  return <div />;\n}`);
    examples.correct.push(`const util = () => {};\nexport default function App() {\n  return <div />;\n}`);
  }
  // core javascript rules
  else if (ruleId === 'no-console') {
    examples.incorrect.push(`console.log('debug message');`);
    examples.correct.push(`// use a proper logging library\nlogger.debug('debug message');`);
  } else if (ruleId === 'no-debugger') {
    examples.incorrect.push(`debugger;\nconsole.log('after');`);
    examples.correct.push(`console.log('use dev tools instead');`);
  } else if (ruleId === 'no-var') {
    examples.incorrect.push(`var x = 5;`);
    examples.correct.push(`const x = 5;`);
  } else if (ruleId === 'prefer-const') {
    examples.incorrect.push(`let x = 5;\nconsole.log(x);`);
    examples.correct.push(`const x = 5;\nconsole.log(x);`);
  } else if (ruleId === 'eqeqeq') {
    examples.incorrect.push(`if (x == 5) { }`);
    examples.correct.push(`if (x === 5) { }`);
  } else if (ruleId === 'no-unused-expressions') {
    examples.incorrect.push(`x + 1;\n'hello';`);
    examples.correct.push(`const result = x + 1;\nconsole.log('hello');`);
  } else if (ruleId === 'no-constant-condition') {
    examples.incorrect.push(`if (true) {\n  doSomething();\n}`);
    examples.correct.push(`if (condition) {\n  doSomething();\n}`);
  } else if (ruleId === 'no-empty') {
    examples.incorrect.push(`if (condition) {}`);
    examples.correct.push(`if (condition) {\n  // todo: implement\n}`);
  } else if (ruleId === 'no-unreachable') {
    examples.incorrect.push(`function example() {\n  return true;\n  console.log('never runs');\n}`);
    examples.correct.push(`function example() {\n  console.log('runs');\n  return true;\n}`);
  } else if (ruleId === 'curly') {
    examples.incorrect.push(`if (condition) doSomething();`);
    examples.correct.push(`if (condition) {\n  doSomething();\n}`);
  } else if (ruleId === 'no-eval') {
    examples.incorrect.push(`eval('alert("dangerous")');`);
    examples.correct.push(`// use safe alternatives\nconst result = calculate();`);
  } else if (ruleId === 'no-implied-eval') {
    examples.incorrect.push(`setTimeout('doSomething()', 1000);`);
    examples.correct.push(`setTimeout(doSomething, 1000);`);
  } else if (ruleId === 'no-with') {
    examples.incorrect.push(`with (obj) {\n  property = value;\n}`);
    examples.correct.push(`obj.property = value;`);
  } else if (ruleId === 'no-new-func') {
    examples.incorrect.push(`const fn = new Function('a', 'b', 'return a + b');`);
    examples.correct.push(`const fn = (a, b) => a + b;`);
  } else if (ruleId === 'prefer-arrow-callback') {
    examples.incorrect.push(`array.map(function(item) {\n  return item * 2;\n});`);
    examples.correct.push(`array.map((item) => item * 2);`);
  } else if (ruleId === 'prefer-template') {
    examples.incorrect.push(`const msg = 'hello ' + name + '!';`);
    examples.correct.push(`const msg = \`hello \${name}!\`;`);
  } else if (ruleId === 'prefer-rest-params') {
    examples.incorrect.push(`function sum() {\n  return Array.from(arguments).reduce((a, b) => a + b);\n}`);
    examples.correct.push(`function sum(...args) {\n  return args.reduce((a, b) => a + b);\n}`);
  } else if (ruleId === 'prefer-spread') {
    examples.incorrect.push(`Math.max.apply(Math, numbers);`);
    examples.correct.push(`Math.max(...numbers);`);
  } else if (ruleId === 'no-throw-literal') {
    examples.incorrect.push(`throw 'error message';`);
    examples.correct.push(`throw new Error('error message');`);
  } else if (ruleId === 'no-useless-catch') {
    examples.incorrect.push(`try {\n  doSomething();\n} catch (e) {\n  throw e;\n}`);
    examples.correct.push(`try {\n  doSomething();\n} catch (e) {\n  logger.error(e);\n  throw e;\n}`);
  } else {
    // generic example for unknown rules
    if (config.severity === 'error' || config.severity === 'warn') {
      examples.incorrect.push(`// example code that violates ${ruleId}\n// check documentation for specific details`);
      examples.correct.push(`// corrected code following ${ruleId}\n// check documentation for specific details`);
    }
  }

  return examples;
}

/**
 * fetch rule documentation from various sources
 */
async function fetchRuleDocumentation(ruleId, meta) {
  const docs = meta?.docs || {};
  
  return {
    description: docs.description || 'no description available.',
    url: docs.url || null,
    recommended: docs.recommended || false,
    category: docs.category || 'uncategorized',
    fixable: meta?.fixable || false,
    hasSuggestions: meta?.hasSuggestions || false,
  };
}

/**
 * categorize rules by their plugin/source
 */
function categorizeRule(ruleId) {
  if (ruleId.startsWith('@typescript-eslint/')) {
    return { category: 'typescript', plugin: 'typescript-eslint' };
  } else if (ruleId.startsWith('react-hooks/')) {
    return { category: 'react hooks', plugin: 'react-hooks' };
  } else if (ruleId.startsWith('react-refresh/')) {
    return { category: 'react refresh', plugin: 'react-refresh' };
  } else if (ruleId.startsWith('react/')) {
    return { category: 'react', plugin: 'react' };
  } else {
    return { category: 'javascript core', plugin: 'eslint' };
  }
}

/**
 * format rule configuration value
 */
function formatRuleConfig(config) {
  if (Array.isArray(config)) {
    const [severity, ...options] = config;
    return {
      severity: severity === 2 ? 'error' : severity === 1 ? 'warn' : 'off',
      options: options.length > 0 ? options : null
    };
  }
  return {
    severity: config === 2 ? 'error' : config === 1 ? 'warn' : 'off',
    options: null
  };
}

/**
 * generate markdown documentation
 */
function generateMarkdown(rulesByCategory, metadata) {
  const timestamp = new Date().toISOString().split('T')[0];
  
  let markdown = `# eslint rules documentation

> **auto-generated**: ${timestamp}
> 
> this document is automatically generated from the eslint configuration.
> any manual changes will be overwritten on the next update.

## table of contents

`;

  // generate toc
  for (const [category, rules] of Object.entries(rulesByCategory)) {
    const anchor = category.toLowerCase().replace(/\s+/g, '-');
    markdown += `- [${category} (${rules.length} rules)](#${anchor})\n`;
  }

  markdown += `\n---\n\n`;
  markdown += `## configuration summary\n\n`;
  markdown += `- **total rules**: ${metadata.totalRules}\n`;
  markdown += `- **error level**: ${metadata.errorCount}\n`;
  markdown += `- **warning level**: ${metadata.warnCount}\n`;
  markdown += `- **file patterns**: \`${metadata.filePatterns.join('`, `')}\`\n`;
  markdown += `- **ignored paths**: \`${metadata.ignoredPaths.join('`, `')}\`\n\n`;
  markdown += `---\n\n`;

  // generate sections for each category
  for (const [category, rules] of Object.entries(rulesByCategory)) {
    const anchor = category.toLowerCase().replace(/\s+/g, '-');
    markdown += `## ${category}\n\n`;
    
    rules.sort((a, b) => a.ruleId.localeCompare(b.ruleId));
    
    for (const rule of rules) {
      const { ruleId, config, docs } = rule;
      
      markdown += `### \`${ruleId}\`\n\n`;
      
      // severity badge
      markdown += `**severity**: ${config.severity}`;
      
      if (docs.recommended) {
        markdown += ` | recommended`;
      }
      if (docs.fixable) {
        markdown += ` | fixable`;
      }
      markdown += `\n\n`;
      
      // description
      markdown += `**description**: ${docs.description}\n\n`;
      
      // documentation link
      if (docs.url) {
        markdown += `[view rule documentation](${docs.url})\n\n`;
      }
      
      // options if any
      if (config.options) {
        markdown += `**options**:\n\`\`\`json\n${JSON.stringify(config.options, null, 2)}\n\`\`\`\n\n`;
      }
      
      // code examples
      const examples = generateCodeExamples(ruleId, config);
      if (examples.incorrect.length > 0 || examples.correct.length > 0) {
        markdown += `**examples**:\n\n`;
        
        if (examples.incorrect.length > 0) {
          markdown += `❌ **incorrect**:\n\n`;
          examples.incorrect.forEach(code => {
            markdown += `\`\`\`typescript\n${code}\n\`\`\`\n\n`;
          });
        }
        
        if (examples.correct.length > 0) {
          markdown += `✅ **correct**:\n\n`;
          examples.correct.forEach(code => {
            markdown += `\`\`\`typescript\n${code}\n\`\`\`\n\n`;
          });
        }
      }
      
      markdown += `---\n\n`;
    }
  }

  // add footer
  markdown += `## how to update this documentation\n\n`;
  markdown += `this file is automatically generated. to update:\n\n`;
  markdown += `1. **automatic**: runs on every push that changes \`eslint.config.js\` or \`package.json\`\n`;
  markdown += `2. **manual**: run \`npm run generate-eslint-docs\`\n`;
  markdown += `3. **manual (github actions)**: go to actions → "update eslint rules documentation" → run workflow\n\n`;
  markdown += `## resources\n\n`;
  markdown += `- [eslint documentation](https://eslint.org/docs/latest/)\n`;
  markdown += `- [typescript eslint](https://typescript-eslint.io/)\n`;
  markdown += `- [react hooks rules](https://react.dev/reference/rules/rules-of-hooks)\n`;
  markdown += `- [react fast refresh](https://github.com/facebook/react/tree/main/packages/react-refresh)\n\n`;
  markdown += `---\n\n`;
  markdown += `**last generated**: ${new Date().toISOString()}\n`;

  return markdown;
}

/**
 * main function to generate documentation
 */
async function main() {
  console.log('analyzing eslint configuration...\n');

  try {
    // initialize eslint with the project's config
    const eslint = new ESLint({
      cwd: PROJECT_ROOT,
      overrideConfigFile: path.join(PROJECT_ROOT, 'eslint.config.js'),
    });

    // get the calculated config for a typescript file
    const config = await eslint.calculateConfigForFile('src/App.tsx');
    
    console.log('configuration loaded successfully\n');

    const rules = config.rules || {};
    const rulesByCategory = {};
    const metadata = {
      totalRules: 0,
      errorCount: 0,
      warnCount: 0,
      filePatterns: ['**/*.ts', '**/*.tsx'],
      ignoredPaths: ['dist']
    };

    // process each rule
    for (const [ruleId, ruleConfig] of Object.entries(rules)) {
      // skip disabled rules
      if (ruleConfig === 'off' || ruleConfig === 0 || 
          (Array.isArray(ruleConfig) && (ruleConfig[0] === 'off' || ruleConfig[0] === 0))) {
        continue;
      }

      metadata.totalRules++;

      // get rule metadata
      let ruleMeta = null;
      try {
        // try to get the actual rule object from eslint
        const ruleModule = await eslint.getRulesMetaForResults([{
          filePath: path.join(PROJECT_ROOT, 'src/App.tsx'),
          messages: [],
          suppressedMessages: [],
          errorCount: 0,
          fatalErrorCount: 0,
          warningCount: 0,
          fixableErrorCount: 0,
          fixableWarningCount: 0,
          usedDeprecatedRules: []
        }]);
        
        ruleMeta = ruleModule[ruleId];
      } catch (e) {
        // fallback if we can't get meta
        console.warn(`could not fetch metadata for rule: ${ruleId}`);
      }

      const config = formatRuleConfig(ruleConfig);
      const docs = await fetchRuleDocumentation(ruleId, ruleMeta);
      const { category } = categorizeRule(ruleId);

      if (config.severity === 'error') metadata.errorCount++;
      if (config.severity === 'warn') metadata.warnCount++;

      if (!rulesByCategory[category]) {
        rulesByCategory[category] = [];
      }

      rulesByCategory[category].push({
        ruleId,
        config,
        docs
      });
    }

    console.log(`found ${metadata.totalRules} active rules:\n`);
    for (const [category, rules] of Object.entries(rulesByCategory)) {
      console.log(`   ${category}: ${rules.length} rules`);
    }
    console.log();

    // generate markdown
    console.log('generating markdown documentation...\n');
    const markdown = generateMarkdown(rulesByCategory, metadata);

    // ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    await fs.mkdir(outputDir, { recursive: true });

    // write to file
    await fs.writeFile(OUTPUT_FILE, markdown, 'utf-8');
    
    console.log('documentation generated successfully!\n');
    console.log(`output: ${path.relative(process.cwd(), OUTPUT_FILE)}\n`);

  } catch (error) {
    console.error('error generating documentation:', error);
    process.exit(1);
  }
}

main();