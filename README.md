[![pipeline status](https://gitlab.com/Lepardo/simplewebspider-nodejs/badges/master/pipeline.svg)](https://gitlab.com/Lepardo/simplewebspider-nodejs/-/commits/master) [![coverage report](https://gitlab.com/Lepardo/simplewebspider-nodejs/badges/master/coverage.svg)](https://gitlab.com/Lepardo/simplewebspider-nodejs/-/commits/master)

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
7. Install typescript `yarn global add typescript`
8. Install [pkg](https://www.npmjs.com/package/pkg): `yarn global add pkg`
9. Clone project: `git clone ...`
10. Setup VSCode
   1. Install recommended extensions
   2. Install all dependencies: `yarn install`

## Coding

### Known issues

#### Auto compile on save is not working

Most likely same issue as above. But no errors are shown.
### TODOs

#### Use promise queues

* <https://github.com/sindresorhus/promise-fun>
  * <https://github.com/sindresorhus/p-queue>
  * <https://www.npmjs.com/package/p-limit>
  * <https://github.com/sindresorhus/p-throttle>
  * <https://github.com/sindresorhus/p-timeout>
  * <https://github.com/sindresorhus/p-forever>
  * <https://github.com/sindresorhus/p-whilst>
* <https://github.com/promise-queue/promise-queue>
* <https://www.npmjs.com/package/promiseq>
* <https://www.npmtrends.com/p-queue-vs-promise-queue-vs-queue-promise-vs-promise-pool-vs-promise-limit-vs-p-limit-vs-async-promise-queue-vs-p-throttle>

#### Use html parser stream

* <https://www.npmjs.com/package/htmlparser2>
* <https://www.npmtrends.com/cheerio-vs-htmlparser2-vs-jsdom-vs-parse5-vs-scraper>

#### Implement gitlab pipeline

TODO

#### Create also binary artifact

* <https://github.com/nexe/nexe>
* <https://www.npmjs.com/package/pkg>
  * <https://dev.to/jochemstoel/bundle-your-node-app-to-a-single-executable-for-windows-linux-and-osx-2c89>
  * <https://medium.com/@jamomani/run-node-app-as-single-executable-file-on-windows-mac-or-linux-d4e9a98ef6fd>

#### Dependency Injection

Check for

* <http://inversify.io/>
* <https://www.npmjs.com/package/typedi>
* <https://github.com/microsoft/tsyringe>
* <https://www.npmjs.com/package/injection-js>
* <https://www.npmtrends.com/inversify-vs-tsyringe-vs-typedi-vs-typescript-ioc-vs-node-dependency-injection-vs-injection-js>

##### Testing

* Unit testing
* ...

##### Analyze startup

* <https://github.com/GoogleCloudPlatform/require-so-slow>

##### Allow multiple modes: pqueue vs. workers

* <https://github.com/sinclairzx81/threadbox>

#### Replace bash scripts by node.js only scripts

* Workspaces?

### Executing

* Normal and safe start:

   ```sh
   > yarn start
   ```

* Quick start thanks to autocompile on save - if it would work

   ```sh
   > yarn start-quick
   ```

### Debugging

Launch `Run npm start`

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
* Check for ECMAScript support: [node.green](https://node.green/)
  * See also [ECMAScript 2015 (ES6) and beyond](https://nodejs.org/en/docs/es6/)
