#!/bin/bash
rm -rf ./dist
yarn install
tsc --resolveJsonModule

echo BUILD_TIMESTAMP=`date -Is -u` >> ./dist/.env.override
if [[ -z $(git status -s) ]]; then
    echo BUILD_SHA=`git rev-parse HEAD` >> ./dist/.env.override
else
    echo BUILD_SHA=`git rev-parse HEAD`-DIRTY >> ./dist/.env.override
fi

node ./dist/cli.js
