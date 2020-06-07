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

### Executing

Start CLI by executing

```sh
> yarn start
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
