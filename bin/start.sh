#!/bin/bash
set -e

rm -rf ./dist
yarn install
yarn lint
tsc --resolveJsonModule
cp -R ./resources ./dist/

echo BUILD_VERSION=`cat package.json \
| grep "\"version\"" \
| head -1 \
| awk -F: '{ print $2 }' \
| sed 's/[",]//g' \
| tr -d '[[:space:]]'` >> ./dist/.env.override
echo BUILD_NAME=`cat package.json \
| grep "\"name\"" \
| head -1 \
| awk -F: '{ print $2 }' \
| sed 's/[",]//g' \
| tr -d '[[:space:]]'` >> ./dist/.env.override
echo BUILD_TIMESTAMP=`date -Is -u` >> ./dist/.env.override
if [[ -z $(git status -s) ]]; then
    echo BUILD_SHA=`git rev-parse HEAD` >> ./dist/.env.override
else
    echo BUILD_SHA=`git rev-parse HEAD`-DIRTY >> ./dist/.env.override
fi

node ./dist/cli.js
