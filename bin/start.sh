#!/bin/bash
set -e

#rm -rf ./dist
echo " => yarn install..."
yarn install
echo " => yarn lint..."
yarn lint
echo " => tsc..."
tsc --resolveJsonModule
echo " => copy resources..."
cp -R ./resources ./dist/

echo " => create env override..."
echo "# Auto generated" > ./dist/.env.override
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

echo " => node..."
node --enable-source-maps ./dist/cli.js
