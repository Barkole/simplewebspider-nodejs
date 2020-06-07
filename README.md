# simplewebspider-nofejs

## Getting started

1. Install [VSCode](https://code.visualstudio.com/)
2. Install [Git Bash for Windows](https://gitforwindows.org/)
3. Setup your git
   1. `git config --global user.name "foo"`
   2. `git config --global user.email "email@example.com"`
4. Install [node.js 12.x](https://nodejs.org/)
5. Install [yarn](https://yarnpkg.com/) - [Installation](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
6. Install [lint-staged](https://github.com/okonet/lint-staged): `npx mrm lint-staged`
7. Install tcs: `yarn global add typescript`
8. Clone project: `git clone ...`
9. Setup VSCode
   1. Install recommended extensions
   2. Install all dependencies: `yarn install`

## Coding

### Known issues

#### Is not woking at all, because initialized array is undefined

```txt
{"message":"Add entry: https://www.wikipedia.org/","level":"debug"}
(node:8088) UnhandledPromiseRejectionWarning: Error: Bootstrapping failed
    at new Errlop (D:\vscode\simplewebspider-nodejs\node_modules\errlop\edition-es5\index.js:57:18)
    at new BootstrapError (D:\vscode\simplewebspider-nodejs\dist\engine\bootstrapper.js:22:9)
        -> D:\vscode\simplewebspider-nodejs\src\engine\bootstrapper.ts:19:5
    at Bootstrapper.run (D:\vscode\simplewebspider-nodejs\dist\engine\bootstrapper.js:42:19)
        -> D:\vscode\simplewebspider-nodejs\src\engine\bootstrapper.ts:41:13
    at async SimplerCrawler.run (D:\vscode\simplewebspider-nodejs\dist\engine\crawler.js:23:9)
        -> D:\vscode\simplewebspider-nodejs\src\engine\crawler.ts:19:5
↳ TypeError: Cannot read property 'entries' of undefined
    at push (D:\vscode\simplewebspider-nodejs\dist\database\memory.js:25:14)
        -> D:\vscode\simplewebspider-nodejs\src\database\memory.ts:21:10
    at Array.forEach (<anonymous>)
    at Bootstrapper.run (D:\vscode\simplewebspider-nodejs\dist\engine\bootstrapper.js:39:18)
        -> D:\vscode\simplewebspider-nodejs\src\engine\bootstrapper.ts:39:10
    at async SimplerCrawler.run (D:\vscode\simplewebspider-nodejs\dist\engine\crawler.js:23:9)
        -> D:\vscode\simplewebspider-nodejs\src\engine\crawler.ts:19:5
```

#### Import of own modules must end with `.js`: `import { config } from "./config.js";`

How to fix that?

* Perhaps that? <https://github.com/microsoft/TypeScript/issues/27287#issuecomment-451712919>

#### Debugging is not possible under Windows

```txt
> Executing task: d:\vscode\simplewebspider-nodejs\node_modules\.bin\tsc.cmd -p d:\vscode\simplewebspider-nodejs\tsconfig.json <

/usr/bin/bash: d:vscodesimplewebspider-nodejsnode_modules.bintsc.cmd: command not found
The terminal process terminated with exit code: 127
```

See also

* <https://stackoverflow.com/questions/49910024/vscode-path-generation-failure-in-run-build-task-tsc-build>
* <https://github.com/Microsoft/vscode/issues/35593>

#### Auto compile on save is not working

Most likely same issue as above. But no errors are shown.

#### How to start crawler correctly?

Starting an async method in the module causes in case of errors

> (node:20604) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
> (node:20604) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

How to start it correctly?

### Executing

* Normal and safe start:

   ```sh
   > yarn start
   ```

* Quick start thanks to autocompile on save - if it would work

   ```sh
   > yarn start-quick
   ```

### Managing dependencies

Only use

* `yarn add`
* `yarn remove`
* `yarn upgrade --interactive`

### Evaluate new dependency

Please use and compare several 3rd party libraries by using

* <https://npmcompare.com/>
* <https://www.npmtrends.com/>
* <https://bundlephobia.com/>

For upgrade you can also dig into changes by using

* <https://diff.intrinsic.com/>

## Related documentation

* [TypeScript Tutorial](https://www.typescriptlang.org/docs/tutorial.html)
  * [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/README.md)
* [yarn - Creating a new project](https://classic.yarnpkg.com/en/docs/creating-a-project/)
